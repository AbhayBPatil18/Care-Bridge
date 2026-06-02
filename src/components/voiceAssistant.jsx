import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceAssistant() {
  const [response, setResponse] = useState("");

  const {
    transcript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser not supported</span>;
  }

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  };

  const handleAI = () => {
    let reply = "";

    if (transcript.toLowerCase().includes("appointment")) {
      reply = "Booking your appointment";
    } else if (transcript.toLowerCase().includes("heart rate")) {
      reply = "Your heart rate is normal";
    } else if (transcript.toLowerCase().includes("help")) {
      reply = "Emergency alert activated";
    } else {
      reply = "Sorry, I did not understand";
    }

    setResponse(reply);
    speak(reply);
  };

  return (
    <div>
      <h2>AI Voice Assistant</h2>

      <button
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: false,
          })
        }
      >
        Start Listening
      </button>

      <button
        onClick={() =>
          SpeechRecognition.stopListening()
        }
      >
        Stop
      </button>

      <p>
        <strong>You Said:</strong> {transcript}
      </p>

      <button onClick={handleAI}>
        Process Command
      </button>

      <p>
        <strong>AI:</strong> {response}
      </p>
    </div>
  );
}