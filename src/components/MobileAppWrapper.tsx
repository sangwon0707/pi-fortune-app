
import React, { useEffect } from 'react';

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ children }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', height: 'calc(var(--vh, 1vh) * 100)' }}>
      {children}
    </div>
  );
};

export default MobileAppWrapper;
