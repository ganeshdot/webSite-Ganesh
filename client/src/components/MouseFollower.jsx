import React, { useEffect, useState } from 'react';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const isClickable = e.target.closest('a, button, [role="button"], input, textarea, .timeline-node');
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = (e) => {
      const newClick = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [visible]);

  // Easing/Spring movement logic for the outer lag ring
  useEffect(() => {
    let animationFrameId;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.12, // slightly slower for more premium elastic lag
          y: prev.y + dy * 0.12
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!visible) return null;

  return (
    <>
      {/* Outer lagged ring / glow */}
      <div 
        className={`mouse-glow-outer ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${trail.x - (isHovered ? 24 : 16)}px, ${trail.y - (isHovered ? 24 : 16)}px, 0)`
        }}
      />

      {/* Inner sharp dot */}
      <div 
        className={`mouse-dot-inner ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`
        }}
      />

      {/* Click ripples */}
      {clicks.map((click) => (
        <div 
          key={click.id}
          className="click-ripple"
          style={{
            left: click.x,
            top: click.y
          }}
        />
      ))}

      <style>{`
        /* Inner precise dot */
        .mouse-dot-inner {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-color);
          pointer-events: none;
          z-index: 99999;
          transition: width 0.2s, height 0.2s, transform 0.05s ease-out;
        }

        .mouse-dot-inner.hovered {
          width: 8px;
          height: 8px;
          background: var(--accent-color);
        }

        /* Outer elastic ring / glow */
        .mouse-glow-outer {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--accent-color);
          background: radial-gradient(circle, var(--accent-color) 0%, rgba(255, 255, 255, 0) 70%);
          opacity: 0.25;
          pointer-events: none;
          z-index: 99998;
          mix-blend-mode: screen;
          transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                      height 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
                      transform 0.08s ease-out,
                      border-color 0.3s ease;
        }

        .mouse-glow-outer.hovered {
          width: 48px;
          height: 48px;
          border-color: var(--accent-secondary);
          background: radial-gradient(circle, var(--accent-color) 10%, rgba(255, 255, 255, 0) 80%);
          opacity: 0.35;
        }

        /* Click Ripple animation */
        .click-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border: 2px solid var(--accent-color);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 99997;
          animation: rippleExpand 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes rippleExpand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.8;
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
          }
        }

        /* Adjustments for light theme sunrise */
        .theme-sunrise .mouse-glow-outer {
          mix-blend-mode: multiply;
          opacity: 0.12;
        }
        
        .theme-sunrise .mouse-glow-outer.hovered {
          opacity: 0.18;
        }

        /* Hide standard cursor for a cleaner futuristic feel on desktop */
        @media (min-width: 1024px) {
          body, a, button, [role="button"], input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MouseFollower;
