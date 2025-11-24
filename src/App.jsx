import { createContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Destination from './components/Destination';
import Crew from './components/Crew';
import Technology from './components/Technology';
import Header from './components/Header';
import Loading from './components/Loading';  // Loading bileşenini dahil ediyoruz

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading durumunu başlatıyoruz

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(x => x.json());
      setData(data);

      // 4.5 saniye sonra loading ekranını kapatıyoruz
      setTimeout(() => setIsLoading(false), 2500); // 4.5 saniye bekle
    }
    getData();
  }, []);

  // Loading sırasında hiçbir şey render edilmesin
  if (isLoading) {
    return <Loading />;
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Header /> {/* Veriler yüklendikten sonra Header'ı gösteriyoruz */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
