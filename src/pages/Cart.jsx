import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-gray-500 text-lg mb-4">로그인이 필요합니다.</p>
        <Button onClick={() => navigate('/login')}>로그인하기</Button>
      </div>
    );
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    if (window.confirm('구매하시겠습니까?')) {
      // 구매 내역 저장
      const purchases = cartItems.map(item => ({
        ...item,
        date: new Date().toISOString(),
      }));
      const existingPurchases = JSON.parse(localStorage.getItem(`purchases_${user?.id}`) || '[]');
      localStorage.setItem(`purchases_${user?.id}`, JSON.stringify([...existingPurchases, ...purchases]));
      
      alert('구매가 완료되었습니다!');
      clearCart();
      navigate('/mypage');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h2>
        <p className="text-gray-500 mb-6">원하는 도서를 장바구니에 담아보세요.</p>
        <Link to="/books">
          <Button>도서 둘러보기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 장바구니 아이템 목록 */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex gap-4">
                <Link to={`/books/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                    }}
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/books/${item.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-primary-600">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-2">{item.author}</p>
                  <p className="text-primary-600 font-bold mb-4">
                    {item.price.toLocaleString()}원
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="삭제"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">주문 요약</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>상품 금액</span>
                <span>{getTotalPrice().toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>배송비</span>
                <span>무료</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>총 결제금액</span>
                <span className="text-primary-600">{getTotalPrice().toLocaleString()}원</span>
              </div>
            </div>
            <Button onClick={handleCheckout} className="w-full mb-3">
              구매하기
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                if (window.confirm('장바구니를 비우시겠습니까?')) {
                  clearCart();
                }
              }}
              className="w-full"
            >
              장바구니 비우기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
