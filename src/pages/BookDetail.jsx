import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const book = getBookById(id);

  useEffect(() => {
    // localStorage에서 리뷰 불러오기
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [id]);

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">도서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    alert('장바구니에 추가되었습니다!');
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (!reviewText.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId: user?.id,
      userName: user?.name,
      rating,
      text: reviewText,
      date: new Date().toISOString(),
    };

    let updatedReviews;
    if (editingReviewId) {
      updatedReviews = reviews.map(r => r.id === editingReviewId ? { ...newReview, id: editingReviewId } : r);
      setReviews(updatedReviews);
      setEditingReviewId(null);
    } else {
      updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
    }

    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setReviewText('');
    setRating(5);
  };

  const handleEditReview = (review) => {
    if (!user || review.userId !== user.id) return;
    setReviewText(review.text);
    setRating(review.rating);
    setEditingReviewId(review.id);
  };

  const handleDeleteReview = (reviewId) => {
    if (!window.confirm('리뷰를 삭제하시겠습니까?')) return;
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
  };

  const userReview = reviews.find(r => r.userId === user?.id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 이미지 */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4]">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
            }}
          />
        </div>

        {/* 정보 */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <div className="space-y-3 mb-6">
            <div>
              <span className="text-gray-600">저자:</span>
              <span className="ml-2 font-medium">{book.author}</span>
            </div>
            <div>
              <span className="text-gray-600">출판사:</span>
              <span className="ml-2 font-medium">{book.publisher}</span>
            </div>
            <div>
              <span className="text-gray-600">카테고리:</span>
              <span className="ml-2 font-medium">{book.category}</span>
            </div>
            <div>
              <span className="text-gray-600">ISBN:</span>
              <span className="ml-2 font-medium">{book.isbn}</span>
            </div>
            <div>
              <span className="text-gray-600">출간일:</span>
              <span className="ml-2 font-medium">{book.publishDate}</span>
            </div>
            <div>
              <span className="text-gray-600">재고:</span>
              <span className="ml-2 font-medium">{book.stock}권</span>
            </div>
          </div>

          <div className="border-t pt-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-primary-600">
                {book.price.toLocaleString()}원
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <label className="text-gray-700">수량:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>장바구니에 담기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">도서 소개</h2>
        <p className="text-gray-700 leading-relaxed">{book.description}</p>
      </div>

      {/* 리뷰 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <MessageSquare className="text-primary-600" size={24} />
          <span>리뷰 ({reviews.length})</span>
        </h2>

        {/* 리뷰 작성 */}
        {isAuthenticated && !userReview && (
          <div className="card p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                평점
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl"
                  >
                    <Star
                      className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      size={32}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰를 작성해주세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
              rows="4"
            />
            <Button onClick={handleSubmitReview}>
              {editingReviewId ? '리뷰 수정' : '리뷰 등록'}
            </Button>
          </div>
        )}

        {/* 리뷰 목록 */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">{review.userName}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  {user?.id === review.userId && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="p-1 text-gray-600 hover:text-primary-600"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              아직 리뷰가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
