import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VerificationBadge from "@/components/VerificationBadge";
import {
  ArrowLeft, Crown, Download, MapPin, MessageCircle,
  ShoppingBag, Truck, CreditCard, Flag, Shield, Clock, Eye,
  Heart, Share2, ChevronLeft, ChevronRight, Star, Lock, Sparkles,
} from "lucide-react";
import { mockListings, subcategories } from "@/data/marketplace";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = mockListings.find((l) => l.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-muted-foreground text-lg">Listing not found.</p>
          <Link to="/marketplace/browse" className="text-primary mt-4 inline-block">Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const subInfo = subcategories.find((s) => s.value === listing.subcategory);
  const otherListings = mockListings.filter((l) => l.creatorId === listing.creatorId && l.id !== listing.id && l.active).slice(0, 3);
  const relatedListings = mockListings.filter((l) => l.subcategory === listing.subcategory && l.id !== listing.id && l.active).slice(0, 4);
  const images = listing.images.length > 0 ? listing.images : [""]; // fallback

  // Fake social proof data
  const viewCount = 42 + listing.title.length * 3;
  const daysSinceCreated = Math.max(1, Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / 86400000));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 max-w-6xl mx-auto px-4 pb-32">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
          <span>/</span>
          <Link to="/marketplace/browse" className="hover:text-foreground transition-colors capitalize">{listing.category}</Link>
          <span>/</span>
          <span className="text-foreground">{listing.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Left: Image Gallery ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative bg-secondary group">
              {images[currentImage] ? (
                <img src={images[currentImage]} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/20" />
                </div>
              )}

              {/* Image overlays */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {listing.isPlus && (
                  <Badge className="bg-accent/90 text-accent-foreground border-0 gap-1 shadow-lg">
                    <Crown className="h-3 w-3" /> Plus
                  </Badge>
                )}
                <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-0 shadow-lg">
                  {subInfo?.emoji} {subInfo?.label}
                </Badge>
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => setLiked(!liked)}
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-lg">
                  <Heart className={`h-5 w-5 transition-colors ${liked ? "fill-destructive text-destructive" : "text-foreground"}`} />
                </button>
                <button className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-lg">
                  <Share2 className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Navigation arrows (if multiple images) */}
              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setCurrentImage((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Digital download badge */}
              {listing.digitalDownload && (
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground border-0 gap-1.5 shadow-lg">
                    <Download className="h-3.5 w-3.5" /> Instant Download
                  </Badge>
                </div>
              )}
            </div>

            {/* Social proof bar */}
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" /> {viewCount} views
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> Listed {daysSinceCreated}d ago
              </span>
              {listing.customRequests && (
                <Badge variant="outline" className="text-xs gap-1 rounded-full">
                  <Sparkles className="h-3 w-3" /> Custom available
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-display font-bold text-lg mb-3">About this item</h3>
              <p className="text-foreground leading-relaxed text-[15px]">{listing.description}</p>
            </div>

            {/* What's included */}
            <div className="mt-8 glass-card rounded-2xl p-6">
              <h3 className="font-display font-bold text-lg mb-4">What's included</h3>
              <div className="grid grid-cols-2 gap-3">
                {listing.digitalDownload && (
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4 text-primary flex-shrink-0" /> Digital files
                  </div>
                )}
                {listing.shippingAvailable && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary flex-shrink-0" /> Discreet shipping
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" /> Buyer protection
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4 text-primary flex-shrink-0" /> Secure payment
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-primary flex-shrink-0" /> Direct messaging
                </div>
                {listing.customRequests && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0" /> Custom requests
                  </div>
                )}
              </div>
            </div>

            {/* More from this creator */}
            {otherListings.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg">More from {listing.creatorName}</h3>
                  <Link to={`/profile/${listing.creatorId}`} className="text-sm text-primary hover:underline">View profile</Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {otherListings.map((item) => (
                    <Link key={item.id} to={`/marketplace/${item.id}`} className="group">
                      <div className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
                        <div className="aspect-square bg-secondary overflow-hidden">
                          {item.images[0] ? (
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="h-8 w-8 text-muted-foreground/20" /></div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-medium truncate">{item.title}</p>
                          <p className="text-sm font-display font-bold gradient-text">€{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Right: Purchase Panel (sticky) ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Main purchase card */}
              <div className="glass-card rounded-2xl p-6 border border-border">
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-2 leading-tight">{listing.title}</h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-4xl font-display font-extrabold gradient-text">€{listing.price.toFixed(2)}</span>
                  {listing.category === "digital" && (
                    <span className="text-sm text-muted-foreground">one-time</span>
                  )}
                </div>

                {/* Quick info pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {listing.digitalDownload && (
                    <div className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary rounded-full px-3 py-1.5 font-medium">
                      <Download className="h-3.5 w-3.5" /> Instant download
                    </div>
                  )}
                  {listing.shippingAvailable && (
                    <div className="flex items-center gap-1.5 text-xs bg-secondary text-foreground rounded-full px-3 py-1.5 font-medium">
                      <Truck className="h-3.5 w-3.5" /> Shipping available
                    </div>
                  )}
                  {listing.location && (
                    <div className="flex items-center gap-1.5 text-xs bg-secondary text-foreground rounded-full px-3 py-1.5 font-medium">
                      <MapPin className="h-3.5 w-3.5" /> {listing.location.split(",")[0]}
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-5">
                  <Button className="w-full gradient-brand text-primary-foreground rounded-full py-6 text-lg font-semibold shadow-xl shadow-primary/25 hover:opacity-90 gap-2">
                    <CreditCard className="h-5 w-5" /> Buy Now
                  </Button>
                  <Button variant="outline" className="w-full rounded-full py-5 text-base font-semibold border-2 gap-2">
                    <MessageCircle className="h-5 w-5" /> Message Seller
                  </Button>
                </div>

                {/* Urgency / Social proof */}
                <div className="bg-secondary/50 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span><strong className="text-foreground">{viewCount} people</strong> viewed this listing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>Listed <strong className="text-foreground">{daysSinceCreated} days</strong> ago</span>
                  </div>
                </div>
              </div>

              {/* Seller card */}
              <Link to={`/profile/${listing.creatorId}`}
                className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5 border border-border group">
                {listing.creatorPhoto && (
                  <img src={listing.creatorPhoto} alt={listing.creatorName} className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-base">{listing.creatorName}</span>
                    {listing.creatorVerified && <VerificationBadge level="verified" size="sm" />}
                    {listing.isPlus && <Crown className="h-4 w-4 text-accent" />}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">View profile & listings →</p>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-[10px] text-muted-foreground font-medium">Verified</span>
                </div>
              </Link>

              {/* Custom requests CTA */}
              {listing.customRequests && (
                <div className="glass-card rounded-2xl p-5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm mb-1">Want something custom?</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {listing.creatorName} accepts custom requests. Message them with your idea for a personalized offer.
                      </p>
                      <Button size="sm" variant="outline" className="rounded-full gap-1.5 text-xs">
                        <MessageCircle className="h-3.5 w-3.5" /> Request Custom Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust signals */}
              <div className="glass-card rounded-2xl p-5">
                <h4 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> Buyer Protection
                </h4>
                <ul className="space-y-2.5">
                  {[
                    "Secure payment via Pynklyme",
                    "Verified seller identity",
                    "Discreet billing & shipping",
                    "Dispute resolution support",
                  ].map((text) => (
                    <li key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Report */}
              <div className="text-center">
                <button className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 mx-auto">
                  <Flag className="h-3 w-3" /> Report this listing
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Related Listings ── */}
        {relatedListings.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-6">Similar items you might like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedListings.map((item) => (
                <Link key={item.id} to={`/marketplace/${item.id}`} className="group">
                  <div className={`glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 ${item.isPlus ? "border border-accent/20" : "border border-border"}`}>
                    <div className="aspect-square bg-secondary overflow-hidden relative">
                      {item.images[0] ? (
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="h-10 w-10 text-muted-foreground/20" /></div>
                      )}
                      {item.isPlus && (
                        <Badge className="absolute top-2 left-2 text-[10px] bg-accent/90 text-accent-foreground border-0 gap-0.5">
                          <Crown className="h-2.5 w-2.5" /> Plus
                        </Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{item.title}</p>
                      <p className="text-base font-display font-bold gradient-text">€{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {item.creatorPhoto && <img src={item.creatorPhoto} alt="" className="h-4 w-4 rounded-full object-cover" />}
                        <span className="text-[11px] text-muted-foreground">{item.creatorName}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-xl border-t border-border p-4 lg:hidden z-40">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{listing.title}</p>
            <p className="text-xl font-display font-extrabold gradient-text">€{listing.price.toFixed(2)}</p>
          </div>
          <Button className="gradient-brand text-primary-foreground rounded-full px-6 py-5 font-semibold shadow-xl shadow-primary/25 hover:opacity-90 gap-2">
            <CreditCard className="h-4 w-4" /> Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
