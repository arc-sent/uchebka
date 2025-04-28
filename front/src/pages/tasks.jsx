import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../config123';
import { useNavigate } from 'react-router-dom';

const TaskItem = ({ task }) => {

    const navigate = useNavigate();

    const handleEdit = () => {
        const newTitle = prompt('Введите новый заголовок задачи:', task.title);
        const newDesc = prompt('Введите новое описание задачи:', task.desc);
        const newCategory = prompt('Введите новую категорию задачи:', task.category);

        if (newTitle && newDesc && newCategory) {
            handleSave(newTitle, newDesc, newCategory);
        }
    };

    const handleSave = async (newTitle, newDesc, newCategory) => {
        try {
            const response = await axios.put(`http://localhost:3001/items/${task.id}`, {
                title: newTitle,
                desc: newDesc,
                category: Number(newCategory),
            }, {
                validateStatus: () => true
            });
            if (response.status === 400) {
                throw new Error(JSON.stringify(response.data.message))
            }

            navigate(0);
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
            alert('Произошла ошибка при обновлении задачи');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту задачу?');
        if (confirmDelete) {
            try {
                const req = await axios.delete(`${URL}/items/${task.id}`, {
                    validateStatus: () => true
                });

                if (req.status === 400) {
                    throw new Error(req.data.message);
                }

                navigate(0);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err.message)
                } else {
                    console.error(err);
                }

                alert('Возникла ошибка');
            }
        }
    };

    return (
        <div className="task-item" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            <span>Категория: {task.category}</span>
            <div>
                <button onClick={handleEdit}>Редактировать</button>
                <button onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    );
};


const TaskList = ({ tasks }) => {


    return (
        <div>
            {tasks && tasks.length > 0 ? (
                tasks.map((item) => (
                    <TaskItem key={item.id} task={item} />
                ))
            ) : (
                <p>Пока постов нет...</p>
            )}
        </div>
    );
};

export default TaskList;
