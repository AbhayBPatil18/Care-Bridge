import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

export function useVoiceCommand(onEmergency?: () => void) {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const runCommand = useCallback((command: string) => {
    const text = command.toLowerCase();
    if (text.includes("chatbot")) navigate("/chatbot");
    else if (text.includes("book")) navigate("/appointments");
    else if (text.includes("analytics")) navigate("/analytics");
    else if (text.includes("symptoms")) navigate("/symptoms");
    else if (text.includes("emergency") || text.includes("sos")) onEmergency?.();
    else toast.error("Command not recognized");
  }, [navigate, onEmergency]);

  const startListening = useCallback(() => {
    const SpeechRecognitionApi = (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition
      ?? (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!SpeechRecognitionApi) {
      toast.error("Voice commands are not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognitionApi();
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      runCommand(text);
    };
    recognition.start();
  }, [runCommand]);

  return { listening, transcript, startListening };
}
