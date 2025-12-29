import React, { useState, useEffect } from 'react';
import './LoginRegistration.css';

// Компонент для слайдов (Левая часть)
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { 
      id: 1, 
      title: "Автоматизация информационных систем", 
      description: "Автоматизация систем позволяющая облегчить часть работы и меньше уделять время на мелочи.", 
      buttonText: "Смотреть инструкцию", 
      colors: ["#324EBD", "#CDD5F7"] 
    },
    { 
      id: 2, 
      title: "Технологии", 
      description: "Современные решения.", 
      buttonText: "Начать", 
      colors: ["#64836C", "#CBF1FD"] 
    },
    { 
      id: 3, 
      title: "Безопасность", 
      description: "Надежная защита.", 
      buttonText: "Контакты", 
      colors: ["#5E32BD", "#CDD5F7"] 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 40000); 

    return () => clearInterval(timer);
  }, [slides.length]);

  // Получаем текущие цвета для удобства
  const [colorStart, colorEnd] = slides[currentSlide].colors;

  return (
    <div 
      className="slider-panel" 
      style={{ 
        // Применяем линейный градиент под углом 135 градусов
        background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`,
        transition: 'background 0.8s ease' // Плавная смена цветов
      }}
    >
      <div className="slide-content">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
        <button 
          className="slider-button" 
          onClick={() => alert(`${slides[currentSlide].buttonText} clicked`)}
          style={{ color: colorStart }} // Цвет текста кнопки в тон основной теме
        >
          {slides[currentSlide].buttonText}
        </button>
      </div>
      <div className="slide-indicators">
        {slides.map((slide, index) => (
          <span 
            key={slide.id} 
            className={`indicator ${currentSlide === index ? 'active-indicator' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};


// Компонент для формы входа/регистрации (Правая часть)
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Переключение между входом и регистрацией

  const handleToggleForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-panel">
      <h2>{isLogin ? "Вход в систему" : "РЕГИСТРАЦИЯ"}</h2>
      <p className="auth-help-text">
        {isLogin ? "У вас нет аккаунта? " : "Уже есть аккаунт? "}
        <a href="#" onClick={handleToggleForm}>
          {isLogin ? "Зарегистрируйтесь" : "Войдите"}
        </a>
      </p>
      
      <form className="auth-form">
        {isLogin ? (
            // Форма входа (одноколоночная)
            <>
                <input type="text" placeholder="Логин" required />
                <input type="password" placeholder="Пароль" required />
            </>
        ) : (
            // Форма регистрации (двухколоночная, как на макете)
            <>
                <div className="form-row">
                    <input type="text" placeholder="Фамилия" required />
                    <input type="text" placeholder="Имя" required />
                </div>
                
                <div className="form-row-with-label">
                    <input type="text" placeholder="Отчество*" />
                    <label>Если таковое имеется*</label>
                </div>

                <div className="form-row-with-label">
                    <input type="tel" placeholder="Телефон*" required />
                    <label>Служебный или личный**</label>
                </div>
            </>
        )}
        
        <div className="auth-checkbox-wrapper">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">Я согласен (на) с Пользовательским соглашением</label>
        </div>

        <button type="submit" className="auth-button">
          {isLogin ? "Войти" : "ОТПРАВИТЬ ЗАПРОС НА РЕГИСТРАЦИЮ"}
        </button>
      </form>
    </div>
  );
};

// Основной компонент страницы входа/регистрации
const LoginRegistrationPage = ({ onBackToHome }) => {
  return (
    <div className="login-reg-wrapper">
        <button className="back-button" onClick={onBackToHome}>← Вернуться</button>
        <ImageSlider />
        <AuthForm />
    </div>
  );
};

export default LoginRegistrationPage;
