// src/components/ProductForm.js

import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9090/api/products';
const AVAILABLE_LANGUAGES = ['en', 'vi']; // Sử dụng các ID đã thêm
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

function ProductForm() {
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [message, setMessage] = useState('');

    const [translations, setTranslations] = useState(
        AVAILABLE_LANGUAGES.map(lang => ({
            languageId: lang,
            productName: '',
            productDescription: ''
        }))
    );

    const handleTranslationChange = (langId, field, value) => {
        setTranslations(prevTranslations =>
            prevTranslations.map(t =>
                t.languageId === langId ? { ...t, [field]: value } : t
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Đang xử lý...');

        const productData = {
            price: parseFloat(price),
            weight: parseFloat(weight),
            productCategoryId: parseInt(categoryId),
            translations: translations.filter(t => t.productName.trim() !== '')
        };

        try {
            const response = await axios.post(API_URL, productData);

            setMessage(`Tạo Sản phẩm thành công! ID: ${response.data.productId}`);

            // Reset form sau khi thành công
            setPrice('');
            setWeight('');
            setCategoryId('');
            setTranslations(AVAILABLE_LANGUAGES.map(lang => ({ languageId: lang, productName: '', productDescription: '' })));

        } catch (error) {
            const errorMsg = error.response ? `Lỗi: ${error.response.data.message || error.response.statusText}` : 'Lỗi kết nối.';
            setMessage(`Lỗi: ${errorMsg}`);
            console.error('Lỗi khi tạo sản phẩm:', error.response || error);
        }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginTop: '30px'
        }}>
            <h2 style={{ color: '#d9534f', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                Tạo Sản phẩm Đa ngôn ngữ 📦
            </h2>
            <form onSubmit={handleSubmit}>

                {/* Thông tin sản phẩm cơ bản */}
                <h3 style={{ color: '#5a5a5a', borderBottom: '1px dashed #ccc', paddingBottom: '5px', marginTop: '0' }}>Thông tin cơ bản</h3>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <input
                        type="number"
                        placeholder="Giá (Price)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="Trọng lượng (Weight)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="ID Danh mục (Ví dụ: 1)"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                {/* Khu vực Dịch thuật */}
                <h3 style={{ color: '#5a5a5a', borderBottom: '1px dashed #ccc', paddingBottom: '5px' }}>Thông tin Dịch thuật</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {translations.map((t) => (
                        <div key={t.languageId} style={{ ...translationBoxStyle, backgroundColor: '#f5f5f5' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#d9534f' }}>Ngôn ngữ: {t.languageId.toUpperCase()}</h4>

                            <label style={labelStyle}>Tên Sản phẩm:</label>
                            <input
                                type="text"
                                placeholder={`Tên Sản phẩm (${t.languageId.toUpperCase()})`}
                                value={t.productName}
                                onChange={(e) => handleTranslationChange(t.languageId, 'productName', e.target.value)}
                                required={t.languageId === 'en'}
                                style={inputStyle}
                            />

                            <label style={{ ...labelStyle, marginTop: '10px' }}>Mô tả:</label>
                            <textarea
                                placeholder={`Mô tả Sản phẩm (${t.languageId.toUpperCase()})`}
                                value={t.productDescription}
                                onChange={(e) => handleTranslationChange(t.languageId, 'productDescription', e.target.value)}
                                rows="3"
                                style={{ ...inputStyle, resize: 'vertical' }}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" style={{ ...buttonStyle, backgroundColor: '#d9534f', marginTop: '20px' }}>
                    Lưu Sản phẩm (POST API)
                </button>
            </form>
            <p style={{ color: message.includes('Lỗi') ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
                {message}
            </p>
        </div>
    );
}

export default ProductForm;