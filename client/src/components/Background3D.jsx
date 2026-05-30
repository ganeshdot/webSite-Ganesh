import React from 'react';

const Background3D = ({ theme }) => {
  return (
    <div className="dynamic-mesh-container">
      {/* Dynamic gradients overlay */}
      <div className="dynamic-mesh-bg" />
      
      {/* Animated Floating Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <style>{`
        .dynamic-mesh-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          background: var(--bg-color, #ffffff);
          transition: background 1.5s ease-in-out;
        }

        .dynamic-mesh-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-gradient);
          opacity: 0.85;
          transition: background 1.5s ease-in-out;
        }

        /* Ambient animated blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          mix-blend-mode: multiply;
          animation: floatAround 25s ease-in-out infinite alternate;
          transition: background 1.5s ease-in-out;
        }

        .theme-sunset .blob {
          opacity: 0.25;
          mix-blend-mode: screen;
        }

        .blob-1 {
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: var(--accent-color);
          animation-duration: 20s;
        }

        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 45vw;
          height: 45vw;
          background: var(--accent-secondary);
          animation-duration: 25s;
          animation-delay: -5s;
        }

        .blob-3 {
          top: 40%;
          left: 50%;
          width: 35vw;
          height: 35vw;
          background: var(--accent-color);
          opacity: 0.08;
          animation-duration: 30s;
          animation-delay: -10s;
        }

        @keyframes floatAround {
          0% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15) rotate(120deg);
          }
          66% {
            transform: translate(-30px, 40px) scale(0.9) rotate(240deg);
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Background3D;
