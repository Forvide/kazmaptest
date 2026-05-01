import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    return (
        <BrowserRouter>
            <div className="w-screen h-screen overflow-hidden bg-slate-50 flex flex-col font-sans text-slate-800">
                <Navbar />
                <div className="flex-1 w-full relative overflow-hidden flex">
                    <Routes>
                        <Route path="/" element={<MapPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
