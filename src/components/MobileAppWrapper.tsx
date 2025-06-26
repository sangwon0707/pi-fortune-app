
import React from 'react';

interface MobileAppWrapperProps {
  children: React.ReactNode;
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ children }) => {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
      {children}
    </div>
  );
};

export default MobileAppWrapper;
