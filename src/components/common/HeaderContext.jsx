import React, { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export const useHeader = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState({
    heading: 'Deafult Heading',
    paragraph1: 'Default Content',
    paragraph2: 'Default Content',
  });

  return (
    <HeaderContext.Provider value={{ headerData, setHeaderData }}>
      {children}
    </HeaderContext.Provider>
  );
};