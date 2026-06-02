export function getAiHealthResponse(input: string) {
  const text = input.toLowerCase();
  if (/(chest|breath|faint|stroke|severe|emergency)/.test(text)) {
    return "This could be urgent. If you have chest pain, breathing trouble, fainting, sudden weakness, or severe symptoms, call emergency services now.";
  }
  if (/(sad|anxious|stress|mental)/.test(text)) {
    return "Try slow breathing, a short walk, hydration, and reaching out to someone you trust. If thoughts of self-harm appear, seek immediate crisis support.";
  }
  if (/(medicine|medication|dose|pill)/.test(text)) {
    return "I can explain general medication routines, but do not change dose timing without your clinician. Check your reminder screen and report side effects.";
  }
  if (/(food|nutrition|diet)/.test(text)) {
    return "A balanced plate with lean protein, fiber-rich carbs, colorful vegetables, and water is a strong starting point. Keep sodium and added sugar moderate.";
  }
  if (/(symptom|headache|fever|pain|cough)/.test(text)) {
    return "Track symptom onset, severity, temperature, hydration, and triggers. Use the symptom checker for triage and book a visit if symptoms worsen or persist.";
  }
  return "I can help with symptoms, wellness, nutrition, mental health, medication basics, and appointment planning. Tell me what you are noticing.";
}
