import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Star, Heart, Plane } from "lucide-react";
import type { Profile } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VerificationBadge from "@/components/VerificationBadge";
import type { VerificationLevel } from "@/components/VerificationBadge";

interface ProfileCardProps {
  profile: Profile;
  index: number;
  tourInfo?: { city: string; dateFrom: string; dateUntil: string } | null;
}

const ProfileCard = ({ profile, index, tourInfo }: ProfileCardProps) => {
  const fmt = (d: string) => new Date(d).toLocaleDateString("de-DE", { day: "numeric", month: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/profile/${profile.id}`} className="block">
        <div className={`bg-card rounded-2xl overflow-hidden group border transition-all duration-500 card-shine ${
          tourInfo ? "border-primary/20 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10" : "border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
        }`}>
          <div className={`relative overflow-hidden aspect-[3/4] ${tourInfo ? "opacity-60 grayscale-[30%]" : ""}`}>
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              {profile.online && !tourInfo && (
                <span className="flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </span>
              )}
              {tourInfo && (
                <Badge className="gradient-brand text-primary-foreground border-0 gap-1 text-[10px]">
                  <Plane className="h-3 w-3" />On Tour
                </Badge>
              )}
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={(e) => { e.preventDefault(); }}
                className="bg-background/90 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
              >
                <Heart className="h-4 w-4 text-muted-foreground hover:text-accent" />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-primary-foreground drop-shadow-md">
                  {profile.name}, {profile.age}
                </h3>
                {profile.verified && (
                  <VerificationBadge level="verified" size="sm" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-primary-foreground/80 drop-shadow">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </div>
            </div>
          </div>

          <div className="p-4">
            {tourInfo ? (
              <p className="text-sm font-medium text-primary line-clamp-1 mb-3 flex items-center gap-1.5">
                <Plane className="h-3.5 w-3.5 flex-shrink-0" />
                In {tourInfo.city} vom {fmt(tourInfo.dateFrom)}–{fmt(tourInfo.dateUntil)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                {profile.tagline}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="font-medium text-foreground">{profile.rating}</span>
                  <span className="text-muted-foreground">({profile.reviews})</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">from</span>
                <span className="ml-1 font-bold text-foreground">${profile.priceFrom}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfileCard;
