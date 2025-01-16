import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  onApiUrlChange: (url: string) => void;
  leftModel: string;
  onLeftModelChange: (model: string) => void;
  rightModel: string;
  onRightModelChange: (model: string) => void;
}

export function Settings({
  isOpen,
  onClose,
  apiUrl,
  onApiUrlChange,
  leftModel,
  onLeftModelChange,
  rightModel,
  onRightModelChange
}: SettingsProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      
      {/* 设置面板 */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg 
        bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl z-50 
        p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">设置</h2>
          <Button variant="icon" onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">API 地址</label>
            <Input
              value={apiUrl}
              onChange={(e) => onApiUrlChange(e.target.value)}
              placeholder="http://localhost:11434"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">左侧模型</label>
            <Input
              value={leftModel}
              onChange={(e) => onLeftModelChange(e.target.value)}
              placeholder="模型名称"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">右侧模型</label>
            <Input
              value={rightModel}
              onChange={(e) => onRightModelChange(e.target.value)}
              placeholder="模型名称"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
} 