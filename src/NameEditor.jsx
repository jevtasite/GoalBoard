import { useState } from 'react';
import { useMatch } from './MatchContext';
import { Pencil } from 'lucide-react';

const NameEditor = ({ team, currentName }) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(currentName);
  const { updateTeamName } = useMatch();

  const handleSave = () => {
    if (tempName.trim()) {
      updateTeamName(team, tempName.trim());
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTempName(currentName);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        type="text"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        maxLength={20}
        autoFocus
        className="w-full px-4 py-3 bg-steelBlue/50 border-2 border-electricMint text-white font-body rounded-lg focus:outline-none"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="w-full px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body rounded-lg transition-all button-press flex items-center justify-center gap-2"
    >
      <Pencil className="w-4 h-4" />
      Edit Name
    </button>
  );
};

export default NameEditor;
