import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, ShoppingBag, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Input from '../components/Input';
import Button from '../components/Button';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [purchases, setPurchases] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }

    // localStorage에서 구매 내역 불러오기
    const savedPurchases = localStorage.getItem(`purchases_${user?.id}`);
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases));
    }

    // localStorage에서 작성한 리뷰 불러오기
    const allReviews = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('reviews_')) {
        const bookReviews = JSON.parse(localStorage.getItem(key));
        const userReviews = bookReviews.filter(r => r.userId === user?.id);
        allReviews.push(...userReviews);
      }
    }
    setReviews(allReviews);
  }, [user, isAuthenticated, navigate, setValue]);

  const onSubmit = (data) => {
    updateUser(data);
    alert('정보가 수정되었습니다.');
  };

  const handleWithdraw = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      logout();
      navigate('/');
      alert('탈퇴되었습니다.');
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="card p-4 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'profile' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span>내 정보</span>
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'purchases' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={20} />
              <span>구매 목록</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'reviews' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} />
              <span>내가 쓴 댓글</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'settings' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
              }`}
            >
              <Settings size={20} />
              <span>설정</span>
            </button>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">내 정보 조회/수정</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <Input
                  label="이름"
                  type="text"
                  {...register('name', {
                    required: '이름을 입력해주세요.',
                  })}
                  error={errors.name?.message}
                />
                <Input
                  label="이메일"
                  type="email"
                  disabled
                  {...register('email')}
                />
                <Button type="submit">정보 수정</Button>
              </form>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">구매 목록</h2>
              {purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={purchase.image}
                          alt={purchase.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{purchase.title}</h3>
                          <p className="text-gray-600 text-sm">{purchase.author}</p>
                          <p className="text-primary-600 font-bold mt-2">
                            {purchase.price.toLocaleString()}원 × {purchase.quantity}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            구매일: {new Date(purchase.date).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  구매 내역이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">내가 쓴 댓글</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  작성한 댓글이 없습니다.
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">설정</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">회원 탈퇴</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
                  </p>
                  <Button variant="danger" onClick={handleWithdraw}>
                    회원 탈퇴
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
