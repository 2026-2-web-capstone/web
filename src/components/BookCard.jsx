import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <Link to={`/books/${book.id}`} className="block">
      <div className="card p-4 h-full flex flex-col group">
        <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 aspect-[3/4]">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
            }}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          <p className="text-gray-500 text-xs mb-3">{book.publisher}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {book.price.toLocaleString()}원
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                title="장바구니에 추가"
              >
                <ShoppingCart size={18} />
              </button>
              <Link
                to={`/books/${book.id}`}
                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                title="상세보기"
              >
                <Eye size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
