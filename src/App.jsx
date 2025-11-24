import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Destination from './components/Destination'
import Crew from './components/Crew'
import Technology from './components/Technology'
import Header from './components/Header'

export const DataContext = createContext(null);


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(x => x.json());
      setData(data);
    }
    getData();

  }, []);


  return (
    <DataContext.Provider value={{ data, setData }}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/crew' element={<Crew />} />
        <Route path='/technology' element={<Technology />} />
      </Routes>

    </DataContext.Provider>


  )
}

export default App
