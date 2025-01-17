import { User } from 'lucide-react';
import { Message } from '../types/chat';
import trumpImage from '../assets/TrumpHappy.png';
import metaImage from '../assets/meta.svg';

interface ChatMessageProps {
  message: Message;
  isRightChat?: boolean;
}

export function ChatMessage({ message, isRightChat = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const content = message.content;
  // 判断是否为单行消息（不包含换行符且长度适中）
  const isSingleLine = !content.includes('\n') && content.length <= 50;
  
  return (
    <div className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden
        ${isUser ? 'bg-gradient-to-br from-[#FFFFFF] to-[#D5D5D5] backdrop-blur-sm shadow-[0_4px_12px_rgba(255,255,255,0.3)]' : 
        'bg-gradient-to-br from-zinc-800 to-zinc-900 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]'}`}>
        {isUser ? (
          <User size={20} className="text-black" />
        ) : isRightChat ? (
          <img src={trumpImage} alt="Trump" className="w-full h-full object-cover" />
        ) : (
          <img src={metaImage} alt="Meta" className="w-7 h-7" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[65%]`}>
        <div className={`inline-block transition-all
          ${isSingleLine ? 'h-10 flex items-center px-4' : 'px-5 py-3'} 
          rounded-2xl
          ${isUser ? 
            'bg-gradient-to-br from-[#FFFFFF] to-[#D5D5D5] backdrop-blur-sm text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]' : 
            'bg-gradient-to-br from-[#222222] to-[#000000] backdrop-blur-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]'}`}>
          <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{content}</p>
        </div>
      </div>
    </div>
  );
}