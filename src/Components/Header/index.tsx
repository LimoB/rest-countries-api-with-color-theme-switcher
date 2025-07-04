import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import Moon from '../../assets/moon.svg?react';

const Header: React.FC = () => {
  const global = useContext(GlobalContext);

  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { darkTheme, setDarkTheme } = global;

  return (
    <header className={`shadow-md py-4 md:py-6 transition-colors duration-300 ${darkTheme ? 'bg-darkBlue text-white' : 'bg-white text-veryDarkBlue'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="font-bold text-lg md:text-xl">Where in the world?</h1>
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          aria-label="Toggle Dark Mode"
          className="flex items-center gap-2 text-sm md:text-base hover:opacity-75 transition"
        >
          <Moon className="w-4 h-4 md:w-5 md:h-5" />
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
