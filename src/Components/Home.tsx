import React, { useContext } from 'react';
import { GlobalContext } from '../Contexts/GlobalContext';
import Header from './Header';
import Input from './Input';
import Filter from './Filter';
import Item from './Item';

interface Country {
  name: string;
  alpha2Code: string;
  population: number;
  region: string;
  capital: string;
  flags: {
    svg: string;
  };
}

const Home: React.FC = () => {
  const global = useContext(GlobalContext);
  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { data, darkTheme, loading } = global;

  return (
    <>
      <Header />
      <main className={`${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen py-8 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <Input />
            <Filter />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((item: Country) => (
                <Item
                  key={item.name}
                  name={item.name}
                  alpha={item.alpha2Code}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                  flag={item.flags.svg}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
