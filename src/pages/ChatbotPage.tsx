import { Bot, Mic, MicOff, Send, Volume2, VolumeX, MapPin, Building2, UserRound, Phone } from "lucide-react";
import { FormEvent, useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { chatMessages } from "../data/demoData";
import { getAiHealthResponse } from "../services/aiService";
import { ChatMessage } from "../types";

declare global {
  interface Window {
    google?: any;
  }
}

interface HospitalLocation {
  id: string;
  name: string;
  doctor: string;
  specialty: string;
  contact: string;
  lat: number;
  lng: number;
}

const INDIAN_HOSPITALS: HospitalLocation[] = [
  { id: "h1", name: "Apollo Hospitals, Jayanagar", doctor: "Dr. Arvind Swamy (Apollo Jayanagar)", specialty: "Cardiologist & General Medicine", contact: "+91 80 2630 4050", lat: 12.9214, lng: 77.5929 },
  { id: "h2", name: "Fortis Hospital, Bannerghatta Road", doctor: "Dr. Meenakshi Rao (Fortis Bannerghatta)", specialty: "Pediatrician & Triage Care", contact: "+91 80 6621 4444", lat: 12.8942, lng: 77.5996 },
  { id: "h3", name: "Manipal Hospital, Old Airport Road", doctor: "Dr. Rajesh Shrivastava (Manipal Old Airport Rd)", specialty: "Gastroenterologist", contact: "+91 80 2502 4444", lat: 12.9593, lng: 77.6436 },
  { id: "h4", name: "Narayana Institute of Cardiac Sciences", doctor: "Dr. Vikram Malhotra (Narayana Health City)", specialty: "Neurologist & Emergency Care", contact: "+91 80 7122 2222", lat: 12.8123, lng: 77.6945 },
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalLocation | null>(INDIAN_HOSPITALS[0]);
  
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInitializedRef = useRef<boolean>(false); // Hard prevention of double rendering crashes
  const googleMapInstanceRef = useRef<any>(null);

  const [animatedMessageId, setAnimatedMessageId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const typingIntervalRef = useRef<number | null>(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  // STABLE MAP ATTACHMENT LOGIC
  useEffect(() => {
    // If already loaded or container missing or library unavailable, exit safely
    if (mapInitializedRef.current || !mapRef.current || !window.google || !window.google.maps) return;

    try {
      const defaultCenter = { lat: 12.9716, lng: 77.5946 };

      // Instantiate using standard maps initialization fallback (avoids advanced importLibrary crash)
      googleMapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 11,
        disableDefaultUI: false,
        zoomControl: true,
      });

      // Mark as initialized immediately to lock the loop
      mapInitializedRef.current = true;

      // Render standard Hospital Markers
      INDIAN_HOSPITALS.forEach((hosp) => {
        const marker = new window.google.maps.Marker({
          position: { lat: hosp.lat, lng: hosp.lng },
          map: googleMapInstanceRef.current,
          title: hosp.name,
        });

        marker.addListener("click", () => {
          setSelectedHospital(hosp);
        });
      });

      // Geolocation tracking
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (!googleMapInstanceRef.current) return;
            const userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            googleMapInstanceRef.current.setCenter(userLoc);
            googleMapInstanceRef.current.setZoom(12);

            // Standard fallback marker style for the user location pin
            new window.google.maps.Marker({
              position: userLoc,
              map: googleMapInstanceRef.current,
              title: "Your Location",
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }
            });
          },
          (err) => console.warn("Live GPS location declined", err),
          { enableHighAccuracy: true }
        );
      }
    } catch (err) {
      console.error("Map rendering error:", err);
    }

    return () => {
      if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (selectedHospital && googleMapInstanceRef.current) {
      googleMapInstanceRef.current.panTo({ lat: selectedHospital.lat, lng: selectedHospital.lng });
    }
  }, [selectedHospital]);

  function animateTextReveal(messageId: string, fullText: string) {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
    setAnimatedMessageId(messageId);
    let index = 0;
    setDisplayedText("");

    typingIntervalRef.current = window.setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
        setAnimatedMessageId(null);
      }
    }, 12);
  }

  function speakText(textToSpeak: string) {
    if (isMuted || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/[\*\_\#]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-IN"; 
    window.speechSynthesis.speak(utterance);
  }

  function send(value = text) {
    if (!value.trim()) return;
    
    SpeechRecognition.stopListening();

    const userMessage: ChatMessage = { 
      id: crypto.randomUUID(), 
      sender: "user", 
      text: value, 
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), 
      read: true 
    };
    
    setMessages((items) => [...items, userMessage]);
    setText("");
    resetTranscript();
    setTyping(true);

    window.setTimeout(() => {
      let rawAiResponse = getAiHealthResponse(value);
      if (value.toLowerCase().includes("stomach") || value.toLowerCase().includes("pain") || value.toLowerCase().includes("hospital")) {
        rawAiResponse += " I have updated your interactive live tracking dashboard with operational emergency facilities near you.";
      }

      const aiMessageId = crypto.randomUUID();
      const aiMessage: ChatMessage = { 
        id: aiMessageId, 
        sender: "ai", 
        text: rawAiResponse, 
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), 
        read: true 
      };

      setMessages((items) => [...items, aiMessage]);
      setTyping(false);
      speakText(rawAiResponse);
      animateTextReveal(aiMessageId, rawAiResponse);
    }, 700);
  }

  function toggleVoiceRecognition() {
    if (!browserSupportsSpeechRecognition) {
      alert("Voice recognition is not fully supported on this browser.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: true, 
        language: "en-IN" 
      });
    }
  }

  return (
    <div className="mx-auto grid h-[calc(100vh-130px)] max-w-7xl grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden rounded-2xl p-2 bg-slate-50 dark:bg-slate-950">
      
      {/* CHAT INTERFACE HUB */}
      <div className="lg:col-span-2 flex flex-col overflow-hidden border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900 rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white"><Bot /></span>
            <div>
              <h1 className="text-xl font-extrabold">AI Health Chatbot</h1>
              <p className="text-sm text-slate-500">Continuous Microphone Track Enabled</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => {
              if (!isMuted && window.speechSynthesis) window.speechSynthesis.cancel();
              setIsMuted(!isMuted);
            }}
            className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 ${isMuted ? "text-slate-400" : "text-blue-600"}`}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
        
        <div className="flex-1 space-y-4 overflow-auto p-4">
          {messages.map((item) => {
            const isAnimating = item.id === animatedMessageId;
            return (
              <div key={item.id} className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${item.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                  <div className="text-sm md:text-base">
                    {isAnimating ? displayedText : item.text}
                    {isAnimating && <span className="inline-block w-1.5 h-4 ml-0.5 bg-slate-500 animate-pulse" />}
                  </div>
                  <p className="mt-1 text-right text-xs opacity-70">{item.timestamp} · read</p>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className="flex gap-1 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800 w-16">
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:240ms]" />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {["Check my symptoms", "Find nearby hospitals", "Medication info"].map((chip) => (
            <button key={chip} type="button" className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 dark:bg-blue-950" onClick={() => send(chip)}>
              {chip}
            </button>
          ))}
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t border-slate-200 p-4 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button 
            type="button" 
            onClick={toggleVoiceRecognition} 
            className={`p-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${listening ? "bg-red-500 text-white shadow-inner animate-pulse" : "text-slate-600 dark:text-slate-300"}`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input 
            className="flex-1 w-full min-w-0 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder={listening ? "Listening... Click mic button when finished speaking." : "Say or type symptoms..."} 
          />
          <button type="submit" className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* FIXED CONTAINER VIEW */}
      <div className="flex flex-col border border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
            <MapPin size={18} className="text-red-500" /> Real-time Live GPS Map
          </h2>
          <p className="text-xs text-slate-400">Blue Pin: You | Red Pins: Hospital Facilities</p>
        </div>

        {/* This container size is now firmly locked */}
        <div 
          ref={mapRef} 
          className="flex-1 bg-slate-100 dark:bg-slate-950 min-h-[300px] border-b border-slate-200 dark:border-slate-800" 
          style={{ width: '100%', height: '100%' }}
        />

        <div className="p-4 bg-white dark:bg-slate-900 min-h-[160px]">
          {selectedHospital ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Building2 size={18} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{selectedHospital.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{selectedHospital.specialty}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <UserRound size={14} className="text-blue-600 shrink-0" />
                  <span>Doctor: <strong className="font-bold text-slate-800 dark:text-slate-100">{selectedHospital.doctor}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span className="font-medium">{selectedHospital.contact}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-slate-400 italic py-6">
              Select a marker on the map to view staff details.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
