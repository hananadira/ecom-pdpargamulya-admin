import React, { createContext, useContext, useState } from 'react';

const PengirimanContext = createContext();

export const usePengiriman = () => {
  return useContext(PengirimanContext);
};

export const PengirimanProvider = ({ children }) => {
  const [pengirimanData, setPengirimanData] = useState([]);

  const addPengiriman = (pengiriman) => {
    setPengirimanData((prevData) => [...prevData, pengiriman]);
  };

  const removePengiriman = (id) => {
    setPengirimanData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <PengirimanContext.Provider value={{ pengirimanData, addPengiriman, removePengiriman }}>
      {children}
    </PengirimanContext.Provider>
  );
};
