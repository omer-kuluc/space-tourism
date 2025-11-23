import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import gsap from 'gsap';

function Header() {
  const linksContainer = useRef();
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(".link", { opacity: 0, stagger: 0.5, rotate: 180, duration: 1.5, ease: "power2.inOut" });
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  // Sayfa yüklendikten sonra görselleri göster
  const handleImageLoad = () => {
    window.onload(); // Sayfa yüklendikten sonra animasyonu başlat
  };

  return (
    <div className="header">
      <img
        className="space-logo"
        src="/img/space-logo.svg"
        alt=""
        loading="lazy"
        onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
      />
      <img
        onClick={toggleMenu}
        className="hamburger-menu-icon"
        src="/img/hamburger-menu-icon.svg"
        alt=""
        loading="lazy"
        onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
      />
      <div className={`menu ${isOpen ? 'is-open' : ''}`}>
        <div ref={linksContainer} className="links">
          <img
            onClick={toggleMenu}
            className="hamburger-close-icon"
            src="/img/cross-icon.svg"
            alt=""
            loading="lazy"
            onLoad={handleImageLoad}  // Görsel yüklendikten sonra animasyonları başlat
          />
          <NavLink className="link" to="/"><span>00</span>HOME</NavLink>
          <NavLink className="link" to="/destination"><span>01</span>DESTINATION</NavLink>
          <NavLink className="link" to="/crew"><span>02</span>CREW</NavLink>
          <NavLink className="link" to="/technology"><span>03</span>TECHNOLOGY</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
