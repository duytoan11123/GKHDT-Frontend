import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// --- Dữ liệu giả lập (Mock Data) sẽ được sử dụng khi API call thất bại ---
const MOCK_CATEGORY_DATA = [
    {
        "canBeShipped": true,
        "translations": [
            {
                "language": "english",
                "categoryName": "hhhhh"
            },
            {
                "language": "vietnamese",
                "categoryName": "sdsgtrdtr"
            }
        ]
    },
    {
        "canBeShipped": false,
        "translations": [
            {
                "language": "vietnamese",
                "categoryName": "may bay"
            },
            {
                "language": "english",
                "categoryName": "plan"
            }
        ]
    },
    {
        "canBeShipped": true,
        "translations": [
            {
                "language": "english",
                "categoryName": "Books & Media"
            },
            {
                "language": "vietnamese",
                "categoryName": "Sách & Truyền thông"
            }
        ]
    },
];
// ----------------------------------------------------------------

// Hàm tìm tên danh mục dựa trên ngôn ngữ hiện tại
const getCategoryName = (translations, currentLanguage) => {
    // Thêm kiểm tra Array.isArray để đảm bảo an toàn
    if (!Array.isArray(translations)) return 'Tên không có sẵn';
    const translation = translations.find(t => t.language === currentLanguage);
    return translation ? translation.categoryName : 'Tên không có sẵn';
};

// Component chính (App)
const App = () => {
    // State để lưu trữ ngôn ngữ hiện tại: 'vietnamese' hoặc 'english'
    const [language, setLanguage] = useState('vietnamese');
    
    // State để lưu trữ dữ liệu danh mục
    const [categories, setCategories] = useState([]);
    
    // State để quản lý trạng thái tải
    const [loading, setLoading] = useState(true);
    
    // State để quản lý lỗi
    const [error, setError] = useState(null);

    // useEffect hook để fetch dữ liệu khi component được mount
    useEffect(() => {
        // Định nghĩa hàm bất đồng bộ
        const fetchCategories = async () => {
            setLoading(true);
            const apiUrl = "http://localhost:9090/api/categories";

            try {
                // Giả lập độ trễ tải dữ liệu (chỉ để demo)
                await new Promise(resolve => setTimeout(resolve, 1500)); 

                // --- SỬ DỤNG AXIOS GET THEO YÊU CẦU ---
                const response = await axios.get(apiUrl); 
                
                // Nếu thành công, cập nhật state với response.data
                setCategories(response.data);
                setError(null);
                
            } catch (err) {
                // Khối catch này sẽ chạy do Network Error từ localhost
                console.error("Lỗi khi tải danh mục:", err);

                // Dùng Mock Data và thông báo lỗi do Network Error
                setCategories(MOCK_CATEGORY_DATA);
                setError(`Lỗi: ${err.message}. Không thể kết nối đến API ${apiUrl}. Đang hiển thị Dữ liệu Mẫu.`);
                
            } finally {
                setLoading(false); // Kết thúc trạng thái tải
            }
        };
        
        fetchCategories(); // Gọi hàm
        
    }, []); // Chạy duy nhất một lần khi component mount

    // Văn bản hiển thị dựa trên ngôn ngữ
    const texts = {
        vietnamese: {
            title: "Danh Sách Danh Mục Sản Phẩm (Dữ liệu Mẫu)",
            langLabel: "Ngôn ngữ",
            shippable: "Có thể vận chuyển",
            notShippable: "Không vận chuyển được",
        },
        english: {
            title: "Product Category List (Mock Data)",
            langLabel: "Language",
            shippable: "Shippable",
            notShippable: "Not Shippable",
        }
    };

    const t = texts[language];

    // CSS Definitions (Thay thế Tailwind)
    const styles = `
.app-container {
    min-height: 100vh;
    background-color: #f9fafb; /* Tương đương bg-gray-50 */
    padding: 1rem; 
    padding-top: 2rem;
    padding-bottom: 2rem;
}
.main-content {
    max-width: 896px; /* Tương đương max-w-4xl */
    margin-left: auto;
    margin-right: auto;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background-color: white;
    padding: 1rem;
    border-radius: 0.75rem; 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.header-title {
    font-size: 1.875rem; 
    font-weight: 800; 
    color: #4f46e5; /* Tương đương text-indigo-700 */
    letter-spacing: -0.025em; 
	font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}
.lang-switch-group {
    display: flex;
    align-items: center;
    gap: 0.75rem; 
}
.lang-label {
    font-size: 0.875rem; 
    font-weight: 500; 
    color: #4b5563; 
}
.lang-toggle {
    display: flex;
    align-items: center;
    background-color: #f3f4f6; 
    border-radius: 9999px; 
    padding: 0.25rem;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06); 
}
.lang-button {
    padding: 0.25rem 0.75rem; 
    font-size: 0.875rem; 
    font-weight: 600; 
    border-radius: 9999px; 
    transition: all 0.3s ease;
    color: #4b5563; 
}
.lang-button:hover:not(.active) {
    background-color: #e0e7ff; 
}
.lang-button.active {
    background-color: #4f46e5; 
    color: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); 
}
.category-list {
    display: flex;
    flex-direction: column;
    gap: 1rem; 
}
.category-item {
    background-color: white;
    padding: 1.25rem; 
    border-radius: 0.75rem; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); 
    border-left: 4px solid;
    transition: box-shadow 0.3s ease;
}
.category-item:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04); 
}
.category-item-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.category-name {
    font-size: 1.25rem; 
    font-weight: 700; 
    color: #1f2937; 
}
.badge {
    padding: 0.25rem 0.75rem; 
    font-size: 0.75rem; 
    font-weight: 600; 
    border-radius: 9999px; 
    text-transform: uppercase;
    letter-spacing: 0.05em; 
}
.badge.shippable {
    background-color: #d1fae5; 
    color: #065f46; 
}
.badge.not-shippable {
    background-color: #fee2e2; 
    color: #991b1b; 
}
.status-box {
    text-align: center;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    font-weight: 600;
}
.status-box.loading {
    background-color: #eff6ff; 
    color: #1d4ed8; 
}
.status-box.error {
    background-color: #fffbeb; 
    color: #b45309; 
    margin-bottom: 1rem;
}
.status-box.empty {
    background-color: #fffdfb; 
    color: #b45309; 
}
.footer-info {
    margin-top: 2rem;
    text-align: center;
    color: #6b7280; 
    font-style: italic;
    font-size: 0.875rem;
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
.footer-info .highlight {
    font-weight: 600;
    color: #4f46e5; 
}
    `;

    // Tạo giao diện người dùng
    return (
        <>
            <style>{styles}</style>
            <div className="app-container">
                <div className="main-content">
                    {/* Header và Nút Gạt Ngôn Ngữ */}
                    <div className="header">
                        <h1 className="header-title">
                            {t.title}
                        </h1>

                        {/* Bộ Chuyển Đổi Ngôn Ngữ */}
                        <div className="lang-switch-group">
                            <span className="lang-label">{t.langLabel}:</span>
                            <div className="lang-toggle">
                                <span 
                                    onClick={() => setLanguage('vietnamese')}
                                    className={`lang-button ${language === 'vietnamese' ? 'active' : ''}`}
                                >
                                    VN
                                </span>
                                <span 
                                    onClick={() => setLanguage('english')}
                                    className={`lang-button ${language === 'english' ? 'active' : ''}`}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Phần Hiển Thị Trạng Thái */}
                    {loading && (
                        <div className="status-box loading">
                            Đang tải dữ liệu danh mục...
                        </div>
                    )}

                    {/* Thông báo lỗi (hiển thị dữ liệu mẫu) */}
                    {error && (
                        <div className="status-box error">
                            CẢNH BÁO: {error}
                        </div>
                    )}

                    {/* Danh Sách Danh Mục */}
                    {!loading && Array.isArray(categories) && categories.length > 0 && (
                        <div className="category-list">
                            {categories.map((category, index) => {
                                const categoryName = getCategoryName(category.translations, language);
                                const isShippable = category.canBeShipped;

                                return (
                                    <div
                                        key={index}
                                        className="category-item"
                                        style={{
                                            borderColor: isShippable ? '#4F46E5' : '#EF4444' // Màu border vẫn dùng inline style
                                        }}
                                    >
                                        <div className="category-item-content">
                                            {/* Tên Danh Mục */}
                                            <p className="category-name">
                                                {categoryName}
                                            </p>
                                            
                                            {/* Trạng Thái Vận Chuyển */}
                                            <span 
                                                className={`badge ${isShippable ? 'shippable' : 'not-shippable'}`}
                                            >
                                                {isShippable ? t.shippable : t.notShippable}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    {!loading && categories.length === 0 && (
                        <div className="status-box empty">
                            Không tìm thấy danh mục nào.
                        </div>
                    )}

                    {/* Chú thích ngôn ngữ */}
                    <div className="footer-info">
                        <p>Ngôn ngữ hiện tại đang được hiển thị: <span className="highlight">{language === 'vietnamese' ? 'Tiếng Việt' : 'English'}</span>.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
