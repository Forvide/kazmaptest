import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useMapStore } from "../../store/useMapStore";
import { regionLabels } from "../../data/regionLabels";
import { useState } from "react";
import { translations } from "../../i18n/translations";


// Placeholder empty array until GeoJSON is loaded
const geoUrl = `${import.meta.env.BASE_URL}kz.json`;

export default function KazakhstanMap() {
    const { selectedMetric, selectedYear, selectedRegion, setRegion, language, mapData } = useMapStore();
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Function to get region data and calculate color
    const getRegionColor = (geoName: string) => {
        if (!mapData) return "#e2e8f0";
        // If not in our mock data yet, return base color
        if (!mapData.regions[geoName]) {
            return "#e2e8f0"; // slate-200
        }

        const regionDataAllYears = mapData.regions[geoName];
        const regionData = regionDataAllYears[selectedYear.toString()];

        if (!regionData) return "#e2e8f0";

        const value = regionData[selectedMetric];
        if (value === null || value === undefined) return "#e2e8f0";

        // Very simple choropleth logic for now - normalize roughly based on max possible value expected
        const nationalYearData = mapData.national_totals[selectedYear.toString()];
        let nationalTotal = nationalYearData ? nationalYearData[selectedMetric] : null;
        if (!nationalTotal || nationalTotal === 0) return "#99f6e4"; // fallback active color

        const percentage = Number(value) / Number(nationalTotal); // This will be small, let's amplify for visual difference

        // Create varying shades of teal/brand (14b8a6) based on intensity
        if (percentage > 0.15) return "#0f766e"; // 700
        if (percentage > 0.08) return "#14b8a6"; // 500
        if (percentage > 0.04) return "#2dd4bf"; // 400
        if (percentage > 0.01) return "#5eead4"; // 300
        return "#99f6e4"; // 200
    };

    const getRegionValue = (geoName: string) => {
        try {
            if (!mapData) return "Нет данных";
            const region = mapData.regions[geoName];
            if (!region) return "Нет данных";
            const yearData = region[selectedYear.toString()];
            return yearData && yearData[selectedMetric] !== null && yearData[selectedMetric] !== undefined ? yearData[selectedMetric] : "Нет данных";
        } catch {
            return "Нет данных";
        }
    }

    return (
        <div className="w-full h-full relative" onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1200, center: [68, 48] }}
                className="w-full h-full outline-none"
            >
                <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                // In actual kz.json, region name is likely in geo.properties.NAME_1 or similar. 
                                // Adjust property access based on actual json structure later.
                                const regionName = geo.properties.NAME_1 || geo.properties.name || "г.Алматы"; // fallback to trigger mock
                                const isSelected = selectedRegion === regionName;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => setRegion(regionName)}
                                        onMouseEnter={() => {
                                            const displayLabel = regionLabels[regionName] ? regionLabels[regionName][language] || regionName : regionName;
                                            setTooltipContent(`${displayLabel}: ${getRegionValue(regionName)}`);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        style={{
                                            default: {
                                                fill: getRegionColor(regionName),
                                                stroke: "#ffffff",
                                                strokeWidth: 0.75,
                                                outline: "none",
                                                transition: "all 250ms",
                                            },
                                            hover: {
                                                fill: "#0d9488", // highlight color
                                                stroke: "#ffffff",
                                                strokeWidth: 1.5,
                                                outline: "none",
                                                cursor: "pointer",
                                            },
                                            pressed: {
                                                fill: "#0f766e",
                                                outline: "none",
                                            },
                                        }}
                                        className={isSelected ? "!fill-brand-700 !stroke-2" : ""}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip Overlay */}
            {tooltipContent && (
                <div
                    className="absolute pointer-events-none bg-slate-900 text-white px-3 py-2 text-sm rounded shadow-lg transform -translate-x-1/2 -translate-y-full mb-3 z-50 whitespace-nowrap font-medium"
                    style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
                >
                    {tooltipContent}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
                </div>
            )}

            {/* Footer Text */}
            <div className="absolute bottom-4 right-4 max-w-xs md:max-w-md lg:max-w-lg text-xs md:text-sm lg:text-base text-slate-500/80 bg-white/70 p-2 md:p-3 rounded-lg shadow-sm backdrop-blur-md border border-slate-200/50 z-30 pointer-events-none text-justify">
                {translations[language as keyof typeof translations]?.footer?.text}
            </div>
        </div>
    );
}
