import React from 'react';

interface ModelSelectProps {
  model: string;
  onModelChange: (model: string) => void;
  disabled: boolean;
}

export function ModelSelect({ model, onModelChange, disabled }: ModelSelectProps) {
  return (
    <select
      value={model}
      onChange={(e) => onModelChange(e.target.value)}
      disabled={disabled}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="llama2">Llama 2</option>
      <option value="mistral">Mistral</option>
      <option value="codellama">Code Llama</option>
      <option value="gemma">Gemma</option>
    </select>
  );
}