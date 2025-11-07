import type { NavigationMenuItem } from "@nuxt/ui";

export const navLinks: NavigationMenuItem[] = [
  {
    label: "Strona Główna",
    icon: "i-lucide-home",
    to: "/",
  },
  {
    label: "Projekty",
    icon: "i-lucide-folder",
    to: "/projects",
  },
];
