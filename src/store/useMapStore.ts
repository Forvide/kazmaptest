import { create } from 'zustand';
import { Language } from '../i18n/translations';
import { MapData } from '../types/mapData';

export type MetricType = string;

interface MapState {
    language: Language;
    selectedMetric: MetricType;
    selectedYear: number;
    selectedRegion: string | null;
    mapData: MapData | null;
    loadingMap: boolean;
    setLanguage: (lang: Language) => void;
    setMetric: (metric: MetricType) => void;
    setYear: (year: number) => void;
    setRegion: (region: string | null) => void;
    fetchMapData: () => Promise<void>;
}

export const useMapStore = create<MapState>((set) => ({
    language: 'ru',
    selectedMetric: "registered_ngos",
    selectedYear: 2024,
    selectedRegion: null,
    mapData: null,
    loadingMap: true,
    setLanguage: (lang) => set({ language: lang }),
    setMetric: (metric) => set({ selectedMetric: metric }),
    setYear: (year) => set({ selectedYear: year }),
    setRegion: (region) => set({ selectedRegion: region }),
    fetchMapData: async () => {
        set({ loadingMap: true });
        try {
            const res = await fetch(`${import.meta.env.BASE_URL}data.json`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data: MapData = await res.json();
            set({ mapData: data, loadingMap: false });
        } catch (err) {
            console.error("Failed to load map data:", err);
            set({ loadingMap: false });
        }
    }
}));
