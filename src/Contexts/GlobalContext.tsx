import React, {
  useState,
  useEffect,
  createContext,
  type ReactNode,
} from 'react';

interface Country {
  name: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  nativeName: string;
  topLevelDomain: string[];
  flags: {
    svg: string;
  };
  currencies?: { name: string }[];
  languages: { name: string }[];
  borders?: string[];
  alpha2Code: string;
}

export interface GlobalContextType {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  data: Country[];
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalStorage = ({ children }: { children: ReactNode }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [allData, setAllData] = useState<Country[]>([]);
  const [data, setData] = useState<Country[]>([]);
  const [region, setRegion] = useState('all');
  const [search, setSearch] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load theme and data.json on mount
  useEffect(() => {
    const init = async () => {
      try {
        const theme = localStorage.getItem('theme');
        setDarkTheme(theme === 'true');

        const res = await fetch('/data.json');
        const countries: Country[] = await res.json();
        setAllData(countries);
        setData(countries);
      } catch (err) {
        console.error('Failed to load data.json:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Apply region filter
  useEffect(() => {
    if (!allData.length) return;

    setLoading(true);
    const filtered =
      region === 'all'
        ? allData
        : allData.filter((c) =>
            c.region.toLowerCase() === region.toLowerCase()
          );

    // If there's also a search term, re-apply search filter too
    const result = search.trim()
      ? filtered.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      : filtered;

    setData(result);
    setOpenFilter(false);
    setLoading(false);
  }, [region, allData, search]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('theme', String(darkTheme));
  }, [darkTheme]);

  return (
    <GlobalContext.Provider
      value={{
        openFilter,
        setOpenFilter,
        data,
        setRegion,
        search,
        setSearch,
        darkTheme,
        setDarkTheme,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
