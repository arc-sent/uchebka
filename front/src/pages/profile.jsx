import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../config123';
import TaskList from './tasks';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [dataUser, setDataUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState(0);

    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (token && dataUser === null) {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedData = JSON.parse(userData);
                setDataUser(parsedData);
                loadTasks(parsedData.id);
            }
        }
    }, [token, dataUser]);

    useEffect(() => {
        console.log('tasks', tasks)
    }, [tasks])

    const loadTasks = async (id) => {
        try {
            const req = await axios.get(`http://localhost:3001/items/auth/${id}`);
            setTasks(req.data.message);
        } catch (err) {
            console.error('Ошибка при загрузке задач:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = localStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        console.log(parsedData)

        const body = {
            title: text,
            desc: desc,
            category: category
        }


        try {
            const req = await axios.post(`${URL}/items/${parsedData.id}`, body, {
                validateStatus: () => true
            });

            if (req.status === 400) {
                throw new Error(req.data.message);
            }

            setText('');
            setDesc('');
            setCategory(0);

            navigate(0);
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(err);
            }

            alert('Возникла ошибка');

            return false;
        }
    };

    return (
        <div>
            {token ? (
                <>
                    <h1>Добро пожаловать, {dataUser?.email}</h1>
                    <h2>Добавить таск</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder="Задача"
                        />
                        <input
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            placeholder="Описание"
                        />
                        <input
                            onChange={(e) => setCategory(Number(e.target.value))}
                            value={category}
                            placeholder="Категория"
                            type="number"
                            min="0"
                            step="1"
                        />
                        <button type="submit">Сохранить</button>
                    </form>
                    <TaskList tasks={tasks} />
                </>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default ProfilePage;
