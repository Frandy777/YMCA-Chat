import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm text-zinc-400 mb-1">{label}</label>
      )}
      <input
        {...props}
        className={`px-4 py-2 rounded-full border bg-zinc-800 border-zinc-700 
          text-white placeholder-zinc-400 focus:outline-none focus:ring-2 
          focus:ring-green-500 focus:border-transparent ${className}`}
      />
    </div>
  );
}