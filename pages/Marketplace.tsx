import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, ShoppingBag, Crown, MapPin, Download,
  Truck, Filter, SlidersHorizontal,
} from "lucide-react";
import VerificationBadge from "@/components/VerificationBadge";
import { mockListings, subcategories, type ListingCategory, type ListingSubcategory } from "@/data/marketplace";

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | ListingCategory>("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState<"all" | ListingSubcategory>("all");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [shippingFilter, setShippingFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const activeListings = mockListings.filter((l) => l.active);

  const filtered = useMemo(() => {
    let result = activeListings;
    if (category !== "all") result = result.filter((l) => l.category === category);
    if (subcategoryFilter !== "all") result = result.filter((l) => l.subcategory === subcategoryFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) => l.title.toLowerCase().includes(q) || l.creatorName.toLowerCase().includes(q) || l.description.toLowerCase().includes(q));
    }
    if (shippingFilter) result = result.filter((l) => l.shippingAvailable);
    switch (sortBy) {
      case "price-low": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-high": result = [...result].sort((a, b) => b.price - a.price); break;
      case "newest": result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return result;
  }, [category, subcategoryFilter, search, sortBy, shippingFilter]);

  const visibleSubs = category === "all" ? subcategories : subcategories.filter((s) => s.category === category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 max-w-6xl mx-auto px-4 pb-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl gradient-brand flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Discover exclusive digital content and unique items from your favorite creators.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search items or creators..." value={search}
                onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-full" />
            </div>
            <Button variant="outline" size="icon" className="rounded-full flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={category} onValueChange={(v) => { setCategory(v as "all" | ListingCategory); setSubcategoryFilter("all"); }}>
            <TabsList className="w-full justify-start rounded-full bg-secondary/50 p-1">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:gradient-brand data-[state=active]:text-primary-foreground text-sm">
                ✨ All
              </TabsTrigger>
              <TabsTrigger value="digital" className="rounded-full data-[state=active]:gradient-brand data-[state=active]:text-primary-foreground text-sm">
                💾 Digital
              </TabsTrigger>
              <TabsTrigger value="physical" className="rounded-full data-[state=active]:gradient-brand data-[state=active]:text-primary-foreground text-sm">
                📦 Physical
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Subcategory Chips */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSubcategoryFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                subcategoryFilter === "all"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              Alle
            </button>
            {visibleSubs.map((sub) => (
              <button
                key={sub.value}
                onClick={() => setSubcategoryFilter(sub.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  subcategoryFilter === sub.value
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {sub.emoji} {sub.label}
              </button>
            ))}
          </div>

          {/* Extra Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-4 flex flex-wrap gap-3 items-center">
              <div className="space-y-1 min-w-[140px]">
                <label className="text-xs font-medium text-muted-foreground">Sort by</label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                  <SelectTrigger className="rounded-xl text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="price-low">Price: Low → High</SelectItem>
                    <SelectItem value="price-high">Price: High → Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant={shippingFilter ? "default" : "outline"} size="sm" className="rounded-full gap-1.5 mt-auto"
                onClick={() => setShippingFilter(!shippingFilter)}>
                <Truck className="h-3.5 w-3.5" />Shipping only
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((listing, i) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}>
              <Link to={`/marketplace/${listing.id}`} className="group block">
                <div className={`glass-card rounded-2xl overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${listing.isPlus ? "border-accent/20" : "border-border"}`}>
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden bg-secondary">
                    {listing.images[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground/20" />
                      </div>
                    )}
                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge className="text-[10px] bg-background/80 backdrop-blur-sm text-foreground border-0">
                        {subcategories.find((s) => s.value === listing.subcategory)?.emoji} {subcategories.find((s) => s.value === listing.subcategory)?.label || listing.subcategory}
                      </Badge>
                      {listing.isPlus && (
                        <Badge className="text-[10px] bg-accent/90 text-accent-foreground border-0 gap-0.5">
                          <Crown className="h-2.5 w-2.5" />Plus
                        </Badge>
                      )}
                    </div>
                    {listing.digitalDownload && (
                      <div className="absolute top-3 right-3">
                        <div className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                          <Download className="h-3.5 w-3.5 text-foreground" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm mb-1 truncate group-hover:text-primary transition-colors">{listing.title}</h3>
                    <p className="text-lg font-display font-bold gradient-text">€{listing.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {listing.creatorPhoto && (
                          <img src={listing.creatorPhoto} alt={listing.creatorName} className="h-5 w-5 rounded-full object-cover" />
                        )}
                        <span className="text-xs text-muted-foreground truncate">{listing.creatorName}</span>
                        {listing.creatorVerified && <VerificationBadge level="verified" size="sm" />}
                      </div>
                      {listing.location && (
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5 ml-auto flex-shrink-0">
                          <MapPin className="h-3 w-3" />{listing.location.split(",")[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {listing.shippingAvailable && (
                        <Badge variant="outline" className="text-[9px] gap-0.5"><Truck className="h-2.5 w-2.5" />Shipping</Badge>
                      )}
                      {listing.customRequests && (
                        <Badge variant="outline" className="text-[9px]">Custom</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-lg">No items found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
