import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center bg-slate-200 rounded-full p-1 cursor-pointer w-fit">
      <button
        onClick={() => onToggle('es')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
          currentLang === 'es'
            ? 'bg-white text-brand-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
          currentLang === 'en'
            ? 'bg-white text-brand-700 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;