import React from 'react';
// Giả sử các components này đã tồn tại trong thư mục components
import LanguageSetup from './components/LanguageSetup'; 
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import CategoriesDisplay from './components/CategoriesDisplay';

function App() {
  return (
    <div className="App" style={{ 
        fontFamily: 'Arial, sans-serif', 
        width: '90%', 
        margin: '20px auto', 
        display: 'flex', 
        flexDirection: 'column' /* Vẫn giữ column cho tiêu đề */
    }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Quản lý Cửa hàng Đa ngôn ngữ</h1>
      
      {/* Container chính chia thành 2 cột, đã sử dụng 'row-reverse' để đảo ngược vị trí */}
      <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '20px' }}>
        
        {/* CỘT BÊN PHẢI (trực quan) - chiếm 2/3 không gian */}
        <div style={{ flex: 2, minWidth: '300px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.2em', marginBottom: '15px', color: '#333' }}>Danh Mục Hiện Có</h2>
            <CategoriesDisplay/>
        </div>

        {/* CỘT BÊN TRÁI (trực quan) - chiếm 1/3 không gian */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.2em', marginBottom: '15px', color: '#333', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Thiết Lập & Nhập Liệu</h2>
            
            {/* 1. Thiết lập Ngôn ngữ */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <LanguageSetup />
            </div>

            {/* 2. Tạo Danh mục */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <CategoryForm />
            </div>

            {/* 3. Tạo Sản phẩm */}
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <ProductForm />
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
