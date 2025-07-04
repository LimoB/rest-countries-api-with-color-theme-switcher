import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';

const Input: React.FC = () => {
  const global = useContext(GlobalContext);

  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { search, setSearch, darkTheme } = global;

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      placeholder="Search for a country..."
      aria-label="Search for a country"
      className={`
        w-full md:w-96 px-6 py-3 rounded shadow
        text-sm placeholder-gray-500 outline-none transition
        ${darkTheme
          ? 'bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500'
          : 'bg-white text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-400'}
      `}
    />
  );
};

export default Input;
