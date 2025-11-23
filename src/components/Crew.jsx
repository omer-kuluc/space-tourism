import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Crew() {
  gsap.registerPlugin(useGSAP);

  const [selectedMember, setSelectedMember] = useState('commander');
  const { data } = useContext(DataContext);
  const selectedMemberData = data[selectedMember] || data['commander'];

  useEffect(() => {
    // Sayfa yüklendikten sonra animasyonları başlat
    window.onload = function () {
      gsap.fromTo(".crew-image", { opacity: 0 }, { opacity: 1, ease: "bounce" });
      gsap.fromTo(".member-info", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "bounce" });
    };
  }, [selectedMemberData]); // selectedMemberData değiştiğinde animasyonu başlat

  return (
    <div className="crew-container">
      <div className="inner-crew-area">
        <h1 className="crew-header">
          <span className="crew-number">02</span>MEET YOUR CREW
        </h1>
        <img
          className="selectedmember-photo-mobile"
          src={selectedMemberData?.image}
          alt={selectedMemberData?.name}
          loading="lazy"
        />
        <div className="members-section">
          <div className="crew-section">
            <div className="crew-options">
              <button onClick={() => setSelectedMember('commander')} className={`crew-option-button ${selectedMember === 'commander' ? 'selected' : ''}`}></button>
              <button onClick={() => setSelectedMember('mission-specialist')} className={`crew-option-button ${selectedMember === 'mission-specialist' ? 'selected' : ''}`}></button>
              <button onClick={() => setSelectedMember('pilot')} className={`crew-option-button ${selectedMember === 'pilot' ? 'selected' : ''}`}></button>
              <button onClick={() => setSelectedMember('flight-engineer')} className={`crew-option-button ${selectedMember === 'flight-engineer' ? 'selected' : ''}`}></button>
            </div>
            <div className="member-info">
              <h3 className="member-title">{selectedMemberData?.title}</h3>
              <h2 className="member-name">{selectedMemberData?.name}</h2>
              <p className="member-text">{selectedMemberData?.text}</p>
            </div>
          </div>
          <img className="tablet-only crew-image" src={selectedMemberData?.tabletImage} alt={selectedMemberData?.name} loading="lazy" />
        </div>
      </div>
      <img className="desktop-only crew-image" src={selectedMemberData?.desktopImage} alt={selectedMemberData?.name} loading="lazy" />
    </div>
  );
}

export default Crew;
