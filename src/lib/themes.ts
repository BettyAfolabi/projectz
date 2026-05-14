export interface Theme {
  id: string;
  label: string;
  color: string;
  dot: string;
  bg: string;
  surface: string;
  border: string;
  accent: string;
  accentText: string;
  accentHover: string;
  text: string;
  muted: string;
  navText: string;
  glow: string;
  colorScheme: 'only dark' | 'only light';
}

export const THEMES: Theme[] = [
  {
    id: 'linear',
    label: 'Linear',
    color: '#5e6ad2',
    dot: '#818cf8',
    bg: '#0f0f13',
    surface: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
    accent: '#5e6ad2',
    accentText: '#ffffff',
    accentHover: '#818cf8',
    text: '#e0e0ff',
    muted: 'rgba(224,224,255,0.45)',
    navText: 'rgba(224,224,255,0.7)',
    glow: 'rgba(94,106,210,0.12)',
    colorScheme: 'only dark',
  },
  {
    id: 'vercel',
    label: 'Vercel',
    color: '#ffffff',
    dot: '#aaaaaa',
    bg: '#000000',
    surface: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.1)',
    accent: '#ffffff',
    accentText: '#000000',
    accentHover: '#aaaaaa',
    text: '#ededed',
    muted: 'rgba(255,255,255,0.4)',
    navText: 'rgba(255,255,255,0.6)',
    glow: 'transparent',
    colorScheme: 'only dark',
  },
  {
    id: 'github',
    label: 'GitHub',
    color: '#0969da',
    dot: '#2da44e',
    bg: '#ffffff',
    surface: 'rgba(0,0,0,0.03)',
    border: '#d0d7de',
    accent: '#0969da',
    accentText: '#ffffff',
    accentHover: '#0550ae',
    text: '#24292f',
    muted: '#57606a',
    navText: '#57606a',
    glow: 'transparent',
    colorScheme: 'only light'
  },
  {
    id: 'notion',
    label: 'Notion',
    color: '#37352f',
    dot: '#2383e2',
    bg: '#ffffff',
    surface: '#f1f1ef',
    border: '#e3e3e3',
    accent: '#37352f',
    accentText: '#ffffff',
    accentHover: '#2383e2',
    text: '#37352f',
    muted: '#9b9a97',
    navText: '#6b6b6b',
    glow: 'transparent',
    colorScheme: 'only light'
  },
  {
    id: 'stripe',
    label: 'Stripe',
    color: '#635bff',
    dot: '#0a2540',
    bg: '#f6f9fc',
    surface: 'rgba(0,0,0,0.02)',
    border: '#e6e9ef',
    accent: '#635bff',
    accentText: '#ffffff',
    accentHover: '#4f46e5',
    text: '#0a2540',
    muted: '#8898aa',
    navText: '#425466',
    glow: 'rgba(99,91,255,0.08)',
    colorScheme: 'only light'
  },
  {
    id: 'raycast',
    label: 'Raycast',
    color: '#ff6363',
    dot: '#ff9f43',
    bg: '#1c1c1e',
    surface: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.09)',
    accent: '#ff6363',
    accentText: '#ffffff',
    accentHover: '#ff9f43',
    text: '#f2f2f7',
    muted: 'rgba(242,242,247,0.45)',
    navText: 'rgba(242,242,247,0.65)',
    glow: 'rgba(255,99,99,0.1)',
    colorScheme: 'only dark',
  },
];


export const THEMES_MAP = Object.fromEntries(THEMES.map((t) => [t.id, t]));
export const DEFAULT_THEME_ID = 'linear';