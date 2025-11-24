import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'i import et

function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const navigate = useNavigate();  // useNavigate hook'u ile yönlendirme

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      gsap.to("home-container", { opacity: 1, duration: 3.5, ease: "back.in" });
      gsap.from(".inner-home-container", { opacity: 0.25, duration: 1.5, ease: "power2.inOut" });
    }
  }, [hasMounted]);

  function handleExploreBtn() {
    navigate('/destination');
  }

  return (
    <div className='home-container'>
      <div className="inner-home-container">
        <div className="home-intro">
          <h3 className='home-header'>SO, YOU WANT TO TRAVEL TO</h3>
          <h1 className='space-header'>SPACE</h1>
          <p className='home-text'>
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this world experience!
          </p>
        </div>
        <button onClick={handleExploreBtn} className="explore-button">
          EXPLORE
        </button>
      </div>
    </div>
  );
}

export default Home;
