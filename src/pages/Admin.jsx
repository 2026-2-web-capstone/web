import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../contexts/BookContext';
import Input from '../components/Input';
import Button from '../components/Button';
import BookCard from '../components/BookCard';

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { books, categories, addBook, updateBook, deleteBook } = useBooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
  }, [isAdmin, navigate]);

  React.useEffect(() => {
    if (editingBook) {
      setValue('title', editingBook.title);
      setValue('author', editingBook.author);
      setValue('publisher', editingBook.publisher);
      setValue('price', editingBook.price);
      setValue('category', editingBook.category);
      setValue('description', editingBook.description);
      setValue('isbn', editingBook.isbn);
      setValue('publishDate', editingBook.publishDate);
      setValue('stock', editingBook.stock);
      setValue('image', editingBook.image);
    } else {
      reset();
    }
  }, [editingBook, setValue, reset]);

  const onSubmit = (data) => {
    const bookData = {
      ...data,
      price: parseInt(data.price),
      stock: parseInt(data.stock),
    };

    if (editingBook) {
      updateBook(editingBook.id, bookData);
      alert('도서 정보가 수정되었습니다.');
    } else {
      addBook(bookData);
      alert('새 도서가 등록되었습니다.');
    }

    setIsModalOpen(false);
    setEditingBook(null);
    reset();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteBook(id);
      alert('도서가 삭제되었습니다.');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">관리자 페이지</h1>
        <Button
          onClick={() => {
            setEditingBook(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          새 도서 등록
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <div key={book.id} className="relative">
            <BookCard book={book} />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
                title="수정"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg"
                title="삭제"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingBook ? '도서 정보 수정' : '새 도서 등록'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="도서명"
                    {...register('title', { required: '도서명을 입력해주세요.' })}
                    error={errors.title?.message}
                  />
                  <Input
                    label="저자"
                    {...register('author', { required: '저자를 입력해주세요.' })}
                    error={errors.author?.message}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="출판사"
                    {...register('publisher', { required: '출판사를 입력해주세요.' })}
                    error={errors.publisher?.message}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      카테고리
                    </label>
                    <select
                      {...register('category', { required: '카테고리를 선택해주세요.' })}
                      className="input"
                    >
                      <option value="">선택하세요</option>
                      {categories.filter(c => c !== '전체').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="가격"
                    type="number"
                    {...register('price', { required: '가격을 입력해주세요.' })}
                    error={errors.price?.message}
                  />
                  <Input
                    label="재고"
                    type="number"
                    {...register('stock', { required: '재고를 입력해주세요.' })}
                    error={errors.stock?.message}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ISBN"
                    {...register('isbn', { required: 'ISBN을 입력해주세요.' })}
                    error={errors.isbn?.message}
                  />
                  <Input
                    label="출간일"
                    type="date"
                    {...register('publishDate', { required: '출간일을 입력해주세요.' })}
                    error={errors.publishDate?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이미지
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      {...register('image')}
                      placeholder="이미지 URL"
                      className="input flex-1"
                    />
                    <label className="btn-secondary cursor-pointer">
                      <Upload size={20} className="mr-2" />
                      파일 업로드
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    {...register('description', { required: '설명을 입력해주세요.' })}
                    className="input"
                    rows="4"
                    error={errors.description?.message}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">
                    {editingBook ? '수정' : '등록'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingBook(null);
                      reset();
                    }}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
