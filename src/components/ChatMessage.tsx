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
  // 更严格的单行消息判断
  const isSingleLine = !content.includes('\n') && content.length <= 30;
  // 非常短的消息特殊处理
  const isVeryShort = content.length <= 10;
  
  return (
    <div className={`flex gap-2 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden
        ${isUser ? 'bg-gradient-to-br from-[#FFFFFF] to-[#D5D5D5] backdrop-blur-sm shadow-[0_4px_12px_rgba(255,255,255,0.3)]' : 
        'bg-gradient-to-br from-zinc-800 to-zinc-900 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]'}`}>
        {isUser ? (
          <User size={18} className="text-black sm:size-[20px]" />
        ) : isRightChat ? (
          <img src={trumpImage} alt="Trump" className="w-full h-full object-cover" />
        ) : (
          <img src={metaImage} alt="Meta" className="w-7 h-7 sm:w-7 sm:h-7" />
        )}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} ${isVeryShort ? 'max-w-[45%]' : 'max-w-[75%]'} sm:max-w-[65%]`}>
        <div className={`inline-block transition-all
          ${isSingleLine ? 'h-8 sm:h-10 flex items-center px-3 sm:px-4' : 'px-3 py-2 sm:px-5 sm:py-3'} 
          ${isVeryShort ? 'min-w-[3rem]' : ''} 
          rounded-xl sm:rounded-2xl
          ${isUser ? 
            'bg-gradient-to-br from-[#FFFFFF] to-[#D5D5D5] backdrop-blur-sm text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]' : 
            'bg-gradient-to-br from-[#222222] to-[#000000] backdrop-blur-sm text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]'}`}>
          <p className={`whitespace-pre-wrap break-words leading-relaxed text-[13px] sm:text-[15px] ${isVeryShort ? 'text-center min-w-[2rem]' : ''}`}>{content}</p>
        </div>
      </div>
    </div>
  );
}