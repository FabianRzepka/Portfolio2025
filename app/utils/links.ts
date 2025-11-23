import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [
  {
    label: 'O mnie',
    icon: 'i-lucide-home',
    to: '/',
  },
  {
    label: 'Projekty',
    icon: 'i-lucide-folder',
    to: '/projects',
  },
  {
    label: 'Zdjęcia',
    icon: 'i-lucide-camera',
    to: '/media',
  },
]
