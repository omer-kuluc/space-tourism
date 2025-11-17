import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Crew() {
  gsap.registerPlugin(useGSAP);

  // Sayfa açıldığında animasyonu başlat
  useGSAP(() => {
    gsap.from(".inner-crew-area", { opacity: 0.25, duration: 1.0, ease: "power2.inOut" })
  });

  const [selectedMember, setSelectedMember] = useState('commander');
  const { data, setData } = useContext(DataContext);

  const selectedMemberData = data[selectedMember] || data['commander'];

  // selectedMemberData değiştiğinde her iki animasyonu da yeniden başlat
  useEffect(() => {
    // crew-image animasyonu
    gsap.fromTo(".crew-image",
      { opacity: 0 },  // Başlangıç
      { opacity: 1, ease: "bounce" }  // Bitiş
    );

    // member-text animasyonu
    gsap.fromTo(".member-info",
      { opacity: 0, y: 20 },  // Başlangıç (opacity sıfır ve biraz daha altta)
      { opacity: 1, y: 0, duration: 0.5, ease: "bounce" }  // Bitiş (daha yukarıda ve görünür hale gelmesi)
    );
  }, [selectedMemberData]); // selectedMemberData değiştiğinde her iki animasyonu tetikle

  return (
    <div className='crew-container'>
      <div className="inner-crew-area">
        <h1 className="crew-header">
          <span className='crew-number'>02</span>MEET YOUR CREW
        </h1>
        <img className='selectedmember-photo-mobile' src={selectedMemberData?.image} alt={selectedMemberData?.name} />
        <div className="members-section">
          <div className="crew-section">
            <div className="crew-options">
              <button
                onClick={() => setSelectedMember('commander')}
                className={`crew-option-button ${selectedMember === 'commander' ? 'selected' : ''}`}
              >
              </button>
              <button
                onClick={() => setSelectedMember('mission-specialist')}
                className={`crew-option-button ${selectedMember === 'mission-specialist' ? 'selected' : ''}`}
              >
              </button>
              <button
                onClick={() => setSelectedMember('pilot')}
                className={`crew-option-button ${selectedMember === 'pilot' ? 'selected' : ''}`}
              >
              </button>
              <button
                onClick={() => setSelectedMember('flight-engineer')}
                className={`crew-option-button ${selectedMember === 'flight-engineer' ? 'selected' : ''}`}
              >
              </button>
            </div>

            <div className="member-info">
              <h3 className='member-title'>{selectedMemberData?.title}</h3>
              <h2 className='member-name'>{selectedMemberData?.name}</h2>
              <p className='member-text'>{selectedMemberData?.text}</p>
            </div>
          </div>
          <img className='tablet-only crew-image' src={selectedMemberData?.tabletImage} alt={selectedMemberData?.name} />
        </div>
      </div>
      <img className='desktop-only crew-image' src={selectedMemberData?.desktopImage} alt={selectedMemberData?.name} />
    </div>
  );
}

export default Crew;
