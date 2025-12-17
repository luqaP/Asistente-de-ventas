import React from 'react';
import { 
  ClientProfile, 
  ClientStatus, 
  Gender, 
  SocioEconomicStatus, 
  InvestmentObjective, 
  PaymentPlan, 
  SalesTone,
  Language 
} from '../types';
import { LABELS } from '../constants';
import { User, Target, Briefcase, FileText, Save, Trash2, Megaphone, MapPin, Eye, CheckCircle2 } from 'lucide-react';

interface ClientFormProps {
  profile: ClientProfile;
  onChange: (field: keyof ClientProfile, value: any) => void;
  onSubmit: () => void;
  onSave: () => void;
  onClear: () => void;
  isLoading: boolean;
  lang: Language;
}

const ClientForm: React.FC<ClientFormProps> = ({ profile, onChange, onSubmit, onSave, onClear, isLoading, lang }) => {
  const t = LABELS[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof ClientProfile, value);
  };

  const handleLotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange('lotInfo', {
      ...profile.lotInfo,
      [name]: value
    });
  };

  const toggleVisit = () => {
    onChange('hasVisited', !profile.hasVisited);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="bg-brand-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <h2 className="font-semibold text-lg">{t.formTitle}</h2>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onClear}
            className="p-1.5 hover:bg-brand-700 rounded-lg transition-colors"
            title={t.clearBtn}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onSave}
            className="p-1.5 hover:bg-brand-700 rounded-lg transition-colors"
            title={t.saveBtn}
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        
        {/* Status Section */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">{t.status}</label>
          <select 
            name="status" 
            value={profile.status} 
            onChange={handleChange}
            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-slate-50"
          >
            <option value={ClientStatus.PROSPECT}>{t.status_prospect}</option>
            <option value={ClientStatus.INTERESTED}>{t.status_interested}</option>
          </select>
        </div>

        {/* Lot Info Section */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 text-slate-700 border-b border-slate-200 pb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">{t.lotDetails}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <input 
                type="text" 
                name="location" 
                value={profile.lotInfo?.location || ''} 
                onChange={handleLotChange}
                placeholder={t.location}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
              />
            </div>
            <div>
              <input 
                type="text" 
                name="manzana" 
                value={profile.lotInfo?.manzana || ''} 
                onChange={handleLotChange}
                placeholder={t.manzana}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white"
              />
            </div>
            <div>
              <input 
                type="text" 
                name="lote" 
                value={profile.lotInfo?.lote || ''} 
                onChange={handleLotChange}
                placeholder={t.lote}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white"
              />
            </div>
            <div className="col-span-2">
              <input 
                type="text" 
                name="category" 
                value={profile.lotInfo?.category || ''} 
                onChange={handleLotChange}
                placeholder={t.category}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white"
              />
            </div>
          </div>

          {/* New Visit Toggle Button specifically for Lot Context */}
          <div className="pt-2">
            <button
              onClick={toggleVisit}
              className={`w-full p-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all border-2 ${
                profile.hasVisited 
                  ? 'bg-green-600 border-green-600 text-white shadow-md shadow-green-200' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {profile.hasVisited ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  {t.hasVisited}
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Marcar Visita Completada
                </>
              )}
            </button>
          </div>
        </div>

        {/* Personal Data */}
        <div className="space-y-3 pb-2 border-b border-slate-100">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">{t.name}</label>
              <input 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">{t.occupation}</label>
              <input 
                type="text" 
                name="occupation" 
                value={profile.occupation} 
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
             <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">{t.age}</label>
              <input 
                type="number" 
                name="age" 
                value={profile.age} 
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
              />
            </div>
             <div className="col-span-2 space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">{t.ses}</label>
              <select 
                name="ses" 
                value={profile.ses} 
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
              >
                <option value={SocioEconomicStatus.LOW}>{t.ses_low}</option>
                <option value={SocioEconomicStatus.MEDIUM}>{t.ses_medium}</option>
                <option value={SocioEconomicStatus.HIGH}>{t.ses_high}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Investment & Payment */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">{t.objective}</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { val: InvestmentObjective.BUILD_HOME, label: t.obj_build },
                { val: InvestmentObjective.LONG_TERM, label: t.obj_long_term },
                { val: InvestmentObjective.RESELL, label: t.obj_resell },
                { val: InvestmentObjective.COMMERCIAL, label: t.obj_commercial },
              ].map((opt) => (
                <label key={opt.val} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${profile.objective === opt.val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="objective" value={opt.val} checked={profile.objective === opt.val} onChange={handleChange} className="text-brand-600" />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase">{t.payment}</label>
                <select name="paymentPlan" value={profile.paymentPlan} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                  <option value={PaymentPlan.CASH}>{t.pay_cash}</option>
                  <option value={PaymentPlan.INSTALLMENTS}>{t.pay_installments}</option>
                  <option value={PaymentPlan.UNDECIDED}>{t.pay_undecided}</option>
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase">{t.tone}</label>
                <select name="tone" value={profile.tone} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                  <option value={SalesTone.FRIENDLY}>{t.tone_friendly}</option>
                  <option value={SalesTone.FORMAL}>{t.tone_formal}</option>
                  <option value={SalesTone.PERSUASIVE}>{t.tone_persuasive}</option>
                  <option value={SalesTone.DIRECT}>{t.tone_direct}</option>
                </select>
             </div>
          </div>
        </div>
        
        {/* Notes */}
        <div className="space-y-1">
           <label className="text-xs font-medium text-slate-500 uppercase flex items-center gap-1">
             <FileText className="w-3 h-3" /> {t.notes}
           </label>
           <textarea
              name="notes"
              value={profile.notes}
              onChange={handleChange}
              placeholder={t.placeholderNotes}
              rows={3}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm resize-none"
           />
        </div>

      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg transition-all transform active:scale-95 flex justify-center items-center gap-2 ${
            isLoading ? 'bg-slate-300 text-slate-50' : 'bg-brand-600 hover:bg-brand-700 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generating}
            </>
          ) : (
            <>
              <Briefcase className="w-5 h-5" />
              {t.generateBtn}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ClientForm;