// src/components/Loading.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function Loading() {
  const loadingRef = useRef(null);  // Ref tanımlıyoruz

  gsap.registerPlugin(useGSAP);


  useGSAP(() => {
    gsap.from(".loading-container", { opacity: 0, duration: 4.5, ease: "power2.inOut" })
  })

  return (
    <div className="loading-container" ref={loadingRef}>
      <div className="spinner">Yükleniyor...</div>
    </div>
  );
}

export default Loading;
