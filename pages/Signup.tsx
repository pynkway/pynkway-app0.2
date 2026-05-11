import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Sparkles } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"client" | "sexworker">("client");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="font-display text-2xl font-bold gradient-text">Pynklyme</span>
          </Link>
          <h1 className="text-2xl font-display font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Join the community today</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          {/* Role Select */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole("client")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                role === "client" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <User className={`h-6 w-6 ${role === "client" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${role === "client" ? "text-foreground" : "text-muted-foreground"}`}>I'm a Client</span>
            </button>
            <button
              onClick={() => setRole("sexworker")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                role === "sexworker" ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
              }`}
            >
              <Sparkles className={`h-6 w-6 ${role === "sexworker" ? "text-accent" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${role === "sexworker" ? "text-foreground" : "text-muted-foreground"}`}>I'm a Sexworker</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your name" className="mt-1.5 rounded-xl h-12" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5 rounded-xl h-12" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="rounded-xl h-12 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full gradient-brand text-primary-foreground rounded-full h-12 font-semibold text-base shadow-lg shadow-primary/20 hover:opacity-90">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
