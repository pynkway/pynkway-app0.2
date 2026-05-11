import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gift, Copy, Check, Share2, Users, Crown, ArrowLeft,
  CheckCircle, Star, Sparkles, Shield, MessageCircle,
  BarChart3, ShoppingBag, Heart, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const REFERRAL_LINK = "https://veravoo.com/join?ref=MIA2026";

const plusBenefits = [
  { icon: ShoppingBag, title: "Unlimited Listings", desc: "Keine Limits im Marketplace" },
  { icon: BarChart3, title: "Analytics", desc: "Detaillierte Statistiken zu deinem Profil" },
  { icon: MessageCircle, title: "Unlimited Messaging", desc: "Unbegrenzt Nachrichten senden" },
  { icon: Star, title: "Priority Placement", desc: "Werde prominenter angezeigt" },
  { icon: Shield, title: "Safe Date", desc: "Erweiterte Sicherheitsfeatures" },
  { icon: Heart, title: "Advanced Filters", desc: "Erweiterte Such- und Filteroptionen" },
];

const steps = [
  { num: "1", title: "Link teilen", desc: "Teile deinen persönlichen Invite-Link mit Freunden" },
  { num: "2", title: "Profil erstellen", desc: "Dein Freund registriert sich und aktiviert sein Profil" },
  { num: "3", title: "Plus genießen", desc: "Ihr beide bekommt 30 Tage Pynklyme Plus – gratis" },
];

const InvitePage = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyLink = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Link kopiert!", description: "Jetzt teilen und Rewards verdienen." });
  };

  const shareVia = (platform: string) => {
    const text = encodeURIComponent(
      "Hey! Komm zu Pynklyme – wir bekommen beide 30 Tage Plus! 🎉"
    );
    const url = encodeURIComponent(REFERRAL_LINK);
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Back */}
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="text-muted-foreground -ml-2">
              <ArrowLeft className="h-4 w-4 mr-1" /> Zurück zum Dashboard
            </Button>
          </Link>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="h-20 w-20 rounded-3xl gradient-brand flex items-center justify-center mx-auto shadow-xl shadow-primary/30">
              <Gift className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Grow the{" "}
              <span className="gradient-text">Community</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              Lade Freunde zu Pynklyme ein und erhalte{" "}
              <span className="font-semibold text-foreground">30 Tage Pynklyme Plus</span>{" "}
              – für euch beide. Kein Haken, nur Community-Liebe. 💛
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-lg font-bold mb-4 text-center">So funktioniert's</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {steps.map((step, i) => (
                <Card key={i} className="text-center">
                  <CardContent className="p-5">
                    <div className="h-10 w-10 rounded-full gradient-brand flex items-center justify-center mx-auto mb-3 shadow-md shadow-primary/20">
                      <span className="text-primary-foreground font-bold text-sm">{step.num}</span>
                    </div>
                    <p className="font-display font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 overflow-hidden">
              <div className="gradient-brand-subtle p-6 sm:p-8 space-y-5">
                <div className="text-center">
                  <h3 className="font-display text-lg font-bold">Dein persönlicher Link</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kopiere und teile deinen Link
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-card rounded-xl px-4 py-3 text-sm truncate border border-border font-mono">
                    {REFERRAL_LINK}
                  </div>
                  <Button
                    className={`rounded-xl px-5 ${
                      copied
                        ? "bg-primary/20 text-primary"
                        : "gradient-brand text-primary-foreground shadow-lg shadow-primary/25"
                    }`}
                    onClick={copyLink}
                  >
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? "Kopiert" : "Kopieren"}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "whatsapp", label: "WhatsApp" },
                    { id: "telegram", label: "Telegram" },
                    { id: "twitter", label: "𝕏 / Twitter" },
                  ].map((p) => (
                    <Button
                      key={p.id}
                      variant="outline"
                      className="rounded-xl text-xs py-5"
                      onClick={() => shareVia(p.id)}
                    >
                      <Share2 className="h-3.5 w-3.5 mr-1.5" />
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Plus Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-4">
              <h2 className="font-display text-lg font-bold flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Was du mit Plus bekommst
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                All das – 30 Tage gratis für jede erfolgreiche Einladung
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {plusBenefits.map((b, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <b.icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center space-y-3 pb-4"
          >
            <p className="text-muted-foreground text-sm">
              Je mehr Freunde du einlädst, desto länger genießt du Plus. Kein Limit. 🚀
            </p>
            <Button
              className="gradient-brand text-primary-foreground px-8 py-5 rounded-xl text-base font-semibold shadow-lg shadow-primary/25"
              onClick={copyLink}
            >
              <Zap className="h-5 w-5 mr-2" />
              Jetzt Link kopieren & teilen
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default InvitePage;
