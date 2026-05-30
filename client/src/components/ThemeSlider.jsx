import React, { useState, useEffect, useRef } from 'react';
import { Sunrise, Sunset, Palette, X } from 'lucide-react';

const ThemeSlider = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  const ActiveIcon = theme === 'sunrise' ? Sunrise : Sunset;

  return (
    <div className="floating-theme-container" ref={popoverRef}>
      {/* Floating Action Button */}
      <button 
        className={`floating-theme-btn theme-${theme}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Theme"
      >
        <ActiveIcon size={22} className="theme-btn-icon" />
        <Palette size={12} className="palette-sub-icon" />
      </button>

      {/* Popover Panel */}
      {isOpen && (
        <div className="theme-popover-card glass-card">
          <div className="popover-header">
            <h4>Select Theme</h4>
            <button className="close-popover" onClick={() => setIsOpen(false)}>
              <X size={14} />
            </button>
          </div>

          <div className="theme-options-grid">
            <button 
              className={`theme-option-btn sunrise-btn ${theme === 'sunrise' ? 'active' : ''}`}
              onClick={() => toggleTheme('sunrise')}
            >
              <div className="option-icon-wrapper">
                <Sunrise size={20} />
              </div>
              <div className="option-label-wrapper">
                <span className="option-name">Sunrise</span>
                <span className="option-desc">Light Theme</span>
              </div>
            </button>

            <button 
              className={`theme-option-btn sunset-btn ${theme === 'sunset' ? 'active' : ''}`}
              onClick={() => toggleTheme('sunset')}
            >
              <div className="option-icon-wrapper">
                <Sunset size={20} />
              </div>
              <div className="option-label-wrapper">
                <span className="option-name">Sunset</span>
                <span className="option-desc">Dark Theme</span>
              </div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .floating-theme-container {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
        }

        .floating-theme-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(0, 0, 0, 0.05);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .floating-theme-btn:hover {
          transform: scale(1.08);
          border-color: var(--accent-color);
          box-shadow: 0 12px 30px var(--glow-color);
        }

        .theme-btn-icon {
          animation: slowSpin 10s linear infinite;
        }

        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .palette-sub-icon {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: var(--accent-color);
          background: var(--card-bg);
          border-radius: 50%;
          padding: 1px;
        }

        .theme-popover-card {
          position: absolute;
          right: 68px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 1.25rem;
          border-radius: 16px;
          width: 240px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .popover-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 0.5rem;
        }

        .popover-header h4 {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .close-popover {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 2px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-popover:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .theme-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .theme-option-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.2s ease;
          color: var(--text-primary);
        }

        .theme-option-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-color);
        }

        .theme-option-btn.active {
          background: var(--stat-bg);
          border-color: var(--accent-color);
          box-shadow: 0 0 10px var(--glow-color);
        }

        .option-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
        }

        .option-label-wrapper {
          display: flex;
          flex-direction: column;
        }

        .option-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
        }

        .option-desc {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .floating-theme-container {
            right: 16px;
          }
          .theme-popover-card {
            right: auto;
            left: -250px;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeSlider;
