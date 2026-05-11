import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, Send, MoreVertical, Phone, Video,
  Check, CheckCheck, Image as ImageIcon, Smile, Paperclip,
  CalendarDays,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";

// ── Mock Data ──────────────────────────────────────
interface Message {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Max K.",
    avatar: profile1,
    lastMessage: "Klingt gut, bis morgen dann! 😊",
    lastTime: "14:32",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hey, ich habe dein Profil gesehen und wollte fragen, ob du morgen Zeit hast?", time: "13:20", fromMe: false, read: true },
      { id: "m2", text: "Hi Max! Ja, morgen passt mir gut. Wann hattest du dir vorgestellt?", time: "13:45", fromMe: true, read: true },
      { id: "m3", text: "Gegen 18 Uhr wäre perfekt, wenn das für dich okay ist.", time: "14:10", fromMe: false, read: true },
      { id: "m4", text: "18 Uhr passt! Ich schick dir gleich noch die Details.", time: "14:25", fromMe: true, read: true },
      { id: "m5", text: "Klingt gut, bis morgen dann! 😊", time: "14:32", fromMe: false, read: false },
      { id: "m6", text: "Freu mich! Bis dann 💛", time: "14:33", fromMe: false, read: false },
    ],
  },
  {
    id: "2",
    name: "Julia S.",
    avatar: profile2,
    lastMessage: "Danke für die Info!",
    lastTime: "12:15",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hi! Welche Services bietest du genau an?", time: "11:30", fromMe: false, read: true },
      { id: "m2", text: "Hey Julia, schau gerne auf mein Profil – da sind alle Details aufgelistet 😊", time: "11:50", fromMe: true, read: true },
      { id: "m3", text: "Danke für die Info!", time: "12:15", fromMe: false, read: true },
    ],
  },
  {
    id: "3",
    name: "Tom R.",
    avatar: profile3,
    lastMessage: "Können wir den Termin verschieben?",
    lastTime: "Gestern",
    unread: 1,
    online: true,
    messages: [
      { id: "m1", text: "Hey, ich wollte für nächste Woche einen Termin machen.", time: "Mo 16:00", fromMe: false, read: true },
      { id: "m2", text: "Klar, wann passt dir?", time: "Mo 16:30", fromMe: true, read: true },
      { id: "m3", text: "Mittwoch Abend wäre ideal.", time: "Mo 17:00", fromMe: false, read: true },
      { id: "m4", text: "Perfekt, trage ich ein!", time: "Mo 17:15", fromMe: true, read: true },
      { id: "m5", text: "Können wir den Termin verschieben?", time: "Gestern", fromMe: false, read: false },
    ],
  },
  {
    id: "4",
    name: "Lena M.",
    avatar: profile4,
    lastMessage: "Das Foto ist super geworden!",
    lastTime: "Di",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hey, ich habe das Foto aus dem Shooting bearbeitet 📸", time: "Di 10:00", fromMe: true, read: true },
      { id: "m2", text: "Das Foto ist super geworden!", time: "Di 10:30", fromMe: false, read: true },
    ],
  },
  {
    id: "5",
    name: "Chris B.",
    avatar: profile5,
    lastMessage: "Vielen Dank, war super!",
    lastTime: "Mo",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "Vielen Dank, war super!", time: "Mo 20:00", fromMe: false, read: true },
      { id: "m2", text: "Danke dir auch! Freut mich, dass es dir gefallen hat 😊", time: "Mo 20:15", fromMe: true, read: true },
    ],
  },
];

const MessagesSection = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? {
              ...c,
              lastMessage: newMessage,
              lastTime: "Jetzt",
              messages: [
                ...c.messages,
                {
                  id: `m${Date.now()}`,
                  text: newMessage,
                  time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
                  fromMe: true,
                  read: false,
                },
              ],
            }
          : c
      )
    );
    setNewMessage("");
  };

  // ── Conversation View ────────────────────────────
  if (activeConversation) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col h-[calc(100vh-8rem)]"
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveChat(null)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="relative flex-shrink-0">
            <img
              src={activeConversation.avatar}
              alt={activeConversation.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            {activeConversation.online && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-card" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-sm truncate">
              {activeConversation.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {activeConversation.online ? "Online" : "Offline"}
            </p>
          </div>
          <div className="flex gap-1">
            <Link to="/dashboard?section=dateplanner">
              <Button variant="ghost" size="icon" className="text-primary h-9 w-9" title="Date planen">
                <CalendarDays className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {activeConversation.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.fromMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-secondary-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-[10px] ${
                    msg.fromMe ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                  }`}
                >
                  <span>{msg.time}</span>
                  {msg.fromMe && (
                    msg.read
                      ? <CheckCheck className="h-3 w-3" />
                      : <Check className="h-3 w-3" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground flex-shrink-0 h-9 w-9">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Nachricht schreiben…"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                className="pr-10 rounded-xl"
                maxLength={1000}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Smile className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="icon"
              className="gradient-brand text-primary-foreground rounded-xl flex-shrink-0 h-10 w-10 shadow-md shadow-primary/20"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Chat List View ───────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold">Nachrichten</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {conversations.reduce((sum, c) => sum + c.unread, 0)} ungelesene Nachrichten
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Kontakt suchen…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl"
          maxLength={100}
        />
      </div>

      {/* Conversation List */}
      <div className="space-y-1">
        {filteredConversations.map((conv) => (
          <motion.button
            key={conv.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveChat(conv.id)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/80 transition-colors text-left"
          >
            <div className="relative flex-shrink-0">
              <img
                src={conv.avatar}
                alt={conv.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              {conv.online && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-sm truncate">
                  {conv.name}
                </p>
                <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">
                  {conv.lastTime}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 h-5 min-w-[1.25rem] px-1.5 rounded-full gradient-brand text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}

        {filteredConversations.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Kein Kontakt gefunden</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessagesSection;
