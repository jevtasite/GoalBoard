# STADIUM BROADCAST PRO - Development Specification

## Master Prompt for Claude Agent

You are tasked with building a professional football (soccer) scoreboard web application using React. This application must work on a single screen that serves BOTH as a projected display for spectators AND as an operator control interface simultaneously. The design follows the "STADIUM BROADCAST PRO" design system - a broadcast-quality, high-contrast interface inspired by Sky Sports and ESPN.

**Critical Constraints:**
- Single screen serves dual purpose (projector + operator)
- Operator is actively updating scores, time, and match data throughout the game
- Must work flawlessly on laptops connected to projectors
- Responsive across all devices (phone, tablet, laptop, projector)
- No localStorage or sessionStorage (use React state only)
- Must be performant and lag-free during live updates

Build a complete, production-ready React application with all features specified below.

---

## 1. DESIGN SYSTEM SPECIFICATIONS

### 1.1 Color Palette

```javascript
const colors = {
  // Primary Colors
  broadcastNavy: '#0A1628',    // Main background - deep, non-reflective
  electricMint: '#00FF87',     // Scoring highlights, primary accent
  steelBlue: '#1E3A5F',        // Panel separations, depth
  
  // Functional Colors
  broadcastRed: '#FF2D55',     // Cards, warnings, critical actions
  slateGray: '#8E99AB',        // Secondary text, deemphasized controls
  goalGreen: '#34C759',        // Confirmation states, positive actions
  
  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparentDark: 'rgba(10, 22, 40, 0.85)', // For control panel overlay
}
```

**Usage Rules:**
- `broadcastNavy` - All backgrounds
- `electricMint` - Score numbers, goal celebrations, primary buttons
- `steelBlue` - Control panel background, section dividers
- `broadcastRed` - Red cards, delete actions, stop buttons
- `slateGray` - Secondary labels, inactive states
- `goalGreen` - Confirmation feedback, success states
- All text on dark backgrounds must use white or electricMint
- Minimum contrast ratio: 7:1 for projected elements, 4.5:1 for controls

### 1.2 Typography

**Font Stack:**
```css
/* Load from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&family=Bebas+Neue&family=Inter:wght@500,600&family=JetBrains+Mono:wght@700&display=swap');

/* Font Definitions */
--font-display: 'Rajdhani', sans-serif;        /* Scores */
--font-heading: 'Bebas Neue', sans-serif;      /* Team Names */
--font-body: 'Inter', sans-serif;              /* Controls */
--font-mono: 'JetBrains Mono', monospace;      /* Timer */
```

**Typography Scale:**
```javascript
const typography = {
  // Scoreboard (Top Section)
  scoreDisplay: {
    fontSize: '144px',
    fontFamily: 'Rajdhani',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.02em',
  },
  
  teamName: {
    fontSize: '48px',
    fontFamily: 'Bebas Neue',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    lineHeight: 1.1,
  },
  
  timer: {
    fontSize: '72px',
    fontFamily: 'JetBrains Mono',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.05em',
  },
  
  period: {
    fontSize: '24px',
    fontFamily: 'Bebas Neue',
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  
  // Control Panel (Bottom Section)
  buttonLabel: {
    fontSize: '16px',
    fontFamily: 'Inter',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  
  inputLabel: {
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 500,
    color: '#8E99AB',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  statsText: {
    fontSize: '18px',
    fontFamily: 'Inter',
    fontWeight: 500,
  },
}
```

**Hierarchy Rules:**
- All projected text (scores, team names, timer) uses display fonts
- All operator controls use Inter for maximum readability
- Numbers always use monospace (JetBrains Mono) to prevent layout shift
- Uppercase for all scoreboard elements
- Sentence case for control labels

### 1.3 Spacing System

**Base Unit: 8px**

```javascript
const spacing = {
  xs: '8px',    // 1 unit - tight gaps
  sm: '16px',   // 2 units - button spacing
  md: '24px',   // 3 units - control panel padding
  lg: '32px',   // 4 units - component gaps
  xl: '48px',   // 6 units - scoreboard padding
  xxl: '64px',  // 8 units - major section spacing
}
```

**Grid System:**
- 12-column grid with 24px gutters
- Scoreboard spans all 12 columns
- Control panel uses 4-column subsections (4-4-4 layout)

**Component Spacing:**
- Scoreboard inner padding: 48px all sides
- Control panel padding: 24px all sides
- Button groups: 16px gaps between buttons
- Section dividers: 32px vertical spacing
- Card/Panel spacing: 24px margins

### 1.4 Layout Structure

**Screen Division:**
```
┌─────────────────────────────────────────┐
│                                         │
│         SCOREBOARD AREA (65%)          │
│    [Team A] [Score] vs [Score] [Team B]│
│              [Timer]                    │
│         [Period/Match Info]             │
│                                         │
├─────────────────────────────────────────┤
│       CONTROL PANEL (35%)              │
│  [Team A]  [Match Controls]  [Team B]  │
│  Controls     Timer/Period    Controls  │
│                                         │
└─────────────────────────────────────────┘
```

**Responsive Breakpoints:**
```javascript
const breakpoints = {
  mobile: '320px - 767px',    // Stacked layout
  tablet: '768px - 1023px',   // Compact side-by-side
  laptop: '1024px - 1439px',  // Standard layout
  projector: '1440px+',       // Full broadcast layout
}
```

### 1.5 Visual Elements

**Signature Element: Scoreboard Bars**
- Animated horizontal light streaks (2px height, electricMint color)
- Sweep across top of scoreboard on goal scored
- CSS animation from left to right, 800ms duration
- Accompanied by radial pulse from score numbers

**Scan Line Effect:**
- Subtle 2px white line (opacity 0.1) scrolling vertically
- Continuous loop, 3000ms duration
- Gives LED board feeling to entire display
- Applied as pseudo-element overlay

**Gradients:**
```css
/* Background gradient for scoreboard */
background: linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%);

/* Button hover gradient */
background: linear-gradient(180deg, #00FF87 0%, #00CC6E 100%);

/* Control panel overlay */
background: linear-gradient(180deg, rgba(30,58,95,0.95) 0%, rgba(10,22,40,0.98) 100%);
```

### 1.6 Animation & Motion Principles

**Timing Functions:**
```javascript
const easing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',     // Material standard
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',   // Enter animations
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',     // Exit animations
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Score bounce
}

const duration = {
  instant: '100ms',
  fast: '200ms',
  normal: '300ms',
  slow: '400ms',
  dramatic: '500ms',
}
```

**Specific Animations:**

1. **Score Change:**
```css
/* Scale animation with elastic easing */
@keyframes scoreChange {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
/* Duration: 400ms, Easing: elastic */
```

2. **Goal Celebration:**
```javascript
// Three-stage sequence:
// Stage 1: Background flash (electricMint, 100ms)
// Stage 2: Scoreboard bars sweep (800ms)
// Stage 3: Score scale animation (400ms)
// Total duration: ~1300ms
```

3. **Radial Pulse:**
```css
@keyframes radialPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 135, 0.7);
  }
  100% {
    box-shadow: 0 0 0 40px rgba(0, 255, 135, 0);
  }
}
/* Duration: 600ms, Easing: ease-out */
```

4. **Button Press Feedback:**
```css
/* Scale down on press */
transform: scale(0.95);
transition: transform 100ms ease-out;
```

5. **Timer Update:**
```javascript
// Smooth 60fps updates
// No janky jumps - use requestAnimationFrame
// Update every 1000ms for minutes:seconds display
// No animation on timer update (instant value change)
```

6. **Red Card Effect:**
```css
/* Screen shake + desaturate */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
/* Duration: 300ms */
/* Paired with filter: grayscale(0.5) on team section */
```

7. **Scan Line:**
```css
@keyframes scanLine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
/* Duration: 3000ms, Linear, Infinite loop */
```

**Motion Rules:**
- Never exceed 500ms for any single animation
- User-triggered actions get instant feedback (< 100ms)
- Celebration animations can layer/sequence
- Hover states: 200ms transitions
- All transforms use GPU-accelerated properties (transform, opacity)
- Avoid animating width, height, top, left (causes reflow)

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Core Features

**Match State Management:**
```javascript
const matchState = {
  // Team Information
  teamA: {
    name: 'Team A',
    score: 0,
    yellowCards: 0,
    redCards: 0,
  },
  teamB: {
    name: 'Team B',
    score: 0,
    yellowCards: 0,
    redCards: 0,
  },
  
  // Match Information
  timer: {
    minutes: 0,
    seconds: 0,
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  },
  
  period: 'First Half', // 'First Half', 'Half Time', 'Second Half', 'Full Time', 'Extra Time'
  
  // Additional Stats
  fouls: {
    teamA: 0,
    teamB: 0,
  },
  
  corners: {
    teamA: 0,
    teamB: 0,
  },
}
```

### 2.2 Operator Controls (Bottom Section)

**Layout: Three-Column Grid**

**Left Column - Team A Controls:**
```
┌─────────────────────┐
│  TEAM A CONTROLS    │
├─────────────────────┤
│  [Edit Name Button] │
│  ┌───┐       ┌───┐  │
│  │ - │  [3]  │ + │  │ ← Score controls
│  └───┘       └───┘  │
│  Yellow Cards: [2]  │
│  Red Cards: [0]     │
│  Fouls: [5]         │
│  Corners: [3]       │
└─────────────────────┘
```

**Center Column - Match Controls:**
```
┌─────────────────────┐
│  MATCH CONTROLS     │
├─────────────────────┤
│    [45:23]          │ ← Large timer display
│  [▶ Start/Pause]    │
│  [⟲ Reset]          │
│                     │
│  Period: [Dropdown] │
│  • First Half       │
│  • Half Time        │
│  • Second Half      │
│  • Extra Time       │
│  • Full Time        │
│                     │
│  [🔄 Next Match]    │ ← Quick match transition
└─────────────────────┘
```

**Right Column - Team B Controls:**
```
┌─────────────────────┐
│  TEAM B CONTROLS    │
├─────────────────────┤
│  [Edit Name Button] │
│  ┌───┐       ┌───┐  │
│  │ - │  [2]  │ + │  │ ← Score controls
│  └───┘       └───┘  │
│  Yellow Cards: [1]  │
│  Red Cards: [0]     │
│  Fouls: [3]         │
│  Corners: [4]       │
└─────────────────────┘
```

### 2.3 Detailed Control Specifications

**Score Controls:**
- Large +/- buttons (minimum 48px height for touch)
- Current score displayed prominently between buttons
- Clicking + triggers goal celebration animation
- Clicking - decreases score (with confirmation if > 0)
- Color: electricMint for buttons, white for score number

**Team Name Editing:**
- Click "Edit Name" button opens inline input field
- Input field replaces button temporarily
- Press Enter to confirm, Escape to cancel
- Maximum 20 characters
- Updates scoreboard in real-time as you type

**Timer Controls:**
- Display format: MM:SS (e.g., "45:23")
- Start/Pause button toggles timer state
- When running: button shows "Pause" with pause icon
- When paused: button shows "Start" with play icon
- Reset button returns timer to 00:00 and stops
- Timer color turns electricMint in final 5 minutes of regulation time

**Period Selector:**
- Dropdown menu with 5 options
- First Half (default)
- Half Time
- Second Half
- Extra Time
- Full Time
- Displayed prominently on scoreboard below timer

**Cards Tracking:**
- Small +/- buttons next to each card type
- Yellow cards: Display count (0-5)
- Red cards: Display count (0-2), trigger red card animation on increase
- Visual indicators: Small card icons (📒 📕)

**Fouls & Corners:**
- Simple counters with +/- buttons
- Display count next to label
- Smaller visual priority than cards

**Next Match Button:**
- Prominent button in center column
- Opens modal dialog with:
  - "Save current match result?" confirmation
  - Input fields for new team names
  - Option to reset all stats
  - Cancel and Confirm buttons
- On confirm: resets scores, timer, cards, but keeps team names if desired

### 2.4 Keyboard Shortcuts

Implement the following keyboard shortcuts for power users:

```javascript
const shortcuts = {
  // Score controls
  'q': 'Team A score -1',
  'w': 'Team A score +1',
  'o': 'Team B score -1',
  'p': 'Team B score +1',
  
  // Timer controls
  'Space': 'Start/Pause timer',
  'r': 'Reset timer',
  
  // Cards
  'y': 'Team A yellow card +1',
  'u': 'Team A red card +1',
  'i': 'Team B yellow card +1',
  'k': 'Team B red card +1',
  
  // Utility
  'f': 'Toggle fullscreen',
  'n': 'Next match dialog',
  'Escape': 'Close any open dialog',
}
```

**Implementation Notes:**
- Display keyboard shortcut hints on hover over buttons
- Show small badge with key letter in corner of buttons
- Add "Keyboard Shortcuts" help button that shows full list
- Disable shortcuts when input fields are focused

---

## 3. COMPONENT ARCHITECTURE

### 3.1 Component Hierarchy

```
App
├── ScoreboardDisplay (Top 65%)
│   ├── TeamSection (left)
│   │   ├── TeamName
│   │   ├── Score
│   │   └── CardIndicators
│   ├── CenterDisplay
│   │   ├── Timer
│   │   ├── Period
│   │   └── VSIndicator
│   ├── TeamSection (right)
│   └── ScanLineOverlay
│   └── ScoreboardBars (animation overlay)
│
└── ControlPanel (Bottom 35%)
    ├── TeamControls (left)
    │   ├── NameEditor
    │   ├── ScoreButtons
    │   ├── CardControls
    │   └── StatsControls
    ├── MatchControls (center)
    │   ├── TimerDisplay
    │   ├── TimerButtons
    │   ├── PeriodSelector
    │   └── NextMatchButton
    └── TeamControls (right)
```

### 3.2 State Management Strategy

**Use React Context for Global State:**

```javascript
// MatchContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [matchState, setMatchState] = useState({
    teamA: {
      name: 'Team A',
      score: 0,
      yellowCards: 0,
      redCards: 0,
      fouls: 0,
      corners: 0,
    },
    teamB: {
      name: 'Team B',
      score: 0,
      yellowCards: 0,
      redCards: 0,
      fouls: 0,
      corners: 0,
    },
    timer: {
      minutes: 0,
      seconds: 0,
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    },
    period: 'First Half',
  });

  // Timer logic
  useEffect(() => {
    let interval;
    if (matchState.timer.isRunning) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - matchState.timer.startTime + matchState.timer.elapsedTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        setMatchState(prev => ({
          ...prev,
          timer: {
            ...prev.timer,
            minutes,
            seconds,
          }
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [matchState.timer.isRunning, matchState.timer.startTime]);

  // Action functions
  const updateScore = (team, increment) => {
    setMatchState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        score: Math.max(0, prev[team].score + increment),
      }
    }));
  };

  const updateCards = (team, cardType, increment) => {
    setMatchState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [cardType]: Math.max(0, prev[team][cardType] + increment),
      }
    }));
  };

  const updateStats = (team, statType, increment) => {
    setMatchState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [statType]: Math.max(0, prev[team][statType] + increment),
      }
    }));
  };

  const toggleTimer = () => {
    setMatchState(prev => {
      if (prev.timer.isRunning) {
        // Pause
        return {
          ...prev,
          timer: {
            ...prev.timer,
            isRunning: false,
            elapsedTime: prev.timer.elapsedTime + (Date.now() - prev.timer.startTime),
          }
        };
      } else {
        // Start
        return {
          ...prev,
          timer: {
            ...prev.timer,
            isRunning: true,
            startTime: Date.now(),
          }
        };
      }
    });
  };

  const resetTimer = () => {
    setMatchState(prev => ({
      ...prev,
      timer: {
        minutes: 0,
        seconds: 0,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
      }
    }));
  };

  const updatePeriod = (newPeriod) => {
    setMatchState(prev => ({
      ...prev,
      period: newPeriod,
    }));
  };

  const updateTeamName = (team, newName) => {
    setMatchState(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        name: newName,
      }
    }));
  };

  const resetMatch = (keepNames = false) => {
    setMatchState(prev => ({
      teamA: {
        name: keepNames ? prev.teamA.name : 'Team A',
        score: 0,
        yellowCards: 0,
        redCards: 0,
        fouls: 0,
        corners: 0,
      },
      teamB: {
        name: keepNames ? prev.teamB.name : 'Team B',
        score: 0,
        yellowCards: 0,
        redCards: 0,
        fouls: 0,
        corners: 0,
      },
      timer: {
        minutes: 0,
        seconds: 0,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
      },
      period: 'First Half',
    }));
  };

  const value = {
    matchState,
    updateScore,
    updateCards,
    updateStats,
    toggleTimer,
    resetTimer,
    updatePeriod,
    updateTeamName,
    resetMatch,
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within MatchProvider');
  }
  return context;
};
```

### 3.3 Animation State Management

Create a separate context for managing animation triggers:

```javascript
// AnimationContext.js
import { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animations, setAnimations] = useState({
    goalCelebration: { active: false, team: null },
    redCardEffect: { active: false, team: null },
    scoreChange: { active: false, team: null },
  });

  const triggerGoalCelebration = (team) => {
    setAnimations(prev => ({
      ...prev,
      goalCelebration: { active: true, team },
    }));
    
    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        goalCelebration: { active: false, team: null },
      }));
    }, 1300); // Duration of full celebration
  };

  const triggerRedCard = (team) => {
    setAnimations(prev => ({
      ...prev,
      redCardEffect: { active: true, team },
    }));
    
    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        redCardEffect: { active: false, team: null },
      }));
    }, 300);
  };

  const triggerScoreChange = (team) => {
    setAnimations(prev => ({
      ...prev,
      scoreChange: { active: true, team },
    }));
    
    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
    }, 400);
  };

  return (
    <AnimationContext.Provider value={{
      animations,
      triggerGoalCelebration,
      triggerRedCard,
      triggerScoreChange,
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = () => useContext(AnimationContext);
```

---

## 4. RESPONSIVE DESIGN SPECIFICATIONS

### 4.1 Breakpoint Behavior

**Mobile (320px - 767px):**
```
┌─────────────────┐
│   SCOREBOARD    │
│   Stacked       │
│   Team A        │
│   3 - 2         │
│   Team B        │
│   45:30         │
├─────────────────┤
│ CONTROLS        │
│ Single Column   │
│ Team A controls │
│ Match controls  │
│ Team B controls │
└─────────────────┘
```
- Scoreboard: 50% height
- Controls: 50% height, scrollable if needed
- Font sizes: 60% of desktop sizes
- Touch targets: Minimum 44px

**Tablet (768px - 1023px):**
```
┌──────────────────────┐
│    SCOREBOARD 60%    │
│  Team A  vs  Team B  │
│    3    [::]    2    │
│      45:30           │
├──────────────────────┤
│   CONTROLS 40%       │
│  TeamA | Match | TeamB
└──────────────────────┘
```
- Scoreboard: 60% height
- Controls: 40% height, three columns
- Font sizes: 75% of desktop sizes
- Compact spacing

**Laptop (1024px - 1439px):**
```
┌────────────────────────────┐
│   SCOREBOARD 65%           │
│  Team A    vs    Team B    │
│    3      [::]      2      │
│         45:30              │
├────────────────────────────┤
│   CONTROLS 35%             │
│ TeamA  |  Match  |  TeamB  │
└────────────────────────────┘
```
- Standard layout as specified
- Full font sizes
- All features visible

**Projector (1440px+):**
```
┌──────────────────────────────────┐
│     SCOREBOARD 65%               │
│   Team A      vs      Team B     │
│     3        [::]        2       │
│           45:30                  │
├──────────────────────────────────┤
│     CONTROLS 35%                 │
│  TeamA  |  Match  |  TeamB       │
└──────────────────────────────────┘
```
- Maximum sizes for projection
- Enhanced spacing
- Optimized contrast

### 4.2 Responsive CSS Approach

Use Tailwind CSS utility classes:

```jsx
// Example component structure
<div className="
  min-h-screen 
  flex flex-col
  bg-gradient-to-br from-[#0A1628] to-[#1E3A5F]
">
  {/* Scoreboard */}
  <div className="
    h-[50vh] md:h-[60vh] lg:h-[65vh]
    flex items-center justify-center
    px-4 md:px-8 lg:px-12
    relative
  ">
    {/* Scoreboard content */}
  </div>

  {/* Control Panel */}
  <div className="
    h-[50vh] md:h-[40vh] lg:h-[35vh]
    bg-gradient-to-b from-[#1E3A5F]/95 to-[#0A1628]/98
    p-4 md:p-6 lg:p-6
    grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6
    overflow-y-auto md:overflow-visible
  ">
    {/* Control content */}
  </div>
</div>
```

---

## 5. IMPLEMENTATION CHECKLIST

### Phase 1: Setup & Structure
- [ ] Initialize React app with Vite
- [ ] Install Tailwind CSS
- [ ] Import Google Fonts
- [ ] Set up folder structure
- [ ] Create MatchContext and AnimationContext
- [ ] Set up basic component hierarchy

### Phase 2: Scoreboard Display
- [ ] Build TeamSection component
- [ ] Build CenterDisplay with timer
- [ ] Implement score display with proper typography
- [ ] Add scan line overlay effect
- [ ] Create VS indicator between teams
- [ ] Add card indicators (yellow/red)

### Phase 3: Control Panel
- [ ] Build three-column grid layout
- [ ] Create score control buttons (+/-)
- [ ] Implement team name editor
- [ ] Build timer controls (start/pause/reset)
- [ ] Create period selector dropdown
- [ ] Add card and stats controls
- [ ] Implement next match button with modal

### Phase 4: Animations
- [ ] Implement score change animation (scale with elastic)
- [ ] Create goal celebration sequence (flash + bars + pulse)
- [ ] Add scoreboard bars sweep animation
- [ ] Implement radial pulse effect
- [ ] Add red card shake + desaturate effect
- [ ] Create button press feedback animations
- [ ] Add scan line continuous animation

### Phase 5: Interactions
- [ ] Wire up all button click handlers
- [ ] Implement keyboard shortcuts
- [ ] Add keyboard shortcut hints/badges
- [ ] Create keyboard shortcuts help modal
- [ ] Implement fullscreen toggle
- [ ] Add confirmation dialogs where needed

### Phase 6: Responsive Design
- [ ] Test and adjust mobile layout
- [ ] Test and adjust tablet layout
- [ ] Test and adjust laptop layout
- [ ] Test on various screen sizes
- [ ] Ensure touch targets are adequate
- [ ] Test landscape/portrait orientations

### Phase 7: Polish & Testing
- [ ] Optimize performance (React.memo where needed)
- [ ] Test all animations for smoothness
- [ ] Ensure 60fps during timer updates
- [ ] Test keyboard shortcuts thoroughly
- [ ] Cross-browser testing
- [ ] Test with actual projector if possible
- [ ] Accessibility review (keyboard navigation)

### Phase 8: Documentation
- [ ] Add inline code comments
- [ ] Create user guide (keyboard shortcuts, features)
- [ ] Document component props and APIs
- [ ] Create deployment instructions

---

## 6. DETAILED COMPONENT SPECIFICATIONS

### 6.1 ScoreboardDisplay Component

**Purpose:** Top 65% of screen - broadcast-quality display visible to spectators

**Props:** None (reads from MatchContext)

**Structure:**
```jsx
<div className="scoreboard-container">
  <ScanLineOverlay />
  <ScoreboardBars active={goalCelebration} />
  
  <div className="scoreboard-content">
    <TeamSection team="teamA" side="left" />
    <CenterDisplay />
    <TeamSection team="teamB" side="right" />
  </div>
</div>
```

**Styling Requirements:**
- Background: Linear gradient from broadcastNavy to steelBlue (135deg)
- Padding: 48px all sides on desktop, 24px on mobile
- Height: 65vh on desktop, 50vh on mobile
- Flexbox: `display: flex, justify-content: space-between, align-items: center`

---

### 6.2 TeamSection Component

**Purpose:** Displays team name, score, and card indicators

**Props:**
```typescript
interface TeamSectionProps {
  team: 'teamA' | 'teamB';
  side: 'left' | 'right';
}
```

**Structure:**
```jsx
<div className={`team-section ${side}`}>
  <div className="team-name">{teamData.name}</div>
  <div className="score-display">{teamData.score}</div>
  <CardIndicators 
    yellowCards={teamData.yellowCards} 
    redCards={teamData.redCards} 
  />
</div>
```

**Styling:**
- Team Name: Bebas Neue, 48px, uppercase, electricMint color
- Score: Rajdhani Bold, 144px, white color
- Align left side to flex-start, right side to flex-end
- Apply scoreChange animation when score updates
- Apply redCardEffect when red card is given

**Animation Triggers:**
- Score change: Scale 1.0 → 1.2 → 1.0 with elastic easing (400ms)
- Goal celebration: Radial pulse + background flash
- Red card: Screen shake + desaturate filter (300ms)

---

### 6.3 CenterDisplay Component

**Purpose:** Shows timer, period, and VS indicator

**Props:** None (reads from MatchContext)

**Structure:**
```jsx
<div className="center-display">
  <div className="vs-indicator">VS</div>
  <div className="timer-display">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>
  <div className="period-display">{period}</div>
</div>
```

**Styling:**
- VS Indicator: Bebas Neue, 32px, slateGray color
- Timer: JetBrains Mono Bold, 72px, white (electricMint if < 5 min remaining)
- Period: Bebas Neue, 24px, uppercase, slateGray color
- Center all text, vertical flex layout

**Special Behavior:**
- Timer turns electricMint when minutes < 5 and period is "First Half" or "Second Half"
- Smooth updates every second with no janky transitions
- No animation on timer value change (instant update)

---

### 6.4 CardIndicators Component

**Purpose:** Small visual display of cards

**Props:**
```typescript
interface CardIndicatorsProps {
  yellowCards: number;
  redCards: number;
}
```

**Structure:**
```jsx
<div className="card-indicators">
  {yellowCards > 0 && (
    <div className="card-badge yellow">
      📒 {yellowCards}
    </div>
  )}
  {redCards > 0 && (
    <div className="card-badge red">
      📕 {redCards}
    </div>
  )}
</div>
```

**Styling:**
- Font: Inter Medium, 18px
- Yellow badge: Background #FFD700, text black
- Red badge: Background broadcastRed, text white
- Display inline-flex with 8px gap
- Padding: 4px 12px, border-radius: 12px

---

### 6.5 ScanLineOverlay Component

**Purpose:** Continuous animated scan line for LED board effect

**Props:** None

**Structure:**
```jsx
<div className="scan-line-overlay">
  <div className="scan-line" />
</div>
```

**CSS:**
```css
.scan-line-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  animation: scanLine 3000ms linear infinite;
}

@keyframes scanLine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

---

### 6.6 ScoreboardBars Component

**Purpose:** Animated light streaks for goal celebrations

**Props:**
```typescript
interface ScoreboardBarsProps {
  active: boolean;
}
```

**Structure:**
```jsx
{active && (
  <div className="scoreboard-bars">
    <div className="bar bar-1" />
    <div className="bar bar-2" />
    <div className="bar bar-3" />
  </div>
)}
```

**CSS:**
```css
.scoreboard-bars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bar {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #00FF87 50%, 
    transparent 100%
  );
  animation: sweepBar 800ms ease-out;
}

.bar-1 { top: 20%; animation-delay: 0ms; }
.bar-2 { top: 50%; animation-delay: 100ms; }
.bar-3 { top: 80%; animation-delay: 200ms; }

@keyframes sweepBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

### 6.7 ControlPanel Component

**Purpose:** Bottom 35% of screen - operator controls

**Props:** None (uses MatchContext)

**Structure:**
```jsx
<div className="control-panel">
  <TeamControls team="teamA" />
  <MatchControls />
  <TeamControls team="teamB" />
</div>
```

**Styling:**
- Background: Linear gradient steelBlue to broadcastNavy
- Padding: 24px
- Height: 35vh on desktop, 50vh on mobile
- Grid layout: 3 columns on desktop, 1 column on mobile
- Gap: 24px between columns

---

### 6.8 TeamControls Component

**Purpose:** Controls for individual team (score, cards, stats)

**Props:**
```typescript
interface TeamControlsProps {
  team: 'teamA' | 'teamB';
}
```

**Structure:**
```jsx
<div className="team-controls">
  <h3>{teamData.name} Controls</h3>
  
  <NameEditor team={team} currentName={teamData.name} />
  
  <ScoreButtons 
    team={team}
    currentScore={teamData.score}
    onIncrement={() => updateScore(team, 1)}
    onDecrement={() => updateScore(team, -1)}
  />
  
  <div className="stats-group">
    <StatControl
      label="Yellow Cards"
      value={teamData.yellowCards}
      icon="📒"
      onIncrement={() => updateCards(team, 'yellowCards', 1)}
      onDecrement={() => updateCards(team, 'yellowCards', -1)}
    />
    
    <StatControl
      label="Red Cards"
      value={teamData.redCards}
      icon="📕"
      onIncrement={() => updateCards(team, 'redCards', 1)}
      onDecrement={() => updateCards(team, 'redCards', -1)}
    />
    
    <StatControl
      label="Fouls"
      value={teamData.fouls}
      onIncrement={() => updateStats(team, 'fouls', 1)}
      onDecrement={() => updateStats(team, 'fouls', -1)}
    />
    
    <StatControl
      label="Corners"
      value={teamData.corners}
      onIncrement={() => updateStats(team, 'corners', 1)}
      onDecrement={() => updateStats(team, 'corners', -1)}
    />
  </div>
</div>
```

**Styling:**
- Background: steelBlue with 0.3 opacity
- Border-radius: 12px
- Padding: 24px
- Flex column layout with 16px gaps

---

### 6.9 ScoreButtons Component

**Purpose:** Large +/- buttons for score control

**Props:**
```typescript
interface ScoreButtonsProps {
  team: 'teamA' | 'teamB';
  currentScore: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
```

**Structure:**
```jsx
<div className="score-buttons">
  <button 
    className="score-btn decrement"
    onClick={onDecrement}
    data-shortcut={team === 'teamA' ? 'Q' : 'O'}
  >
    <span className="btn-icon">-</span>
    <span className="shortcut-badge">{team === 'teamA' ? 'Q' : 'O'}</span>
  </button>
  
  <div className="current-score">{currentScore}</div>
  
  <button 
    className="score-btn increment"
    onClick={onIncrement}
    data-shortcut={team === 'teamA' ? 'W' : 'P'}
  >
    <span className="btn-icon">+</span>
    <span className="shortcut-badge">{team === 'teamA' ? 'W' : 'P'}</span>
  </button>
</div>
```

**Styling:**
- Button size: 60px × 60px
- Background: electricMint for +, broadcastRed for -
- Border-radius: 12px
- Font: Inter Bold, 32px
- Hover: Darken by 10%
- Active: Scale to 0.95
- Transition: 100ms ease-out

**Behavior:**
- Increment button triggers goal celebration animation
- Decrement button shows confirmation if score > 0
- Shortcut badge shows in corner (8px, slateGray)

---

### 6.10 NameEditor Component

**Purpose:** Inline editor for team names

**Props:**
```typescript
interface NameEditorProps {
  team: 'teamA' | 'teamB';
  currentName: string;
}
```

**Structure:**
```jsx
{editing ? (
  <input
    type="text"
    value={tempName}
    onChange={(e) => setTempName(e.target.value)}
    onKeyDown={handleKeyDown}
    onBlur={handleSave}
    maxLength={20}
    autoFocus
    className="name-input"
  />
) : (
  <button onClick={() => setEditing(true)} className="edit-name-btn">
    ✏️ Edit Name
  </button>
)}
```

**Behavior:**
- Click button to enter edit mode
- Input field replaces button
- Enter key saves, Escape cancels
- Blur event saves changes
- Updates scoreboard in real-time
- Maximum 20 characters

**Styling:**
- Button: steelBlue background, white text, 16px Inter
- Input: Same size as button, electricMint border when focused
- Padding: 12px 16px
- Border-radius: 8px

---

### 6.11 MatchControls Component

**Purpose:** Central controls for timer and match state

**Props:** None (uses MatchContext)

**Structure:**
```jsx
<div className="match-controls">
  <div className="timer-display-large">
    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>
  
  <div className="timer-buttons">
    <button 
      onClick={toggleTimer}
      className="timer-btn primary"
      data-shortcut="Space"
    >
      {isRunning ? '⏸ Pause' : '▶ Start'}
      <span className="shortcut-badge">Space</span>
    </button>
    
    <button 
      onClick={resetTimer}
      className="timer-btn secondary"
      data-shortcut="R"
    >
      ⟲ Reset
      <span className="shortcut-badge">R</span>
    </button>
  </div>
  
  <PeriodSelector currentPeriod={period} onChange={updatePeriod} />
  
  <button 
    onClick={() => setShowNextMatchModal(true)}
    className="next-match-btn"
    data-shortcut="N"
  >
    🔄 Next Match
    <span className="shortcut-badge">N</span>
  </button>
  
  <button 
    onClick={toggleFullscreen}
    className="fullscreen-btn"
    data-shortcut="F"
  >
    ⛶ Fullscreen
    <span className="shortcut-badge">F</span>
  </button>
</div>
```

**Styling:**
- Timer display: JetBrains Mono, 48px, electricMint
- Primary button: electricMint background
- Secondary button: steelBlue background
- All buttons: 48px height, Inter Medium 16px
- Gaps: 16px between elements

---

### 6.12 PeriodSelector Component

**Purpose:** Dropdown for selecting match period

**Props:**
```typescript
interface PeriodSelectorProps {
  currentPeriod: string;
  onChange: (period: string) => void;
}
```

**Structure:**
```jsx
<div className="period-selector">
  <label>Period</label>
  <select value={currentPeriod} onChange={(e) => onChange(e.target.value)}>
    <option value="First Half">First Half</option>
    <option value="Half Time">Half Time</option>
    <option value="Second Half">Second Half</option>
    <option value="Extra Time">Extra Time</option>
    <option value="Full Time">Full Time</option>
  </select>
</div>
```

**Styling:**
- Label: Inter Medium, 14px, slateGray, uppercase
- Select: steelBlue background, white text, 16px
- Padding: 12px 16px
- Border-radius: 8px
- Border: 2px solid steelBlue, electricMint when focused

---

### 6.13 StatControl Component

**Purpose:** Reusable +/- control for cards, fouls, corners

**Props:**
```typescript
interface StatControlProps {
  label: string;
  value: number;
  icon?: string;
  onIncrement: () => void;
  onDecrement: () => void;
}
```

**Structure:**
```jsx
<div className="stat-control">
  <label>
    {icon && <span className="icon">{icon}</span>}
    {label}
  </label>
  <div className="stat-buttons">
    <button onClick={onDecrement} className="stat-btn">-</button>
    <span className="stat-value">{value}</span>
    <button onClick={onIncrement} className="stat-btn">+</button>
  </div>
</div>
```

**Styling:**
- Container: Flex row, space-between alignment
- Label: Inter Medium, 14px, slateGray
- Buttons: 32px × 32px, steelBlue background
- Value: JetBrains Mono, 18px, white
- Gap: 8px between elements

---

### 6.14 NextMatchModal Component

**Purpose:** Dialog for starting new match

**Props:**
```typescript
interface NextMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (keepNames: boolean, newNames?: {teamA: string, teamB: string}) => void;
}
```

**Structure:**
```jsx
{isOpen && (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>Start Next Match</h2>
      
      <p>This will reset scores, timer, and all statistics.</p>
      
      <div className="option-group">
        <label>
          <input 
            type="checkbox" 
            checked={keepNames}
            onChange={(e) => setKeepNames(e.target.checked)}
          />
          Keep current team names
        </label>
      </div>
      
      {!keepNames && (
        <div className="name-inputs">
          <input
            type="text"
            placeholder="Team A Name"
            value={newTeamAName}
            onChange={(e) => setNewTeamAName(e.target.value)}
            maxLength={20}
          />
          <input
            type="text"
            placeholder="Team B Name"
            value={newTeamBName}
            onChange={(e) => setNewTeamBName(e.target.value)}
            maxLength={20}
          />
        </div>
      )}
      
      <div className="modal-actions">
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button onClick={handleConfirm} className="btn-primary">
          Start New Match
        </button>
      </div>
    </div>
  </div>
)}
```

**Styling:**
- Overlay: Fixed position, rgba(0,0,0,0.8) background
- Modal: 500px max-width, broadcastNavy background, 24px padding
- Border-radius: 16px
- Inputs: Full width, steelBlue background, 16px padding
- Buttons: Same styling as control panel buttons
- Animation: Fade in 200ms, scale from 0.9 to 1.0

---

### 6.15 KeyboardShortcutsModal Component

**Purpose:** Help dialog showing all keyboard shortcuts

**Props:**
```typescript
interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Structure:**
```jsx
{isOpen && (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content shortcuts-modal">
      <h2>Keyboard Shortcuts</h2>
      
      <div className="shortcuts-grid">
        <div className="shortcut-section">
          <h3>Team A Score</h3>
          <div className="shortcut-item">
            <kbd>Q</kbd> <span>Decrease</span>
          </div>
          <div className="shortcut-item">
            <kbd>W</kbd> <span>Increase</span>
          </div>
        </div>
        
        <div className="shortcut-section">
          <h3>Team B Score</h3>
          <div className="shortcut-item">
            <kbd>O</kbd> <span>Decrease</span>
          </div>
          <div className="shortcut-item">
            <kbd>P</kbd> <span>Increase</span>
          </div>
        </div>
        
        <div className="shortcut-section">
          <h3>Timer</h3>
          <div className="shortcut-item">
            <kbd>Space</kbd> <span>Start/Pause</span>
          </div>
          <div className="shortcut-item">
            <kbd>R</kbd> <span>Reset</span>
          </div>
        </div>
        
        <div className="shortcut-section">
          <h3>Cards - Team A</h3>
          <div className="shortcut-item">
            <kbd>Y</kbd> <span>Yellow Card</span>
          </div>
          <div className="shortcut-item">
            <kbd>U</kbd> <span>Red Card</span>
          </div>
        </div>
        
        <div className="shortcut-section">
          <h3>Cards - Team B</h3>
          <div className="shortcut-item">
            <kbd>I</kbd> <span>Yellow Card</span>
          </div>
          <div className="shortcut-item">
            <kbd>K</kbd> <span>Red Card</span>
          </div>
        </div>
        
        <div className="shortcut-section">
          <h3>Utility</h3>
          <div className="shortcut-item">
            <kbd>F</kbd> <span>Fullscreen</span>
          </div>
          <div className="shortcut-item">
            <kbd>N</kbd> <span>Next Match</span>
          </div>
          <div className="shortcut-item">
            <kbd>Esc</kbd> <span>Close Dialog</span>
          </div>
        </div>
      </div>
      
      <button onClick={onClose} className="close-btn">
        Close
      </button>
    </div>
  </div>
)}
```

**Styling:**
- Modal: 700px max-width
- Grid: 2 columns on desktop, 1 on mobile
- kbd elements: steelBlue background, electricMint border, monospace font
- Shortcut items: Flex row with space-between
- Section headers: Bebas Neue, 20px, electricMint

---

## 7. KEYBOARD SHORTCUTS IMPLEMENTATION

### 7.1 Global Keyboard Handler

Create a custom hook for keyboard shortcuts:

```javascript
// useKeyboardShortcuts.js
import { useEffect } from 'react';
import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';

export const useKeyboardShortcuts = () => {
  const {
    updateScore,
    updateCards,
    toggleTimer,
    resetTimer,
  } = useMatch();
  
  const { triggerGoalCelebration, triggerRedCard } = useAnimations();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key.toLowerCase()) {
        // Team A Score
        case 'q':
          updateScore('teamA', -1);
          break;
        case 'w':
          updateScore('teamA', 1);
          triggerGoalCelebration('teamA');
          break;

        // Team B Score
        case 'o':
          updateScore('teamB', -1);
          break;
        case 'p':
          updateScore('teamB', 1);
          triggerGoalCelebration('teamB');
          break;

        // Timer
        case ' ':
          e.preventDefault();
          toggleTimer();
          break;
        case 'r':
          resetTimer();
          break;

        // Team A Cards
        case 'y':
          updateCards('teamA', 'yellowCards', 1);
          break;
        case 'u':
          updateCards('teamA', 'redCards', 1);
          triggerRedCard('teamA');
          break;

        // Team B Cards
        case 'i':
          updateCards('teamB', 'yellowCards', 1);
          break;
        case 'k':
          updateCards('teamB', 'redCards', 1);
          triggerRedCard('teamB');
          break;

        // Utility
        case 'f':
          toggleFullscreen();
          break;
        case 'n':
          // Open next match modal
          break;
        case 'escape':
          // Close any open modals
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [updateScore, updateCards, toggleTimer, resetTimer]);
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
```

---

## 8. ANIMATION IMPLEMENTATIONS

### 8.1 CSS Animations File

Create a dedicated CSS file for all animations:

```css
/* animations.css */

/* Score Change Animation */
@keyframes scoreChange {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.score-animate {
  animation: scoreChange 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Radial Pulse */
@keyframes radialPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 135, 0.7);
  }
  100% {
    box-shadow: 0 0 0 40px rgba(0, 255, 135, 0);
  }
}

.score-pulse {
  animation: radialPulse 600ms ease-out;
}

/* Goal Celebration Flash */
@keyframes goalFlash {
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(0, 255, 135, 0.3);
  }
}

.goal-celebration-flash {
  animation: goalFlash 100ms ease-in-out;
}

/* Scoreboard Bars Sweep */
@keyframes sweepBar {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.scoreboard-bar {
  animation: sweepBar 800ms ease-out;
}

/* Red Card Shake */
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-2px);
  }
}

.red-card-shake {
  animation: shake 300ms ease-in-out;
  filter: grayscale(0.5);
}

/* Scan Line */
@keyframes scanLine {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

.scan-line {
  animation: scanLine 3000ms linear infinite;
}

/* Button Press */
.button-press {
  transform: scale(0.95);
  transition: transform 100ms ease-out;
}

/* Modal Fade In */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  animation: modalFadeIn 200ms ease-out;
}

/* Hover Glow */
@keyframes hoverGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 135, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 135, 0.6);
  }
}

.button-glow:hover {
  animation: hoverGlow 1500ms ease-in-out infinite;
}
```

---

## 9. TAILWIND CSS CONFIGURATION

### 9.1 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        broadcastNavy: '#0A1628',
        electricMint: '#00FF87',
        steelBlue: '#1E3A5F',
        broadcastRed: '#FF2D55',
        slateGray: '#8E99AB',
        goalGreen: '#34C759',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'score': '144px',
        'team': '48px',
        'timer': '72px',
        'period': '24px',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        'xxl': '64px',
      },
      animation: {
        'score-change': 'scoreChange 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'radial-pulse': 'radialPulse 600ms ease-out',
        'goal-flash': 'goalFlash 100ms ease-in-out',
        'sweep-bar': 'sweepBar 800ms ease-out',
        'shake': 'shake 300ms ease-in-out',
        'scan-line': 'scanLine 3000ms linear infinite',
        'modal-fade': 'modalFadeIn 200ms ease-out',
        'hover-glow': 'hoverGlow 1500ms ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
```

---

## 10. PROJECT STRUCTURE

```
stadium-broadcast-pro/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── scoreboard/
│   │   │   ├── ScoreboardDisplay.jsx
│   │   │   ├── TeamSection.jsx
│   │   │   ├── CenterDisplay.jsx
│   │   │   ├── CardIndicators.jsx
│   │   │   ├── ScanLineOverlay.jsx
│   │   │   └── ScoreboardBars.jsx
│   │   ├── controls/
│   │   │   ├── ControlPanel.jsx
│   │   │   ├── TeamControls.jsx
│   │   │   ├── MatchControls.jsx
│   │   │   ├── ScoreButtons.jsx
│   │   │   ├── NameEditor.jsx
│   │   │