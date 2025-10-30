import { useState } from 'react';
import { MatchProvider } from './MatchContext';
import { AnimationProvider } from './AnimationContext';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import ScoreboardDisplay from './ScoreboardDisplay';
import ControlPanel from './ControlPanel';

function AppContent() {
  const [showNextMatchModal, setShowNextMatchModal] = useState(false);
  useKeyboardShortcuts(setShowNextMatchModal);

  return (
    <div className="min-h-screen flex flex-col bg-broadcastNavy overflow-hidden">
      <ScoreboardDisplay />
      <ControlPanel />
    </div>
  );
}

function App() {
  return (
    <MatchProvider>
      <AnimationProvider>
        <AppContent />
      </AnimationProvider>
    </MatchProvider>
  );
}

export default App;
