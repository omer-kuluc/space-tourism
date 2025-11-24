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
      setIsLoading(false); // Veriler yüklendiğinde loading ekranını kapatıyoruz
    }
    getData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Header />
      {isLoading ? (
        <Loading /> // Yükleme sırasında Loading bileşeni gösteriliyor
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Routes>
      )}
    </DataContext.Provider>
  );
}

export default App;
