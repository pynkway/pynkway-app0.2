import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { profiles } from "@/data/listings";

const demoMessages = [
  { id: 1, from: "them", text: "Hey! Thanks for reaching out 😊", time: "2:30 PM" },
  { id: 2, from: "me", text: "Hi! I'd love to book a dinner date this weekend. Are you available?", time: "2:31 PM" },
  { id: 3, from: "them", text: "Absolutely! Saturday evening works great for me. Any preference on the restaurant?", time: "2:32 PM" },
  { id: 4, from: "me", text: "How about that new Italian place downtown?", time: "2:33 PM" },
  { id: 5, from: "them", text: "Perfect choice! I'll send you the details. Looking forward to it! ✨", time: "2:34 PM" },
];

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(0);
  const chatProfiles = profiles.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-card hidden md:flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="font-display font-bold text-lg">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatProfiles.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelectedChat(i)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors ${selectedChat === i ? "bg-secondary/50" : ""}`}
              >
                <div className="relative">
                  <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                  {p.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">Looking forward to it! ✨</p>
                </div>
                <span className="text-xs text-muted-foreground">2:34 PM</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-border flex items-center px-4 gap-3 bg-card">
            <button className="md:hidden mr-2"><ArrowLeft className="h-5 w-5" /></button>
            <img src={chatProfiles[selectedChat].photo} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-medium text-sm">{chatProfiles[selectedChat].name}</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="rounded-full"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {demoMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.from === "me"
                    ? "gradient-brand text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="rounded-full h-12 bg-secondary border-0"
              />
              <Button size="icon" className="rounded-full h-12 w-12 gradient-brand text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
