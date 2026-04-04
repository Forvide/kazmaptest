import KazakhstanMap from './components/Map/KazakhstanMap';
import ControlPanel from './components/Controls/ControlPanel';
import RegionSidebar from './components/Sidebar/RegionSidebar';

function App() {
    return (
        <div className="w-screen h-screen overflow-hidden bg-slate-50 flex">
            <ControlPanel />

            {/* Main Map Container */}
            <main className="flex-1 h-full relative z-0">
                {/* Beautiful subtle grid background for techy feel */}
                <div className="absolute inset-0 pattern-dots pattern-slate-200 pattern-bg-white pattern-size-4 pattern-opacity-40 z-[-1]"></div>
                <KazakhstanMap />
            </main>

            <RegionSidebar />
        </div>
    )
}

export default App
