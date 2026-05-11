import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Users, Zap, Heart, ArrowRight, CheckCircle, Star } from "lucide-react";

const Sexworkers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Heart className="h-4 w-4" /> For Independent Sexworkers
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 leading-tight">
              Your Platform.{" "}
              <span className="gradient-text">Your Rules.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Take control of your career. Build your brand, set your prices, and connect with verified clients — all on a platform designed for your safety and success.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gradient-brand text-primary-foreground rounded-full px-10 py-6 text-lg font-semibold shadow-xl shadow-primary/25 hover:opacity-90">
                Join as Sexworker <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            Why Sexworkers Love <span className="gradient-text">Pynklyme</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: "Set Your Own Prices", desc: "You're in control. Set your rates, choose your services, and keep the majority of your earnings." },
              { icon: Shield, title: "Verified Clients Only", desc: "All clients go through verification. Your safety is our number one priority." },
              { icon: Users, title: "Growing Community", desc: "Join thousands of sexworkers building successful careers on Pynklyme." },
              { icon: Zap, title: "Instant Payments", desc: "Get paid quickly and securely. No waiting, no hassle." },
              { icon: Star, title: "Build Your Reputation", desc: "Collect reviews, build trust, and grow your brand with every booking." },
              { icon: CheckCircle, title: "Full Control", desc: "Choose who you meet, when you're available, and how you present yourself." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-brand-subtle flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            What Sexworkers <span className="gradient-text">Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Sophia M.", quote: "Pynklyme gave me the independence I was looking for. I set my own schedule and the clients are respectful and verified." },
              { name: "Isabella R.", quote: "Finally a platform that treats us like professionals. The design, the safety features — everything feels premium." },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 text-primary fill-primary" />)}
                </div>
                <p className="text-foreground mb-6 italic leading-relaxed">"{t.quote}"</p>
                <p className="font-display font-bold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Start Your Journey <span className="gradient-text">Today</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">Create your free profile in under 5 minutes.</p>
          <Link to="/signup">
            <Button size="lg" className="gradient-brand text-primary-foreground rounded-full px-10 py-6 text-lg font-semibold shadow-xl shadow-primary/25 hover:opacity-90">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <p className="text-center text-sm text-muted-foreground">© 2026 Pynklyme. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Sexworkers;
