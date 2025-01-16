import React from 'react';
import { Trash2, Settings as SettingsIcon } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Settings } from './components/Settings';
import { useChatScroll } from './hooks/useChatScroll';
import { useOllamaChat } from './hooks/useOllamaChat';

export default function App() {
  const [apiUrl, setApiUrl] = React.useState('http://localhost:11434');
  const [leftModel, setLeftModel] = React.useState('llamatrump-v1');
  const [rightModel, setRightModel] = React.useState('llama3.1');
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
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full" />
            <h1 className="text-xl font-medium tracking-wide">YMCA</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="icon"
              onClick={() => setIsSettingsOpen(true)}
              title="设置"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <SettingsIcon size={20} />
            </Button>
            <Button
              variant="icon"
              onClick={handleClearChat}
              title="清空对话"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full mx-auto flex relative">
        {/* Left Chat */}
        <div className="flex-1 flex flex-col border-r border-zinc-800">
          <div className="p-4 border-b border-zinc-800 sticky top-[73px] bg-black z-10">
            <Input
              value={leftModel}
              onChange={(e) => setLeftModel(e.target.value)}
              placeholder="Left model name"
              className="w-full bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-32">
            {leftChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
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
          <div className="p-4 border-b border-zinc-800 sticky top-[73px] bg-black z-10">
            <Input
              value={rightModel}
              onChange={(e) => setRightModel(e.target.value)}
              placeholder="Right model name"
              className="w-full bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-32">
            {rightChat.messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
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