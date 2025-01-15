export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_duration: number;
  eval_duration: number;
  prompt_tokens: number;
  eval_tokens: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}