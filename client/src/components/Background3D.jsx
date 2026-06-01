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

      {/* Animated background particles */}
      <div className="bg-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

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
          z-index: 0;
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
          z-index: 2;
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

        /* Floating particles animation */
        .bg-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0.1;
          animation: floatParticles 8s linear infinite;
          pointer-events: none;
        }

        .theme-sunset .particle {
          background: var(--accent-secondary);
          opacity: 0.08;
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

        @keyframes floatParticles {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
            transform: translateY(-50px) translateX(30px) scale(1.2);
          }
          90% {
            opacity: 0.05;
          }
          100% {
            transform: translateY(-100px) translateX(0px) scale(0.8);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .mouse-gradient-spotlight {
            width: 600px;
            height: 600px;
          }

          .mouse-light-orb {
            filter: blur(60px);
          }

          .orb-1 {
            width: 300px;
            height: 300px;
          }

          .orb-2 {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Background3D;
