import { useEffect } from 'react';
import KazakhstanMap from '../components/Map/KazakhstanMap';
import ControlPanel from '../components/Controls/ControlPanel';
import RegionSidebar from '../components/Sidebar/RegionSidebar';
import { useMapStore } from '../store/useMapStore';

export default function MapPage() {
    const { fetchMapData, loadingMap } = useMapStore();

    useEffect(() => {
        fetchMapData();
    }, []);

    if (loadingMap) {
        return (
            <div className="flex-1 w-full h-full flex items-center justify-center relative overflow-hidden bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full" />
                    <span className="text-slate-500 font-medium">Загрузка данных / Деректерді жүктеу...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full h-full flex relative overflow-hidden bg-slate-50">
            <ControlPanel />

            {/* Main Map Container */}
            <main className="flex-1 h-full relative z-0">
                {/* Beautiful subtle grid background for techy feel */}
                <div className="absolute inset-0 pattern-dots pattern-slate-200 pattern-bg-white pattern-size-4 pattern-opacity-40 z-[-1]"></div>
                <KazakhstanMap />
            </main>

            <RegionSidebar />
        </div>
    );
}
