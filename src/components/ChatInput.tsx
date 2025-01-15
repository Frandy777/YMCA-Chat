import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Type here..."
        className="w-full px-6 py-4 rounded-full bg-zinc-800/70 backdrop-blur-lg border border-zinc-700/50 text-white 
          placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500/70 focus:border-transparent
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] transition-shadow"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-green-500/90 backdrop-blur-sm
          text-white hover:bg-green-600/90 disabled:opacity-50 disabled:cursor-not-allowed
          shadow-[0_4px_12px_rgb(34,197,94,0.4)] hover:shadow-[0_4px_16px_rgb(34,197,94,0.6)] transition-all"
      >
        <Send size={20} />
      </button>
    </form>
  );
}