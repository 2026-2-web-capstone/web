import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState('');

  const password = watch('password');

  const onSubmit = (data) => {
    try {
      const result = registerUser(data.email, data.password, data.name);
      if (result.success) {
        navigate('/');
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다.',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="비밀번호 확인"
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
            error={errors.passwordConfirm?.message}
          />

          <Button type="submit" className="w-full">
            회원가입
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
