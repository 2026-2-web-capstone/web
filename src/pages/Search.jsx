import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BookContext';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { getFilteredBooks, setSearchQuery } = useBooks();
  
  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  const filteredBooks = getFilteredBooks();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        검색 결과: "{query}"
      </h1>
      
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

export default Search;
