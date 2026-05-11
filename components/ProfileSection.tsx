import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  User, Camera, MapPin, Globe, Phone, Mail, Plus, X,
  BadgeCheck, Save, Sparkles, Clock, DollarSign,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import profile1 from "@/assets/profile-1.jpg";

const availableServices = [
  "Dinner Date", "Events", "Travel Companion", "Private Meeting",
  "Video Call", "Voice Chat", "Messaging", "Virtual Date",
  "Wellness Session", "Spa Day", "Wine Tasting", "Cocktail Evening",
  "City Tour", "Weekend Getaway", "Beach Day", "Photo Companion",
  "Girlfriend Experience", "Boyfriend Experience", "Overnight Stay",
  "Party Date", "BDSM", "Tantric Massage", "Escort",
];

const ProfileSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(profile1);
  const [name, setName] = useState("Sophia");
  const [age, setAge] = useState("26");
  const [bio, setBio] = useState(
    "Elegant, well-traveled, and great conversationalist. I love fine dining, art galleries, and making every moment unforgettable. Available for dinner dates, events, and exclusive companionship."
  );
  const [tagline, setTagline] = useState("Your perfect evening companion");
  const [location, setLocation] = useState("Manhattan, NY");
  const [phone, setPhone] = useState("+1 555 1234");
  const [email, setEmail] = useState("sophia@veravoo.com");
  const [website, setWebsite] = useState("");
  const [priceFrom, setPriceFrom] = useState("250");
  const [currency, setCurrency] = useState("EUR");
  const [availability, setAvailability] = useState("available");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Dinner Date", "Events", "Travel Companion", "Private Meeting",
  ]);
  const [serviceInput, setServiceInput] = useState("");
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const addCustomService = () => {
    if (serviceInput.trim() && !selectedServices.includes(serviceInput.trim())) {
      setSelectedServices((prev) => [...prev, serviceInput.trim()]);
      setServiceInput("");
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filteredAvailable = availableServices.filter(
    (s) => !selectedServices.includes(s) && s.toLowerCase().includes(serviceInput.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">My Profile</h1>
        </div>
        <p className="text-muted-foreground">Edit your public profile visible to clients.</p>
      </motion.div>

      {/* Profile Image */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 border border-border mb-6">
        <h3 className="font-display font-bold text-sm text-muted-foreground mb-4">Profile Photo</h3>
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-border">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Camera className="h-6 w-6 text-primary-foreground" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Upload a new photo</p>
            <p className="text-xs text-muted-foreground mb-3">JPG, PNG or WebP. Max 5 MB. Square format recommended.</p>
            <Button variant="outline" size="sm" className="rounded-full text-xs"
              onClick={() => fileInputRef.current?.click()}>
              <Camera className="h-3.5 w-3.5 mr-1.5" />Change Photo
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Basic Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="glass-card rounded-2xl p-6 border border-border mb-6 space-y-4">
        <h3 className="font-display font-bold text-sm text-muted-foreground">Basic Information</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Age</label>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="rounded-xl" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Tagline</label>
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Short catchy tagline..."
            className="rounded-xl" maxLength={80} />
          <p className="text-[10px] text-muted-foreground text-right">{tagline.length}/80</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Bio</label>
          <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell clients about yourself..."
            className="rounded-xl min-h-[100px]" maxLength={500} />
          <p className="text-[10px] text-muted-foreground text-right">{bio.length}/500</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Location
            </label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Availability
            </label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="on-tour">On Tour</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 border border-border mb-6 space-y-4">
        <h3 className="font-display font-bold text-sm text-muted-foreground">Contact & Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" /> Phone
            </label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Globe className="h-3 w-3" /> Website
          </label>
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." className="rounded-xl" />
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-6 border border-border mb-6 space-y-4">
        <h3 className="font-display font-bold text-sm text-muted-foreground flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" /> Pricing
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Starting Price</label>
            <Input type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Currency</label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">€ EUR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="GBP">£ GBP</SelectItem>
                <SelectItem value="CHF">CHF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">This is the starting price shown on your profile. You can set individual pricing per service later.</p>
      </motion.div>

      {/* Services */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 border border-border mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Services
          </h3>
          <span className="text-xs text-muted-foreground">{selectedServices.length} selected</span>
        </div>

        {/* Selected */}
        <div className="flex flex-wrap gap-2">
          {selectedServices.map((service) => (
            <Badge key={service} variant="secondary" className="rounded-full px-3 py-1.5 text-xs gap-1.5 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => toggleService(service)}>
              {service}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>

        {/* Add */}
        <div className="relative">
          <div className="flex gap-2">
            <Input value={serviceInput} onChange={(e) => { setServiceInput(e.target.value); setShowServicePicker(true); }}
              onFocus={() => setShowServicePicker(true)}
              placeholder="Search or add a service..." className="rounded-xl flex-1" />
            {serviceInput.trim() && !availableServices.includes(serviceInput.trim()) && (
              <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1" onClick={addCustomService}>
                <Plus className="h-3.5 w-3.5" />Add
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showServicePicker && serviceInput && filteredAvailable.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-1 glass-card rounded-xl border border-border shadow-lg z-10 max-h-40 overflow-auto">
                {filteredAvailable.slice(0, 8).map((service) => (
                  <button key={service} onClick={() => { toggleService(service); setServiceInput(""); setShowServicePicker(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-xl last:rounded-b-xl">
                    {service}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick picks */}
        {selectedServices.length < 3 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Popular services:</p>
            <div className="flex flex-wrap gap-1.5">
              {availableServices.filter((s) => !selectedServices.includes(s)).slice(0, 6).map((s) => (
                <button key={s} onClick={() => toggleService(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Save */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Button onClick={handleSave} className="w-full rounded-xl gradient-brand text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 gap-2 py-6 text-base font-semibold">
          {saved ? (
            <><BadgeCheck className="h-5 w-5" />Saved!</>
          ) : (
            <><Save className="h-5 w-5" />Save Profile</>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">Changes will be visible on your public profile immediately.</p>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
