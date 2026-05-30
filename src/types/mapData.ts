export type MetricType = string;

export interface RegionYearData {
    [metric: string]: number | null;
}

export interface MapData {
    years: number[];
    metrics_dict: Record<string, string>;
    national_totals: Record<string, RegionYearData>;
    regions: Record<string, Record<string, RegionYearData>>;
}
