import {
  CircuitBoard,
  Wrench,
  Users,
  Terminal,
  Shield,
  Building2,
  Server,
  Globe,
  GraduationCap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const themeIcons: Record<string, LucideIcon> = {
  "Électronique & innovation": CircuitBoard,
  "Hardware": Wrench,
  "Communication & networking": Users,
  "Développement & Linux": Terminal,
  "Cybersécurité": Shield,
  "Salons & veille techno": Building2,
  "Administration système & homelab": Server,
  "Développement web": Globe,
  "Médiation scientifique & pédagogie": GraduationCap,
};

export const fallbackThemeIcon: LucideIcon = Sparkles;

export function getThemeIcon(theme: string): LucideIcon {
  return themeIcons[theme] ?? fallbackThemeIcon;
}
