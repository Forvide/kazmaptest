import { create } from 'zustand';
import data from '../data/data.json';
import { Language } from '../i18n/translations';

export type MetricType = keyof typeof data.metrics_dict;

interface MapState {
    language: Language;
    selectedMetric: MetricType;
    selectedYear: number;
    selectedRegion: string | null;
    setLanguage: (lang: Language) => void;
    setMetric: (metric: MetricType) => void;
    setYear: (year: number) => void;
    setRegion: (region: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
    language: 'ru',
    selectedMetric: "registered_ngos" as MetricType,
    selectedYear: 2024,
    selectedRegion: null,
    setLanguage: (lang) => set({ language: lang }),
    setMetric: (metric) => set({ selectedMetric: metric }),
    setYear: (year) => set({ selectedYear: year }),
    setRegion: (region) => set({ selectedRegion: region }),
}));
