import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    try {
      const result = login(data.email, data.password);
      if (result.success) {
        navigate(-1); // 이전 페이지로 이동
      } else {
        setError('로그인에 실패했습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="이메일"
            type="email"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            label="비밀번호"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              회원가입
            </Link>
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">테스트 계정:</p>
          <p className="text-sm">일반 사용자: user@example.com / password</p>
          <p className="text-sm">관리자: admin@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
