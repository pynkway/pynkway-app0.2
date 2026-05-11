import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarDays, Plus, Clock, MapPin, User, ChevronLeft, ChevronRight,
  X, Edit3, Trash2, Shield, CheckCircle, XCircle, AlertCircle,
  ArrowDownLeft, ArrowUpRight, StickyNote, Crown, Calendar as CalIcon,
  List, LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// ── Types ──────────────────────────────────────────
interface DateEntry {
  id: string;
  date: Date;
  time: string;
  duration: number; // minutes
  location: string;
  direction: "inbound" | "outbound";
  clientName?: string;
  notes?: string;
  status: "active" | "completed" | "cancelled";
  linkSafeDate: boolean;
}

type ViewMode = "month" | "week" | "list";

// ── Mock Data ──────────────────────────────────────
const now = new Date();
const mockDates: DateEntry[] = [
  {
    id: "1", date: now, time: "18:00", duration: 60,
    location: "Hotel Adlon, Berlin", direction: "inbound",
    clientName: "Max K.", status: "active", linkSafeDate: true, notes: "",
  },
  {
    id: "2", date: addDays(now, 1), time: "20:00", duration: 90,
    location: "Privatwohnung, München", direction: "outbound",
    clientName: "Tom R.", status: "active", linkSafeDate: false, notes: "Stammkunde",
  },
  {
    id: "3", date: addDays(now, 3), time: "14:00", duration: 120,
    location: "Laufhaus, Hamburg", direction: "inbound",
    status: "active", linkSafeDate: true, notes: "",
  },
  {
    id: "4", date: addDays(now, -2), time: "19:00", duration: 60,
    location: "Hotel, Köln", direction: "inbound",
    clientName: "Chris B.", status: "completed", linkSafeDate: false, notes: "",
  },
  {
    id: "5", date: addDays(now, -5), time: "21:00", duration: 45,
    location: "Bordell, Frankfurt", direction: "inbound",
    clientName: "Julia S.", status: "cancelled", linkSafeDate: false, notes: "Kundin hat abgesagt",
  },
];

const DURATION_OPTIONS = [30, 45, 60, 90, 120, 180, 240];
const isPlus = true; // mock

const statusConfig = {
  active: { label: "Aktiv", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  completed: { label: "Abgeschlossen", icon: CheckCircle, color: "text-muted-foreground", bg: "bg-secondary", dot: "bg-muted-foreground" },
  cancelled: { label: "Abgesagt", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", dot: "bg-destructive" },
};

const DatePlannerSection = () => {
  const [dates, setDates] = useState<DateEntry[]>(mockDates);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentMonth, setCurrentMonth] = useState(now);
  const [weekStart, setWeekStart] = useState(startOfWeek(now, { locale: de }));
  const [showForm, setShowForm] = useState(false);
  const [editingDate, setEditingDate] = useState<DateEntry | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formDate, setFormDate] = useState<Date | undefined>(new Date());
  const [formTime, setFormTime] = useState("18:00");
  const [formDuration, setFormDuration] = useState(60);
  const [formLocation, setFormLocation] = useState("");
  const [formDirection, setFormDirection] = useState<"inbound" | "outbound">("inbound");
  const [formClient, setFormClient] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formSafeDate, setFormSafeDate] = useState(false);

  const activeDates = dates.filter((d) => d.status === "active");

  // ── Form Helpers ─────────────────────────────────
  const resetForm = () => {
    setFormDate(new Date());
    setFormTime("18:00");
    setFormDuration(60);
    setFormLocation("");
    setFormDirection("inbound");
    setFormClient("");
    setFormNotes("");
    setFormSafeDate(false);
    setEditingDate(null);
  };

  const openCreate = () => {
    if (!isPlus && activeDates.length >= 1) {
      toast({ title: "Limit erreicht", description: "Upgrade auf Pynklyme Plus für unbegrenzte Dates." });
      return;
    }
    resetForm();
    setShowForm(true);
  };

  const openEdit = (d: DateEntry) => {
    setEditingDate(d);
    setFormDate(d.date);
    setFormTime(d.time);
    setFormDuration(d.duration);
    setFormLocation(d.location);
    setFormDirection(d.direction);
    setFormClient(d.clientName || "");
    setFormNotes(d.notes || "");
    setFormSafeDate(d.linkSafeDate);
    setShowForm(true);
  };

  const saveDate = () => {
    if (!formDate || !formLocation) return;
    if (editingDate) {
      setDates((prev) =>
        prev.map((d) =>
          d.id === editingDate.id
            ? { ...d, date: formDate, time: formTime, duration: formDuration, location: formLocation, direction: formDirection, clientName: formClient || undefined, notes: formNotes, linkSafeDate: formSafeDate }
            : d
        )
      );
      toast({ title: "Date aktualisiert" });
    } else {
      const newDate: DateEntry = {
        id: `d${Date.now()}`,
        date: formDate,
        time: formTime,
        duration: formDuration,
        location: formLocation,
        direction: formDirection,
        clientName: formClient || undefined,
        notes: formNotes || undefined,
        status: "active",
        linkSafeDate: formSafeDate,
      };
      setDates((prev) => [...prev, newDate]);
      toast({ title: "Date erstellt", description: formSafeDate ? "Safe Date wird automatisch aktiviert." : undefined });
    }
    setShowForm(false);
    resetForm();
  };

  const cancelDate = (id: string) => {
    setDates((prev) => prev.map((d) => d.id === id ? { ...d, status: "cancelled" as const } : d));
    setShowCancelConfirm(null);
    toast({ title: "Date abgesagt" });
  };

  const completeDate = (id: string) => {
    setDates((prev) => prev.map((d) => d.id === id ? { ...d, status: "completed" as const } : d));
    toast({ title: "Date abgeschlossen" });
  };

  // ── Calendar Helpers ─────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: de });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: addDays(monthEnd, 6 - monthEnd.getDay()) });

  const weekDays = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });

  const getDatesForDay = (day: Date) => dates.filter((d) => isSameDay(d.date, day));

  // ── Date Card Component ──────────────────────────
  const DateCard = ({ d }: { d: DateEntry }) => {
    const status = statusConfig[d.status];
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-3 rounded-xl border ${d.status === "active" ? "border-primary/20 bg-card" : "border-border bg-secondary/30"}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${status.dot} flex-shrink-0`} />
              <span className="font-display font-semibold text-sm truncate">
                {format(d.date, "dd. MMM", { locale: de })} · {d.time}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {d.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {d.duration} Min
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {d.clientName && (
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> {d.clientName}
                </span>
              )}
              <span className="flex items-center gap-1">
                {d.direction === "inbound" ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                {d.direction === "inbound" ? "Inbound" : "Outbound"}
              </span>
              {d.linkSafeDate && (
                <span className="flex items-center gap-1 text-primary">
                  <Shield className="h-3 w-3" /> Safe Date
                </span>
              )}
            </div>
          </div>
          {d.status === "active" && (
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(d)}>
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => completeDate(d.id)}>
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowCancelConfirm(d.id)}>
                <XCircle className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // ── Main Render ──────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            Date Planner
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {activeDates.length} aktive Dates
            {!isPlus && <span className="text-xs ml-1">(max. 1 für Free)</span>}
          </p>
        </div>
        <Button
          className="gradient-brand text-primary-foreground rounded-xl shadow-md shadow-primary/20"
          onClick={openCreate}
        >
          <Plus className="h-4 w-4 mr-1" /> Neues Date
        </Button>
      </div>

      {/* View Switcher */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        {([
          { key: "month" as const, label: "Monat", icon: LayoutGrid },
          { key: "week" as const, label: "Woche", icon: CalIcon },
          { key: "list" as const, label: "Liste", icon: List },
        ]).map((v) => (
          <button
            key={v.key}
            onClick={() => setViewMode(v.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              viewMode === v.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <v.icon className="h-3.5 w-3.5" />
            {v.label}
          </button>
        ))}
      </div>

      {/* Month View */}
      {viewMode === "month" && (
        <Card>
          <CardContent className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-display font-semibold text-sm">
                {format(currentMonth, "MMMM yyyy", { locale: de })}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                const dayDates = getDatesForDay(day);
                const inMonth = isSameMonth(day, currentMonth);
                const today = isToday(day);
                const isSelected = selectedDay && isSameDay(day, selectedDay);
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(isSameDay(day, selectedDay || new Date(0)) ? null : day)}
                    className={`relative p-1 rounded-lg text-xs h-10 transition-all ${
                      !inMonth ? "text-muted-foreground/30" :
                      isSelected ? "bg-primary text-primary-foreground" :
                      today ? "bg-primary/10 text-primary font-bold" :
                      "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {format(day, "d")}
                    {dayDates.length > 0 && (
                      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayDates.slice(0, 3).map((d, j) => (
                          <span key={j} className={`h-1 w-1 rounded-full ${statusConfig[d.status].dot}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setWeekStart(addDays(weekStart, -7))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-display font-semibold text-sm">
                {format(weekStart, "dd. MMM", { locale: de })} – {format(addDays(weekStart, 6), "dd. MMM yyyy", { locale: de })}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setWeekStart(addDays(weekStart, 7))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {weekDays.map((day, i) => {
                const dayDates = getDatesForDay(day);
                const today = isToday(day);
                return (
                  <div key={i} className={`p-2 rounded-xl ${today ? "bg-primary/5 border border-primary/20" : ""}`}>
                    <p className={`text-xs font-semibold mb-1 ${today ? "text-primary" : "text-muted-foreground"}`}>
                      {format(day, "EEEE, dd. MMM", { locale: de })}
                    </p>
                    {dayDates.length > 0 ? (
                      <div className="space-y-1.5">
                        {dayDates.map((d) => (
                          <div
                            key={d.id}
                            className={`flex items-center gap-2 p-2 rounded-lg text-xs ${statusConfig[d.status].bg}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[d.status].dot}`} />
                            <span className="font-medium">{d.time}</span>
                            <span className="text-muted-foreground truncate">{d.location}</span>
                            {d.clientName && <span className="text-muted-foreground ml-auto">{d.clientName}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-muted-foreground/50 italic">Keine Termine</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Day Dates (Month View) */}
      {viewMode === "month" && selectedDay && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <p className="font-display font-semibold text-sm">
            {format(selectedDay, "EEEE, dd. MMMM yyyy", { locale: de })}
          </p>
          {getDatesForDay(selectedDay).length > 0 ? (
            getDatesForDay(selectedDay).map((d) => <DateCard key={d.id} d={d} />)
          ) : (
            <Card className="p-6 text-center">
              <p className="text-sm text-muted-foreground">Keine Termine an diesem Tag</p>
              <Button variant="outline" size="sm" className="mt-2 rounded-xl" onClick={openCreate}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Date erstellen
              </Button>
            </Card>
          )}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2">
          {dates.length > 0 ? (
            [...dates].sort((a, b) => b.date.getTime() - a.date.getTime()).map((d) => (
              <DateCard key={d.id} d={d} />
            ))
          ) : (
            <Card className="p-8 text-center">
              <CalendarDays className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Noch keine Dates geplant</p>
            </Card>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Aktiv", value: dates.filter((d) => d.status === "active").length, dot: "bg-primary" },
          { label: "Abgeschlossen", value: dates.filter((d) => d.status === "completed").length, dot: "bg-muted-foreground" },
          { label: "Abgesagt", value: dates.filter((d) => d.status === "cancelled").length, dot: "bg-destructive" },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-3 text-center">
              <span className={`inline-block h-2 w-2 rounded-full ${s.dot} mb-1`} />
              <p className="font-display text-lg font-bold">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plus Upsell */}
      {!isPlus && (
        <Card className="border-primary/20 overflow-hidden">
          <div className="gradient-brand-subtle p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-display font-semibold text-sm">Unbegrenzte Dates mit Plus</p>
              <p className="text-xs text-muted-foreground">Upgrade für volle Flexibilität und Prioritäts-Anzeige</p>
            </div>
            <Button size="sm" className="gradient-brand text-primary-foreground rounded-xl">
              Upgrade
            </Button>
          </div>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={(open) => { if (!open) { setShowForm(false); resetForm(); } }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              {editingDate ? "Date bearbeiten" : "Neues Date"}
            </DialogTitle>
            <DialogDescription>
              {editingDate ? "Passe die Details deines Dates an." : "Plane ein neues Date in unter 30 Sekunden."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <CalIcon className="h-3.5 w-3.5 text-primary" /> Datum
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal rounded-xl", !formDate && "text-muted-foreground")}>
                    <CalIcon className="h-4 w-4 mr-2" />
                    {formDate ? format(formDate, "PPP", { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formDate}
                    onSelect={setFormDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /> Uhrzeit
              </Label>
              <Input type="time" value={formTime} onChange={(e) => setFormTime(e.target.value)} className="rounded-xl" />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Dauer</Label>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFormDuration(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      formDuration === d ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {d < 60 ? `${d} Min` : `${d / 60} Std`}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Ort
              </Label>
              <Input
                placeholder="Hotel, Adresse, Stadtteil…"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                maxLength={200}
                className="rounded-xl"
              />
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Richtung</Label>
              <div className="flex gap-2">
                {(["inbound", "outbound"] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setFormDirection(dir)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      formDirection === dir ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {dir === "inbound" ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                    {dir === "inbound" ? "Inbound" : "Outbound"}
                  </button>
                ))}
              </div>
            </div>

            {/* Client */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> Kunde <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input placeholder="Name" value={formClient} onChange={(e) => setFormClient(e.target.value)} maxLength={100} className="rounded-xl" />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <StickyNote className="h-3.5 w-3.5 text-primary" /> Notizen <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Input placeholder="Besondere Hinweise…" value={formNotes} onChange={(e) => setFormNotes(e.target.value)} maxLength={300} className="rounded-xl" />
            </div>

            {/* Safe Date */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <div>
                  <span className="text-sm font-medium">Safe Date aktivieren</span>
                  <p className="text-[11px] text-muted-foreground">Sicherheits-Timer automatisch starten</p>
                </div>
              </div>
              <Switch checked={formSafeDate} onCheckedChange={setFormSafeDate} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowForm(false); resetForm(); }} className="rounded-xl">
              Abbrechen
            </Button>
            <Button
              className="gradient-brand text-primary-foreground rounded-xl shadow-md shadow-primary/20"
              onClick={saveDate}
              disabled={!formDate || !formLocation}
            >
              {editingDate ? "Speichern" : "Date erstellen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirm */}
      <Dialog open={!!showCancelConfirm} onOpenChange={() => setShowCancelConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Date absagen?
            </DialogTitle>
            <DialogDescription>
              Das Date wird als abgesagt markiert. Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowCancelConfirm(null)}>Zurück</Button>
            <Button variant="destructive" onClick={() => showCancelConfirm && cancelDate(showCancelConfirm)}>
              Date absagen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default DatePlannerSection;
