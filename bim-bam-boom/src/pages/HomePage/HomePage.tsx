import React from 'react';
import electronicsImg from '../../assets/electronics2.jpg';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage: React.FC = () => {
    return (
        <div className="image-container">
            <img src={electronicsImg} alt="Electronics home page" className="background-image" />
            <div className="overlay-text">BOM in. Better Components Out.</div>
            <Link to="/upload" className="start-button">
                Start <span className="arrow">→</span>
            </Link>        </div>
    );
};

export default HomePage;