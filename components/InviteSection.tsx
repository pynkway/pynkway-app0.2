import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gift, Copy, Check, Share2, Users, Crown, ArrowRight,
  CheckCircle, Clock, UserPlus, Star, Trophy, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// ── Mock Data ──────────────────────────────────────
interface Invite {
  id: string;
  name: string;
  status: "signed_up" | "active" | "reward_unlocked";
  date: string;
}

const mockInvites: Invite[] = [
  { id: "1", name: "Lena M.", status: "reward_unlocked", date: "12. Feb 2026" },
  { id: "2", name: "Tom K.", status: "active", date: "08. Feb 2026" },
  { id: "3", name: "Sarah R.", status: "signed_up", date: "05. Feb 2026" },
  { id: "4", name: "Chris B.", status: "reward_unlocked", date: "28. Jan 2026" },
  { id: "5", name: "Julia S.", status: "reward_unlocked", date: "20. Jan 2026" },
];

const REFERRAL_CODE = "VERAVOO-MIA2026";
const REFERRAL_LINK = "https://veravoo.com/join?ref=MIA2026";

const badges = [
  { count: 1, label: "First Invite", icon: UserPlus, unlocked: true },
  { count: 5, label: "Community Builder", icon: Users, unlocked: false },
  { count: 10, label: "Pynklyme Ambassador", icon: Trophy, unlocked: false },
];

const statusConfig = {
  signed_up: { label: "Registriert", color: "text-muted-foreground", bg: "bg-secondary" },
  active: { label: "Profil aktiv", color: "text-primary", bg: "bg-primary/10" },
  reward_unlocked: { label: "Reward aktiv", color: "text-accent", bg: "bg-accent/10" },
};

const InviteSection = () => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();

  const successfulInvites = mockInvites.filter((i) => i.status === "reward_unlocked").length;
  const totalInvites = mockInvites.length;
  const plusDaysEarned = successfulInvites * 30;

  const copyToClipboard = (text: string, type: "link" | "code") => {
    navigator.clipboard.writeText(text);
    if (type === "link") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
    toast({ title: "Kopiert!", description: "In die Zwischenablage kopiert." });
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero */}
      <div className="text-center space-y-2">
        <div className="h-14 w-14 rounded-2xl gradient-brand flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
          <Gift className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold">
          Invite & Earn
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Lade Freunde ein und erhalte{" "}
          <span className="font-semibold text-foreground">30 Tage Pynklyme Plus</span>{" "}
          – für euch beide.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: totalInvites, label: "Eingeladen", icon: Users },
          { value: successfulInvites, label: "Rewards", icon: Sparkles },
          { value: `${plusDaysEarned}d`, label: "Plus verdient", icon: Crown },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-3 text-center">
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="font-display text-xl font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Link */}
      <Card className="border-primary/20 overflow-hidden">
        <div className="gradient-brand-subtle p-5 space-y-4">
          <p className="font-display font-semibold text-sm">Dein persönlicher Link</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-card rounded-xl px-3 py-2.5 text-sm truncate border border-border font-mono">
              {REFERRAL_LINK}
            </div>
            <Button
              size="icon"
              className={`rounded-xl flex-shrink-0 ${copied ? "bg-primary/20 text-primary" : "gradient-brand text-primary-foreground"}`}
              onClick={() => copyToClipboard(REFERRAL_LINK, "link")}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1 bg-card rounded-xl px-3 py-2.5 text-sm border border-border text-center font-mono tracking-wider font-semibold">
              {REFERRAL_CODE}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl flex-shrink-0"
              onClick={() => copyToClipboard(REFERRAL_CODE, "code")}
            >
              {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2">
            {[
              { id: "whatsapp", label: "WhatsApp" },
              { id: "telegram", label: "Telegram" },
              { id: "twitter", label: "𝕏" },
            ].map((p) => (
              <Button
                key={p.id}
                variant="outline"
                size="sm"
                className="flex-1 rounded-xl text-xs"
                onClick={() => shareVia(p.id)}
              >
                <Share2 className="h-3 w-3 mr-1" />
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <CardContent className="p-5">
          <p className="font-display font-semibold text-sm mb-3">Deine Badges</p>
          <div className="flex gap-3">
            {badges.map((badge, i) => {
              const earned = totalInvites >= badge.count;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    earned
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-secondary/50 opacity-50"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      earned ? "gradient-brand" : "bg-secondary"
                    }`}
                  >
                    <badge.icon
                      className={`h-5 w-5 ${earned ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-center leading-tight">
                    {badge.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    {badge.count} Invite{badge.count > 1 ? "s" : ""}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invite List */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display font-semibold text-sm">Deine Einladungen</p>
            <span className="text-xs text-muted-foreground">{totalInvites} gesamt</span>
          </div>
          <div className="space-y-2">
            {mockInvites.map((invite) => {
              const status = statusConfig[invite.status];
              return (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{invite.name}</p>
                      <p className="text-[11px] text-muted-foreground">{invite.date}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CTA to full page */}
      <Link to="/invite">
        <Button
          variant="outline"
          className="w-full rounded-xl py-5 font-semibold"
        >
          Mehr erfahren & teilen
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </motion.div>
  );
};

export default InviteSection;
