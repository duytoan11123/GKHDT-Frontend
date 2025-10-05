import React from 'react';
import LanguageSetup from './components/LanguageSetup';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', display: 'flex', justifySelf: 'center', width:'100%',margin:'20px auto', flexDirection: 'column' }}>
      <h1>Quản lý Cửa hàng Đa ngôn ngữ</h1>
      
      {/* 1. Thiết lập Ngôn ngữ (Phải làm trước) */}
      <LanguageSetup />

      {/* 2. Tạo Danh mục (Phải làm trước khi tạo Sản phẩm) */}
      <CategoryForm />

      {/* 3. Tạo Sản phẩm */}
      <ProductForm />

    </div>
  );
}

export default App;