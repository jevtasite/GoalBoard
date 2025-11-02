# GoalBoard - The Scoreboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)

**Professional digital scoreboard designed for football (soccer).** Perfect for stadiums, live streaming, and football facilities.

**Developer:** [Jevta](https://jevta.site)

**Live Demo:** [goalboard.site](https://goalboard.site)

![GoalBoard Screenshot](./public/favicon/web-app-manifest-512x512.png)

## Features

### Core Functionality

- **Live Score Tracking** - Real-time score updates with celebration animations
- **Precision Timer** - Match timer with minutes, seconds, and milliseconds
- **Team Management** - Customizable team names
- **Game Statistics** - Yellow cards, red cards, fouls, and corner kicks
- **Period Control** - First Half, Second Half, Extra Time

### Display & Control

- **Projector Mode** - Full-screen mode optimized for stadium displays
- **Keyboard Shortcuts** - Lightning-fast control with comprehensive shortcuts
- **Touch Controls** - Mobile-friendly interface for tablets and phones
- **Zoom Controls** - Adjustable display size (50%-150%)
- **Responsive Design** - Works on desktop, tablet, and mobile

### Accessibility & Customization

- **Multi-Language** - English, Serbian (Srpski), Spanish (Español), and Portuguese (Português)
- **Theme Customization** - Multiple color themes and background patterns
- **Background Patterns** - Stadium grid, hexagons, dots, diagonal, circuit, or none
- **Device Detection** - Automatic optimization for different devices
- **Orientation Support** - Portrait and landscape modes

### Visual Effects

- **Multiple Themes** - Choose from various professional color schemes
- **Dynamic Backgrounds** - Customizable background patterns that adapt to your chosen theme
- **Theme-Adaptive Colors** - Background patterns automatically adjust to match your selected theme

## Keyboard Shortcuts

### Score Control

- **W** - Increase Team A score
- **Q** - Decrease Team A score
- **P** - Increase Team B score
- **O** - Decrease Team B score

### Timer Control

- **Space** - Start/Pause timer
- **R** - Reset timer (with confirmation)

### Fouls

- **A** - Add foul to Team A
- **S** - Remove foul from Team A
- **L** - Add foul to Team B
- **;** - Remove foul from Team B

### Display

- **F** - Toggle fullscreen
- **Tab** - Toggle Projector Mode
- **N** - Start next match
- **T** - Open theme customization menu

## Mobile Controls

On mobile devices, the control panel is hidden and replaced with:

- **Touch Buttons** - Tap +/- to adjust scores
- **Timer Button** - Tap to start/pause the timer
- **Name Editing** - Tap team name to edit
- **Period Selector** - Dropdown to change match period
- **Language Selector** - Modal popup for language selection
- **Theme Selector** - Modal popup for theme and background customization

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Context API** - State management
- **LocalStorage** - Data persistence

## Project Structure

```
GoalBoard/
├── src/
│   ├── components/
│   │   ├── display/
│   │   │   ├── ScoreboardDisplay.jsx    # Main scoreboard
│   │   │   ├── TeamSection.jsx          # Team display
│   │   │   ├── CenterDisplay.jsx        # Timer and VS display
│   │   │   ├── ScanLineOverlay.jsx      # Background patterns
│   │   │   └── GoalCelebration.jsx      # Goal animations
│   │   ├── controls/
│   │   │   ├── ControlPanel.jsx         # Desktop controls
│   │   │   ├── MatchControls.jsx        # Timer controls
│   │   │   └── TeamControls.jsx         # Team stats controls
│   │   └── selectors/
│   │       ├── LanguageSelector.jsx     # Language modal
│   │       ├── ThemeSelector.jsx        # Theme & background modal
│   │       └── PeriodSelector.jsx       # Period dropdown
│   ├── contexts/
│   │   ├── MatchContext.jsx             # Match state management
│   │   ├── AnimationContext.jsx         # Animation state
│   │   ├── TranslationContext.jsx       # i18n support
│   │   └── ThemeContext.jsx             # Theme & background state
│   ├── hooks/
│   │   └── useDeviceDetection.jsx       # Device detection hook
│   ├── utils/
│   │   └── translations.js              # Language strings
│   └── App.jsx                          # Main app component
├── public/
│   ├── favicon/                         # All favicon files
│   ├── robots.txt                       # Search engine rules
│   ├── sitemap.xml                      # Site structure
│   ├── llms.txt                         # AI crawler info
│   └── humans.txt                       # Credits
└── index.html                           # Entry point with SEO
```

## Themes & Customization

GoalBoard comes with multiple professional themes, each with a unique color palette:

- **Classic** - Traditional broadcast colors with electric mint and red
- **Ocean** - Cool blue tones for a modern look
- **Sunset** - Warm orange and purple gradient
- **Forest** - Natural green and brown earth tones
- **Neon** - Vibrant cyberpunk-inspired colors
- **Monochrome** - Clean black and white aesthetic

Each theme includes customizable background patterns:

- **Stadium Grid** - Classic field line pattern
- **Hexagons** - Modern geometric pattern
- **Dots** - Minimal dotted pattern
- **Diagonal** - Dynamic diagonal lines
- **Circuit** - Tech-inspired circuit board
- **None** - Clean, pattern-free background

All background patterns automatically adapt to match your selected theme colors.

## SEO Optimization

GoalBoard is optimized for search engines with:

- Comprehensive meta tags
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD Schema.org)
- Semantic HTML5
- robots.txt and sitemap.xml
- llms.txt for AI crawlers

### Target Keywords

football scoreboard, soccer scoreboard, game scoreboard, sports scoreboard, live scoreboard, digital scoreboard, stadium scoreboard, broadcast scoreboard, score tracker, game timer, match scoreboard, electronic scoreboard, scoreboard software, scoreboard app

## Use Cases

- **Football Stadiums** - Display live scores on large screens
- **Live Broadcasting** - Professional overlay for football streams
- **Training Sessions** - Time drills and exercises
- **Amateur Leagues** - Professional scoreboard for community football
- **Indoor Football** - Perfect for futsal and indoor facilities
- **Youth Football** - Track scores and stats for youth matches

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or support, please open an issue on GitHub.

---

Made by [Jevta](https://jevta.site)
