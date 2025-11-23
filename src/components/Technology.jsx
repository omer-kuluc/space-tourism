import React, { useContext, useState } from 'react';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Technology() {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.from(".technology-section", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" });
    gsap.utils.toArray(".desktop-only").forEach((piece, i) => {
      gsap.from(piece, {
        opacity: 0,
        y: 300,
        duration: 2,
        ease: "back",
      });
    });
  });

  const [selectedVehicle, setSelectedVehicle] = useState('launch-vehicle');
  const { data } = useContext(DataContext);
  const selectedVehicleData = data[selectedVehicle] || data['launch-vehicle'];

  // Sayfa yüklendikten sonra görselleri göster
  const handleImageLoad = () => {
    window.onload(); // Sayfa yüklendikten sonra animasyonu başlat
  };

  return (
    <div className="technology-container">
      <div className="technology-section">
        <h1 className="technology-header">
          <span className="technology-number">02</span>SPACE LUNCH 101
        </h1>
        <img
          className="selected-technology-photo-mobile"
          src={selectedVehicleData?.image}
          alt={selectedVehicleData}
          onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
        />
        <img
          className="tablet-only technology-image"
          src={selectedVehicleData?.tabletImage}
          alt={selectedVehicleData}
          onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
        />
        <div className="technology-text">
          <div className="technology-options">
            <button
              className={selectedVehicle === 'launch-vehicle' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('launch-vehicle')}
            >
              1
            </button>
            <button
              className={selectedVehicle === 'spaceport' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('spaceport')}
            >
              2
            </button>
            <button
              className={selectedVehicle === 'space-capsule' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('space-capsule')}
            >
              3
            </button>
          </div>
          <div className="technology-info">
            <h4>THE TERMINOLOGY ...</h4>
            <h3 className="technology-title">{selectedVehicleData?.title}</h3>
            <p className="technology-text">{selectedVehicleData?.text}</p>
          </div>
        </div>
      </div>
      <img
        className="desktop-only technology-image"
        src={selectedVehicleData?.desktopImage}
        alt={selectedVehicleData}
        onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
      />
    </div>
  );
}

export default Technology;
