import { type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  isVisible: (isProducer: boolean) => boolean;
  exact: boolean;
};

import { Home, User, Star, Store, Box } from "lucide-react";

export const navItems: NavItem[] = [
  {
    label: "Inicio",
    path: "/dashboard",
    icon: Home,
    isVisible: () => true,
    exact: true,
  },
  {
    label: "Mi perfil",
    path: "/dashboard/profile",
    icon: User,
    isVisible: () => true,
    exact: false,
  },
  {
    label: "Mis reseñas",
    path: "/dashboard/reviews",
    icon: Star,
    isVisible: (isProducer) => !isProducer || isProducer,
    exact: false,
  },
  {
    label: "Mis emprendimientos",
    path: "/dashboard/ventures",
    icon: Store,
    isVisible: (isProducer) => isProducer,
    exact: false,
  },
  {
    label: "Mis productos",
    path: "/dashboard/products",
    icon: Box,
    isVisible: (isProducer) => isProducer && false,
    exact: false,
  },
];
