import { Code } from 'lucide-react';

const DeveloperCredit = () => {
  return (
    <div className="fixed bottom-4 left-4 z-40 group">
      <a
        href="https://jevta.site"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 bg-steelBlue/80 hover:bg-steelBlue backdrop-blur-sm border border-electricMint/30 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <Code className="w-4 h-4 text-electricMint" />
        <span className="font-body text-sm text-white font-medium">
          Developed by <span className="text-electricMint font-semibold">Jevta</span>
        </span>
      </a>
    </div>
  );
};

export default DeveloperCredit;
