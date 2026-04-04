import { create } from 'zustand';
import data from '../data/data.json';

export type MetricType = keyof typeof data.metrics_dict;

interface MapState {
    selectedMetric: MetricType;
    selectedYear: number;
    selectedRegion: string | null;
    setMetric: (metric: MetricType) => void;
    setYear: (year: number) => void;
    setRegion: (region: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
    selectedMetric: "registered_ngos" as MetricType,
    selectedYear: 2024,
    selectedRegion: null,
    setMetric: (metric) => set({ selectedMetric: metric }),
    setYear: (year) => set({ selectedYear: year }),
    setRegion: (region) => set({ selectedRegion: region }),
}));
