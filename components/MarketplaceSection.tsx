import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ShoppingBag, Plus, Pencil, Trash2, Crown, Lock, X,
  Image as ImageIcon, Package, Download, MessageSquare,
  Truck, MapPin,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  type MarketplaceListing, type ListingCategory, type ListingSubcategory,
  subcategories, mockListings,
} from "@/data/marketplace";

type FormData = Omit<MarketplaceListing, "id" | "creatorId" | "creatorName" | "creatorPhoto" | "creatorVerified" | "isPlus" | "createdAt">;

const emptyForm: FormData = {
  title: "", description: "", price: 0, category: "digital",
  subcategory: "photos", images: [], shippingAvailable: false,
  location: "", digitalDownload: true, customRequests: false, active: true,
};

const isPlus = false;
const MAX_FREE = 3;

const MarketplaceSection = () => {
  const myListings = mockListings.filter((l) => l.creatorId === "1");
  const [listings, setListings] = useState<MarketplaceListing[]>(myListings);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);

  const canAdd = isPlus || listings.length < MAX_FREE;

  const openNew = () => { setEditingId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (l: MarketplaceListing) => {
    setEditingId(l.id);
    const { id, creatorId, creatorName, creatorPhoto, creatorVerified, isPlus: _p, createdAt, ...rest } = l;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.price) return;
    if (editingId) {
      setListings((prev) => prev.map((l) => (l.id === editingId ? { ...l, ...form } : l)));
    } else {
      setListings((prev) => [...prev, {
        ...form, id: crypto.randomUUID(),
        creatorId: "1", creatorName: "Sophia", creatorPhoto: "",
        creatorVerified: true, isPlus: false, createdAt: new Date().toISOString().split("T")[0],
      }]);
    }
    setShowForm(false); setEditingId(null);
  };

  const handleDelete = (id: string) => setListings((prev) => prev.filter((l) => l.id !== id));
  const toggleActive = (id: string) => setListings((prev) => prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l)));

  const filteredSubs = subcategories.filter((s) => s.category === form.category);

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">My Listings</h1>
        </div>
        <p className="text-muted-foreground">Sell digital content and physical items to your fans.</p>
      </motion.div>

      {/* Limits */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isPlus ? <Crown className="h-5 w-5 text-accent" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
          <div>
            <p className="text-sm font-medium">{listings.length}{!isPlus && ` / ${MAX_FREE}`} listing{listings.length !== 1 ? "s" : ""}</p>
            {!isPlus && <p className="text-xs text-muted-foreground">Upgrade to Plus for unlimited listings & higher visibility</p>}
            {isPlus && <p className="text-xs text-accent font-medium">Unlimited listings · Priority visibility</p>}
          </div>
        </div>
        {!isPlus && (
          <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5" asChild>
            <a href="/pricing"><Crown className="h-3.5 w-3.5 text-accent" />Get Plus</a>
          </Button>
        )}
      </motion.div>

      {/* Add Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
        <Button onClick={openNew} disabled={!canAdd && !showForm}
          className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 gap-2">
          <Plus className="h-4 w-4" />New Listing
        </Button>
        {!canAdd && !isPlus && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            You've reached the free listing limit.{" "}
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
                <h3 className="font-display font-bold text-lg">{editingId ? "Edit Listing" : "New Listing"}</h3>
                <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" /></button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Title</label>
                <Input placeholder="e.g. Exclusive Photo Set" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Price (€)</label>
                  <Input type="number" min={0} step={0.01} value={form.price || ""}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</label>
                  <Input placeholder="e.g. Berlin" value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Package className="h-3 w-3" /> Category</label>
                  <Select value={form.category} onValueChange={(v: ListingCategory) => setForm({ ...form, category: v, subcategory: subcategories.find((s) => s.category === v)?.value || "photos" })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="physical">Physical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Subcategory</label>
                  <Select value={form.subcategory} onValueChange={(v: ListingSubcategory) => setForm({ ...form, subcategory: v })}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {filteredSubs.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <Textarea placeholder="Describe your item..." value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl min-h-[80px]" />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {form.category === "physical" && (
                  <label className="flex items-center gap-3 glass-card rounded-xl p-3 cursor-pointer">
                    <Switch checked={form.shippingAvailable} onCheckedChange={(v) => setForm({ ...form, shippingAvailable: v })} />
                    <div>
                      <p className="text-sm font-medium flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Shipping</p>
                    </div>
                  </label>
                )}
                {form.category === "digital" && (
                  <label className="flex items-center gap-3 glass-card rounded-xl p-3 cursor-pointer">
                    <Switch checked={form.digitalDownload} onCheckedChange={(v) => setForm({ ...form, digitalDownload: v })} />
                    <div>
                      <p className="text-sm font-medium flex items-center gap-1"><Download className="h-3.5 w-3.5" /> Download</p>
                    </div>
                  </label>
                )}
                <label className="flex items-center gap-3 glass-card rounded-xl p-3 cursor-pointer">
                  <Switch checked={form.customRequests} onCheckedChange={(v) => setForm({ ...form, customRequests: v })} />
                  <div>
                    <p className="text-sm font-medium flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> Custom Requests</p>
                  </div>
                </label>
              </div>

              <div className="glass-card rounded-xl p-4 border-dashed border-2 border-border text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Image upload coming with Lovable Cloud</p>
              </div>

              <Button onClick={handleSave} className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                {editingId ? "Save Changes" : "Create Listing"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listing Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {listings.map((listing, i) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-2xl p-5 border transition-all ${listing.active ? "border-primary/20" : "border-border opacity-60"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display font-bold text-lg truncate">{listing.title}</h3>
                    <Badge variant={listing.active ? "default" : "secondary"} className="text-[10px] px-2 py-0">
                      {listing.active ? "Active" : "Inactive"}
                    </Badge>
                    {listing.isPlus && (
                      <Badge className="text-[10px] px-2 py-0 bg-accent/10 text-accent border-accent/20">
                        <Crown className="h-2.5 w-2.5 mr-1" />Plus
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-display font-bold gradient-text mb-1">€{listing.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                    <Badge variant="outline" className="text-[10px] capitalize">{listing.category}</Badge>
                    <Badge variant="outline" className="text-[10px] capitalize">{listing.subcategory}</Badge>
                    {listing.shippingAvailable && <span className="flex items-center gap-1 text-xs"><Truck className="h-3 w-3" />Shipping</span>}
                    {listing.digitalDownload && <span className="flex items-center gap-1 text-xs"><Download className="h-3 w-3" />Download</span>}
                    {listing.location && <span className="flex items-center gap-1 text-xs"><MapPin className="h-3 w-3" />{listing.location}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch checked={listing.active} onCheckedChange={() => toggleActive(listing.id)} className="data-[state=checked]:bg-primary" />
                  <button onClick={() => openEdit(listing)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(listing.id)} className="p-2 rounded-full hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {listings.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No listings yet. Create your first item above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceSection;
