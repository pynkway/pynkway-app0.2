import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BadgeCheck, Search, CheckCircle2, XCircle, Clock, Eye,
  ChevronDown, User, FileText, Camera, Video,
} from "lucide-react";

interface VerificationRequest {
  id: string;
  name: string;
  email: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  documents: { type: string; uploaded: boolean }[];
}

const mockRequests: VerificationRequest[] = [
  {
    id: "1", name: "Sophia M.", email: "sophia@example.com", submittedAt: "2026-02-20",
    status: "pending",
    documents: [
      { type: "ID Document", uploaded: true },
      { type: "Selfie with ID", uploaded: true },
      { type: "Video verification", uploaded: true },
    ],
  },
  {
    id: "2", name: "Isabella R.", email: "isabella@example.com", submittedAt: "2026-02-19",
    status: "pending",
    documents: [
      { type: "ID Document", uploaded: true },
      { type: "Selfie with ID", uploaded: true },
      { type: "Video verification", uploaded: false },
    ],
  },
  {
    id: "3", name: "Emma L.", email: "emma@example.com", submittedAt: "2026-02-18",
    status: "approved",
    documents: [
      { type: "ID Document", uploaded: true },
      { type: "Selfie with ID", uploaded: true },
      { type: "Video verification", uploaded: true },
    ],
  },
  {
    id: "4", name: "Mia K.", email: "mia@example.com", submittedAt: "2026-02-17",
    status: "rejected",
    documents: [
      { type: "ID Document", uploaded: true },
      { type: "Selfie with ID", uploaded: false },
      { type: "Video verification", uploaded: false },
    ],
  },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-[hsl(45,100%,50%)]/10 text-[hsl(45,100%,50%)]" },
  approved: { label: "Approved", icon: CheckCircle2, className: "bg-primary/10 text-primary" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

const docIcons: Record<string, typeof FileText> = {
  "ID Document": FileText,
  "Selfie with ID": Camera,
  "Video verification": Video,
};

const AdminVerification = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockRequests.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === "pending").length,
    approved: mockRequests.filter((r) => r.status === "approved").length,
    rejected: mockRequests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl gradient-brand-subtle flex items-center justify-center">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Verification Requests</h1>
              <p className="text-muted-foreground text-sm">Review and manage creator verification</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {(["all", "pending", "approved", "rejected"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`p-3 rounded-xl text-center transition-all border ${
                filter === key ? "border-primary/30 bg-primary/5" : "border-border bg-card hover:bg-secondary/50"
              }`}
            >
              <p className="text-xl font-bold">{counts[key]}</p>
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filtered.map((req) => {
            const sc = statusConfig[req.status];
            const expanded = expandedId === req.id;
            return (
              <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <button
                      onClick={() => setExpandedId(expanded ? null : req.id)}
                      className="w-full flex items-center gap-3 text-left"
                    >
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{req.name}</p>
                        <p className="text-xs text-muted-foreground">{req.email} · {req.submittedAt}</p>
                      </div>
                      <Badge className={`${sc.className} border-0 gap-1`}>
                        <sc.icon className="h-3 w-3" />
                        {sc.label}
                      </Badge>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>

                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-border space-y-4"
                      >
                        {/* Documents */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Submitted Documents</p>
                          <div className="space-y-2">
                            {req.documents.map((doc, i) => {
                              const DocIcon = docIcons[doc.type] || FileText;
                              return (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                                  <DocIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm flex-1">{doc.type}</span>
                                  {doc.uploaded ? (
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary" className="text-[10px] gap-1">
                                        <CheckCircle2 className="h-3 w-3 text-primary" /> Uploaded
                                      </Badge>
                                      <Button variant="ghost" size="sm" className="h-7 px-2">
                                        <Eye className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Badge variant="secondary" className="text-[10px] text-destructive">Missing</Badge>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Actions */}
                        {req.status === "pending" && (
                          <div className="flex gap-2">
                            <Button className="flex-1 gradient-brand text-primary-foreground rounded-xl">
                              <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                            </Button>
                            <Button variant="outline" className="flex-1 rounded-xl text-destructive border-destructive/20 hover:bg-destructive/5">
                              <XCircle className="h-4 w-4 mr-2" /> Reject
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVerification;
