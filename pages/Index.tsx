import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProfileCard from "@/components/ProfileCard";
import { profiles } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap, ArrowRight, Star, Heart, CheckCircle } from "lucide-react";

const Index = () => {
  const featured = profiles.filter((p) => p.verified).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            How <span className="gradient-text">Pynklyme</span> Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">Simple, safe, and seamless.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Browse Profiles", desc: "Discover verified sexworkers near you. Filter by location, services, and availability.", step: "01" },
            { icon: Heart, title: "Connect", desc: "Send a message, book a date, or schedule a video call. It's that simple.", step: "02" },
            { icon: Star, title: "Enjoy & Review", desc: "Have an amazing experience. Leave a review and help the community grow.", step: "03" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all group"
            >
              <span className="absolute -top-4 -left-2 text-7xl font-display font-extrabold text-primary/10 group-hover:text-primary/20 transition-colors">{item.step}</span>
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-5">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="gradient-text">Sexworkers</span>
            </h2>
            <p className="text-muted-foreground text-lg">Verified profiles, real experiences.</p>
          </div>
          <Link to="/discover">
            <Button variant="ghost" className="hidden md:flex gap-2 text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((profile, i) => (
            <ProfileCard key={profile.id} profile={profile} index={i} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link to="/discover">
            <Button className="rounded-full gradient-brand text-primary-foreground px-8">
              View All Sexworkers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="bg-secondary/50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Your Safety, <span className="gradient-text">Our Priority</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every profile is verified. Every interaction is protected.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "ID Verification", desc: "Every sexworker goes through a thorough identity verification process." },
              { icon: CheckCircle, title: "Secure Messaging", desc: "End-to-end encrypted messaging keeps your conversations private." },
              { icon: Zap, title: "Instant Support", desc: "24/7 support team ready to help you with anything you need." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-brand-subtle flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join thousands of verified members. Create your profile in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-brand text-primary-foreground rounded-full px-10 py-6 text-lg font-semibold shadow-xl shadow-primary/25 hover:opacity-90">
                  Join Pynklyme
                </Button>
              </Link>
              <Link to="/sexworkers">
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg font-semibold border-2">
                  I'm a Sexworker
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-display text-xl font-bold gradient-text">Pynklyme</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Pynklyme. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
