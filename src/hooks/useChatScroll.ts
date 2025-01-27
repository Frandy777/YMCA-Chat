import { useRef, useEffect } from 'react';
import { Message } from '../types/chat';

export function useChatScroll(messages: Message[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return messagesEndRef;
}