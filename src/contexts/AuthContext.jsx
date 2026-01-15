import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 사용자 정보 불러오기
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // 간단한 Mock 로그인 (실제로는 API 호출)
    const mockUser = {
      id: 1,
      email,
      name: email.split('@')[0],
      role: email === 'admin@example.com' ? 'admin' : 'user',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const register = (email, password, name) => {
    // 간단한 Mock 회원가입
    const newUser = {
      id: Date.now(),
      email,
      name,
      role: 'user',
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
