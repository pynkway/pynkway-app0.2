import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Bell, BellRing, Crown, Lock, MapPin, Plane, Radius,
  Settings, Sparkles, Navigation,
} from "lucide-react";
import { mockTours } from "@/data/tours";
import { profiles } from "@/data/listings";

const isPlus = false;

const NotificationSettings = () => {
  const [tourNotifications, setTourNotifications] = useState(false);
  const [radius, setRadius] = useState([50]);
  const [city, setCity] = useState("Berlin");
  const [emailNotify, setEmailNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(true);

  // Mock upcoming tours near the user
  const nearbyTours = mockTours
    .filter((t) => t.active && new Date(t.dateUntil) >= new Date())
    .map((t) => ({ ...t, creator: profiles.find((p) => p.id === t.creatorId) }))
    .filter((t) => t.creator);

  const fmt = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "short" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 max-w-2xl mx-auto px-4 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold">Notifications</h1>
          </div>
          <p className="text-muted-foreground">Manage your notification preferences and never miss a tour near you.</p>
        </motion.div>

        {/* Tour Notifications – Plus Feature */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className={`glass-card rounded-2xl p-6 border mb-6 ${isPlus ? "border-accent/20" : "border-border"}`}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-brand-subtle flex items-center justify-center">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg flex items-center gap-2">
                    Tour Alerts
                    <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] gap-1">
                      <Crown className="h-2.5 w-2.5" />Plus
                    </Badge>
                  </h2>
                  <p className="text-sm text-muted-foreground">Get notified when creators plan a tour near you.</p>
                </div>
              </div>
              <Switch
                checked={tourNotifications}
                onCheckedChange={(v) => {
                  if (!isPlus) return;
                  setTourNotifications(v);
                }}
                disabled={!isPlus}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {!isPlus && (
              <div className="rounded-xl bg-secondary/50 p-4 flex items-center gap-4 mb-5">
                <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Upgrade to Pynklyme Plus</p>
                  <p className="text-xs text-muted-foreground">Tour alerts are exclusive to Plus members. Get notified when your favorite creators visit your city.</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5 flex-shrink-0" asChild>
                  <a href="/pricing"><Crown className="h-3.5 w-3.5 text-accent" />Get Plus</a>
                </Button>
              </div>
            )}

            <div className={`space-y-5 ${!isPlus ? "opacity-40 pointer-events-none select-none" : ""}`}>
              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Your Location
                </label>
                <div className="flex gap-2">
                  <Input placeholder="e.g. Berlin" value={city}
                    onChange={(e) => setCity(e.target.value)} className="rounded-xl flex-1" />
                  <Button variant="outline" size="icon" className="rounded-xl flex-shrink-0" title="Use current location">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Radius */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Radius className="h-3 w-3" /> Notification Radius
                  </label>
                  <span className="text-sm font-display font-bold text-primary">{radius[0]} km</span>
                </div>
                <Slider value={radius} onValueChange={setRadius} min={10} max={200} step={10} className="w-full" />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>10 km</span>
                  <span>200 km</span>
                </div>
              </div>

              {/* Channels */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground">Notification Channels</label>
                <label className="flex items-center justify-between glass-card rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Email Notifications</span>
                  </div>
                  <Switch checked={emailNotify} onCheckedChange={setEmailNotify} className="data-[state=checked]:bg-primary" />
                </label>
                <label className="flex items-center justify-between glass-card rounded-xl p-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Push Notifications</span>
                  </div>
                  <Switch checked={pushNotify} onCheckedChange={setPushNotify} className="data-[state=checked]:bg-primary" />
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Tours Near You – Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass-card rounded-2xl p-6 border border-border">
            <h3 className="font-display font-bold text-base flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />Upcoming Tours Near You
            </h3>
            {nearbyTours.length > 0 ? (
              <div className="space-y-3">
                {nearbyTours.map((tour) => (
                  <div key={tour.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <img src={tour.creator!.photo} alt={tour.creator!.name}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{tour.creator!.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{tour.city} · {fmt(tour.dateFrom)}–{fmt(tour.dateUntil)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] flex-shrink-0">
                      <Plane className="h-2.5 w-2.5 mr-1" />On Tour
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No upcoming tours near your location.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationSettings;
