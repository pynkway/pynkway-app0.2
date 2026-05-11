import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag, Download, Package, ShieldCheck, BadgeCheck,
  Lock, MessageCircleHeart, Star, Crown, DollarSign, Eye,
  Users, Heart, Sparkles, ArrowRight,
} from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const MarketplaceLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={marketplaceHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-v-blue/25 via-v-purple/15 to-v-pink/25 mix-blend-multiply" />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Creator Marketplace</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-[1.05] text-foreground drop-shadow-lg">
            The Pynklyme{" "}
            <span className="gradient-text">Marketplace</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="text-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Exclusive content & unique items — directly from verified creators.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace/browse">
              <Button size="lg" className="rounded-full gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 px-8 text-base gap-2">
                Browse Marketplace <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base gap-2 border-foreground/20 bg-background/30 backdrop-blur-sm text-foreground hover:bg-background/50">
                <DollarSign className="h-4 w-4" /> Start Selling
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What is the Marketplace ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              What is the <span className="gradient-text">Pynklyme Marketplace</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              A protected space where verified sex workers sell digital content and physical items.
              From exclusive content to personal items — directly from creator to community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Download, title: "Digital Content", desc: "Private videos, photo sets, custom content & more — instant access after purchase.", color: "from-v-blue to-v-purple" },
              { icon: Package, title: "Physical Items", desc: "Worn clothing, personal articles & unique memorabilia — shipped discreetly.", color: "from-v-purple to-v-pink" },
              { icon: ShieldCheck, title: "Direct & Secure", desc: "Secure transactions within the platform. No external links, no risk.", color: "from-v-pink to-v-blue" },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 1}
                className="glass-card rounded-2xl p-8 text-center group hover:shadow-lg hover:shadow-primary/5 transition-all hover:-translate-y-1">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5`}>
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Safety & Discretion ── */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="gradient-text">Safety & Discretion</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Your privacy and security are our top priorities.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BadgeCheck, label: "Verified Sellers Only" },
              { icon: Lock, label: "Discreet Transactions" },
              { icon: MessageCircleHeart, label: "Protected Communication" },
              { icon: Star, label: "Transparent Reviews" },
            ].map((item, i) => (
              <motion.div key={item.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-display font-semibold text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Join ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="font-display text-3xl md:text-5xl font-bold text-center mb-16">
            Why <span className="gradient-text">Join</span>?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Creators */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl">For Creators</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Additional income stream beyond your services",
                  "Set your own prices — you're in control",
                  "Direct connection with your community",
                  "Plus members get higher visibility & priority placement",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-primary" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* For Clients */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl">For Clients</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Access exclusive, one-of-a-kind content",
                  "Unique physical products you won't find anywhere else",
                  "Direct connection to your favorite creators",
                  "Safe, secure platform you can trust",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-primary" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Membership ── */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
            className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Free vs. <span className="gradient-text">Plus</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Start free. Upgrade when you're ready to grow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="glass-card rounded-2xl p-8 border border-border">
              <h3 className="font-display font-bold text-xl mb-1">Free</h3>
              <p className="text-muted-foreground text-sm mb-6">Get started, no commitment.</p>
              <ul className="space-y-3">
                {["Up to 3 active listings", "Standard placement", "Secure transactions", "Community access"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Plus */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="glass-card rounded-2xl p-8 border-2 border-accent/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 gradient-brand px-4 py-1 rounded-bl-xl">
                <span className="text-primary-foreground text-xs font-bold flex items-center gap-1">
                  <Crown className="h-3 w-3" /> Plus
                </span>
              </div>
              <h3 className="font-display font-bold text-xl mb-1">Pynklyme Plus</h3>
              <p className="text-muted-foreground text-sm mb-6">Unlock your full potential.</p>
              <ul className="space-y-3">
                {[
                  "Unlimited listings",
                  "Priority placement & higher visibility",
                  "Visual Plus badge on all listings",
                  "Better ranking in search results",
                  "Everything in Free included",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <Crown className="h-4 w-4 text-accent flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <Link to="/pricing">
                <Button className="w-full mt-6 rounded-full gradient-brand text-primary-foreground hover:opacity-90">
                  Upgrade to Plus
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-4 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
          className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6">
            Ready to <span className="gradient-text">explore</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Discover exclusive content and unique items from verified creators — or start selling today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace/browse">
              <Button size="lg" className="rounded-full gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 px-8 text-base gap-2">
                Enter Marketplace <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base gap-2">
                <DollarSign className="h-4 w-4" /> Become a Seller
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MarketplaceLanding;
