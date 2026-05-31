import Sidebar from './layouts/Sidebar'
import Header from './layouts/Header'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import Components from './pages/Components'
import CateringMenus from './pages/CateringMenus'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import BadRequest from './pages/BadRequest'
import Unauthorized from './pages/Unauthorized'
import Forbidden from './pages/Forbidden'

function App() {
  return (
    <div id="app-container" className="bg-[#FFF5EB] min-h-screen">
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main Routes with Layout */}
        <Route
          path="/*"
          element={
            <div className="flex">
              <Sidebar />
              <div id="main-content" className="flex-1 p-4">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/customers/:id" element={<CustomerDetail />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/catering-menus" element={<CateringMenus />} />
                  <Route path="/400" element={<BadRequest />} />
                  <Route path="/401" element={<Unauthorized />} />
                  <Route path="/403" element={<Forbidden />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
