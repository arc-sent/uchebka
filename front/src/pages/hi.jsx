import React from 'react';
import { useNavigate } from 'react-router-dom';

const HiPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    return (
        <div>
            {token ? (
                <>
                    <h1>Добро пожаловать!</h1>
                    <button onClick={() => navigate('/profile')}>Перейти в профиль</button>
                </>
            ) : (
                <>
                    <h1>Привет</h1>
                    <p className="subtitle">Вы можете зарегистрироваться или войти, чтобы продолжить.</p>
                    <div className="button group">
                        <button className="btn regist" onClick={() => navigate('/register')}>
                            Регистрация
                        </button>
                        <button className="btn login" onClick={() => navigate('/login')}>
                            Вход
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default HiPage;
