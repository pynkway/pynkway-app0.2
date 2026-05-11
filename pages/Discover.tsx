import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import CategoryFilter from "@/components/CategoryFilter";
import { profiles, type ServiceCategory } from "@/data/listings";
import { mockTours } from "@/data/tours";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const searchLower = searchQuery.toLowerCase();

  // Profiles that match by their home location
  const homeFiltered = profiles.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchLower) ||
      p.location.toLowerCase().includes(searchLower) ||
      p.tagline.toLowerCase().includes(searchLower);
    const matchesVerified = !verifiedOnly || p.verified;
    return matchesCat && matchesSearch && matchesVerified;
  });

  // Profiles on tour in the searched city (not already in home results)
  const touringProfiles = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const homeIds = new Set(homeFiltered.map((p) => p.id));
    const now = new Date();
    const activeTours = mockTours.filter(
      (t) => t.active && new Date(t.dateUntil) >= now && t.city.toLowerCase().includes(searchLower)
    );
    const result: { profile: typeof profiles[0]; tour: typeof activeTours[0] }[] = [];
    for (const tour of activeTours) {
      const profile = profiles.find((p) => p.id === tour.creatorId);
      if (profile && !homeIds.has(profile.id)) {
        const matchesCat = selectedCategory === "all" || profile.category === selectedCategory;
        if (matchesCat) result.push({ profile, tour });
      }
    }
    return result;
  }, [searchQuery, selectedCategory, homeFiltered]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-8 max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
            Discover <span className="gradient-text">Sexworkers</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Find verified companions near you.</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full h-12 bg-card border-border"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full h-12 px-5"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Verified Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Switch
            id="verified-filter"
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
          <Label htmlFor="verified-filter" className="flex items-center gap-1.5 text-sm cursor-pointer">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Verified only
          </Label>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {homeFiltered.map((profile, i) => (
              <ProfileCard key={profile.id} profile={profile} index={i} />
            ))}
            {touringProfiles.map(({ profile, tour }, i) => (
              <ProfileCard
                key={`tour-${profile.id}`}
                profile={profile}
                index={homeFiltered.length + i}
                tourInfo={{ city: tour.city, dateFrom: tour.dateFrom, dateUntil: tour.dateUntil }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {homeFiltered.length === 0 && touringProfiles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No sexworkers found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
