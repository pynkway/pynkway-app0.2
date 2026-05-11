import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Have a question? We're here to help.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1.5 rounded-xl h-12" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5 rounded-xl h-12" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="mt-1.5 rounded-xl h-12" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more..." className="mt-1.5 rounded-xl min-h-[150px]" />
                </div>
                <Button type="submit" className="gradient-brand text-primary-foreground rounded-full px-8 h-12 font-semibold shadow-lg shadow-primary/20 hover:opacity-90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@veravoo.com" },
              { icon: MessageCircle, label: "Live Chat", value: "Available 24/7" },
              { icon: MapPin, label: "Location", value: "Worldwide" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-xl gradient-brand-subtle flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display font-bold text-sm mb-1">{item.label}</p>
                <p className="text-muted-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 bg-card">
        <p className="text-center text-sm text-muted-foreground">© 2026 Pynklyme. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
