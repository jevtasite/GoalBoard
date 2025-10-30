# GoalBoard - Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173**

---

## Presentation Mode - The Solution! 🎥

**Problem Solved:** The operator can now control everything while spectators only see the scoreboard!

### How It Works:
1. Click the **"📺 Present"** button (or press `Tab`)
2. Controls disappear - only the scoreboard fills the screen
3. Use keyboard shortcuts to control everything
4. Press `Tab` again to bring back controls when needed

### Perfect for Live Events:
- ✅ Spectators see a clean, professional scoreboard
- ✅ Operator controls via keyboard (no visible buttons)
- ✅ Instant toggle between control and presentation view
- ✅ Works great with projectors and large displays

---

## First Time Setup

1. **Edit Team Names**
   - Click "Edit Name" button under each team
   - Type the team names
   - Press Enter to save

2. **Enter Presentation Mode**
   - Click "📺 Present" button or press `Tab`
   - Scoreboard expands to full screen
   - Controls are hidden

3. **Start the Match**
   - Press `Space` to start the timer
   - Use keyboard shortcuts to update scores and stats

---

## Keyboard Shortcuts Reference

### Essential Controls (Work in Presentation Mode!)
```
┌─────────────────────────────────────┐
│  PRESENTATION MODE                  │
├─────────────────────────────────────┤
│  Tab - Toggle presentation mode     │
│                                     │
│  SCORE CONTROLS                     │
├─────────────────────────────────────┤
│  Q - Team A score -1                │
│  W - Team A score +1 (GOAL!)        │
│  O - Team B score -1                │
│  P - Team B score +1 (GOAL!)        │
├─────────────────────────────────────┤
│  TIMER                              │
├─────────────────────────────────────┤
│  Space - Start/Pause timer          │
│  R - Reset timer                    │
├─────────────────────────────────────┤
│  CARDS (Team A / Team B)            │
├─────────────────────────────────────┤
│  Y / I - Yellow card +1             │
│  U / K - Red card +1                │
├─────────────────────────────────────┤
│  UTILITY                            │
├─────────────────────────────────────┤
│  F - Fullscreen                     │
│  N - Next match                     │
│  Esc - Close dialog                 │
└─────────────────────────────────────┘
```

---

## Common Tasks

### During a Match (Presentation Mode)

**Score a Goal:**
- Press `W` for Team A or `P` for Team B
- Watch the goal celebration animation!
- Scoreboard updates automatically

**Give a Card:**
- Yellow: `Y` (Team A) or `I` (Team B)
- Red: `U` (Team A) or `K` (Team B)
- Red cards trigger shake effect

**Control the Timer:**
- `Space` - Start/Pause
- `R` - Reset to 00:00

**Toggle Controls:**
- `Tab` - Show/hide control panel
- Use when you need to change team names or period

### Between Matches

**Start a New Match:**
1. Press `Tab` to show controls
2. Click "🔄 Next Match" or press `N`
3. Choose to keep or change team names
4. Click "Start New Match"
5. Press `Tab` to return to presentation mode

---

## For Projection - Best Practices

### Setup for Live Event

1. **Connect Laptop to Projector**
   - Use HDMI or DisplayPort cable
   - Set display mode to "Duplicate"

2. **Open the Application**
   - Launch browser and go to http://localhost:5173

3. **Enable Fullscreen + Presentation Mode**
   - Press `F` for fullscreen
   - Press `Tab` for presentation mode
   - Now you have a clean, full-screen scoreboard!

4. **Operate During Match**
   - Use keyboard shortcuts for all controls
   - Spectators only see the scoreboard
   - You control everything invisibly

### Recommended Workflow

```
Before Match:
1. Enter team names (with controls visible)
2. Press F for fullscreen
3. Press Tab for presentation mode

During Match:
- W/P for goals
- Space to control timer
- Y/I/U/K for cards
- Tab to temporarily show controls if needed

After Match:
- Tab to show controls
- N for next match
- Repeat!
```

### Tips for Best Results

- **Practice keyboard shortcuts** before the event
- **Keep a cheat sheet** nearby for first few times
- **Test animations** before going live
- **Use fullscreen mode** (F) + presentation mode (Tab)
- **Keep laptop plugged in** (animations use more power)
- **Close other browser tabs** for better performance

---

## Troubleshooting

### Can't see controls
- Press `Tab` to toggle presentation mode
- You might be in presentation mode!

### Keyboard shortcuts not working
- Make sure you're not typing in an input field
- Click somewhere on the page to ensure focus
- `Tab` key always works to toggle presentation mode

### Scoreboard looks cut off on projector
- Press `F` for fullscreen mode
- Adjust projector resolution settings
- Try zooming out in browser (Ctrl + -)

### Application won't start
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Production Build

To create a production build for deployment:

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

Deploy the `dist/` folder to any static hosting service.

---

## Quick Reference Card

Print this out for live events:

```
═══════════════════════════════════════
      GOALBOARD - OPERATOR CARD
═══════════════════════════════════════

PRESENTATION MODE:     Tab
FULLSCREEN:            F

TEAM A SCORES:         Q (-1)  W (+1)
TEAM B SCORES:         O (-1)  P (+1)

TIMER:                 Space (start/pause)
                       R (reset)

TEAM A CARDS:          Y (yellow)  U (red)
TEAM B CARDS:          I (yellow)  K (red)

NEXT MATCH:            N
CLOSE DIALOG:          Esc

═══════════════════════════════════════
   Press Tab to hide/show controls!
═══════════════════════════════════════
```

---

**Ready to go! Press `F` then `Tab` for the perfect projection setup! ⚽📺**
