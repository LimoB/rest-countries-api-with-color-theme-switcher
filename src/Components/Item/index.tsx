import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Contexts/GlobalContext';

interface ItemProps {
  name: string;
  alpha: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const Item: React.FC<ItemProps> = ({ name, population, region, capital, flag }) => {
  const global = useContext(GlobalContext);
  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { darkTheme } = global;

  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/detail?countryName=${encodeURIComponent(name)}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/detail?countryName=${encodeURIComponent(name)}`)}
      className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02] ${
        darkTheme ? 'bg-darkBlue text-white' : 'bg-white text-veryDarkBlue'
      }`}
    >
      <img
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-lg font-extrabold mb-4">{name}</h3>
        <p className="text-sm mb-1">
          <span className="font-semibold">Population: </span>
          {population.toLocaleString()}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Region: </span>
          {region}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Capital: </span>
          {capital || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default Item;
