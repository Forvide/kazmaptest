import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3 } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { translations } from '../../i18n/translations';

export default function Navbar() {
    const location = useLocation();
    const isMap = location.pathname === '/';
    const { language, setLanguage } = useMapStore();
    const t = translations[language].nav;

    return (
        <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 shrink-0 relative">
            <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="w-9 h-9" />
                <span className="font-extrabold text-2xl text-slate-800 tracking-tight">{t.title}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
                    <Link
                        to="/"
                        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${isMap
                            ? 'bg-white shadow-sm text-blue-600 border border-slate-200/60'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                    >
                        <Map size={18} className={isMap ? "text-blue-600" : "text-slate-400"} />
                        {t.map}
                    </Link>
                    <Link
                        to="/dashboard"
                        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${!isMap
                            ? 'bg-white shadow-sm text-blue-600 border border-slate-200/60'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                            }`}
                    >
                        <BarChart3 size={18} className={!isMap ? "text-blue-600" : "text-slate-400"} />
                        {t.charts}
                    </Link>
                </div>

                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <button
                        onClick={() => setLanguage('ru')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'ru' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                    >
                        RU
                    </button>
                    <button
                        onClick={() => setLanguage('kk')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'kk' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                    >
                        KK
                    </button>
                </div>
            </div>
        </nav>
    );
}
