import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// Импортируем новый компонент страницы входа/регистрации
import LoginRegistrationPage from './components/LoginRegistrationPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <>
      {/* Header теперь всегда виден сверху */}
      <div className="header-full-width-wrapper">
        <header className="header">
          <div className="logo-container" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
            <div className="logo-shape blue-square"></div>
            <div className="logo-shape red-circle"></div>
            АИС
          </div>
          <nav className="navigation">
            <button
              className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('hero-section', 'home')}
            >
              Главная
            </button>
            <button
              className={`nav-button ${activeTab === 'directory' ? 'active' : ''}`}
              onClick={() => scrollToSection('phone-directory', 'directory')}
            >
              Телефонный справочник
            </button>

            <button
              className={`nav-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Вход
            </button>
          </nav>
        </header>
      </div>

      <div className="page-container">
        <main className="main-content-wrapper">
          {/* Условная логика перемещена внутрь контента */}
          {activeTab === 'login' ? (
            <LoginRegistrationPage onBackToHome={() => setActiveTab('home')} />
          ) : (
            <>
              <div id="hero-section" className="blue-background-container">
                <div className="decorative-circles-wrapper"></div>
                <button className="beta-version">!Beta версия сайта</button>
                <div className="hero-text">
                  <h1>АВТОМАТИЗАЦИЯ<br />ИНФОРМАЦИОННЫХ СИСТЕМ</h1>
                  <p>
                    Автоматизация систем, позволяющая облегчить часть работы
                    и меньше уделять время на мелочи.
                  </p>
                </div>
                <button className="instruction-button">Смотреть инструкцию</button>
              </div>
              <PhoneDirectorySection />
            </>
          )}
        </main>
      </div>
    </>
  );
}

// Компоненты PhoneDirectorySection и DirectoryCard остаются неизменными и переносятся ниже
const PhoneDirectorySection = () => {
  return (
    <section id="phone-directory" className="directory-section">
      <h1 className="directory-main-title">Телефонный справочник</h1>
      <div className="directory-grid-container">
        <DirectoryCard
          color="yellow"
          title="Руководитель"
          contacts={[
            { name: "Жабин Дмитрий Михайлович", tel: "60-06", role: null },
            { name: "Зейвальд Евгений Викторович", tel: "60-06", role: "Заместитель руководителя" },
          ]}
          responsibilities={[
            "Видеонаблюдение (данные), ИСОД (учетные записи), ЭЦП, ИБД."
          ]}
        />
        <DirectoryCard
          color="green"
          title="Отделение информационных технологий ОИТИОЗАИС"
          contacts={[
            { name: "Зятиков Константин Евгеньевич", tel: "60-22", role: "Начальник отделения" },
            { name: "Куратова Анна Евгеньевна", tel: "61-49", role: "Инженер" },
            { name: "Кровцов Виктор Владимирович", tel: "60-09", role: "Специалист" },
            { name: "Зейвальд Евгений Викторович", tel: "60-06", role: "Специалист" },
          ]}
          responsibilities={[
            "ИСОД (учетные записи), ИБД, Видеонаблюдение (данные), настройка компьютеров"
          ]}
        />
        <DirectoryCard
          color="blue"
          title="Отделение радиосвязи ОРСПСИТТ"
          contacts={[
            { name: "Чуваев Виктор Александрович", tel: "60-61", role: "Начальник отделения" },
            { name: "Ахтметзянов Игорь Ринатович", tel: "61-28", role: "Инженер" },
            { name: "Шеин Валерий Юрьевич", tel: "61-28", role: "Техник" },
          ]}
          responsibilities={[
            "Принтера, заправка катриджей, телефония, Видеонаблюдение (монтаж), Ремонт компьютеров"
          ]}
        />
        <DirectoryCard
          color="purple"
          title="Отделение информационной безопасности ОТЗИиКЗИ"
          contacts={[
            { name: "Заместитель руководителя", tel: "____", role: "Начальник отделения" },
            { name: "Гореленко Андрей Николаевич", tel: "61-28", role: "Специалист" },
          ]}
          responsibilities={[
            "Принтера, Ремонт компьютеров."
          ]}
        />
      </div>
    </section>
  );
};

const DirectoryCard = ({ color, title, contacts, responsibilities }) => {
  return (
    <div className={`directory-card ${color}`}>
      <div className="colored-content-wrapper">
        <div className="card-header">
          <h3>{title}</h3>
        </div>

        <div className="card-body">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-item">
              {contact.role && <p className="contact-role">{contact.role}</p>}
              <p className="contact-name">{contact.name}</p>
              <p className="contact-tel">тел: {contact.tel}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <h4>Обращаться по вопросам:</h4>
        <ul>
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
