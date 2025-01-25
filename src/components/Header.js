import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import scriptIcon from '../images/script-icon.png';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Remove the fixed positioning and width setting, only control overflow
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      // Reset only overflow on cleanup
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <nav className="w-full bg-beige-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div
            style={{
              backgroundImage: `url(${scriptIcon})`,
              width: '180px',
              height: '45px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            className="sm:w-[250px] sm:h-[60px]"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 lg:space-x-4">
          <NavButton onClick={() => navigateTo('/')} text="Home" icon={<FaHome size={20} />} />
          <NavButton onClick={() => navigateTo('/ResultPage')} text="Result Page" icon={<FaFileAlt size={20} />} />
          <NavButton onClick={() => navigateTo('/EventList')} text="EventList" icon={<FaCalendarAlt size={20} />} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[76px] bg-beige-800 
          z-50 flex flex-col overflow-y-auto h-[calc(100vh-76px)]"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="space-y-2 p-4" onClick={(e) => e.stopPropagation()}>
            <MobileNavButton onClick={() => navigateTo('/main')} text="Home" icon={<FaHome size={20} />} />
            <MobileNavButton onClick={() => navigateTo('/ResultPage')} text="Result Page" icon={<FaFileAlt size={20} />} />
            <MobileNavButton onClick={() => navigateTo('/EventList')} text="EventList" icon={<FaCalendarAlt size={20} />} />
          </div>
        </div>
      )}
    </nav>
  );
};

// NavButton Component
const NavButton = ({ onClick, text, icon }) => (
  <button
    onClick={onClick}
    className="relative inline-flex items-center justify-center font-medium 
    bg-indigo-100 text-black-600 rounded px-2 py-2 transition-all duration-300 
    hover:bg-blue-200 hover:text-black w-[120px] md:w-[130px] lg:w-[150px] 
    h-[40px] md:h-[45px] lg:h-[50px] text-xs md:text-sm"
  >
    {icon}
    <span className="ml-2 truncate">{text}</span>
  </button>
);

// MobileNavButton Component
const MobileNavButton = ({ onClick, text, icon }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-black hover:bg-gray-200  
    transition-colors duration-200 block"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

export default Header;
