import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
        ${isUser ? 'bg-white/90 backdrop-blur-sm shadow-[0_4px_12px_rgba(255,255,255,0.3)]' : 
        'bg-zinc-800/90 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]'}`}>
        {isUser ? 
          <MessageCircle size={24} className="text-black" /> : 
          <Bot size={24} className="text-white" />
        }
      </div>
      <div className={`flex-1 max-w-[80%] px-6 py-4 rounded-3xl transition-all
        ${isUser ? 
          'bg-white/90 backdrop-blur-sm text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]' : 
          'bg-zinc-800/80 backdrop-blur-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]'}`}>
        <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{message.content}</p>
      </div>
    </div>
  );
}