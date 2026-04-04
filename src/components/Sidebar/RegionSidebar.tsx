import { useMapStore } from "../../store/useMapStore";
import { metricsLabels, mockData } from "../../data/mockData";
import { regionLabels } from "../../data/regionLabels";
import { X, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function RegionSidebar() {
    const { selectedRegion, selectedYear, setRegion, selectedMetric } = useMapStore();

    if (!selectedRegion) return null;

    const getRegionData = (year: number) => {
        try {
            const rData = mockData.regions[selectedRegion as keyof typeof mockData.regions];
            return rData[year.toString() as keyof typeof rData];
        } catch {
            return null;
        }
    }

    const currentData = getRegionData(selectedYear);
    const prevData = getRegionData(selectedYear - 1);
    const nationalData = mockData.national_totals[selectedYear.toString() as keyof typeof mockData.national_totals];

    return (
        <div className={`fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-20 border-l border-slate-100 transform transition-transform duration-300 ease-in-out flex flex-col`}>
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                <div>
                    <p className="text-xs font-semibold text-brand-600 tracking-wider uppercase mb-1">Регион</p>
                    <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">{regionLabels[selectedRegion as keyof typeof regionLabels] || selectedRegion}</h2>
                </div>
                <button
                    onClick={() => setRegion(null)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">

                {/* National Share Card */}
                {currentData && currentData[selectedMetric as keyof typeof currentData] !== null && nationalData && nationalData[selectedMetric as keyof typeof nationalData] !== null && (
                    <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-5 rounded-2xl mb-8 shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-600 mb-1">{metricsLabels[selectedMetric]}</h3>
                        <div className="flex items-baseline mb-2">
                            <span className="text-4xl font-black text-brand-700 mr-2">
                                {Number(currentData[selectedMetric as keyof typeof currentData]).toLocaleString()}
                            </span>
                        </div>

                        {/* National share progress */}
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-slate-500">Доля по стране</span>
                                <span className="font-bold text-brand-600 flex items-center">
                                    {((Number(currentData[selectedMetric as keyof typeof currentData]) / Number(nationalData[selectedMetric as keyof typeof nationalData])) * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-brand-100 rounded-full h-1.5">
                                <div
                                    className="bg-brand-500 h-1.5 rounded-full"
                                    style={{ width: `${(Number(currentData[selectedMetric as keyof typeof currentData]) / Number(nationalData[selectedMetric as keyof typeof nationalData])) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Все показатели ({selectedYear})</h3>

                {/* Stats Grid / List */}
                {!currentData ? (
                    <div className="text-center py-10 text-slate-400">Нет данных для выбранного года</div>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(metricsLabels).map(([key, label]) => {
                            const metricKey = key as keyof typeof currentData;
                            let value = currentData[metricKey];
                            let prevValue = prevData ? prevData[metricKey] : null;

                            if (value === null || value === undefined) return null; // Skip if no data for this metric

                            const numValue = Number(value);
                            const numPrevValue = prevValue !== null && prevValue !== undefined ? Number(prevValue) : null;

                            const diff = numPrevValue !== null ? numValue - numPrevValue : 0;
                            const isPositive = diff > 0;

                            return (
                                <div key={key} className={`p-4 rounded-xl border ${selectedMetric === key ? 'border-brand-500 bg-brand-50/30' : 'border-slate-100 hover:border-slate-200'} transition-colors`}>
                                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-xl font-bold text-slate-800">{numValue.toLocaleString()}</span>

                                        {numPrevValue !== null && diff !== 0 && (
                                            <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                                                {Math.abs(diff).toLocaleString()}
                                            </div>
                                        )}
                                        {numPrevValue !== null && diff === 0 && (
                                            <div className="flex items-center text-xs font-semibold text-slate-400">
                                                <Minus size={14} className="mr-1" />
                                                0
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
