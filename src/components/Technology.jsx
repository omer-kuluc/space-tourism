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

      // Seçilen araca animasyon ekleme
      gsap.fromTo(
        `.technology-image.${selectedVehicle}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [hasMounted, selectedVehicle]);


  const handleHover = (e) => {
    const image = e.target;
    const rect = image.getBoundingClientRect();
    const xPos = e.clientX - rect.left; // Mouse'un X koordinatı
    const yPos = e.clientY - rect.top;  // Mouse'un Y koordinatı

    const xPercent = (xPos / rect.width) * 100; // X pozisyonunu yüzdeye dönüştür
    const yPercent = (yPos / rect.height) * 100; // Y pozisyonunu yüzdeye dönüştür

    let rotationX = (yPercent - 50) * 0.3;  // Y eksenini daha güçlü yap
    let rotationY = (xPercent - 50) * 0.3;  // X eksenini daha güçlü yap

    // Sağ üst köşeye yaklaşıyorsak, sol alt köşe havalanmalı
    if (xPercent > 50 && yPercent < 50) {
      rotationX = (yPercent - 50) * -0.3;  // Y eksenini ters yap
      rotationY = (xPercent - 50) * -0.3;  // X eksenini ters yap
    }

    // Sol alt köşeye yaklaşıyorsak, sağ üst köşe havalanmalı
    if (xPercent < 50 && yPercent > 50) {
      rotationX = (yPercent - 50) * -0.3;   // Y eksenini ters yap
      rotationY = (xPercent - 50) * -0.3;   // X eksenini ters yap
    }

    // **Sağ alt köşeye yaklaşıyorsak, sol üst köşe havalanmalı**: (DÜZENLENDİ)
    if (xPercent > 50 && yPercent > 50) {
      rotationX = (yPercent - 50) * -0.3;   // Y eksenini ters yap
      rotationY = (xPercent - 50) * -0.3;  // X eksenini ters yap
    }
    // **Sol üst köşeye yaklaşıyorsak, sağ alt köşe havalanmalı**: (Değişmedi)
    if (xPercent < 50 && yPercent < 50) {
      rotationX = (yPercent - 50) * 0.3;  // Y eksenini ters yap
      rotationY = (xPercent - 50) * 0.3;   // X eksenini ters yap
    }

    // Bu değişkenlerle animasyonu çalıştır
    gsap.to(image, {
      duration: 0.4,
      rotationX: rotationX,
      rotationY: rotationY,
      scale: 1.03,
      ease: "power2.inOut",
    });
  };



  const handleMouseLeave = (e) => {
    const image = e.target;
    gsap.to(image, {
      duration: 0.3,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: "power2.inOut",
    });
  };

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
        onMouseEnter={handleHover} // Hover olduğunda animasyon başlat
        onMouseLeave={handleMouseLeave} // Hover çıkınca animasyonu geri al
      />
    </div>
  );
}

export default Technology;
