import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Eye, Lock, Mail, Phone, Globe,
  Trash2, LogOut, ChevronRight, Moon, Sun, Smartphone,
  MessageCircle, Heart, MapPin, ShoppingBag, Camera,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

type SettingsTab = "account" | "notifications" | "privacy";

const tabs = [
  { id: "account" as const, label: "Account", icon: User },
  { id: "notifications" as const, label: "Benachrichtigungen", icon: Bell },
  { id: "privacy" as const, label: "Datenschutz", icon: Shield },
];

const SettingsSection = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Account state
  const [displayName, setDisplayName] = useState("Mia Rosé");
  const [email, setEmail] = useState("mia@example.com");
  const [phone, setPhone] = useState("+49 170 1234567");
  const [website, setWebsite] = useState("https://miarose.com");

  // Notification state
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyBookings, setNotifyBookings] = useState(true);
  const [notifyFavorites, setNotifyFavorites] = useState(false);
  const [notifyMarketing, setNotifyMarketing] = useState(false);
  const [notifyTours, setNotifyTours] = useState(true);
  const [notifySales, setNotifySales] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showLastSeen, setShowLastSeen] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-bold">Einstellungen</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Verwalte deinen Account und deine Präferenzen
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Profile Picture */}
          <Card>
            <CardContent className="p-5">
              <Label className="font-display font-semibold flex items-center gap-2 mb-4">
                <Camera className="h-4 w-4 text-primary" />
                Profilbild
              </Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Bild ändern
                  </Button>
                  <p className="text-[11px] text-muted-foreground">JPG, PNG. Max 5 MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Persönliche Daten
              </Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Anzeigename</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">E-Mail</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Telefon</Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Website</Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    maxLength={200}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Passwort
              </Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Aktuelles Passwort</Label>
                  <Input type="password" placeholder="••••••••" maxLength={128} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Neues Passwort</Label>
                  <Input type="password" placeholder="••••••••" maxLength={128} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                Passwort ändern
              </Button>
            </CardContent>
          </Card>

          {/* Save */}
          <Button className="w-full gradient-brand text-primary-foreground py-5 rounded-xl font-semibold">
            Änderungen speichern
          </Button>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardContent className="p-5 space-y-3">
              <Label className="font-display font-semibold text-destructive">Gefahrenzone</Label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-muted-foreground hover:text-foreground rounded-xl"
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Abmelden
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Account löschen
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Push */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Push-Benachrichtigungen
              </Label>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Push aktivieren</span>
                  <p className="text-xs text-muted-foreground">Erhalte Benachrichtigungen auf dein Gerät</p>
                </div>
                <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold">Benachrichtigungen für</Label>
              {[
                { label: "Neue Nachrichten", desc: "Wenn dir jemand schreibt", icon: MessageCircle, value: notifyMessages, set: setNotifyMessages },
                { label: "Buchungen & Anfragen", desc: "Neue Buchungen und Terminanfragen", icon: Heart, value: notifyBookings, set: setNotifyBookings },
                { label: "Neue Favoriten", desc: "Wenn dich jemand favorisiert", icon: Heart, value: notifyFavorites, set: setNotifyFavorites },
                { label: "Tour-Updates", desc: "Erinnerungen an deine geplanten Touren", icon: MapPin, value: notifyTours, set: setNotifyTours },
                { label: "Marketplace-Verkäufe", desc: "Wenn ein Listing verkauft wird", icon: ShoppingBag, value: notifySales, set: setNotifySales },
                { label: "Marketing & News", desc: "Plattform-Updates und Tipps", icon: Globe, value: notifyMarketing, set: setNotifyMarketing },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.set} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Email Digest */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Wöchentliche Zusammenfassung</span>
                    <p className="text-xs text-muted-foreground">Erhalte eine E-Mail mit deiner Wochen-Performance</p>
                  </div>
                </div>
                <Switch checked={emailDigest} onCheckedChange={setEmailDigest} />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full gradient-brand text-primary-foreground py-5 rounded-xl font-semibold">
            Einstellungen speichern
          </Button>
        </motion.div>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Profile Visibility */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Profil-Sichtbarkeit
              </Label>
              {[
                { label: "Profil öffentlich", desc: "Dein Profil ist für alle sichtbar", value: profilePublic, set: setProfilePublic },
                { label: "In Suche anzeigen", desc: "Werde in der Entdecken-Seite gefunden", value: showInSearch, set: setShowInSearch },
                { label: "Standort anzeigen", desc: "Zeige deine Stadt auf dem Profil", value: showLocation, set: setShowLocation },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.set} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Online Status */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Online-Status
              </Label>
              {[
                { label: "Online-Status anzeigen", desc: "Andere sehen, ob du online bist", value: showOnlineStatus, set: setShowOnlineStatus },
                { label: "Zuletzt online", desc: "Zeige wann du zuletzt aktiv warst", value: showLastSeen, set: setShowLastSeen },
                { label: "Nachrichten erlauben", desc: "Erlaube allen dir zu schreiben", value: allowMessages, set: setAllowMessages },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch checked={item.value} onCheckedChange={item.set} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Sicherheit
              </Label>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Zwei-Faktor-Authentifizierung</span>
                  <p className="text-xs text-muted-foreground">Zusätzliche Sicherheit beim Login</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Daten für Analysen teilen</span>
                  <p className="text-xs text-muted-foreground">Hilf uns die Plattform zu verbessern</p>
                </div>
                <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
              </div>
            </CardContent>
          </Card>

          {/* Data Export */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <Label className="font-display font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Deine Daten
              </Label>
              <p className="text-xs text-muted-foreground">
                Du kannst jederzeit eine Kopie deiner Daten anfordern oder dein Konto löschen.
              </p>
              <Button variant="outline" size="sm" className="rounded-xl">
                Daten exportieren
              </Button>
            </CardContent>
          </Card>

          <Button className="w-full gradient-brand text-primary-foreground py-5 rounded-xl font-semibold">
            Einstellungen speichern
          </Button>
        </motion.div>
      )}

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Account löschen?
            </DialogTitle>
            <DialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Daten, Listings
              und Nachrichten werden dauerhaft gelöscht.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteConfirm(false)}>
              Endgültig löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-muted-foreground" />
              Abmelden?
            </DialogTitle>
            <DialogDescription>
              Du wirst aus deinem Account ausgeloggt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setShowLogoutConfirm(false)}>
              Abmelden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SettingsSection;
