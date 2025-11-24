import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../App';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Crew() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Yeni state, resimlerin yüklenip yüklenmediğini kontrol eder.
  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Resimlerin yüklenmesini beklemek
  useEffect(() => {
    const image = new Image();
    image.src = '/img/crew-background.jpg'; // Örnek bir background resmi yolu
    image.onload = () => {
      setIsImageLoaded(true);  // Resim yüklendiğinde state güncellenir
    };
  }, []);

  useEffect(() => {
    if (hasMounted && isImageLoaded) {
      gsap.from(".inner-crew-area", { opacity: 0.25, duration: 1.0, ease: "power2.inOut" });
      document.querySelector('.crew-container').classList.add('loaded'); // Yüklendikten sonra opaklık değişimi
    }
  }, [hasMounted, isImageLoaded]);

  const [selectedMember, setSelectedMember] = useState('commander');
  const { data } = useContext(DataContext);

  const selectedMemberData = data[selectedMember] || data['commander'];

  useEffect(() => {
    if (hasMounted) {
      gsap.fromTo(".crew-image", { opacity: 0 }, { opacity: 1, ease: "ease.inOut" });
      gsap.fromTo(".member-info", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "ease.inOut" });
    }
  }, [selectedMemberData, hasMounted]);

  return (
    <div className='crew-container'>
      <div className="inner-crew-area">
        <h1 className="crew-header">
          <span className='crew-number'>02</span>MEET YOUR CREW
        </h1>
        <img className='selectedmember-photo-mobile' src={selectedMemberData?.image} alt={selectedMemberData?.name} loading='lazy' />
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
          <img className='tablet-only crew-image' src={selectedMemberData?.tabletImage} alt={selectedMemberData?.name} loading='lazy' />
        </div>
      </div>
      <img className='desktop-only crew-image' src={selectedMemberData?.desktopImage} alt={selectedMemberData?.name} loading='lazy' />
    </div>
  );
}

export default Crew;
