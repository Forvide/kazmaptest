import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3 } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const isMap = location.pathname === '/';

    return (
        <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-10 shrink-0 relative">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                    <Map className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-2xl text-slate-800 tracking-tight">KazMap Civic</span>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner border border-slate-200">
                <Link
                    to="/"
                    className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${isMap
                        ? 'bg-white shadow-sm text-blue-600 border border-slate-200/60'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                        }`}
                >
                    <Map size={18} className={isMap ? "text-blue-600" : "text-slate-400"} />
                    Карта
                </Link>
                <Link
                    to="/dashboard"
                    className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${!isMap
                        ? 'bg-white shadow-sm text-blue-600 border border-slate-200/60'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                        }`}
                >
                    <BarChart3 size={18} className={!isMap ? "text-blue-600" : "text-slate-400"} />
                    Графики
                </Link>
            </div>
        </nav>
    );
}
