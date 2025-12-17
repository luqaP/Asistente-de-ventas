import React, { useState } from 'react';
import { ClientProfile, Language } from '../types';
import { LABELS } from '../constants';
import { Trash2, UserCircle, ArrowUpRight, Search, MapPin, CheckCircle2 } from 'lucide-react';

interface SavedProfilesProps {
  profiles: ClientProfile[];
  onLoad: (profile: ClientProfile) => void;
  onDelete: (id: string) => void;
  lang: Language;
}

const SavedProfiles: React.FC<SavedProfilesProps> = ({ profiles, onLoad, onDelete, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = LABELS[lang];

  const handleDeleteClick = (id: string) => {
    if (window.confirm(t.deleteConfirm)) onDelete(id);
  };

  const filteredProfiles = profiles.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.occupation.toLowerCase().includes(query) ||
      p.lotInfo?.lote.toLowerCase().includes(query)
    );
  });

  if (profiles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 text-center h-full flex flex-col items-center justify-center">
        <UserCircle className="w-12 h-12 text-slate-200 mb-2" />
        <p className="text-slate-400 text-sm">{t.noProfiles}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="bg-slate-800 p-4 text-white">
        <div className="flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-brand-400" />
          <h2 className="font-semibold text-lg">{t.savedProfiles}</h2>
        </div>
      </div>
      
      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((p) => (
            <div key={p.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 truncate">{p.name || 'Sin nombre'}</h3>
                  {/* Fixed: title attribute is not part of Lucide icon props in this environment, moved to wrapper span */}
                  {p.hasVisited && <span title={t.hasVisited} className="flex items-center"><CheckCircle2 className="w-3 h-3 text-green-500" /></span>}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    p.status === 'INTERESTED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.status === 'INTERESTED' ? t.status_interested : t.status_prospect}
                  </span>
                  {p.lotInfo?.lote && (
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1">
                      <MapPin className="w-2 h-2" /> L:{p.lotInfo.lote} M:{p.lotInfo.manzana}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onLoad(p)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg"><ArrowUpRight className="w-4 h-4" /></button>
                <button onClick={() => p.id && handleDeleteClick(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">No hay resultados</div>
        )}
      </div>
    </div>
  );
};

export default SavedProfiles;