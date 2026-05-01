import { useState } from 'react';
import { useSurveyData } from '../hooks/useSurveyData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

export default function DashboardPage() {
    const { data, regions, loading } = useSurveyData();
    const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState('КАЗАХСТАН');

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!data || data.length === 0) return <div className="flex items-center justify-center w-full h-full text-slate-500">Не удалось загрузить данные опроса локально.</div>;

    const currentQuestion = data[selectedQuestionIdx];

    // Prepare data for the first chart: answers breakdown in the selected region
    const chartData = currentQuestion.answers.map(ans => ({
        name: ans.text.length > 35 ? ans.text.substring(0, 35) + '...' : ans.text,
        fullName: ans.text,
        value: ans.regions[selectedRegion]?.percentFloat || 0,
        count: ans.regions[selectedRegion]?.count || 0
    }));

    // Find the leading answer in Kazakhstan to use as comparison baseline across regions
    let topAnswer = currentQuestion.answers[0];
    if (currentQuestion.answers.length > 0) {
        topAnswer = currentQuestion.answers.reduce((prev, current) =>
            (prev.regions['КАЗАХСТАН']?.percentFloat > current.regions['КАЗАХСТАН']?.percentFloat) ? prev : current
        );
    }

    const regionComparisonData = topAnswer ? regions.filter(r => r !== 'КАЗАХСТАН').map(r => ({
        name: r,
        value: topAnswer.regions[r]?.percentFloat || 0
    })).sort((a, b) => b.value - a.value) : [];

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-50 relative custom-scrollbar flex flex-col">
            <div className="max-w-7xl mx-auto w-full p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 pb-20">

                {/* Header & Controls */}
                <header className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-6 bg-white p-6 lg:p-8 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="max-w-2xl">
                        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase">
                            Данные опроса
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">Графики гражданской активности</h1>
                        <p className="text-slate-500 text-base mt-2">Исследуйте ответы касательно гражданского общества, волонтерства и политической вовлеченности по регионам Казахстана.</p>
                    </div>

                    <div className="flex flex-col items-start gap-2 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Выбор региона</label>
                        <select
                            className="w-full p-3 border-2 border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm appearance-none"
                            value={selectedRegion}
                            onChange={e => setSelectedRegion(e.target.value)}
                        >
                            {regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                </header>

                <main className="flex-1 flex flex-col gap-6 lg:gap-8">

                    {/* Question Selector */}
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-3xl"></div>
                        <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-3 block ml-4">Выберите вопрос опроса</label>
                        <div className="relative ml-4">
                            <select
                                className="w-full p-4 pl-0 bg-transparent font-bold text-xl lg:text-2xl text-slate-800 outline-none cursor-pointer appearance-none group-hover:text-blue-600 transition-colors"
                                value={selectedQuestionIdx}
                                onChange={e => setSelectedQuestionIdx(Number(e.target.value))}
                            >
                                {data.map((q, idx) => (
                                    <option key={idx} value={idx}>{q.text}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                        {/* Main Breakdown Chart */}
                        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col min-h-[500px]">
                            <h2 className="text-xl font-bold text-slate-800 mb-1">Распределение ответов</h2>
                            <p className="text-sm text-slate-500 mb-8 pb-4 border-b border-slate-100">Процентное распределение для <span className="font-semibold text-blue-600">{selectedRegion}</span></p>

                            <div className="flex-1 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={160} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                                            formatter={(value: any, _: any, props: any) => [`${value}% (${props.payload.count} ответов)`, 'Метрики']}
                                            labelFormatter={(_, payload) => <span className="font-bold text-slate-800 mb-2 block">{payload[0]?.payload.fullName}</span>}
                                        />
                                        <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28} animationDuration={1000}>
                                            <LabelList dataKey="value" position="right" formatter={(v: any) => `${v}%`} fill="#475569" fontSize={13} fontWeight={700} />
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? 'url(#colorBlue)' : '#93c5fd'} className="transition-all duration-300 hover:opacity-80 cursor-pointer" />
                                            ))}
                                        </Bar>
                                        <defs>
                                            <linearGradient id="colorBlue" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#6366f1" />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Regional Comparison Chart */}
                        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col min-h-[500px]">
                            <h2 className="text-xl font-bold text-slate-800 mb-1">Сравнение регионов</h2>
                            <p className="text-sm text-slate-500 mb-8 pb-4 border-b border-slate-100">
                                Ответившие: <span className="font-semibold text-indigo-600 line-clamp-1 mt-1" title={topAnswer?.text}>"{topAnswer?.text}"</span>
                            </p>

                            <div className="flex-1 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={regionComparisonData} margin={{ top: 20, right: 0, left: -20, bottom: 80 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} angle={-45} textAnchor="end" axisLine={false} tickLine={false} interval={0} />
                                        <YAxis tick={{ fill: '#64748b', fontSize: 13 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                                            formatter={(value: any) => [`${value}%`, 'Процент']}
                                            labelFormatter={(label) => <span className="font-bold text-slate-800">{label}</span>}
                                        />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                                            {regionComparisonData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.name === selectedRegion ? '#4f46e5' : '#c7d2fe'} className="transition-all duration-300 hover:opacity-80 cursor-pointer" />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Custom scrollbar styles could be defined in index.css */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}
