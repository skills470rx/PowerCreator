import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Send, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

// Mock creator data - in real app, this would come from URL params
const MOCK_CREATOR_ID = 2;
const MOCK_CREATOR = {
  id: MOCK_CREATOR_ID,
  name: "Alex Chen",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  bio: "AI Content Creator specializing in blog writing and copywriting",
  isOnline: true,
};

export default function ChatLive() {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // tRPC queries and mutations
  const getHistoryQuery = trpc.chat.getHistory.useQuery(
    { otherUserId: MOCK_CREATOR_ID, limit: 50 },
    { enabled: !!user && !authLoading }
  );

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load initial message history
  useEffect(() => {
    if (getHistoryQuery.data?.success && getHistoryQuery.data.messages) {
      setMessages(getHistoryQuery.data.messages);
    }
  }, [getHistoryQuery.data]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return;

    const userMessageContent = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Optimistically add user message to UI
      const userMessage = {
        id: Date.now(),
        senderId: user.id,
        receiverId: MOCK_CREATOR_ID,
        content: userMessageContent,
        createdAt: new Date(),
        isRead: false,
      };
      setMessages((prev) => [...prev, userMessage]);

      // Send message and get AI response
      const result = await sendMessageMutation.mutateAsync({
        receiverId: MOCK_CREATOR_ID,
        content: userMessageContent,
        isAICreator: true,
      });

      if (result.success) {
        // Refetch message history to get the saved AI response
        await getHistoryQuery.refetch();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove optimistic message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600 mb-4">Please sign in to chat with creators</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={MOCK_CREATOR.avatar}
              alt={MOCK_CREATOR.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="font-semibold text-slate-900">{MOCK_CREATOR.name}</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-slate-600">
                  {MOCK_CREATOR.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">AI Creator</Badge>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-600 mb-2">No messages yet</p>
              <p className="text-sm text-slate-500">Start a conversation by sending a message</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.senderId === user.id
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-200 text-slate-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.senderId === user.id
                        ? "text-blue-100"
                        : "text-slate-600"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-200 text-slate-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm">AI is typing...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
