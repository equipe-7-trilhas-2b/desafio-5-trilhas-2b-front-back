// src/pages/home.tsx
import React from 'react';
import SideBar from '../components/sideBar';
import TopBar from '../components/topBar';
import Dashboard from '../components/Dashboard'; // 1. Importe o novo componente
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <SideBar />
            <div className="main-content">
                <TopBar />
                <div className="content">
                    {/* Dashboard aqui */}
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default Home;