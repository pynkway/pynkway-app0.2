import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Shield, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/60" />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: "linear-gradient(135deg, hsl(330 100% 55% / 0.3) 0%, hsl(330 100% 55% / 0.3) 42%, hsl(85 90% 45% / 0.3) 58%, hsl(85 90% 45% / 0.3) 100%)",
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium text-sm">Verified & Trusted Community</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 leading-[1.05] text-foreground drop-shadow-lg"
        >
          Meet Real People.{" "}
          <span className="gradient-text">Real Connections.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Discover verified companions near you. Premium experiences, authentic connections — all in a safe, modern platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/discover">
            <Button
              size="lg"
              className="gradient-brand text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full hover:opacity-90 transition-opacity shadow-xl shadow-primary/25 w-full sm:w-auto"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Now
            </Button>
          </Link>
          <Link to="/sexworkers">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 py-6 text-lg rounded-full border-2 w-full sm:w-auto hover:bg-secondary"
            >
              Become a Sexworker
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8 text-foreground/70 text-sm drop-shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>2,400+ Online Now</span>
          </div>
          <div>10K+ Verified Profiles</div>
          <div className="hidden sm:block">100% Discreet</div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
