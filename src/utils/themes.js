export const themes = {
  classic: {
    name: 'Classic',
    colors: {
      // Background
      background: '#0A1628',
      // Primary accent (UI elements)
      primary: '#00FF87',
      primaryHover: '#00E67A',
      primaryActive: '#00CC6D',
      // Secondary
      secondary: '#FF2D55',
      // Neutral
      steel: '#2A3F5F',
      slate: '#8B9DC3',
      // Team colors
      teamA: '#00FF87',
      teamB: '#FF2D55',
      // Team name color
      teamNameColor: '#FF2D55',
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      background: '#0F1B2E',
      primary: '#00D9FF',
      primaryHover: '#00C2E6',
      primaryActive: '#00ABCC',
      secondary: '#FF6B9D',
      steel: '#1E3A5F',
      slate: '#7FB3D5',
      teamA: '#00D9FF',
      teamB: '#FF6B9D',
      teamNameColor: '#00D9FF',
    }
  },
  retro: {
    name: 'Retro',
    colors: {
      background: '#2B1B17',
      primary: '#FFA500',
      primaryHover: '#FF8C00',
      primaryActive: '#FF7300',
      secondary: '#00CED1',
      steel: '#3E2723',
      slate: '#FFCC80',
      teamA: '#FFA500',
      teamB: '#00CED1',
      teamNameColor: '#FFE4B5',
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      background: '#0D1B0D',
      primary: '#7FFF00',
      primaryHover: '#73E600',
      primaryActive: '#66CC00',
      secondary: '#FF4500',
      steel: '#1E3A1E',
      slate: '#A8D5A8',
      teamA: '#7FFF00',
      teamB: '#FF4500',
      teamNameColor: '#7FFF00',
    }
  },
  midnight: {
    name: 'Midnight',
    colors: {
      background: '#0D0D1A',
      primary: '#9D4EDD',
      primaryHover: '#8B3FCA',
      primaryActive: '#7930B7',
      secondary: '#FF006E',
      steel: '#1F1F3D',
      slate: '#B8A8D6',
      teamA: '#9D4EDD',
      teamB: '#FF006E',
      teamNameColor: '#9D4EDD',
    }
  },
  neon: {
    name: 'Neon',
    colors: {
      background: '#000000',
      primary: '#00FFFF',
      primaryHover: '#00E6E6',
      primaryActive: '#00CCCC',
      secondary: '#FF00FF',
      steel: '#1A1A1A',
      slate: '#00FFFF',
      teamA: '#00FFFF',
      teamB: '#FF00FF',
      teamNameColor: '#00FFFF',
    }
  },
  royal: {
    name: 'Royal',
    colors: {
      background: '#1A0A2E',
      primary: '#FFD700',
      primaryHover: '#E6C200',
      primaryActive: '#CCAD00',
      secondary: '#9B59B6',
      steel: '#2E1A47',
      slate: '#D4AF37',
      teamA: '#FFD700',
      teamB: '#9B59B6',
      teamNameColor: '#FFD700',
    }
  },
  ice: {
    name: 'Ice',
    colors: {
      background: '#0A1929',
      primary: '#E0F7FF',
      primaryHover: '#C9EEFF',
      primaryActive: '#B2E5FF',
      secondary: '#4FC3F7',
      steel: '#1E2F3F',
      slate: '#B3E5FC',
      teamA: '#E0F7FF',
      teamB: '#4FC3F7',
      teamNameColor: '#E0F7FF',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#0D0D0D',
      primary: '#FFFFFF',
      primaryHover: '#E6E6E6',
      primaryActive: '#CCCCCC',
      secondary: '#666666',
      steel: '#1A1A1A',
      slate: '#999999',
      teamA: '#FFFFFF',
      teamB: '#666666',
      teamNameColor: '#FFFFFF',
    }
  },
  patriot: {
    name: 'Patriot',
    colors: {
      background: '#1A1D2E',
      primary: '#F0F0F0',
      primaryHover: '#FFFFFF',
      primaryActive: '#E0E0E0',
      secondary: '#C6363C',
      steel: '#4169B5',
      slate: '#D4D4D4',
      teamA: '#C6363C',
      teamB: '#4169B5',
      teamNameColor: '#F0F0F0',
    }
  },
};

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 255, 135';
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  const colors = theme.colors;

  // Apply CSS variables
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-primary-hover', colors.primaryHover);
  root.style.setProperty('--color-primary-active', colors.primaryActive);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-steel', colors.steel);
  root.style.setProperty('--color-slate', colors.slate);
  root.style.setProperty('--color-team-a', colors.teamA);
  root.style.setProperty('--color-team-b', colors.teamB);

  // Apply RGB versions for rgba() usage
  root.style.setProperty('--color-primary-rgb', hexToRgb(colors.primary));
};
