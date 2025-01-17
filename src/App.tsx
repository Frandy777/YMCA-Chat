import React from 'react';
import { Trash2, Settings as SettingsIcon } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Button } from './components/Button';
import { Settings } from './components/Settings';
import { useChatScroll } from './hooks/useChatScroll';
import { useOllamaChat } from './hooks/useOllamaChat';

export default function App() {
  const [apiUrl, setApiUrl] = React.useState('http://39.107.221.209:11434');
  const [leftModel, setLeftModel] = React.useState('llama3.1:8b');
  const [rightModel, setRightModel] = React.useState('Frandy/llamatrump-v1.1');
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  
  const leftChat = useOllamaChat(apiUrl, leftModel);
  const rightChat = useOllamaChat(apiUrl, rightModel);
  
  const leftMessagesEndRef = useChatScroll(leftChat.messages);
  const rightMessagesEndRef = useChatScroll(rightChat.messages);

  const handleSendMessage = async (content: string) => {
    if (leftChat.isLoading || rightChat.isLoading) return;
    leftChat.sendMessage(content);
    rightChat.sendMessage(content);
  };

  const handleClearChat = () => {
    leftChat.clearChat();
    rightChat.clearChat();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 w-full mx-auto flex relative">
        {/* Left Chat */}
        <div className="flex-1 flex flex-col border-r border-zinc-800">
          <div className="p-4 border-b border-zinc-800 sticky top-0 bg-black z-10">
            <div className="flex items-center justify-between">
              <Button
                variant="icon"
                onClick={() => setIsSettingsOpen(true)}
                title="设置"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <SettingsIcon size={18} />
              </Button>
              <div className="flex items-center gap-2 text-zinc-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-base font-bold">Llama 3.1</span>
              </div>
              <div className="w-8" /> {/* 占位，保持对称 */}
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-32">
            {leftChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} isRightChat={false} />
            ))}
            {leftChat.isLoading && (
              <div className="text-center text-zinc-500">
                <div className="animate-pulse">Thinking...</div>
              </div>
            )}
            {leftChat.error && (
              <div className="text-center text-red-500 p-4 bg-red-950/50 rounded-full">
                {leftChat.error}
              </div>
            )}
            <div ref={leftMessagesEndRef} />
          </div>
        </div>

        {/* Right Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-zinc-800 sticky top-0 bg-black z-10">
            <div className="flex items-center justify-between">
              <div className="w-8" /> {/* 占位，保持对称 */}
              <div className="flex items-center gap-2 text-zinc-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-base font-bold">Llamatrump</span>
              </div>
              <Button
                variant="icon"
                onClick={handleClearChat}
                title="清空对话"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-32">
            {rightChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} isRightChat={true} />
            ))}
            {rightChat.isLoading && (
              <div className="text-center text-zinc-500">
                <div className="animate-pulse">Thinking...</div>
              </div>
            )}
            {rightChat.error && (
              <div className="text-center text-red-500 p-4 bg-red-950/50 rounded-full">
                {rightChat.error}
              </div>
            )}
            <div ref={rightMessagesEndRef} />
          </div>
        </div>

        {/* Floating Input */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={leftChat.isLoading || rightChat.isLoading}
          />
        </div>
      </main>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiUrl={apiUrl}
        onApiUrlChange={setApiUrl}
        leftModel={leftModel}
        onLeftModelChange={setLeftModel}
        rightModel={rightModel}
        onRightModelChange={setRightModel}
      />
    </div>
  );
}