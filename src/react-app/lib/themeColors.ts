// Theme color mapping for consistent styling across the app
export const themeColors = {
  purple: {
    primary: '#9333ea',
    hover: '#7e22ce',
    light: '#f3e8ff',
    border: '#c084fc',
    text: '#6b21a8'
  },
  amber: {
    primary: '#f59e0b',
    hover: '#d97706',
    light: '#fef3c7',
    border: '#fbbf24',
    text: '#b45309'
  },
  teal: {
    primary: '#14b8a6',
    hover: '#0d9488',
    light: '#ccfbf1',
    border: '#5eead4',
    text: '#0f766e'
  },
  blue: {
    primary: '#2563eb',
    hover: '#1d4ed8',
    light: '#dbeafe',
    border: '#60a5fa',
    text: '#1e40af'
  },
  green: {
    primary: '#16a34a',
    hover: '#15803d',
    light: '#dcfce7',
    border: '#4ade80',
    text: '#166534'
  },
  sky: {
    primary: '#0ea5e9',
    hover: '#0284c7',
    light: '#e0f2fe',
    border: '#38bdf8',
    text: '#075985'
  },
  red: {
    primary: '#dc2626',
    hover: '#b91c1c',
    light: '#fee2e2',
    border: '#f87171',
    text: '#991b1b'
  },
  indigo: {
    primary: '#6366f1',
    hover: '#4f46e5',
    light: '#e0e7ff',
    border: '#818cf8',
    text: '#4338ca'
  },
  emerald: {
    primary: '#10b981',
    hover: '#059669',
    light: '#d1fae5',
    border: '#34d399',
    text: '#047857'
  },
  cyan: {
    primary: '#06b6d4',
    hover: '#0891b2',
    light: '#cffafe',
    border: '#22d3ee',
    text: '#0e7490'
  }
} as const;

export type ThemeColor = keyof typeof themeColors;

export function getThemeColor(color: string) {
  return themeColors[color as ThemeColor] || themeColors.blue;
}
