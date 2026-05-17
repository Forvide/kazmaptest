import { useMapStore, MetricType } from '../../store/useMapStore';
import { translations } from '../../i18n/translations';

export default function ControlPanel() {
    const { language, selectedMetric, selectedYear, setMetric, setYear } = useMapStore();
    const t = translations[language].controlPanel;
    const metricsLabels = translations[language].metrics;

    return (
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl w-80 border border-slate-100">
            <h2 className="text-xl font-bold mb-4 text-slate-800">{t.title}</h2>

            {/* Metric Selector */}
            <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t.metric}</label>
                <div className="relative">
                    <select
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2.5 appearance-none cursor-pointer hover:border-slate-300 transition-colors shadow-sm"
                        value={selectedMetric}
                        onChange={(e) => setMetric(e.target.value as MetricType)}
                    >
                        {Object.entries(metricsLabels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Year Selector */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">ГОД</label>
                    <span className="text-brand-600 font-bold">{selectedYear}</span>
                </div>
                <input
                    type="range"
                    min="2020"
                    max="2025"
                    step="1"
                    value={selectedYear}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium px-1">
                    <span>2020</span>
                    <span>2025</span>
                </div>
            </div>
        </div>
    );
}
