import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, Phone, Video, MoreVertical } from "lucide-react";
import { useLocation } from "wouter";

const mockConversations = [
  {
    id: 1,
    creatorName: "Alex Chen",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "I can start working on your project tomorrow",
    timestamp: "2 hours ago",
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    creatorName: "Maria Rodriguez",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    lastMessage: "The design mockups are ready for review",
    timestamp: "5 hours ago",
    unread: 0,
    isOnline: true,
  },
  {
    id: 3,
    creatorName: "James Wilson",
    creatorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastMessage: "Let me check my availability",
    timestamp: "1 day ago",
    unread: 0,
    isOnline: false,
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: "creator",
    senderName: "Alex Chen",
    content: "Hi! I'm interested in your project. Can you tell me more about the requirements?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    senderId: "client",
    senderName: "You",
    content: "Sure! I need help creating content for my blog. About 10 articles per month.",
    timestamp: "10:45 AM",
  },
  {
    id: 3,
    senderId: "creator",
    senderName: "Alex Chen",
    content: "That sounds great! I can definitely handle that. My rate is $75/hour.",
    timestamp: "11:00 AM",
  },
  {
    id: 4,
    senderId: "client",
    senderName: "You",
    content: "Perfect! When can you start?",
    timestamp: "11:15 AM",
  },
  {
    id: 5,
    senderId: "creator",
    senderName: "Alex Chen",
    content: "I can start working on your project tomorrow",
    timestamp: "11:30 AM",
  },
];

export default function Chat() {
  const [, setLocation] = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: "client",
        senderName: "You",
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 border-slate-300"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={conversation.creatorAvatar}
                        alt={conversation.creatorName}
                        className="w-10 h-10 rounded-full"
                      />
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-900 truncate">{conversation.creatorName}</p>
                        <span className="text-xs text-slate-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedConversation.creatorAvatar}
                    alt={selectedConversation.creatorName}
                    className="w-10 h-10 rounded-full"
                  />
                  {selectedConversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{selectedConversation.creatorName}</p>
                  <p className="text-xs text-slate-500">
                    {selectedConversation.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === "client"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "client" ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="border-slate-300"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
