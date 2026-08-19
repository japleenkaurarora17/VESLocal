import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, MessageSquare, Search, Phone, Video, Info, Circle } from 'lucide-react';

export default function Messages({ messages, currentUser, onSendMessage, students }) {
  const [searchParams] = useSearchParams();
  const chatWithParam = searchParams.get('chatWith');
  
  const [activeChatId, setActiveChatId] = useState(messages[0]?.id || null);
  const [messageText, setMessageText] = useState('');

  // Switch chat thread if query param is set
  useEffect(() => {
    if (chatWithParam) {
      const existingChat = messages.find(m => m.studentId === chatWithParam);
      if (existingChat) {
        setActiveChatId(existingChat.id);
      } else {
        // Start a mock new thread if not already in chats
        const studentInfo = students.find(s => s.id === chatWithParam);
        if (studentInfo) {
          const newChatId = `chat-${Date.now()}`;
          const newChat = {
            id: newChatId,
            studentId: studentInfo.id,
            studentName: studentInfo.name,
            avatarUrl: studentInfo.avatarUrl,
            department: studentInfo.department,
            lastMessage: "Conversation started.",
            lastTimestamp: "Just now",
            unread: false,
            conversation: []
          };
          
          // Append chat to messages list
          messages.unshift(newChat);
          setActiveChatId(newChatId);
        }
      }
    }
  }, [chatWithParam, messages, students]);

  const activeChat = messages.find(c => c.id === activeChatId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendMessage(activeChatId, {
      sender: currentUser.id,
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setMessageText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      <div className="bg-surface border border-sand h-[75vh] flex overflow-hidden">
        
        {/* Left Side: Threads panel */}
        <div className="w-full md:w-80 border-r border-sand flex flex-col shrink-0">
          <div className="p-4 border-b border-sand bg-bg-ves/20">
            <h2 className="font-serif text-lg font-bold text-dark mb-3">Campus Messages</h2>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-sand/40">
            {messages.map(chat => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`p-4 flex gap-3 items-start cursor-pointer transition-colors ${
                    isActive ? 'bg-sand/35' : 'hover:bg-bg-ves/15'
                  }`}
                >
                  <img 
                    src={chat.avatarUrl} 
                    alt={chat.studentName} 
                    className="w-10 h-10 rounded-full border border-sand bg-bg-ves"
                  />
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-xs font-bold text-dark truncate mr-2">{chat.studentName}</h4>
                      <span className="text-[9px] text-muted shrink-0">{chat.lastTimestamp}</span>
                    </div>
                    <p className={`text-xs truncate ${chat.unread ? 'font-semibold text-dark' : 'text-muted'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>

                  {chat.unread && (
                    <Circle className="w-2.5 h-2.5 fill-terracotta text-terracotta shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation window */}
        <div className="hidden md:flex flex-1 flex-col bg-bg-ves/10">
          
          {activeChat ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-sand bg-surface flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeChat.avatarUrl} 
                    alt={activeChat.studentName} 
                    className="w-9 h-9 rounded-full border border-sand bg-bg-ves"
                  />
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-dark">{activeChat.studentName}</h3>
                    <p className="text-[10px] text-muted">{activeChat.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-muted">
                  <Phone 
                    className="w-4 h-4 cursor-pointer hover:text-olive" 
                    onClick={() => alert("Phone calling is a mock action for later experiments.")}
                  />
                  <Video 
                    className="w-4 h-4 cursor-pointer hover:text-olive" 
                    onClick={() => alert("Video calling is a mock action for later experiments.")}
                  />
                  <Info 
                    className="w-4 h-4 cursor-pointer hover:text-olive" 
                    onClick={() => alert(`Details for ${activeChat.studentName} - ${activeChat.department}`)}
                  />
                </div>
              </div>

              {/* Chat Dialog box */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col justify-end">
                <div className="space-y-4">
                  
                  {activeChat.conversation.length === 0 && (
                    <div className="text-center text-xs text-muted py-6">
                      No messages yet. Send a message to initiate the collaboration conversation!
                    </div>
                  )}

                  {activeChat.conversation.map((msg, index) => {
                    const isOwn = msg.sender === currentUser.id;
                    return (
                      <div 
                        key={index}
                        className={`flex flex-col max-w-[70%] ${isOwn ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <div className={`p-3 text-xs leading-relaxed ${
                          isOwn 
                            ? 'bg-olive text-surface border border-olive' 
                            : 'bg-surface text-dark border border-sand'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-muted/80 mt-1">{msg.time || "1:40 PM"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Input section */}
              <form onSubmit={handleSend} className="p-4 border-t border-sand bg-surface flex gap-3 items-center">
                <input
                  type="text"
                  placeholder={`Write a message to ${activeChat.studentName}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-olive hover:bg-olive/90 text-surface border border-olive transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted gap-3">
              <MessageSquare className="w-12 h-12 text-sand" />
              <p className="text-sm">Select a classmate from the list to start conversing.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
