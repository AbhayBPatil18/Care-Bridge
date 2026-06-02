import { appointments, chatMessages, history, medications, metrics, notifications } from "../data/demoData";

export function useDemoData() {
  return { appointments, chatMessages, history, medications, metrics, notifications };
}
