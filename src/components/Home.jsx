import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import React, { useRef } from 'react'


function Home() {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from(".inner-home-container", { opacity: 0.25, duration: 0.5, ease: "power2.inOut" })

  })

  return (
    <div className='home-container'>
      <div className="inner-home-container">
        <div className="home-intro">
          <h3 className='home-header'>SO, YOU WANT TO TRAVEL TO</h3>
          <h1 className='space-header'>SPACE</h1>
          <p className='home-text'>Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
        </div>
        <button className="explore-button">
          EXPLORE
        </button>
      </div>
    </div>
  )
}

export default Home