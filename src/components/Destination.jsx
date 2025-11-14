import React, { useState, useContext } from 'react';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
function Destination() {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.from(".intro-image-section", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" })
    gsap.from(".destination-section", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" })

  })




  const [selectedPlanet, setSelectedPlanet] = useState('moon'); // Başlangıçta Moon seçili
  const { data, setData } = useContext(DataContext);

  const selectedPlanetData = data[selectedPlanet] || data['moon']; // Varsayılan olarak moon verisi

  return (
    <div className='destination-container'>
      <div className="intro-image-section">
        <h1 className='destination-header'>
          <span className='destination-number'>01</span>PICK YOUR DESTINATION
        </h1>
        <img
          className='planet-image'
          src={selectedPlanetData?.image}
          alt={selectedPlanet}
        />
      </div>

      <div className="destination-section">
        <div className="destination-options">
          <p
            className={`option ${selectedPlanet === 'moon' ? 'active' : ''}`}
            onClick={() => setSelectedPlanet('moon')}
          >
            MOON
          </p>
          <p
            className={`option ${selectedPlanet === 'mars' ? 'active' : ''}`}
            onClick={() => setSelectedPlanet('mars')}
          >
            MARS
          </p>
          <p
            className={`option ${selectedPlanet === 'europa' ? 'active' : ''}`}
            onClick={() => setSelectedPlanet('europa')}
          >
            EUROPA
          </p>
          <p
            className={`option ${selectedPlanet === 'titan' ? 'active' : ''}`}
            onClick={() => setSelectedPlanet('titan')}
          >
            TITAN
          </p>
        </div>
        <div className="selected-planet-info">
          <div className="selected-planet-intro">
            <h3 className='selected-planet-title'>{selectedPlanetData?.title}</h3>
            <p className='selected-planet-text'>{selectedPlanetData?.text}</p>
          </div>
          <span className='border'></span>
          <div className="distance-time-area">
            <div className="distance-area">
              <h4>AVG. DISTANCE</h4>
              <p className='distance-info'>{selectedPlanetData?.distance}</p>
            </div>
            <div className="time-area">
              <h4>EST. TRAVEL TIME</h4>
              <p className='time-info'>{selectedPlanetData?.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destination;
