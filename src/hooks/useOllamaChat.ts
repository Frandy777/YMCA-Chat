import { useState } from 'react';
import { Message, ChatState, OllamaResponse } from '../types/chat';

export function useOllamaChat(apiUrl: string, model: string) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = async (content: string) => {
    if (state.isLoading) return;

    const newMessage: Message = { role: 'user', content };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt: content,
          stream: false,
          context: [],
          options: {
            temperature: 0.7,
            top_p: 0.9,
            top_k: 40,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to Ollama service');
      }

      const data: OllamaResponse = await response.json();
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, { role: 'assistant', content: data.response }],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const clearChat = () => {
    setState({ messages: [], isLoading: false, error: null });
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
  };
}