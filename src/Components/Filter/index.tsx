import React, { useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import Arrow from '../../assets/arrow.svg?react';

const Filter: React.FC = () => {
  const global = useContext(GlobalContext);

  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { openFilter, setOpenFilter, setRegion, darkTheme } = global;

  const handleRegionClick = (region: string) => {
    setRegion(region);
    setOpenFilter(false);
  };

  const regions = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania'];

  return (
    <div className="relative w-56 text-sm font-medium">
      <button
        aria-label="Filter by Region"
        onClick={() => setOpenFilter(!openFilter)}
        className={`w-full flex justify-between items-center px-4 py-3 rounded-md shadow-md transition-colors duration-300 
          ${darkTheme ? 'bg-darkBlue text-white' : 'bg-white text-veryDarkBlue'}
        `}
      >
        <span>Filter by Region</span>
        <Arrow className="w-4 h-4" />
      </button>

      {openFilter && (
        <ul
          className={`absolute left-0 right-0 mt-2 z-10 rounded-md shadow-lg divide-y overflow-hidden 
            ${darkTheme ? 'bg-darkBlue text-white' : 'bg-white text-veryDarkBlue'}
          `}
        >
          {regions.map((region) => (
            <li
              key={region}
              role="button"
              tabIndex={0}
              onClick={() => handleRegionClick(region)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRegionClick(region);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
