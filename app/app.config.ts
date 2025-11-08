export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/67225684?v=4',
      light: 'https://avatars.githubusercontent.com/u/67225684?v=4',
      alt: 'My profile picture',
    },
    meetingLink: 'https://calendar.app.google/58QosYvLybhE3C8o9',
    email: 'fabian@encordev.pl',
    available: true,
  },
  ui: {
    colors: {
      primary: 'persian-green',
      neutral: 'zinc',
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted',
      },
    },
  },
  footer: {
    credits: `Built with ❤️ © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-instagram',
        'to': 'https://www.instagram.com/encordev/',
        'target': '_blank',
        'aria-label': 'Instagram',
      },
      {
        'icon': 'i-simple-icons-x',
        'to': 'https://x.com/fabian_rzepka/',
        'target': '_blank',
        'aria-label': 'Fabian on X',
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/FabianRzepka',
        'target': '_blank',
        'aria-label': 'Fabian on GitHub',
      },
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/fabian-rzepka/',
        'target': '_blank',
        'aria-label': 'Fabian on LinkedIn',
      },
    ],
  },
})
