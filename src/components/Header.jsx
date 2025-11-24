import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const lineRef = useRef(); // Çizgi için referans

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const handleHover = (e) => {
    const target = e.target;

    // Linkin tam genişliğini ve sol pozisyonunu alıyoruz
    const link = target.closest('a');
    const linkWidth = link.offsetWidth;
    const leftPosition = link.offsetLeft;

    // GSAP ile çizgiyi hareket ettiriyoruz
    gsap.to(lineRef.current, {
      width: linkWidth, // Çizgiyi linkin genişliği kadar yapıyoruz
      left: leftPosition,  // Linkin sol pozisyonuna kaydırıyoruz
      opacity: 1, // Çizgiyi görünür yapıyoruz
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Hover dışında çizgiyi kaybetme
  const handleMouseLeave = () => {
    gsap.to(lineRef.current, {
      width: 0, // Çizgiyi yok ediyoruz
      opacity: 0, // Çizgiyi gizliyoruz
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    gsap.from(".link", { opacity: 0, stagger: 0.2, duration: 0.5, ease: "power2.inOut" });
  }, []);

  return (
    <div className='header'>
      <img className='space-logo' src="/img/space-logo.svg" alt="" loading='lazy' />
      <img onClick={toggleMenu} className='hamburger-menu-icon' src="/img/hamburger-menu-icon.svg" alt="" loading='lazy' />

      <div className={`menu ${isOpen ? "is-open" : ""}`}>
        <div className="links">
          <img onClick={toggleMenu} className='hamburger-close-icon' src="/img/cross-icon.svg" alt="" loading='lazy' />
          <NavLink
            className='link'
            to="/"
            onMouseEnter={handleHover} // Hover durumunda çizgi kayacak
            onMouseLeave={handleMouseLeave} // Hover dışında çizgi kaybolacak
          >
            <span>00</span>HOME
          </NavLink>
          <NavLink
            className='link'
            to="/destination"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <span>01</span>DESTINATION
          </NavLink>
          <NavLink
            className='link'
            to="/crew"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <span>02</span>CREW
          </NavLink>
          <NavLink
            className='link'
            to="/technology"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <span>03</span>TECHNOLOGY
          </NavLink>
        </div>
        <div ref={lineRef} className="line"></div> {/* Çizgi burada */}
      </div>
    </div>
  );
}

export default Header;
