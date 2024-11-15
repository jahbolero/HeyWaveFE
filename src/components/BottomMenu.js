import React from 'react';
import { AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

const BottomMenu = () => {
  const location = useLocation();

  return (
    <nav className="bottom-menu">
      <Link to="/" className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
        <AiOutlineHome size={24} />
        <span>Home</span>
      </Link>
      <Link to="/placeholder1" className={`menu-item ${location.pathname === '/placeholder1' ? 'active' : ''}`}>
        <AiOutlineQuestionCircle size={24} />
        <span>Menu 2</span>
      </Link>
      <Link to="/placeholder2" className={`menu-item ${location.pathname === '/placeholder2' ? 'active' : ''}`}>
        <AiOutlineSetting size={24} />
        <span>Menu 3</span>
      </Link>
      <Link to="/placeholder3" className={`menu-item ${location.pathname === '/placeholder3' ? 'active' : ''}`}>
        <AiOutlineUser size={24} />
        <span>Menu 4</span>
      </Link>
    </nav>
  );
};

export default BottomMenu;