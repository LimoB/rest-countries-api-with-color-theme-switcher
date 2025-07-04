import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../Contexts/GlobalContext';
import Header from '../Header';
import Back from '../../assets/back.svg?react';

interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders?: string[];
  flags: { svg: string };
  alpha2Code: string;
}

const Details: React.FC = () => {
  const { alpha } = useParams<{ alpha: string }>(); // Use alpha for the dynamic country code
  const [data, setData] = useState<Country | null>(null);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [borders, setBorders] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const global = useContext(GlobalContext);
  const navigate = useNavigate();

  if (!global) throw new Error('GlobalContext must be used within a GlobalStorage provider');
  const { darkTheme } = global;

  // Fetch all countries data and the specific country details based on the alpha code
  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data.json');
        const json: Country[] = await response.json();
        setAllCountries(json);

        const current = json.find(c => c.alpha2Code.toLowerCase() === alpha?.toLowerCase());
        setData(current || null);
      } catch (err) {
        console.error("Failed to load country data.json", err);
      } finally {
        setLoading(false);
      }
    };
    if (alpha) {
      loadCountries();
    }
  }, [alpha]);

  // Update state when borders are clicked to load another country
  useEffect(() => {
    if (!data || !allCountries.length) return;

    setCurrencies(data.currencies?.map(c => c.name) || []);
    setLanguages(data.languages?.map(l => l.name) || []);

    const borderData = data.borders?.map(code =>
      allCountries.find(c => c.alpha2Code === code)
    ).filter(Boolean) as Country[] || [];

    setBorders(borderData);
  }, [data, allCountries]);

  return (
    <>
      <Header />
      {data && (
        <main className={`${darkTheme ? 'bg-veryDarkBlue text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              aria-label="Back to Home"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-6 py-2 rounded shadow-md bg-white dark:bg-darkBlue dark:text-white hover:bg-gray-100 dark:hover:bg-opacity-70 transition"
            >
              <Back />
              <span>Back</span>
            </button>

            {loading ? (
              <div className="mt-12 text-center">Loading...</div>
            ) : (
              <div className="mt-12 flex flex-col lg:flex-row gap-12">
                <img
                  src={data.flags.svg}
                  alt={`${data.name} flag`}
                  className="w-full lg:w-1/2 h-auto rounded-md shadow-lg"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">{data.name}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <p><strong>Native Name:</strong> {data.nativeName}</p>
                      <p><strong>Population:</strong> {data.population.toLocaleString()}</p>
                      <p><strong>Region:</strong> {data.region}</p>
                      <p><strong>Sub Region:</strong> {data.subregion}</p>
                      <p><strong>Capital:</strong> {data.capital}</p>
                    </div>

                    <div className="space-y-2">
                      <p><strong>Top Level Domain:</strong> {data.topLevelDomain.join(', ')}</p>
                      <p><strong>Currencies:</strong> {currencies.join(', ')}</p>
                      <p><strong>Languages:</strong> {languages.join(', ')}</p>
                    </div>
                  </div>

                  {borders.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-semibold mb-4">Border Countries:</h3>
                      <div className="flex flex-wrap gap-3">
                        {borders.map(border => (
                          <button
                            key={border.alpha2Code}
                            onClick={() => navigate(`/country/${border.alpha2Code}`)} // Update navigation to `/country/:alpha`
                            className="px-4 py-1 bg-white dark:bg-darkBlue dark:text-white rounded shadow text-sm hover:bg-gray-200 dark:hover:bg-opacity-80 transition"
                          >
                            {border.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Details;
