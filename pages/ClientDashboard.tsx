import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ClientVerificationSection from "@/components/ClientVerificationSection";
import {
  BadgeCheck, User, Heart, Calendar, MessageCircle, Settings, Menu, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems: { id: string; label: string; icon: typeof BadgeCheck }[] = [
  { id: "verification", label: "Verification", icon: BadgeCheck },
  { id: "profile", label: "My Profile", icon: User },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "dates", label: "My Dates", icon: Calendar },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

const ClientDashboard = () => {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || "verification";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) setActiveSection(section);
  }, [searchParams]);

  const renderContent = () => {
    switch (activeSection) {
      case "verification":
        return <ClientVerificationSection />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-2xl gradient-brand-subtle flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground max-w-sm">
              This feature is currently in development. Stay tuned for updates!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16 flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-16"
          }`}
        >
          <div className="p-3 flex items-center justify-between border-b border-border">
            {sidebarOpen && (
              <span className="font-display font-bold text-sm gradient-text truncate">
                Client Dashboard
              </span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed bottom-4 left-4 z-40">
          <Button
            size="icon"
            className="rounded-full gradient-brand text-primary-foreground shadow-lg shadow-primary/25 h-12 w-12"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="relative w-64 h-full bg-card border-r border-border flex flex-col"
            >
              <div className="p-4 border-b border-border">
                <span className="font-display font-bold gradient-text">Client Dashboard</span>
              </div>
              <nav className="flex-1 p-3 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
