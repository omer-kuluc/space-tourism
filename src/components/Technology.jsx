import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Technology() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('launch-vehicle');
  const { data } = useContext(DataContext);

  const selectedVehicleData = data[selectedVehicle] || data['launch-vehicle'];

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    if (isImageLoaded) {
      gsap.from(".technology-section", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" });
    }
  }, [isImageLoaded]);

  useEffect(() => {
    gsap.utils.toArray(".desktop-only").forEach((piece) => {
      gsap.from(piece, { opacity: 0, y: 300, duration: 2, ease: "back" });
    });
  }, []);

  return (
    <div className='technology-container'>
      <div className="technology-section">
        <h1 className="technology-header">
          <span className='technology-number'>02</span>SPACE LUNCH 101
        </h1>

        {/* Resimlerin yüklenmesini bekleyelim */}
        {!isImageLoaded && <div className="loading-spinner">Loading...</div>}

        <img
          className='selected-technology-photo-mobile'
          src={selectedVehicleData?.image}
          alt={selectedVehicleData?.title}
          onLoad={handleImageLoad}
        />
        <img className='tablet-only technology-image' src={selectedVehicleData?.tabletImage} alt={selectedVehicleData?.title} />

        <div className="technology-info">
          <div className="technology-options">
            <button className={selectedVehicle === 'launch-vehicle' ? 'selected' : ''} onClick={() => setSelectedVehicle('launch-vehicle')}>1</button>
            <button className={selectedVehicle === 'spaceport' ? 'selected' : ''} onClick={() => setSelectedVehicle('spaceport')}>2</button>
            <button className={selectedVehicle === 'space-capsule' ? 'selected' : ''} onClick={() => setSelectedVehicle('space-capsule')}>3</button>
          </div>
          <div className="technology-info">
            <h4>THE TERMINOLOGY ...</h4>
            <h3 className='technology-title'>{selectedVehicleData?.title}</h3>
            <p className='technology-text'>{selectedVehicleData?.text}</p>
          </div>
        </div>
      </div>
      <img className='desktop-only technology-image' src={selectedVehicleData?.desktopImage} alt={selectedVehicleData?.title} />
    </div>
  );
}

export default Technology;
