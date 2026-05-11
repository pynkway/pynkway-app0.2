import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, MessageCircle, LayoutDashboard, ShoppingBag, Bell } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/discover", label: "Discover", icon: Search },
    { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { to: "/sexworkers", label: "For Sexworkers", icon: User },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/client-dashboard", label: "Client Dashboard", icon: User },
    { to: "/pricing", label: "Pricing", icon: null },
    { to: "/blog", label: "Blog", icon: null },
    { to: "/contact", label: "Contact", icon: null },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">P</span>
          </div>
          <span className="font-display text-xl font-bold gradient-text">Pynklyme</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="rounded-full">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="rounded-full gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
              Sign up
            </Button>
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 py-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full rounded-full">Log in</Button>
            </Link>
            <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full rounded-full gradient-brand text-primary-foreground">Sign up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
