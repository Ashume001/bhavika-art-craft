import './App.css'
import { BrowserRouter,  Route,  Routes } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import AdminDashboard from './admin/AdminDahboard'
import AdminProducts from './admin/AdminProducts'
import AdminOrders from './admin/AdminOrders'
import AdminLogin from './admin/AdminLogin'
import ProtectedRoute from './admin/ProtectedRoute'
import AdminProductList from './admin/AdminProductList'
import AdminEditProduct from './admin/AdminEditProduct'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetails'

function App() {

  return (
     <BrowserRouter>
      <MainLayout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={< Shop />} />
          <Route path="/about" element={<About />  } />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetail />} />


          <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />     
          <Route path="/admin/products/add" element={<ProtectedRoute> <AdminProducts /> </ProtectedRoute> } />
          <Route path="/admin/products/list" element={<ProtectedRoute> <AdminProductList /> </ProtectedRoute> } />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute> <AdminEditProduct /> </ProtectedRoute> } />
          <Route path="/admin/orders" element={<ProtectedRoute>  <AdminOrders /> </ProtectedRoute>} />
          
          <Route path="/admin/login" element={<AdminLogin />} />

        </Routes>

      </MainLayout>
     </BrowserRouter>
  )
}

export default App
