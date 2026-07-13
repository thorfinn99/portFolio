import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useData } from './context/DataContext';

// Public Portfolio
import Portfolio from './pages/Portfolio';

function App() {
  const { data } = useData();
  const brandName = data.about?.brandName || 'portfolio';

  useEffect(() => {
    document.title = `${brandName} - Portfolio`;
  }, [brandName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
