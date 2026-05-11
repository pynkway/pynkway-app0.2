import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Calendar, Plus, Pencil, Trash2, Crown, Eye,
  ArrowUpDown, X, Globe, Lock, Building2,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { type Tour, mockTours as sharedMockTours } from "@/data/tours";

const emptyTour: Omit<Tour, "id"> = {
  creatorId: "1",
  city: "", country: "", dateFrom: "", dateUntil: "",
  locationVisibility: "city", locationType: "hotel", serviceType: "both", active: true,
};

const isPlus = false;
const MAX_TOURS_FREE = 1;
const MAX_TOURS_PLUS = 20;

const TourPlannerSection = () => {
  const [tours, setTours] = useState<Tour[]>(sharedMockTours.filter((t) => t.creatorId === "1"));
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Tour, "id">>(emptyTour);

  const maxTours = isPlus ? MAX_TOURS_PLUS : MAX_TOURS_FREE;
  const activeTours = tours.filter((t) => t.active).length;
  const canAddTour = isPlus || activeTours < MAX_TOURS_FREE;

  const openNew = () => { setEditingId(null); setForm(emptyTour); setShowForm(true); };
  const openEdit = (tour: Tour) => { setEditingId(tour.id); const { id, ...rest } = tour; setForm(rest); setShowForm(true); };

  const handleSave = () => {
    if (!form.city || !form.dateFrom || !form.dateUntil) return;
    if (editingId) {
      setTours((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...form } : t)));
    } else {
      setTours((prev) => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setShowForm(false); setEditingId(null);
  };

  const handleDelete = (id: string) => setTours((prev) => prev.filter((t) => t.id !== id));
  const toggleActive = (id: string) => setTours((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));

  const formatDate = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "short" });

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">Tour Planner</h1>
        </div>
        <p className="text-muted-foreground">Plan your trips so clients know when you're in their city.</p>
      </motion.div>

      {/* Limits */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isPlus ? <Crown className="h-5 w-5 text-accent" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
          <div>
            <p className="text-sm font-medium">{activeTours} / {maxTours} active {maxTours === 1 ? "tour" : "tours"}</p>
            {!isPlus && <p className="text-xs text-muted-foreground">Upgrade to Plus for up to {MAX_TOURS_PLUS} tours</p>}
          </div>
        </div>
        {!isPlus && (
          <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5" asChild>
            <a href="/pricing"><Crown className="h-3.5 w-3.5 text-accent" />Get Plus</a>
          </Button>
        )}
      </motion.div>

      {/* Add */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <Button onClick={openNew} disabled={!canAddTour && !showForm} className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 gap-2">
          <Plus className="h-4 w-4" />Add Tour
        </Button>
        {!canAddTour && !isPlus && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            You've reached your free tour limit.{" "}
            <a href="/pricing" className="text-primary hover:underline font-medium">Upgrade to Plus</a>
          </p>
        )}
      </motion.div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
            <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg">{editingId ? "Edit Tour" : "New Tour"}</h3>
                <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">City</label>
                  <Input placeholder="e.g. Berlin" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Country</label>
                  <Input placeholder="e.g. Germany" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">From</label>
                  <Input type="date" value={form.dateFrom} onChange={(e) => setForm({ ...form, dateFrom: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Until</label>
                  <Input type="date" value={form.dateUntil} onChange={(e) => setForm({ ...form, dateUntil: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" /> Visibility</label>
                  <Select value={form.locationVisibility} onValueChange={(v) => setForm({ ...form, locationVisibility: v as Tour["locationVisibility"] })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">City only</SelectItem>
                      <SelectItem value="zip">ZIP / Postal code</SelectItem>
                      <SelectItem value="exact">Exact address</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Building2 className="h-3 w-3" /> Location type</label>
                  <Select value={form.locationType} onValueChange={(v) => setForm({ ...form, locationType: v as Tour["locationType"] })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="brothel">Brothel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><ArrowUpDown className="h-3 w-3" /> Service type</label>
                  <Select value={form.serviceType} onValueChange={(v) => setForm({ ...form, serviceType: v as Tour["serviceType"] })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Inbound</SelectItem>
                      <SelectItem value="outbound">Outbound</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave} className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                {editingId ? "Save Changes" : "Create Tour"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {tours.map((tour, i) => (
            <motion.div key={tour.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-2xl p-5 border transition-all ${tour.active ? "border-primary/20" : "border-border opacity-60"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg truncate">{tour.city}</h3>
                    <Badge variant={tour.active ? "default" : "secondary"} className="text-[10px] px-2 py-0">{tour.active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{tour.country}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(tour.dateFrom)} – {formatDate(tour.dateUntil)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-[10px] capitalize">{tour.locationType}</Badge>
                    <Badge variant="outline" className="text-[10px] capitalize">{tour.serviceType}</Badge>
                    <Badge variant="outline" className="text-[10px] capitalize">{tour.locationVisibility === "city" ? "City only" : tour.locationVisibility === "zip" ? "ZIP" : "Exact"}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch checked={tour.active} onCheckedChange={() => toggleActive(tour.id)} className="data-[state=checked]:bg-primary" />
                  <button onClick={() => openEdit(tour)} className="p-2 rounded-full hover:bg-secondary transition-colors"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                  <button onClick={() => handleDelete(tour.id)} className="p-2 rounded-full hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4 text-destructive" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tours.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No tours yet. Add your first tour above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPlannerSection;
