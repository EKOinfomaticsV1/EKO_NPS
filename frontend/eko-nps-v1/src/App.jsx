import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import DashboardNew from './pages/DashboardNew'
import Sidebar from './components/global-components/Sidebar'
import NSSCard from './components/individual-components/NSSCard'
import { Route, Routes, useLocation } from 'react-router-dom'
import ReviewsTablePage from './pages/ReviewsTablePage'
import ProtectedRoute from './components/global-components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation()

  return (
    <div className='font-poppins'>
      {
        location?.pathname?.includes('/login') ?
          ''
          :
          <Sidebar />
      }
      <div className={`${location?.pathname?.includes('/login') ? '' : 'pl-[200px]'}`}>
        {/* <LoginPage /> */}
        {/* <Dashboard /> */}
        <Routes >
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<DashboardNew />} />
            <Route path='/sentiments' element={<Dashboard />} />
            <Route path='/comments' element={<ReviewsTablePage />} />
          </Route>
        </Routes>
        {/*  */}
        {/* <NSSCard/> */}
      </div>
    </div>
  )
}

export default App
