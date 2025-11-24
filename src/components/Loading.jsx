// src/components/Loading.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Loading() {
  const loadingRef = useRef(null);  // Ref tanımlıyoruz

  useEffect(() => {
    // Sayfa yüklendikten sonra animasyon başlasın
    gsap.fromTo(
      loadingRef.current, // Ref'e bağlanan DOM öğesi
      {
        opacity: 1,
        duration: 4, // Animasyon süresi 1 saniye

      }, // Başlangıç opaklık 1
      {
        opacity: 0, // Sonra opaklık 0 olacak
        delay: 3, // 2 saniye bekleyip animasyon başlasın
        onComplete: () => {
          // Animasyon tamamlandığında component'i kaldır
          loadingRef.current.style.display = 'none';
        }
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
