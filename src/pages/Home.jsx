import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import BookCard from '../components/BookCard';
import { useBooks } from '../contexts/BookContext';

const Home = () => {
  const { books, getNewBooks, getPopularBooks } = useBooks();
  const newBooks = getNewBooks();
  const popularBooks = getPopularBooks();
  const allBooks = books.slice(0, 8);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            좋은 책과 함께하는 특별한 하루
          </h1>
          <p className="text-xl mb-6 text-primary-100">
            다양한 도서를 만나보고, 지식을 나누며 성장하세요.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>도서 둘러보기</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 신간 도서 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="text-primary-600" size={28} />
            <h2 className="text-2xl font-bold">신간 도서</h2>
          </div>
          <Link
            to="/books?filter=new"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>더보기</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {newBooks.slice(0, 5).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 인기 도서 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-primary-600" size={28} />
            <h2 className="text-2xl font-bold">인기 도서</h2>
          </div>
          <Link
            to="/books?filter=popular"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>더보기</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 전체 도서 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BookOpen className="text-primary-600" size={28} />
            <h2 className="text-2xl font-bold">전체 도서</h2>
          </div>
          <Link
            to="/books"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>더보기</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
