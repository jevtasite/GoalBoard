# GoalBoard - Stadium Broadcast Pro

A professional football (soccer) scoreboard web application built with React. This application serves dual purposes on a single screen - as a projected display for spectators AND as an operator control interface.

## Features

### Scoreboard Display (Top Section)
- Large, broadcast-quality score display
- Team names with customizable labels
- Live match timer with period tracking
- Card indicators (yellow and red cards)
- Animated goal celebrations with light streaks
- LED board scan line effect
- Red card visual effects

### Control Panel (Bottom Section)
- **Team Controls** (both sides):
  - Score increment/decrement buttons
  - Team name editing
  - Yellow and red card tracking
  - Fouls and corners statistics

- **Match Controls** (center):
  - Timer with start/pause/reset
  - Period selector (First Half, Half Time, Second Half, Extra Time, Full Time)
  - Next match reset functionality
  - Fullscreen toggle
  - **Presentation Mode** - Hide controls for clean projection

### Presentation Mode 🎥
Perfect for projection! Press `Tab` or click the "📺 Present" button to:
- Hide all operator controls
- Expand scoreboard to full screen
- Control everything via keyboard shortcuts
- Press `Tab` again to show controls

This solves the operator problem - you can control the scoreboard with keyboard shortcuts while spectators only see the clean scoreboard display!

### Animations
- Goal celebration with background flash and sweeping bars
- Score change animations with elastic bounce
- Radial pulse effects on goals
- Red card shake and desaturate effects
- Continuous scan line for LED board feel

### Keyboard Shortcuts
Power users can control everything via keyboard:

**Score Controls:**
- `Q` - Team A score -1
- `W` - Team A score +1
- `O` - Team B score -1
- `P` - Team B score +1

**Timer Controls:**
- `Space` - Start/Pause timer
- `R` - Reset timer

**Cards:**
- `Y` - Team A yellow card +1
- `U` - Team A red card +1
- `I` - Team B yellow card +1
- `K` - Team B red card +1

**Utility:**
- `Tab` - Toggle presentation mode (hide/show controls)
- `F` - Toggle fullscreen
- `N` - Next match dialog
- `Escape` - Close dialogs

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Context API** - State management
- **Google Fonts** - Rajdhani, Bebas Neue, Inter, JetBrains Mono

## Design System

### Colors
- Broadcast Navy (`#0A1628`) - Main background
- Electric Mint (`#00FF87`) - Primary accent, scores, highlights
- Steel Blue (`#1E3A5F`) - Panel separations
- Broadcast Red (`#FF2D55`) - Cards, warnings
- Slate Gray (`#8E99AB`) - Secondary text
- Goal Green (`#34C759`) - Confirmations

### Typography
- **Rajdhani Bold** - Score numbers
- **Bebas Neue** - Team names and headings
- **Inter** - Control panel and UI text
- **JetBrains Mono** - Timer display

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Open the application in your browser
2. Connect your laptop to a projector
3. The top section (scoreboard) will be visible to spectators
4. Use the bottom section (controls) to operate the scoreboard during matches
5. Press `F` or click the Fullscreen button for optimal projection

## Responsive Design

The application is fully responsive:
- **Mobile** (320px+) - Stacked layout
- **Tablet** (768px+) - Compact side-by-side
- **Laptop** (1024px+) - Standard layout
- **Projector** (1440px+) - Full broadcast layout

## Browser Support

Works best on modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## License

This project is open source and available for use in sports events, tournaments, and broadcasts.

## Credits

Built with broadcast-quality design inspired by Sky Sports and ESPN.
