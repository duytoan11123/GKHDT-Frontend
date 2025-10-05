// src/components/CategoryForm.js

import React, { useState } from 'react';
import axios from 'axios';

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '8px'
};

const buttonStyle = {
    padding: '10px 15px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const translationBoxStyle = {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    color: '#333'
};
const API_URL = 'http://localhost:9090/api/categories';
const AVAILABLE_LANGUAGES = ['en', 'vi']; // Sử dụng các ID đã thêm

function CategoryForm() {

    const [canBeShipped, setCanBeShipped] = useState(false);
    const [message, setMessage] = useState('');
    const [translations, setTranslations] = useState(
        AVAILABLE_LANGUAGES.map(lang => ({
            languageId: lang,
            categoryName: ''
        }))
    );

    const handleTranslationChange = (langId, value) => {
        setTranslations(prevTranslations =>
            prevTranslations.map(t =>
                t.languageId === langId ? { ...t, categoryName: value } : t
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Đang xử lý...');

        const categoryData = {
            canBeShipped,
            // Chỉ gửi các bản dịch đã có tên danh mục
            translations: translations.filter(t => t.categoryName.trim() !== '')
        };

        try {
            const response = await axios.post(API_URL, categoryData);

            setMessage(`Tạo Danh mục thành công! ID: ${response.data.productCategoryId}`);
            setCanBeShipped(false);
            setTranslations(AVAILABLE_LANGUAGES.map(lang => ({ languageId: lang, categoryName: '' })));

        } catch (error) {
            const errorMsg = error.response ? `Lỗi: ${error.response.data.message || error.response.statusText}` : 'Lỗi kết nối.';
            setMessage(errorMsg);
            console.error('Lỗi khi tạo danh mục:', error.response || error);
        }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ color: '#007bff', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                Tạo Danh mục Đa ngôn ngữ 📚
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Thuộc tính cơ bản */}
                <div style={{ marginBottom: '20px', padding: '10px', border: '1px dashed #ccc' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Thuộc tính cơ bản</h4>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={canBeShipped}
                            onChange={(e) => setCanBeShipped(e.target.checked)}
                            style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontWeight: 'bold' }}>Có thể vận chuyển (CanBeShipped)</span>
                    </label>
                </div>

                {/* Khu vực Dịch thuật */}
                <h4 style={{ color: '#5a5a5a', marginBottom: '15px' }}>Thông tin Dịch thuật</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {translations.map((t) => (
                        <div key={t.languageId} style={translationBoxStyle}>
                            <label style={labelStyle}>Tên Danh mục ({t.languageId.toUpperCase()}):</label>
                            <input
                                type="text"
                                value={t.categoryName}
                                onChange={(e) => handleTranslationChange(t.languageId, e.target.value)}
                                required={t.languageId === 'en'}
                                style={inputStyle}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" style={{ ...buttonStyle, marginTop: '20px' }}>
                    Lưu Danh mục (POST API)
                </button>
            </form>
            <p style={{ color: message.includes('Lỗi') ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
                {message}
            </p>
        </div>
    );
}

export default CategoryForm;