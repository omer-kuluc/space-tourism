// src/components/Loading.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Loading() {
  const loadingRef = useRef(null);  // Ref tanımlıyoruz

  useEffect(() => {
    // Sayfa yüklendikten sonra animasyon başlasın
    gsap.fromTo(
      loadingRef.current, // Ref'e bağlanan DOM öğesi
      { opacity: 1 }, // Başlangıç opaklık 1
      {
        opacity: 0, // Sonra opaklık 0 olacak
        duration: 2.5, // Animasyon süresi 4.5 saniye
        ease: "power2.inOut", // Animasyon easing
      }
    );
  }, []);

  return (
    <div className="loading-container" ref={loadingRef}>
      <div className="spinner">Yükleniyor...</div>
    </div>
  );
}

export default Loading;
