# Presentation Mode - Feature Guide

## The Problem You Had

When projecting the scoreboard to spectators, the operator needs to control it, but having the control panel visible takes up space and looks unprofessional. The top 65% wasn't enough screen space for a clean projection.

## The Solution: Presentation Mode 🎥

We've added a **Presentation Mode** that completely solves this problem!

### What It Does

- **Hides all control panels** - Clean, professional display
- **Expands scoreboard to full screen** - Uses 100% of screen height
- **Enables keyboard-only control** - Operator controls invisibly
- **Easy toggle** - Press `Tab` anytime to show/hide controls

## How to Use It

### Method 1: Button Click
1. Click the **"📺 Present"** button in the Match Controls panel
2. Controls disappear, scoreboard expands to full screen
3. Click `Tab` to bring controls back

### Method 2: Keyboard Shortcut (Recommended)
1. Press `Tab` key
2. Controls instantly hide/show
3. Works anytime, even with input fields focused

## Visual Feedback

When in Presentation Mode, you'll see a small indicator in the bottom-right corner:

```
📺 Presentation Mode (Press Tab to toggle controls)
```

This reminds the operator:
- ✅ You're in presentation mode
- ✅ Press Tab to show controls again
- ✅ Gently pulses so it's visible but not distracting

## Perfect Workflow for Live Events

### Before the Match
1. Open application: http://localhost:5173
2. Set up team names (controls visible)
3. Press `F` for fullscreen
4. Press `Tab` for presentation mode
5. ✨ Perfect clean projection!

### During the Match
Use these keyboard shortcuts (all work in presentation mode):

```
W/P     - Score goals (with celebration animations!)
Space   - Start/pause timer
Y/I     - Yellow cards
U/K     - Red cards
Q/O     - Decrease scores
R       - Reset timer
```

### Need to Change Settings?
- Press `Tab` - Controls appear
- Change team names, period, etc.
- Press `Tab` again - Back to presentation

### After the Match
- Press `Tab` - Show controls
- Press `N` - Next match
- Set up new teams
- Press `Tab` - Hide controls again

## Technical Details

### What Changes in Presentation Mode

**Normal Mode:**
- Scoreboard: 65% height (50% on mobile)
- Controls: 35% height (50% on mobile)

**Presentation Mode:**
- Scoreboard: 100% height (full screen)
- Controls: Hidden (0% height)
- Smooth transition animation (300ms)

### Keyboard Shortcut Logic

The `Tab` key is special:
- ✅ Works even when typing in input fields
- ✅ Works when any modal is open
- ✅ Always available, no matter what
- ✅ Prevents default tab navigation

All other shortcuts:
- Only work when NOT typing in input fields
- This prevents accidental score changes while editing names

## Use Cases

### 1. Tournament with Projector
- Projector shows only the scoreboard
- Operator uses laptop keyboard
- Spectators see professional display
- No visible controls

### 2. Stadium Broadcast
- Large screen displays scoreboard
- Multiple operators can use keyboard
- Clean, broadcast-quality appearance
- Instant updates without visible UI

### 3. Streaming/Recording
- Record the scoreboard for highlights
- No control UI in the recording
- Professional-looking output
- Easy to crop or use directly

### 4. Dual Monitor Setup
- Monitor 1: Full scoreboard (presentation mode)
- Monitor 2: Controls visible (for operator)
- Extend display to separate screens
- Best of both worlds!

## Comparison

### Without Presentation Mode ❌
```
┌─────────────────────────────┐
│                             │
│    SCOREBOARD (65%)         │
│    Team A  3 - 2  Team B    │
│                             │
├─────────────────────────────┤
│    CONTROLS (35%)           │
│  [Buttons] [Timer] [Stats]  │
│  Visible to spectators :(   │
└─────────────────────────────┘
```

### With Presentation Mode ✅
```
┌─────────────────────────────┐
│                             │
│                             │
│    SCOREBOARD (100%)        │
│    Team A  3 - 2  Team B    │
│         45:30               │
│                             │
│    Clean Professional!      │
│                             │
└─────────────────────────────┘
       (Tab to show controls)
```

## Tips & Tricks

### Pro Tip #1: Fullscreen First
Always enable fullscreen (`F`) before presentation mode (`Tab`) for the best experience.

### Pro Tip #2: Learn the Shortcuts
Practice these before your event:
- `W` and `P` for goals (most used!)
- `Space` for timer
- `Tab` to show/hide controls

### Pro Tip #3: Print the Quick Reference
Print the keyboard shortcuts card from [QUICK_START.md](QUICK_START.md) and keep it by your laptop.

### Pro Tip #4: Test Animations
In presentation mode, score a few test goals to see the celebration animations and make sure everything looks good on the projector.

### Pro Tip #5: Practice the Toggle
Get comfortable with `Tab` - you'll use it frequently to pop in/out of controls for team name changes or period updates.

## Troubleshooting

### "I can't see the controls!"
- Press `Tab` - you're probably in presentation mode

### "The scoreboard is too small"
- Press `F` for fullscreen
- Press `Tab` for presentation mode
- This gives you maximum screen space

### "Keyboard shortcuts aren't working"
- Make sure you're not typing in an input field
- Click somewhere on the page first
- `Tab` always works for toggling

### "The indicator is distracting"
- It's designed to be subtle (transparent background, small size)
- It pulses gently to be visible but not distracting
- You'll forget it's there after a few minutes
- It's essential for reminding operators how to exit presentation mode

## Future Enhancements

Potential future additions:
- Custom keyboard shortcut configuration
- Hide the indicator after X seconds
- Multiple display profiles
- Operator panel on separate window
- Remote control via mobile app

## Summary

**Presentation Mode solves your exact problem:**
- ✅ Spectators see a clean, full-screen scoreboard
- ✅ Operator controls everything via keyboard
- ✅ Professional broadcast quality
- ✅ Easy to toggle on/off
- ✅ Works perfectly with projectors

**Press `Tab` to enter a whole new world of clean scoreboard projection! 🎥⚽**
