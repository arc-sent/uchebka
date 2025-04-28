import axios from 'axios';
import React, { useState } from 'react';
import { URL } from '../config123';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();

            console.log(email)
            console.log(password)

            const result = await handleForm(email, password);

            if (result) {
                nav('/')
            }
        }}>
            <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button>Войти</button>
        </form>
    )
}

const handleForm = async (email, password) => {
    try {
        const req = await axios.post(`${URL}/auth/login`, {
            email: email,
            password: password
        }, {
            validateStatus: () => true
        });

        if (req.status === 400) {
            throw new Error(JSON.stringify(req.data.message))
        }

        console.log('req.data', req.data);

        const token = req.data.message;
        localStorage.setItem('jwt', token)
        localStorage.setItem('userData', JSON.stringify(req.data.userData))
        return true

    } catch (err) {
        let err1;
        if (err instanceof Error) {
            err1 = err.message
            console.error(err.message)
        } else {
            err1= 'invalid error'
            console.error(err);
        }

        alert(`Возникла ошибка: ${err1}`);

        return false
    }
}