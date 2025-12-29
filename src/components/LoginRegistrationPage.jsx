import React, { useState, useEffect } from 'react';
import './LoginRegistration.css';

/* ===== Левая панель (без изменений) ===== */
const ImageSlider = ({ onBackToHome }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Автоматизация Информационных Систем",
      description:
        "Автоматизация систем позволяющая облегчить часть работы и меньше уделять время на мелочи.",
      buttonText: "Смотреть инструкцию",
      colors: ["#3F5BD9", "#CDD5F7"],
    },
    {
      title: "Телефонный справичник",
      description: "Здесь вы сможете просмотреть актуальные номера основных телефонов для связи с другими отделами. решения для автоматизации процессов.",
      buttonText: "Смотреть справочник",
      colors: ["#64836C", "#CBF1FD"],
    },
    {
      title: "Актуальные новости",
      description: "В данном разделе будет отображаться самая актуальная информация для всех пользователей.",
      buttonText: "Смотреть новости",
      colors: ["#5E32BD", "#CDD5F7"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 40000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const [colorStart, colorEnd] = slides[currentSlide].colors;

  return (
    <div
      className="slider-panel"
      style={{
        background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
      }}
    >
      <button className="back-button" onClick={onBackToHome}>
        Вернуться на главную страницу →
      </button>

      <div className="slider-content">
        <span className="beta-badge">! Beta версия сайта</span>

        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>

        <button className="slider-button">
          {slides[currentSlide].buttonText}
        </button>
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentSlide === index ? 'active-indicator' : ''
              }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

/* ===== Правая панель (с изменениями для пароля) ===== */
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-panel">
      <h2>{isLogin ? "Вход в систему" : "Регистрация"}</h2>

      <p className="auth-help-text">
        {isLogin ? (
          <>
            У вас нет аккаунта?{" "}
            <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span>
          </>
        ) : (
          <>
            У вас уже есть аккаунт?{" "}
            <span onClick={() => setIsLogin(true)}>Войти</span>
          </>
        )}
      </p>

      <form className="auth-form">
        {isLogin ? (
          <>
            <input type="text" placeholder="Логин" />
            <div className="input-container">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Пароль" 
                />
                <span 
                    className="password-toggle-icon" 
                    onClick={togglePasswordVisibility}
                >
                    {/* Измените символы здесь, например, на 🔒 (закрыто) и 🔑 (открыто) */
                    showPassword ? '🔑' : '🔒'}
                </span>
            </div>
          </>
        ) : (
          <>
            <div className="form-row">
              <input type="text" placeholder="Фамилия" />
              <input type="text" placeholder="Имя" />
            </div>

            <div className="form-row-with-label">
              <input type="text" placeholder="Отчество*" />
              <label>Если таковое имеется*</label>
            </div>

            <div className="form-row-with-label">
              <input type="tel" placeholder="Телефон*" />
              <label>Служебный или личный**</label>
            </div>
          </>
        )}

        <div className="auth-checkbox-wrapper">
          <input id="terms" type="checkbox" />
          <label htmlFor="terms">
            Я согласен (на) с{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Пользовательским соглашением*
            </a>
          </label>
        </div>

        <button type="submit" className="auth-button">
          {isLogin ? "Войти" : "Отправить запрос на регистрацию"}
        </button>
      </form>
    </div>
  );
};

/* ===== Страница (без изменений) ===== */
const LoginRegistrationPage = ({ onBackToHome }) => {
  return (
    <div className="login-reg-wrapper">
      <ImageSlider onBackToHome={onBackToHome} />
      <AuthForm />
    </div>
  );
};

export default LoginRegistrationPage;
