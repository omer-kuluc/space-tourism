import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState, useEffect } from 'react';

function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // GSAP Animasyonu yalnızca resim yüklendikten sonra çalışsın
  useEffect(() => {
    if (isImageLoaded) {
      gsap.from(".inner-home-container", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" });
    }
  }, [isImageLoaded]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className='home-container' style={{ backgroundImage: `url('/img/home-background.jpg')` }} onLoad={handleImageLoad}>
      {/* Yüklenmeden önce gösterilecek içerik */}
      {!isImageLoaded && <div className="loading-spinner">Loading...</div>}

      {/* Home içeriği */}
      <div className="inner-home-container">
        <div className="home-intro">
          <h3 className='home-header'>SO, YOU WANT TO TRAVEL TO</h3>
          <h1 className='space-header'>SPACE</h1>
          <p className='home-text'>
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this world experience!
          </p>
        </div>
        <button className="explore-button">
          EXPLORE
        </button>
      </div>
    </div>
  );
}

export default Home;
