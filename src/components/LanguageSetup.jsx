import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9090/api/categories/languages';
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
function LanguageSetup() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Đang thêm...');

        try {
            // API này sử dụng Query Parameters, nên ta dùng axios.post(url, body, config)
            const response = await axios.post(`${API_URL}?id=${id}&name=${name}`);

            setMessage(`Thêm ngôn ngữ thành công! ID: ${response.data.languageId}`);
            setId('');
            setName('');
        } catch (error) {
            const errorMsg = error.response ? `Lỗi: ${error.response.data.message || error.response.statusText}` : 'Lỗi kết nối.';
            setMessage(errorMsg);
            console.error('Error adding language:', error);
        }
    };

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            marginBottom: '30px'
        }}>
            <h3 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', color: '#007bff' }}>
                Thêm Ngôn ngữ Mới 🌐
            </h3>
            <p style={{ color: '#6c757d', fontSize: '0.9em' }}>
                Ví dụ: ID='fr', Name='French'
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="ID Ngôn ngữ (ví dụ: en)"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    maxLength="2"
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Tên Ngôn ngữ (ví dụ: English)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
                    Thêm Ngôn ngữ
                </button>
            </form>
            <p style={{ color: message.includes('Lỗi') ? 'red' : 'green', marginTop: '15px' }}>
                {message}
            </p>
        </div>
    );
}

export default LanguageSetup;