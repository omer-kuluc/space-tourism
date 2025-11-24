import { createContext, useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';  // Loading bileşenini dahil ediyoruz

export const DataContext = createContext(null);

// Lazy load bileşenler
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

      // Veriler yüklendikten sonra, loading ekranını kapatıyoruz
      setTimeout(() => setIsLoading(false), 4500); // 4.5 saniye bekle
    }
    getData();
  }, []);

  // Yükleme sırasında hiçbir şey render edilmesin
  if (isLoading) {
    return <Loading />;
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Suspense fallback={<Loading />}> {/* Lazy load bileşenler için fallback */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Routes>
      </Suspense>
    </DataContext.Provider>
  );
}

export default App;
