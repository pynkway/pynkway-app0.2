import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { profiles } from "@/data/listings";
import { mockListings, subcategories } from "@/data/marketplace";
import { mockTours } from "@/data/tours";
import { mockGallery } from "@/data/gallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VerificationBadge from "@/components/VerificationBadge";
import { MapPin, Star, Heart, MessageCircle, Calendar, ArrowLeft, Share2, ShoppingBag, Crown, Download, Plane, Globe, Image as ImageIcon } from "lucide-react";

const ProfileDetail = () => {
  const { id } = useParams();
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-muted-foreground text-lg">Profile not found.</p>
          <Link to="/discover" className="text-primary mt-4 inline-block">Back to Discover</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 max-w-5xl mx-auto px-4 pb-20">
        {/* Back */}
        <Link to="/discover" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Photo */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] sticky top-24">
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-3">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-display font-bold">{profile.name}, {profile.age}</h1>
                  {profile.verified && <VerificationBadge level="verified" size="md" />}
                  {mockTours.some((t) => t.creatorId === profile.id && t.active && new Date(t.dateUntil) >= new Date()) && (
                    <Badge className="gradient-brand text-primary-foreground border-0 gap-1 text-xs">
                      <Plane className="h-3 w-3" />On Tour
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{profile.location}</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 text-primary fill-primary" />{profile.rating} ({profile.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>

            {profile.online && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-600 font-medium">Online now</span>
              </div>
            )}

            <p className="text-foreground leading-relaxed mb-8 text-lg">{profile.description}</p>

            {/* Gallery Preview */}
            {(() => {
              const galleryImages = mockGallery.filter((g) => g.creatorId === profile.id && g.isPublic).sort((a, b) => a.order - b.order);
              if (galleryImages.length === 0) return null;
              return (
                <div className="mb-8">
                  <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />Gallery
                  </h3>
                  <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                    {galleryImages.slice(0, 6).map((img, i) => (
                      <div key={img.id} className="aspect-square relative group overflow-hidden">
                        <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        {img.caption && (
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <p className="text-[11px] text-primary-foreground truncate">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Services */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-lg mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full px-4 py-1.5 text-sm">{s}</Badge>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-display font-bold gradient-text">${profile.priceFrom}</span>
                <span className="text-muted-foreground">starting price</span>
              </div>
              <p className="text-sm text-muted-foreground">Pricing varies by service and duration. Contact for custom quotes.</p>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Button className="flex-1 gradient-brand text-primary-foreground rounded-full py-6 text-lg font-semibold shadow-xl shadow-primary/25 hover:opacity-90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Message
              </Button>
              <Link to="/dashboard?section=dateplanner" className="flex-1">
                <Button variant="outline" className="w-full rounded-full py-6 text-lg font-semibold border-2">
                  <Calendar className="mr-2 h-5 w-5" />
                  Date planen
                </Button>
              </Link>
            </div>

            {/* Tour Dates */}
            {(() => {
              const creatorTours = mockTours.filter((t) => t.creatorId === profile.id && t.active && new Date(t.dateUntil) >= new Date());
              if (creatorTours.length === 0) return null;
              const fmt = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "short" });
              return (
                <div className="mt-8">
                  <h3 className="font-display font-bold text-base flex items-center gap-2 mb-3">
                    <Plane className="h-4 w-4 text-primary" />Tour Dates
                  </h3>
                  <div className="space-y-2">
                    {creatorTours.map((tour) => (
                      <div key={tour.id} className="glass-card rounded-xl p-3 flex items-center gap-3 border border-primary/10">
                        <div className="h-9 w-9 rounded-lg gradient-brand-subtle flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{tour.city}, {tour.country}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />{fmt(tour.dateFrom)} – {fmt(tour.dateUntil)}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize flex-shrink-0">{tour.serviceType}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Shop Preview */}
            {(() => {
              const creatorListings = mockListings.filter((l) => l.creatorId === profile.id && l.active);
              if (creatorListings.length === 0) return null;
              return (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-base flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-primary" />Shop
                    </h3>
                    <Link to="/marketplace" className="text-xs text-primary hover:underline font-medium">
                      View all →
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {creatorListings.slice(0, 4).map((listing) => (
                      <Link key={listing.id} to={`/marketplace/${listing.id}`} className="group">
                        <div className="glass-card rounded-lg overflow-hidden border border-border transition-all hover:shadow-md hover:-translate-y-0.5">
                          <div className="aspect-square relative overflow-hidden bg-secondary">
                            {listing.images[0] ? (
                              <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-muted-foreground/20" />
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <h4 className="font-medium text-[11px] truncate group-hover:text-primary transition-colors">{listing.title}</h4>
                            <p className="text-xs font-display font-bold gradient-text">€{listing.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Reviews placeholder */}
            <div className="mt-12">
              <h3 className="font-display font-bold text-lg mb-4">Reviews</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="bg-card rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-medium text-sm">A</div>
                      <span className="font-medium text-sm">Anonymous</span>
                      <div className="flex gap-0.5 ml-auto">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Amazing experience. Very professional, punctual, and a great companion. Highly recommended!</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
