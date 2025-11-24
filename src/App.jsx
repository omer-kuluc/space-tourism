import { createContext, useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';

export const DataContext = createContext(null);

const Home = lazy(() => import('./components/Home'));
const Destination = lazy(() => import('./components/Destination'));
const Crew = lazy(() => import('./components/Crew'));
const Technology = lazy(() => import('./components/Technology'));

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading durumunu başlatıyoruz

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(x => x.json());
      setData(data);

      // 4.5 saniye sonra loading ekranını kapatıyoruz
      setTimeout(() => setIsLoading(false), 4500); // 4.5 saniye bekle
    }
    getData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {isLoading ? (
        <Loading /> // Yükleme sırasında Loading bileşeni gösteriliyor
      ) : (
        <>
          <Header />  {/* Header'ı sadece loading bittiğinde gösteriyoruz */}
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/technology" element={<Technology />} />
            </Routes>
          </Suspense>
        </>
      )}
    </DataContext.Provider>
  );
}

export default App;
