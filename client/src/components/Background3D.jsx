import React from 'react';

const Background3D = ({ theme }) => {
  return (
    <div 
      className="dynamic-mesh-bg" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'background 1.5s ease-in-out'
      }}
    />
  );
};

export default Background3D;
