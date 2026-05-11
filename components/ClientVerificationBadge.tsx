import { cn } from "@/lib/utils";
import { BadgeCheck, ShieldCheck, Award } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type ClientVerificationLevel = "none" | "basic" | "id_verified" | "trusted";

interface ClientVerificationBadgeProps {
  level: ClientVerificationLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const badgeConfig = {
  none: null,
  basic: {
    icon: BadgeCheck,
    label: "Basic Verified",
    tooltip: "Email, phone & payment verified",
    iconClass: "text-primary",
    labelClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "",
  },
  id_verified: {
    icon: ShieldCheck,
    label: "ID Verified",
    tooltip: "Identity verified by Pynklyme",
    iconClass: "text-accent",
    labelClass: "text-accent",
    bgClass: "bg-accent/10",
    borderClass: "",
  },
  trusted: {
    icon: Award,
    label: "Trusted Client",
    tooltip: "Trusted Client – proven track record",
    iconClass: "text-[hsl(45,100%,50%)]",
    labelClass: "text-[hsl(45,100%,50%)]",
    bgClass: "bg-[hsl(45,100%,50%)]/10",
    borderClass: "ring-1 ring-[hsl(45,100%,50%)]/30",
  },
};

const sizeMap = {
  sm: { icon: "h-4 w-4", text: "text-[10px]", padding: "px-1.5 py-0.5", iconOnly: "h-4 w-4" },
  md: { icon: "h-5 w-5", text: "text-xs", padding: "px-2 py-0.5", iconOnly: "h-5 w-5" },
  lg: { icon: "h-6 w-6", text: "text-sm", padding: "px-2.5 py-1", iconOnly: "h-6 w-6" },
};

const ClientVerificationBadge = ({ level, size = "md", showLabel = false, className }: ClientVerificationBadgeProps) => {
  const config = badgeConfig[level];
  if (!config) return null;

  const s = sizeMap[size];
  const Icon = config.icon;

  if (!showLabel) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("inline-flex", className)}>
            <Icon className={cn(s.iconOnly, config.iconClass)} />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs font-medium">{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full font-semibold",
            s.padding,
            s.text,
            config.bgClass,
            config.labelClass,
            config.borderClass,
            className
          )}
        >
          <Icon className={cn(s.icon, config.iconClass)} />
          {config.label}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs font-medium">{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ClientVerificationBadge;
