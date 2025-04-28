import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HiPage from './pages/hi';
import { Register } from './pages/register';
import ProfilePage from './pages/profile';
import { Login } from './pages/login';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HiPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;