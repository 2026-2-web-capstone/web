import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BookContext';

const BookList = () => {
  const [searchParams] = useSearchParams();
  const { getFilteredBooks, categories, selectedCategory, setSelectedCategory, setSearchQuery } = useBooks();
  const filteredBooks = getFilteredBooks();

  useEffect(() => {
    const query = searchParams.get('q');
    const filter = searchParams.get('filter');
    if (query) {
      setSearchQuery(query);
    }
    if (filter === 'new') {
      // 신간 필터는 별도 처리 필요
    }
  }, [searchParams, setSearchQuery]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">도서 목록</h1>
      
      {/* 카테고리 필터 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 도서 목록 */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default BookList;
