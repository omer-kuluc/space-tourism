// src/components/Loading.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Loading() {

  useEffect(() => {
    // Sayfa yüklendikten sonra animasyon başlasın
    gsap.fromTo(
      ".loading-container",
      { opacity: 0 }, // Başlangıç opaklık 1
      {
        opacity: 1, // Sonra opaklık 0 olacak
        duration: 2.5, // Animasyon süresi 4.5 saniye
        ease: "back.in", // Animasyon easing
      }
    );
  }, []);

  return (
    <div className="loading-container" >
      <div className="spinner">Yükleniyor...</div>
    </div>
  );
}

export default Loading;
