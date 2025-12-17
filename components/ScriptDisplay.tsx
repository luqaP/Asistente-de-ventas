import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, MessageSquareText } from 'lucide-react';
import { Language } from '../types';
import { LABELS } from '../constants';

interface ScriptDisplayProps {
  content: string;
  lang: Language;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ content, lang }) => {
  const [copied, setCopied] = React.useState(false);
  const t = LABELS[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    return (
      <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
        <MessageSquareText className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">Listo para generar</p>
        <p className="text-sm">Completa el perfil a la izquierda y presiona generar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 h-full flex flex-col overflow-hidden">
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <MessageSquareText className="w-5 h-5 text-brand-400" />
          {t.resultTitle}
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-full transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied ? t.copied : t.copyBtn}
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
        <div className="prose prose-slate prose-sm max-w-none prose-headings:text-brand-800 prose-p:text-slate-700 prose-strong:text-slate-900 prose-li:text-slate-700">
           <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ScriptDisplay;