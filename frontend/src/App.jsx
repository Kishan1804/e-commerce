import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Notfound from './pages/Notfound'
import ManageProduct from './admin/ManageProduct'
import Contact from './pages/Contact'
import ProtectedRoute from './route/ProtectedRoute'
import AdminRoute from './route/AdminRoute'
import Addtocart from './pages/Addtocart'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/manageproduct' element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageProduct />
            </AdminRoute>
          </ProtectedRoute>
        }
        />

        <Route path='/profile' element={<Profile />} />
        <Route path='/product-detail/:id' element={<ProductDetail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Addtocart />} />
        
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
