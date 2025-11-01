import { useState } from 'react';
import { useMatch } from '../../contexts/MatchContext';
import { useTranslation } from '../../contexts/TranslationContext';

const NextMatchModal = ({ isOpen, onClose }) => {
  const [keepNames, setKeepNames] = useState(true);
  const [newTeamAName, setNewTeamAName] = useState('');
  const [newTeamBName, setNewTeamBName] = useState('');
  const { resetMatch, updateTeamName } = useMatch();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleConfirm = () => {
    resetMatch(keepNames);
    if (!keepNames && newTeamAName.trim() && newTeamBName.trim()) {
      updateTeamName('teamA', newTeamAName.trim());
      updateTeamName('teamB', newTeamBName.trim());
    }
    setNewTeamAName('');
    setNewTeamBName('');
    setKeepNames(true);
    onClose();
  };

  const handleCancel = () => {
    setNewTeamAName('');
    setNewTeamBName('');
    setKeepNames(true);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleCancel}
    >
      <div
        className="bg-broadcastNavy rounded-2xl p-6 md:p-8 max-w-md w-full modal-animate shadow-2xl border-2 border-steelBlue"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-heading text-3xl text-electricMint mb-4 uppercase tracking-wide">
          {t('startNextMatchTitle')}
        </h2>

        <p className="font-body text-white mb-6">
          {t('startNextMatchMessage')}
        </p>

        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={keepNames}
              onChange={(e) => setKeepNames(e.target.checked)}
              className="w-5 h-5 accent-electricMint cursor-pointer"
            />
            <span className="font-body text-white group-hover:text-electricMint transition-colors">
              {t('keepTeamNames')}
            </span>
          </label>
        </div>

        {!keepNames && (
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder={t('teamANamePlaceholder')}
              value={newTeamAName}
              onChange={(e) => setNewTeamAName(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 bg-steelBlue text-white font-body rounded-lg focus:outline-none focus:ring-2 focus:ring-electricMint"
            />
            <input
              type="text"
              placeholder={t('teamBNamePlaceholder')}
              value={newTeamBName}
              onChange={(e) => setNewTeamBName(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 bg-steelBlue text-white font-body rounded-lg focus:outline-none focus:ring-2 focus:ring-electricMint"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body rounded-lg transition-all button-press"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press"
          >
            {t('startNewMatch')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextMatchModal;
