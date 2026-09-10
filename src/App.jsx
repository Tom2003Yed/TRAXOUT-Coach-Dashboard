import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SidebarNav from './components/bars/SidebarNav';
import BriefView from './components/dashboard/BriefView';
import TraineesView from './components/dashboard/TraineesView';
import AllTraineesView from './components/dashboard/AllTraineesView';
import TraxoutOverview from './components/dashboard/TraxoutOverview';
import { AppProvider } from './AppContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-[#0d0f12] text-gray-100 flex font-sans selection:bg-cyan-500 selection:text-black" dir="ltr">
          {/* Left Sidebar Navigation */}
          <SidebarNav />

          {/* Main Content View */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<BriefView />} />
              <Route path="/trainees" element={<TraineesView />} />
              <Route path="/analytics" element={<AllTraineesView />} />
              <Route path="/value" element={<TraxoutOverview />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;