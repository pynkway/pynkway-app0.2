import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, ShieldCheck, Award, Mail, Phone, CreditCard,
  Upload, Camera, Lock, ChevronRight, CheckCircle2, Circle,
  ArrowRight, Star, MessageCircle, Heart, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ClientVerificationBadge from "@/components/ClientVerificationBadge";
import type { ClientVerificationLevel } from "@/components/ClientVerificationBadge";

// Mock data – replace with real state from backend
const mockStatus: {
  level: ClientVerificationLevel;
  basicSteps: { id: string; label: string; done: boolean }[];
  idSteps: { id: string; label: string; done: boolean }[];
  trustedStats: { completedDates: number; avgRating: number; complaints: number };
  pending: boolean;
} = {
  level: "none",
  pending: false,
  basicSteps: [
    { id: "email", label: "Confirm email address", done: true },
    { id: "phone", label: "Verify phone number", done: false },
    { id: "payment", label: "Add payment method", done: false },
  ],
  idSteps: [
    { id: "id_doc", label: "Upload ID document", done: false },
    { id: "selfie", label: "Selfie with ID", done: false },
  ],
  trustedStats: { completedDates: 0, avgRating: 0, complaints: 0 },
};

const tiers = [
  {
    level: "basic" as ClientVerificationLevel,
    title: "Basic Verified",
    icon: BadgeCheck,
    iconClass: "text-primary",
    bgClass: "gradient-brand-subtle",
    required: true,
    benefits: [
      "Request dates & make bookings",
      "\"Basic Verified\" badge on profile",
      "Visible verification at date requests",
      "Access to all creators",
    ],
    requirements: ["Email confirmed", "Phone verified", "Payment method added"],
  },
  {
    level: "id_verified" as ClientVerificationLevel,
    title: "ID Verified",
    icon: ShieldCheck,
    iconClass: "text-accent",
    bgClass: "bg-accent/10",
    required: false,
    benefits: [
      "Higher response rate from creators",
      "Priority in search results",
      "Enhanced trust badge on profile",
      "Preferred client status",
    ],
    requirements: ["Government ID uploaded", "Selfie with ID verified"],
  },
  {
    level: "trusted" as ClientVerificationLevel,
    title: "Trusted Client",
    icon: Award,
    iconClass: "text-[hsl(45,100%,50%)]",
    bgClass: "bg-[hsl(45,100%,50%)]/10",
    required: false,
    benefits: [
      "Gold trusted badge",
      "Highest response rates",
      "Visible completed dates & rating",
      "Top placement in creator inboxes",
    ],
    requirements: ["3+ completed dates", "Positive reviews", "No active complaints"],
  },
];

const ClientVerificationSection = () => {
  const [status] = useState(mockStatus);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const basicCompleted = status.basicSteps.filter((s) => s.done).length;
  const basicProgress = Math.round((basicCompleted / status.basicSteps.length) * 100);
  const isBasicDone = basicCompleted === status.basicSteps.length;

  const idCompleted = status.idSteps.filter((s) => s.done).length;
  const idProgress = Math.round((idCompleted / status.idSteps.length) * 100);

  const trustedProgress = Math.min(100, Math.round((status.trustedStats.completedDates / 3) * 100));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl gradient-brand-subtle flex items-center justify-center">
            <BadgeCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Client Verification</h2>
            <p className="text-muted-foreground text-sm">Build trust with creators. Get more responses.</p>
          </div>
        </div>
      </motion.div>

      {/* Motivation Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="rounded-2xl gradient-brand p-5 text-primary-foreground">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-base mb-1">Verified clients get 3× more responses</p>
              <p className="text-primary-foreground/80 text-sm">
                Show you're serious. Creators prefer verified clients – it means safety for everyone.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Status Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-primary/20 overflow-hidden">
          <div className="h-1 gradient-brand" />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-display">Your Trust Level</CardTitle>
              {status.level !== "none" ? (
                <ClientVerificationBadge level={status.level} showLabel size="md" />
              ) : (
                <Badge variant="secondary" className="text-xs">Not Verified</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ── Step 1: Basic Verification ── */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <h3 className="font-display font-bold text-sm">Step 1: Basic Verified</h3>
                {isBasicDone && (
                  <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
                    <CheckCircle2 className="h-3 w-3 mr-0.5" /> Complete
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{basicCompleted} of {status.basicSteps.length}</span>
                </div>
                <Progress value={basicProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                {status.basicSteps.map((step) => {
                  const stepIcons: Record<string, typeof Mail> = {
                    email: Mail,
                    phone: Phone,
                    payment: CreditCard,
                  };
                  const StepIcon = stepIcons[step.id] || Circle;
                  return (
                    <button
                      key={step.id}
                      onClick={() => !step.done && setActiveStep(activeStep === step.id ? null : step.id)}
                      disabled={step.done}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        step.done
                          ? "border-primary/20 bg-primary/5"
                          : activeStep === step.id
                          ? "border-primary/30 bg-primary/5"
                          : "border-border hover:border-primary/20 hover:bg-secondary/50"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        step.done ? "bg-primary/10" : "bg-secondary"
                      }`}>
                        {step.done ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <StepIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className={`text-sm font-medium flex-1 ${step.done ? "text-primary" : "text-foreground"}`}>
                        {step.label}
                      </span>
                      {!step.done && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>

              {/* Inline action for active step */}
              {activeStep && ["email", "phone", "payment"].includes(activeStep) && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-3">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                      {activeStep === "email" && <Mail className="h-5 w-5 text-muted-foreground" />}
                      {activeStep === "phone" && <Phone className="h-5 w-5 text-muted-foreground" />}
                      {activeStep === "payment" && <CreditCard className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {activeStep === "email" && "Confirm your email address"}
                      {activeStep === "phone" && "Verify your phone number"}
                      {activeStep === "payment" && "Add a payment method"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {activeStep === "email" && "We'll send a verification link to your email"}
                      {activeStep === "phone" && "We'll send a code via SMS to verify your number"}
                      {activeStep === "payment" && "Add a credit card or other payment method securely"}
                    </p>
                    <Button size="sm" className="gradient-brand text-primary-foreground rounded-full">
                      {activeStep === "email" && "Send Verification Email"}
                      {activeStep === "phone" && "Send SMS Code"}
                      {activeStep === "payment" && "Add Payment Method"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {!isBasicDone && (
                <Button className="w-full gradient-brand text-primary-foreground rounded-xl h-12 font-semibold mt-3">
                  <BadgeCheck className="h-4 w-4 mr-2" />
                  Become Basic Verified
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* ── Step 2: ID Verified ── */}
            <div className={!isBasicDone ? "opacity-50 pointer-events-none" : ""}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <h3 className="font-display font-bold text-sm">Step 2: ID Verified</h3>
                <Badge variant="secondary" className="text-[10px]">Optional</Badge>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{idCompleted} of {status.idSteps.length}</span>
                </div>
                <Progress value={idProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                {status.idSteps.map((step) => {
                  const stepIcons: Record<string, typeof Upload> = {
                    id_doc: Upload,
                    selfie: Camera,
                  };
                  const StepIcon = stepIcons[step.id] || Circle;
                  return (
                    <button
                      key={step.id}
                      onClick={() => !step.done && setActiveStep(activeStep === step.id ? null : step.id)}
                      disabled={step.done}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        step.done
                          ? "border-accent/20 bg-accent/5"
                          : activeStep === step.id
                          ? "border-accent/30 bg-accent/5"
                          : "border-border hover:border-accent/20 hover:bg-secondary/50"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        step.done ? "bg-accent/10" : "bg-secondary"
                      }`}>
                        {step.done ? (
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                        ) : (
                          <StepIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className={`text-sm font-medium flex-1 ${step.done ? "text-accent" : "text-foreground"}`}>
                        {step.label}
                      </span>
                      {!step.done && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>

              {/* Upload area for ID steps */}
              {activeStep && ["id_doc", "selfie"].includes(activeStep) && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-3">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                      {activeStep === "id_doc" && <Upload className="h-5 w-5 text-muted-foreground" />}
                      {activeStep === "selfie" && <Camera className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {activeStep === "id_doc" && "Upload your ID document"}
                      {activeStep === "selfie" && "Take a selfie holding your ID"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {activeStep === "id_doc" && "Passport or national ID card"}
                      {activeStep === "selfie" && "Your face and document must be clearly visible"}
                    </p>
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                      Choose File
                    </Button>
                  </div>
                </motion.div>
              )}

              <Button variant="outline" className="w-full rounded-xl h-11 font-semibold mt-3 border-accent/20 text-accent hover:bg-accent/5">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Become ID Verified
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* ── Step 3: Trusted Client (auto) ── */}
            <div className={!isBasicDone ? "opacity-50 pointer-events-none" : ""}>
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-5 w-5 text-[hsl(45,100%,50%)]" />
                <h3 className="font-display font-bold text-sm">Step 3: Trusted Client</h3>
                <Badge variant="secondary" className="text-[10px]">Automatic</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                This badge is earned automatically when you meet the criteria below.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-2xl font-display font-bold">{status.trustedStats.completedDates}/3</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Dates completed</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-2xl font-display font-bold flex items-center justify-center gap-1">
                    {status.trustedStats.avgRating > 0 ? status.trustedStats.avgRating : "—"}
                    {status.trustedStats.avgRating > 0 && <Star className="h-4 w-4 text-[hsl(45,100%,50%)] fill-[hsl(45,100%,50%)]" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">Avg rating</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-2xl font-display font-bold">{status.trustedStats.complaints}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Complaints</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress to Trusted</span>
                  <span className="font-medium">{trustedProgress}%</span>
                </div>
                <Progress value={trustedProgress} className="h-2" />
              </div>
            </div>

            {/* Pending state */}
            {status.pending && (
              <div className="text-center py-4 border-t border-border">
                <div className="h-12 w-12 rounded-full bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <p className="font-medium mb-1">ID Verification in Review</p>
                <p className="text-sm text-muted-foreground">Our team is reviewing your documents. This usually takes 24–48 hours.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Notice */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Your data is secure and never shared</p>
            <p className="text-xs text-muted-foreground mt-1">
              All documents are encrypted and stored securely. Only our admin team can access them for verification. They are never visible to other users.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tiers Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-bold text-lg mb-4">Verification Levels</h3>
        <div className="space-y-4">
          {tiers.map((tier) => (
            <Card key={tier.level} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl ${tier.bgClass} flex items-center justify-center`}>
                    <tier.icon className={`h-5 w-5 ${tier.iconClass}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold">{tier.title}</h4>
                      {tier.required && (
                        <Badge variant="secondary" className="text-[10px]">Required for booking</Badge>
                      )}
                      {tier.level === "trusted" && (
                        <Badge variant="secondary" className="text-[10px]">Auto-earned</Badge>
                      )}
                    </div>
                  </div>
                  <ClientVerificationBadge level={tier.level} size="md" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Benefits</p>
                    <ul className="space-y-1.5">
                      {tier.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Requirements</p>
                    <ul className="space-y-1.5">
                      {tier.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Circle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Why Verify */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display font-bold text-lg mb-4">Why get verified?</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MessageCircle, label: "More Responses", desc: "Creators respond to verified clients first" },
                { icon: Heart, label: "Build Trust", desc: "Show creators you're respectful & serious" },
                { icon: Star, label: "Better Experience", desc: "Access premium features & priority booking" },
                { icon: TrendingUp, label: "Higher Acceptance", desc: "Date requests accepted 2x more often" },
              ].map((item, i) => (
                <div key={i} className="text-center p-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary mx-auto mb-2 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ClientVerificationSection;
