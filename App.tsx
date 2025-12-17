
import React, { useState, useEffect, useRef } from 'react';
import { ClientProfile, Language } from './types';
import { DEFAULT_PROFILE, LABELS } from './constants';
import { generateSalesScript } from './services/geminiService';
import ClientForm from './components/ClientForm';
import ScriptDisplay from './components/ScriptDisplay';
import LanguageToggle from './components/LanguageToggle';
import SavedProfiles from './components/SavedProfiles';
import LotTracker from './components/LotTracker';
import { Building2, Download, Upload, FileJson } from 'lucide-react';

const STORAGE_KEY_PROFILES = 're_scripts_profiles_v2_list';
const STORAGE_KEY_ACTIVE = 're_scripts_active_v2';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ClientProfile>(DEFAULT_PROFILE);
  const [savedProfiles, setSavedProfiles] = useState<ClientProfile[]>([]);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('es');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load everything on mount
  useEffect(() => {
    // Load Saved List
    const storedList = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (storedList) {
      try {
        setSavedProfiles(JSON.parse(storedList));
      } catch (e) { console.error("Error loading profiles list", e); }
    }

    // Load Active Work
    const storedActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (storedActive) {
      try {
        const active = JSON.parse(storedActive);
        if (active.profile) setProfile(active.profile);
        if (active.script) setGeneratedScript(active.script);
        if (active.lang) setLang(active.lang);
      } catch (e) { console.error("Error loading active state", e); }
    }
  }, []);

  // Sync Saved List
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  // Sync Active Work
  useEffect(() => {
    const state = { profile, script: generatedScript, lang };
    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(state));
  }, [profile, generatedScript, lang]);

  const handleProfileChange = (field: keyof ClientProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const script = await generateSalesScript(profile, lang);
      setGeneratedScript(script);
    } catch (err: any) {
      setError(err.message?.includes('API_KEY') ? t.error_api_key : t.error_generic);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    const newProfile = {
      ...profile,
      id: profile.id || Date.now().toString(),
      updatedAt: Date.now()
    };
    setSavedProfiles(prev => {
      const exists = prev.find(p => p.id === newProfile.id);
      if (exists) return prev.map(p => p.id === newProfile.id ? newProfile : p);
      return [newProfile, ...prev];
    });
    setProfile(newProfile);
  };

  const handleDeleteProfile = (id: string) => {
    setSavedProfiles(prev => prev.filter(p => p.id !== id));
    if (profile.id === id) setProfile(DEFAULT_PROFILE);
  };

  const handleClearForm = () => {
    setProfile(DEFAULT_PROFILE);
    setGeneratedScript('');
  };

  // Data management functions
  const exportData = () => {
    const dataStr = JSON.stringify({
      savedProfiles,
      activeProfile: profile,
      script: generatedScript,
      exportDate: new Date().toISOString()
    }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `Respaldo_Inmobiliario_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.savedProfiles) {
          setSavedProfiles(data.savedProfiles);
          if (data.activeProfile) setProfile(data.activeProfile);
          if (data.script) setGeneratedScript(data.script);
          alert(t.importSuccess);
        } else {
          throw new Error("Formato inválido");
        }
      } catch (err) {
        console.error(err);
        alert(t.importError);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const t = LABELS[lang];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-lg text-white shadow-sm"><Building2 className="w-6 h-6" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 hidden sm:block leading-tight">{t.appTitle}</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{t.appSubtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
              <button 
                onClick={exportData}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                title={t.exportData}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Respaldo</span>
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                title={t.importData}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Cargar</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".json" 
                onChange={importData} 
              />
            </div>
            <LanguageToggle currentLang={lang} onToggle={setLang} />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
            <span className="font-bold">!</span>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[700px]">
          {/* Left: Form */}
          <div className="xl:col-span-3 h-full overflow-hidden">
            <ClientForm 
              profile={profile} 
              onChange={handleProfileChange} 
              onSubmit={handleGenerate}
              onSave={handleSaveProfile}
              onClear={handleClearForm}
              isLoading={loading}
              lang={lang}
            />
          </div>

          {/* Center: List & Tracker */}
          <div className="xl:col-span-3 space-y-4 h-full flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
              <SavedProfiles profiles={savedProfiles} onLoad={setProfile} onDelete={handleDeleteProfile} lang={lang} />
            </div>
            <div className="h-[280px]">
              <LotTracker profiles={savedProfiles} lang={lang} />
            </div>
          </div>

          {/* Right: Script Output */}
          <div className="xl:col-span-6 h-full overflow-hidden">
            <ScriptDisplay content={generatedScript} lang={lang} />
          </div>
        </div>
      </main>
      
      {/* Mobile-only Data Buttons */}
      <div className="md:hidden fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        <button 
          onClick={exportData}
          className="p-3 bg-white shadow-xl border border-slate-200 rounded-full text-slate-600 active:scale-95"
          title={t.exportData}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default App;
