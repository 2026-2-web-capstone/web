import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useBooks } from '../contexts/BookContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const { setSearchQuery: setGlobalSearchQuery } = useBooks();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">도서 쇼핑몰</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="도서명 또는 저자명으로 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <ShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <User size={24} />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      마이페이지
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        관리자 페이지
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="도서명 또는 저자명으로 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <ShoppingCart size={20} />
                    <span>장바구니 ({getTotalItems()})</span>
                  </Link>
                  <Link
                    to="/mypage"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    마이페이지
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                      관리자 페이지
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left p-2 text-gray-700 hover:bg-gray-100 rounded flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-primary-600 hover:bg-gray-100 rounded"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
