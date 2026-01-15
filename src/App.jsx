import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { BookProvider } from './contexts/BookContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import MyPage from './pages/MyPage';
import Admin from './pages/Admin';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          </CartProvider>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
