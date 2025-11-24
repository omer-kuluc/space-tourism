import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../App';
import gsap from 'gsap';

function Technology() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('launch-vehicle');
  const { data } = useContext(DataContext);
  const selectedVehicleData = data[selectedVehicle] || data['launch-vehicle'];

  // Sayfa yüklendikçe animasyon başlatma
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      gsap.from(".technology-section", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" });

      gsap.utils.toArray(".desktop-only").forEach((piece) => {
        gsap.from(piece, {
          opacity: 0,
          y: 200,
          duration: 2,
          ease: "back",
        });
      });

      // seçilen araca animasyon ekleme
      gsap.fromTo(
        `.technology-image.${selectedVehicle}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [hasMounted, selectedVehicle]);

  return (
    <div className='technology-container'>
      <div className="technology-section">
        <h1 className="technology-header">
          <span className='technology-number'>02</span>SPACE LUNCH 101
        </h1>

        <img
          className={`selected-technology-photo-mobile technology-image ${selectedVehicle}`}
          src={selectedVehicleData?.image}
          alt={selectedVehicleData?.title}
        />

        {/* Seçilen aracın tablet görseli */}
        <img
          className={`tablet-only technology-image ${selectedVehicle}`}
          src={selectedVehicleData?.tabletImage}
          alt={selectedVehicleData?.title}
        />

        <div className="technology-text">
          <div className="technology-options">
            <button
              className={selectedVehicle === 'launch-vehicle' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('launch-vehicle')}>1
            </button>
            <button
              className={selectedVehicle === 'spaceport' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('spaceport')}>2
            </button>
            <button
              className={selectedVehicle === 'space-capsule' ? 'selected' : ''}
              onClick={() => setSelectedVehicle('space-capsule')}>3
            </button>
          </div>
          <div className="technology-info">
            <h4>THE TERMINOLOGY ...</h4>
            <h3 className='technology-title'>{selectedVehicleData?.title}</h3>
            <p className='technology-text'>{selectedVehicleData?.text}</p>
          </div>
        </div>
      </div>

      {/* Desktop-only resimler */}
      <img
        className={`desktop-only technology-image ${selectedVehicle}`}
        src={selectedVehicleData?.desktopImage}
        alt={selectedVehicleData?.title}
      />
    </div>
  );
}

export default Technology;
