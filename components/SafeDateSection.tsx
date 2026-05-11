import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Clock, MapPin, Phone, Mail, Plus, Minus,
  Heart, AlertTriangle, CheckCircle, Timer, User,
  Send, Settings2, ChevronDown, ChevronUp, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

// ── Types ──────────────────────────────────────────
interface SafeDateSession {
  startTime: Date;
  durationMinutes: number;
  location?: string;
  contactName: string;
  contactMethod: "phone" | "email";
  contactValue: string;
  shareLocation: boolean;
  autoExtend: boolean;
  notifyPush: boolean;
  notifySms: boolean;
}

interface SafetySettings {
  defaultContactName: string;
  defaultContactMethod: "phone" | "email";
  defaultContactValue: string;
  defaultDuration: number;
  shareLocationDefault: boolean;
  safePhrase: string;
}

// ── Sub-views ──────────────────────────────────────
type View = "idle" | "setup" | "active" | "checkin" | "settings";

const DURATION_OPTIONS = [15, 30, 45, 60, 90, 120, 180];

const SafeDateSection = () => {
  const [view, setView] = useState<View>("idle");
  const [session, setSession] = useState<SafeDateSession | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);
  const [showSafeConfirm, setShowSafeConfirm] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Setup form state
  const [duration, setDuration] = useState(60);
  const [location, setLocation] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [contactValue, setContactValue] = useState("");
  const [shareLocation, setShareLocation] = useState(false);
  const [autoExtend, setAutoExtend] = useState(false);
  const [notifyPush, setNotifyPush] = useState(true);
  const [notifySms, setNotifySms] = useState(false);

  // Safety settings
  const [settings, setSettings] = useState<SafetySettings>({
    defaultContactName: "",
    defaultContactMethod: "phone",
    defaultContactValue: "",
    defaultDuration: 60,
    shareLocationDefault: false,
    safePhrase: "",
  });

  // ── Timer logic ──────────────────────────────────
  useEffect(() => {
    if (view !== "active" || !session) return;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - session.startTime.getTime()) / 1000);
      const total = session.durationMinutes * 60;
      const remaining = total - elapsed;
      if (remaining <= 0) {
        setSecondsLeft(0);
        setView("checkin");
      } else {
        setSecondsLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [view, session]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const progressPercent = session
    ? Math.max(0, (secondsLeft / (session.durationMinutes * 60)) * 100)
    : 0;

  // ── Actions ──────────────────────────────────────
  const startSession = () => {
    if (!contactName || !contactValue) return;
    const newSession: SafeDateSession = {
      startTime: new Date(),
      durationMinutes: duration,
      location: location || undefined,
      contactName,
      contactMethod,
      contactValue,
      shareLocation,
      autoExtend,
      notifyPush,
      notifySms,
    };
    setSession(newSession);
    setSecondsLeft(duration * 60);
    setView("active");
  };

  const extendTime = (minutes: number) => {
    if (!session) return;
    const newSession = {
      ...session,
      durationMinutes: session.durationMinutes + minutes,
    };
    setSession(newSession);
    setSecondsLeft((prev) => prev + minutes * 60);
    if (view === "checkin") setView("active");
  };

  const confirmSafe = () => {
    setShowSafeConfirm(true);
  };

  const endSession = () => {
    setSession(null);
    setView("idle");
    setShowSafeConfirm(false);
  };

  const triggerEmergency = () => {
    setShowEmergencyConfirm(false);
    // In production: send emergency notification
    endSession();
  };

  const loadDefaults = () => {
    if (settings.defaultContactName) setContactName(settings.defaultContactName);
    if (settings.defaultContactValue) {
      setContactValue(settings.defaultContactValue);
      setContactMethod(settings.defaultContactMethod);
    }
    if (settings.defaultDuration) setDuration(settings.defaultDuration);
    setShareLocation(settings.shareLocationDefault);
  };

  const openSetup = () => {
    loadDefaults();
    setView("setup");
  };

  // ── Idle View ────────────────────────────────────
  if (view === "idle") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Safe Date
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Dein persönliches Sicherheitsnetz – kostenlos für alle.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setView("settings")}
            className="text-muted-foreground"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/20 overflow-hidden">
            <div className="gradient-brand-subtle p-6 sm:p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Du bist nicht allein
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 max-w-sm">
                    Starte einen Timer vor deinem Treffen. Wenn du dich nicht zurückmeldest,
                    benachrichtigen wir deine Vertrauensperson. Einfach, diskret, sicher.
                  </p>
                </div>
                <Button
                  className="gradient-brand text-primary-foreground px-8 py-3 rounded-xl text-base font-semibold shadow-lg shadow-primary/25"
                  onClick={openSetup}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Safe Date starten
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Timer, title: "Timer starten", desc: "Lege eine Dauer fest" },
            { icon: CheckCircle, title: "Check-in", desc: "Melde dich sicher zurück" },
            { icon: Send, title: "Notfall-Hilfe", desc: "Kontakt wird informiert" },
          ].map((item, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ── Setup View ───────────────────────────────────
  if (view === "setup") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setView("idle")}>
            <X className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-display text-xl font-bold">Safe Date einrichten</h2>
            <p className="text-muted-foreground text-sm">
              In unter 30 Sekunden startklar
            </p>
          </div>
        </div>

        {/* Duration */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <Label className="font-display font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Geschätzte Dauer
            </Label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    duration === d
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {d < 60 ? `${d} Min` : `${d / 60} Std`}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <Label className="font-display font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Ort <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              placeholder="z.B. Hotel, Adresse, Stadtteil…"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={200}
            />
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <Label className="font-display font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Notfallkontakt
            </Label>
            <Input
              placeholder="Name der Vertrauensperson"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              maxLength={100}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setContactMethod("phone")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  contactMethod === "phone"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Phone className="h-3.5 w-3.5" /> Telefon
              </button>
              <button
                onClick={() => setContactMethod("email")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  contactMethod === "email"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Mail className="h-3.5 w-3.5" /> E-Mail
              </button>
            </div>
            <Input
              placeholder={contactMethod === "phone" ? "+49 170 1234567" : "kontakt@email.de"}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              type={contactMethod === "phone" ? "tel" : "email"}
              maxLength={100}
            />
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <Label className="font-display font-semibold">Erinnerung via</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Push-Notification</span>
                <Switch checked={notifyPush} onCheckedChange={setNotifyPush} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS</span>
                <Switch checked={notifySms} onCheckedChange={setNotifySms} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <Label className="font-display font-semibold">Optionen</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Standort im Notfall teilen</span>
                  <p className="text-xs text-muted-foreground">
                    Wird nur bei Nicht-Meldung gesendet
                  </p>
                </div>
                <Switch checked={shareLocation} onCheckedChange={setShareLocation} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Automatische Verlängerung</span>
                  <p className="text-xs text-muted-foreground">
                    Einmal um 15 Min verlängern vor Alarm
                  </p>
                </div>
                <Switch checked={autoExtend} onCheckedChange={setAutoExtend} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button
          className="w-full gradient-brand text-primary-foreground py-6 rounded-xl text-base font-semibold shadow-lg shadow-primary/25"
          onClick={startSession}
          disabled={!contactName || !contactValue}
        >
          <Shield className="h-5 w-5 mr-2" />
          Safe Timer starten
        </Button>
      </motion.div>
    );
  }

  // ── Active Session View ──────────────────────────
  if (view === "active" || view === "checkin") {
    const isCheckin = view === "checkin";

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safe Date aktiv
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isCheckin
                ? "Zeit abgelaufen – alles okay bei dir?"
                : "Wir checken später bei dir ein 💛"}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isCheckin
                ? "bg-accent/10 text-accent"
                : "bg-primary/10 text-primary"
            }`}
          >
            {isCheckin ? "Check-in" : "Aktiv"}
          </span>
        </div>

        {/* Timer Circle */}
        <Card className={`overflow-hidden ${isCheckin ? "border-accent/30" : "border-primary/20"}`}>
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="relative h-40 w-40">
              <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke={isCheckin ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - progressPercent / 100)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold tracking-tight">
                  {formatTime(secondsLeft)}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {isCheckin ? "Bitte melde dich" : "verbleibend"}
                </span>
              </div>
            </div>

            {session?.location && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {session.location}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              Notfallkontakt: {session?.contactName}
            </div>
          </CardContent>
        </Card>

        {/* Check-in Banner */}
        <AnimatePresence>
          {isCheckin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-5 text-center space-y-3">
                  <p className="font-display font-semibold">
                    Alles okay bei dir? 💛
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dein Timer ist abgelaufen. Melde dich zurück oder verlängere die Zeit.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            className="gradient-brand text-primary-foreground py-5 rounded-xl font-semibold shadow-lg shadow-primary/25"
            onClick={confirmSafe}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Ich bin sicher
          </Button>
          <Button
            variant="outline"
            className="py-5 rounded-xl font-semibold"
            onClick={() => extendTime(15)}
          >
            <Plus className="h-4 w-4 mr-1" />
            +15 Min
          </Button>
        </div>

        {/* More extend options */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 rounded-xl"
            onClick={() => extendTime(30)}
          >
            +30 Min
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 rounded-xl"
            onClick={() => extendTime(60)}
          >
            +1 Std
          </Button>
        </div>

        {/* Emergency Button */}
        <Card className="border-destructive/20">
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 py-4 rounded-xl font-semibold"
              onClick={() => setShowEmergencyConfirm(true)}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Notfall senden
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Benachrichtigt sofort deine Vertrauensperson
            </p>
          </CardContent>
        </Card>

        {/* Emergency Confirm Dialog */}
        <Dialog open={showEmergencyConfirm} onOpenChange={setShowEmergencyConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Notfall senden?
              </DialogTitle>
              <DialogDescription>
                {session?.contactName} wird sofort benachrichtigt
                {session?.shareLocation ? " – inklusive deinem Standort" : ""}.
                Diese Aktion kann nicht rückgängig gemacht werden.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowEmergencyConfirm(false)}>
                Abbrechen
              </Button>
              <Button
                variant="destructive"
                onClick={triggerEmergency}
              >
                <Send className="h-4 w-4 mr-2" />
                Jetzt senden
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Safe Confirm Dialog */}
        <Dialog open={showSafeConfirm} onOpenChange={setShowSafeConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Schön, dass alles okay ist!
              </DialogTitle>
              <DialogDescription>
                Dein Safe Date wird beendet. Deine Vertrauensperson wird nicht benachrichtigt.
                Bleib sicher! 💛
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="gradient-brand text-primary-foreground"
                onClick={endSession}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Bestätigen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    );
  }

  // ── Settings View ────────────────────────────────
  if (view === "settings") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setView("idle")}>
            <X className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-display text-xl font-bold">Safety-Einstellungen</h2>
            <p className="text-muted-foreground text-sm">
              Deine Standardwerte für Safe Dates
            </p>
          </div>
        </div>

        {/* Default Contact */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <Label className="font-display font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Standard-Notfallkontakt
            </Label>
            <Input
              placeholder="Name"
              value={settings.defaultContactName}
              onChange={(e) => setSettings({ ...settings, defaultContactName: e.target.value })}
              maxLength={100}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setSettings({ ...settings, defaultContactMethod: "phone" })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  settings.defaultContactMethod === "phone"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Phone className="h-3.5 w-3.5" /> Telefon
              </button>
              <button
                onClick={() => setSettings({ ...settings, defaultContactMethod: "email" })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  settings.defaultContactMethod === "email"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Mail className="h-3.5 w-3.5" /> E-Mail
              </button>
            </div>
            <Input
              placeholder={settings.defaultContactMethod === "phone" ? "+49 170 1234567" : "kontakt@email.de"}
              value={settings.defaultContactValue}
              onChange={(e) => setSettings({ ...settings, defaultContactValue: e.target.value })}
              type={settings.defaultContactMethod === "phone" ? "tel" : "email"}
              maxLength={100}
            />
          </CardContent>
        </Card>

        {/* Default Duration */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <Label className="font-display font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Standard-Dauer
            </Label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setSettings({ ...settings, defaultDuration: d })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    settings.defaultDuration === d
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {d < 60 ? `${d} Min` : `${d / 60} Std`}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Default Options */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <Label className="font-display font-semibold">Standard-Optionen</Label>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Standort teilen</span>
                <p className="text-xs text-muted-foreground">
                  Standardmäßig im Notfall Standort senden
                </p>
              </div>
              <Switch
                checked={settings.shareLocationDefault}
                onCheckedChange={(v) => setSettings({ ...settings, shareLocationDefault: v })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Safe Phrase */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <Label className="font-display font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Safe-Phrase <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              Wenn du diese Phrase in einer Nachricht sendest, wird automatisch ein Alarm ausgelöst.
            </p>
            <Input
              placeholder="z.B. 'Ruf mich bitte an'"
              value={settings.safePhrase}
              onChange={(e) => setSettings({ ...settings, safePhrase: e.target.value })}
              maxLength={100}
            />
          </CardContent>
        </Card>

        {/* Save */}
        <Button
          className="w-full gradient-brand text-primary-foreground py-5 rounded-xl text-base font-semibold"
          onClick={() => setView("idle")}
        >
          Einstellungen speichern
        </Button>
      </motion.div>
    );
  }

  return null;
};

export default SafeDateSection;
