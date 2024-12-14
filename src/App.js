import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';  
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Category from './pages/Category';
import Product from './pages/Product';
import UpdateCategory from './pages/UpdateCategory';
import UpdateProduct from './pages/UpdateProduct';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
        <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/" element={<Login />} />
           <Route path="/usermanage" element={<UserManagement />} />
           <Route path="/category" element={<Category />} />
           <Route path="/product" element={<Product />} />
           <Route path="/add_product" element={<AddProduct />} />
           <Route path="/update-category/:id" element={<UpdateCategory />} />
           <Route path="/update_product/:id" element={<UpdateProduct />} />  {/* Use element prop here */}
        </Routes>
    </Router>
  );
}

export default App;
