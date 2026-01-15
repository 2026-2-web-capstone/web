import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">도서 쇼핑몰</h3>
            <p className="text-gray-400">
              좋은 책을 합리적인 가격에 만나보세요.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">고객센터</h4>
            <ul className="space-y-2 text-gray-400">
              <li>이메일: support@bookmall.com</li>
              <li>전화: 1588-0000</li>
              <li>운영시간: 평일 09:00 - 18:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">정보</h4>
            <ul className="space-y-2 text-gray-400">
              <li>회사소개</li>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 도서 쇼핑몰. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
