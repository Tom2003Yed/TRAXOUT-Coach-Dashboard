import { useState } from 'react'
import { AppContext } from './AppContext'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/bars/Navbar'
import TraxoutOverview from './components/dashboard/TraxoutOverview'
import SingleTraineeView from './components/dashboard/SingleTraineeView'
import AllTraineesView from './components/dashboard/AllTraineesView'

function App() {
  const [selectedTraineeId, setSelectedTraineeId] = useState(null);

  const contextValue = {
    selectedTraineeId,
    setSelectedTraineeId
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <div className="min-h-screen bg-gray-50 text-gray-900" dir="rtl">
          <Navbar />
          <Routes>
            <Route path='/' element={<AllTraineesView />} />
            <Route path='/single' element={<SingleTraineeView />} />
            <Route path='/traxout' element={<TraxoutOverview />} />
          </Routes>
        </div>
      </AppContext.Provider >
    </BrowserRouter>
  )
}

export default App
