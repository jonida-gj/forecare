import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, X, Send, Sparkles, MessageCircle } from "lucide-react";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

const mockResponses: Record<string, string> = {
  "default": "I can help you understand resident trends, alert explanations, anomaly summaries, and more. Try asking about a specific resident or alert.",
  "maria": "Maria Schmidt (Room A-12) shows a continued decline pattern over the past 7 days. Key concerns:\n\n• Mobility dropped 62% below her personal baseline\n• Sleep averaging only 4.0 hours (baseline: 7h)\n• Resting heart rate elevated +18 bpm\n• Weight loss of 1.2 kg over 7 days\n\nRecommendation: Prioritize clinical review within 24 hours. Consider adjusting her care plan to include increased safety checks and physiotherapy assessment.",
  "sleep": "Across the facility, 8 residents show sleep disruption patterns this week. The most affected:\n\n1. Hans Weber — 4+ wake events nightly, averaging 3.1h total sleep\n2. Maria Schmidt — averaging 4.0h, declining from 7h baseline\n3. Elisabeth Braun — irregular sleep-wake cycle detected\n\nCommon contributing factors include medication timing, ambient noise levels during night shift, and reduced daytime activity. Consider reviewing sleep hygiene protocols.",
  "alert": "The most recent critical alert was for Maria Schmidt at 08:32 — her fall risk score spiked due to a combination of reduced mobility (62% below baseline) and gait instability (score 3.1/10). This alert was generated because multiple evidence signals crossed their threshold simultaneously, suggesting a compound risk pattern rather than an isolated event.",
  "fall": "Current fall risk summary:\n\n• 3 residents at high fall risk (score >70)\n• Maria Schmidt: highest risk at 92 — reduced mobility + gait instability\n• Klaus Bauer: risk at 71 — gait variability increased 40%\n• Overall facility fall risk has increased 12% this week\n\nPrimary drivers: seasonal activity reduction and recent medication changes in 2 residents.",
  "handover": "AI-Generated Shift Handover Summary:\n\n🔴 Priority: Maria Schmidt — vitals check overdue by 45 min, mobility declining\n🟡 Monitor: Hans Weber — 3 overnight wake events, review sleep data\n🟡 Monitor: Ingrid Müller — appetite reduced, weigh-in due today\n\n✅ Stable overnight: 121 of 124 residents\n📊 3 devices need attention (offline/low battery)\n\nAll critical alerts were acknowledged. Average response time: 3.8 minutes.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("maria") || lower.includes("schmidt")) return mockResponses.maria;
  if (lower.includes("sleep") || lower.includes("rest")) return mockResponses.sleep;
  if (lower.includes("alert") || lower.includes("explain")) return mockResponses.alert;
  if (lower.includes("fall") || lower.includes("risk")) return mockResponses.fall;
  if (lower.includes("handover") || lower.includes("shift") || lower.includes("summary")) return mockResponses.handover;
  return mockResponses.default;
}

const quickQueries = [
  "Summarize overnight shift",
  "Who needs attention today?",
  "Explain latest alert",
  "Fall risk summary",
];

interface Props {
  contextResident?: string | null;
}

const AskForeCareChat = ({ contextResident }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = contextResident
        ? `I'm ready to help with ${contextResident}'s data. What would you like to know?`
        : "Hello! I'm ForeCare AI. Ask me about resident trends, alerts, anomalies, or request a summary.";
      setMessages([{ role: "ai", text: greeting, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }
  }, [isOpen, contextResident]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text, timestamp: now }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const queryText = contextResident ? `${text} ${contextResident}` : text;
      const response = getResponse(queryText);
      setMessages((prev) => [...prev, { role: "ai", text: response, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elevated hover:shadow-glow flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        title="Ask ForeCare AI"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[70vh] sm:h-[520px] max-h-[520px] rounded-2xl border border-border bg-card shadow-elevated flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Ask ForeCare</p>
            <p className="text-[10px] text-muted-foreground">AI Assistant · Decision Support</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Context indicator */}
      {contextResident && (
        <div className="px-4 py-1.5 bg-primary/5 border-b border-border">
          <p className="text-[10px] text-primary font-medium">Context: {contextResident}</p>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/70 text-foreground border border-border"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-[10px] text-primary font-medium">ForeCare AI</span>
                  </div>
                )}
                <p className="text-xs leading-relaxed whitespace-pre-line">{msg.text}</p>
                <p className={`text-[9px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted/70 border border-border rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick queries */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
          {quickQueries.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-[10px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trends, alerts, residents..."
            className="h-9 text-xs bg-muted/50"
          />
          <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim()}>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
        <p className="text-[9px] text-muted-foreground mt-1.5 text-center">
          AI-powered decision support · Not a clinical diagnosis
        </p>
      </div>
    </div>
  );
};

export default AskForeCareChat;
