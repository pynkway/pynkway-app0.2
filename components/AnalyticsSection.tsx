import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye, MessageCircle, ShoppingBag, TrendingUp, TrendingDown,
  Users, Heart, Star, ArrowUpRight, Calendar, DollarSign,
  BarChart3, Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";

// ── Mock Data ──────────────────────────────────────
const weeklyViews = [
  { day: "Mo", views: 42, messages: 5 },
  { day: "Di", views: 58, messages: 8 },
  { day: "Mi", views: 35, messages: 3 },
  { day: "Do", views: 72, messages: 12 },
  { day: "Fr", views: 95, messages: 15 },
  { day: "Sa", views: 110, messages: 18 },
  { day: "So", views: 88, messages: 11 },
];

const monthlyRevenue = [
  { month: "Sep", revenue: 320 },
  { month: "Okt", revenue: 480 },
  { month: "Nov", revenue: 590 },
  { month: "Dez", revenue: 720 },
  { month: "Jan", revenue: 650 },
  { month: "Feb", revenue: 870 },
];

const topListings = [
  { name: "Exklusives Video-Paket", views: 234, sales: 18, revenue: 360 },
  { name: "Private Fotoserie", views: 189, sales: 12, revenue: 240 },
  { name: "1:1 Video Call (30 Min)", views: 156, sales: 8, revenue: 320 },
  { name: "Getragene Dessous", views: 132, sales: 5, revenue: 175 },
];

type TimeRange = "7d" | "30d" | "90d";

const AnalyticsSection = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const stats = [
    {
      label: "Profilaufrufe",
      value: "1.247",
      change: "+18%",
      up: true,
      icon: Eye,
      desc: "vs. letzte Woche",
    },
    {
      label: "Nachrichten",
      value: "72",
      change: "+24%",
      up: true,
      icon: MessageCircle,
      desc: "vs. letzte Woche",
    },
    {
      label: "Marketplace-Umsatz",
      value: "€ 870",
      change: "+12%",
      up: true,
      icon: DollarSign,
      desc: "diesen Monat",
    },
    {
      label: "Neue Favoriten",
      value: "38",
      change: "-5%",
      up: false,
      icon: Heart,
      desc: "vs. letzte Woche",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Deine Performance auf einen Blick
          </p>
        </div>
        <div className="flex gap-1 bg-secondary rounded-xl p-1">
          {([
            { key: "7d", label: "7 Tage" },
            { key: "30d", label: "30 Tage" },
            { key: "90d", label: "90 Tage" },
          ] as const).map((r) => (
            <button
              key={r.key}
              onClick={() => setTimeRange(r.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeRange === r.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${
                      stat.up ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {stat.up ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="font-display text-xl font-bold">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {stat.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Views & Messages Chart */}
      <Card>
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-display font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Profilaufrufe & Nachrichten
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-4">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyViews}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(199 100% 50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(199 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="msgsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(289 100% 50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(289 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(199 100% 50%)"
                  fill="url(#viewsGradient)"
                  strokeWidth={2}
                  name="Aufrufe"
                />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stroke="hsl(289 100% 50%)"
                  fill="url(#msgsGradient)"
                  strokeWidth={2}
                  name="Nachrichten"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Aufrufe
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Nachrichten
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-display font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            Marketplace-Umsatz (€)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pb-4">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`€ ${value}`, "Umsatz"]}
                />
                <Bar
                  dataKey="revenue"
                  fill="hsl(199 100% 50%)"
                  radius={[6, 6, 0, 0]}
                  name="Umsatz"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Listings */}
      <Card>
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-sm font-display font-semibold flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-primary" />
            Top Listings
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-3">
            {topListings.map((listing, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
              >
                <span className="font-display font-bold text-lg text-muted-foreground/40 w-6 text-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{listing.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {listing.views}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3" /> {listing.sales}×
                    </span>
                  </div>
                </div>
                <span className="font-display font-semibold text-sm text-primary">
                  € {listing.revenue}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Clock, label: "Ø Antwortzeit", value: "12 Min", desc: "Schneller als 80% der Creator" },
          { icon: Star, label: "Bewertung", value: "4.8 ★", desc: "Basierend auf 24 Reviews" },
          { icon: Users, label: "Wiederkehrende", value: "64%", desc: "Stammkunden-Quote" },
          { icon: ArrowUpRight, label: "Konversion", value: "8.3%", desc: "Profil → Nachricht" },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="font-display text-lg font-bold">{item.value}</p>
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;
