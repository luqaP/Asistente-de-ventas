
import React from 'react';
import { ClientProfile, Language, LotInfo } from '../types';
import { LABELS } from '../constants';
import { Map, UserCheck } from 'lucide-react';

interface LotTrackerProps {
  profiles: ClientProfile[];
  lang: Language;
}

const LotTracker: React.FC<LotTrackerProps> = ({ profiles, lang }) => {
  const t = LABELS[lang];

  // Grouping profiles by lot identification
  // Use a more specific type for the groups to avoid 'unknown' errors during iteration
  const lotGroups = profiles.reduce((acc, p) => {
    // Check for lotInfo existence to ensure type safety
    if (!p.lotInfo || !p.lotInfo.lote) return acc;
    const info = p.lotInfo;
    const key = `${info.location}-${info.manzana}-${info.lote}`;
    if (!acc[key]) {
      acc[key] = {
        info: info,
        buyers: []
      };
    }
    acc[key].buyers.push(p);
    return acc;
  }, {} as Record<string, { info: LotInfo, buyers: ClientProfile[] }>);

  // Cast Object.values result as the environment might fail to infer it from the Record type
  const groups = Object.values(lotGroups) as Array<{ info: LotInfo, buyers: ClientProfile[] }>;

  if (groups.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="bg-amber-600 p-4 text-white flex items-center gap-2">
        <Map className="w-5 h-5" />
        <h2 className="font-semibold text-lg">{t.lotTracker}</h2>
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {groups.map((group, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-3 bg-amber-50/30">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-bold text-amber-700 uppercase">{group.info.location}</p>
                <h3 className="text-sm font-bold text-slate-800">
                  Mz: {group.info.manzana} | Lote: {group.info.lote}
                </h3>
                {group.info.category && <p className="text-[10px] text-slate-500 italic">{group.info.category}</p>}
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {group.buyers.length} Leads
              </span>
            </div>
            <div className="space-y-1">
              {group.buyers.map((buyer) => (
                <div key={buyer.id} className="flex items-center gap-2 bg-white p-1.5 rounded border border-slate-100">
                  <UserCheck className={`w-3 h-3 ${buyer.hasVisited ? 'text-green-500' : 'text-slate-300'}`} />
                  <span className="text-xs text-slate-700 truncate">{buyer.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotTracker;
