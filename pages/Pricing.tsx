import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Eye, Shield, Zap, Crown, MessageCircle, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const creatorFeatures = [
  { icon: Eye, text: "Priority placement in search & discovery" },
  { icon: Star, text: "Verified badge on your profile" },
  { icon: Zap, text: "Unlimited photo & video uploads" },
  { icon: Shield, text: "Advanced privacy & blocking tools" },
  { icon: MessageCircle, text: "Priority inbox & read receipts" },
  { icon: Sparkles, text: "Profile analytics & visitor insights" },
  { icon: Heart, text: "Featured in 'Top Picks' weekly" },
  { icon: Crown, text: "Early access to new features" },
];

const clientFeatures = [
  { icon: Eye, text: "See who viewed your profile" },
  { icon: Star, text: "Unlimited likes & saves" },
  { icon: Zap, text: "Advanced search filters & preferences" },
  { icon: Shield, text: "Verified client badge for trust" },
  { icon: MessageCircle, text: "Unlimited messaging with no limits" },
  { icon: Sparkles, text: "Priority support & faster responses" },
  { icon: Heart, text: "Access exclusive profiles" },
  { icon: Crown, text: "Ad-free browsing experience" },
];

const Pricing = () => {
  const [isCreator, setIsCreator] = useState(true);
  const features = isCreator ? creatorFeatures : clientFeatures;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase gradient-brand text-primary-foreground mb-6">
              Membership
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Unlock <span className="gradient-text">Pynklyme Plus</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Stand out, connect faster, and get the most out of Pynklyme with our premium membership.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center gap-4 mt-10 mb-12"
          >
            <span
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                isCreator ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setIsCreator(true)}
            >
              For Sexworkers
            </span>
            <Switch
              checked={!isCreator}
              onCheckedChange={(checked) => setIsCreator(!checked)}
              className="data-[state=checked]:bg-v-pink data-[state=unchecked]:bg-v-blue"
            />
            <span
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                !isCreator ? "text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setIsCreator(false)}
            >
              For Clients
            </span>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            key={isCreator ? "creator" : "client"}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative max-w-md mx-auto"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-2xl gradient-brand opacity-20 blur-xl pointer-events-none" />

            <div className="relative glass-card rounded-2xl p-8 md:p-10 border border-border card-shine">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Crown className="h-6 w-6 text-v-pink" />
                <h2 className="font-display text-2xl font-bold">Pynklyme Plus</h2>
              </div>

              <div className="mb-8">
                <span className="font-display text-5xl font-extrabold gradient-text">€49.99</span>
                <span className="text-muted-foreground text-sm ml-1">/month</span>
              </div>

              <ul className="space-y-4 text-left mb-10">
                {features.map((feature, i) => (
                  <motion.li
                    key={feature.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full gradient-brand flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </motion.li>
                ))}
              </ul>

              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full rounded-full gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 text-base font-semibold"
                >
                  Get Pynklyme Plus
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4">
                Cancel anytime. No hidden fees.
              </p>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            Not ready yet?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Start free
            </Link>{" "}
            and upgrade whenever you want.
          </motion.p>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
