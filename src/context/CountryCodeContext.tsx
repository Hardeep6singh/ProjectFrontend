import  { createContext, useState, ReactNode } from 'react';

export type CountryCodeContextType = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const CountryCodeContext = createContext<CountryCodeContextType | null>(null);

 const CountryCodeContextProvider = ({ children }: { children: ReactNode }) => {
  const [countryCode, setCountryCode] = useState('us');

  return (
    <CountryCodeContext.Provider value={{ countryCode, setCountryCode }}>
      {children}
    </CountryCodeContext.Provider>
  );
};

export default CountryCodeContext;
export {CountryCodeContextProvider};
