import React from 'react';
import { Sun, Moon, Sunrise, Sunset, Clock, RotateCcw } from 'lucide-react';

const ThemeSlider = ({ theme, setTheme, isAuto, setIsAuto }) => {
  
  const themes = [
    { id: 'sunrise', name: 'Sunrise', icon: Sunrise, color: 'var(--accent-color)' },
    { id: 'day', name: 'Noon', icon: Sun, color: 'var(--accent-color)' },
    { id: 'sunset', name: 'Sunset', icon: Sunset, color: 'var(--accent-color)' },
    { id: 'night', name: 'Night', icon: Moon, color: 'var(--accent-color)' }
  ];

  return (
    <div className="theme-selector-container">
      <div className="theme-selector-header">
        <div className="selector-title">
          <Clock size={16} className="title-icon" />
          <span>Solar Core Theme</span>
        </div>
        <button 
          className={`auto-toggle-btn ${isAuto ? 'active' : ''}`}
          onClick={() => setIsAuto(!isAuto)}
          title={isAuto ? "Switch to Manual Mode" : "Switch to Sync with Local Time"}
        >
          {isAuto ? 'Local Time Sync' : 'Manual Mode'}
        </button>
      </div>

      <div className="solar-timeline">
        <div className="timeline-bar" />
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setIsAuto(false);
                setTheme(t.id);
              }}
              className={`timeline-node ${isActive ? 'active' : ''}`}
              style={{ '--node-color': t.color }}
            >
              <div className="node-icon-wrapper">
                <Icon size={18} />
              </div>
              <span className="node-label">{t.name}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .theme-selector-container {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 1.25rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          width: 100%;
          max-width: 420px;
          margin: 1.5rem auto;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }

        .theme-selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .selector-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: var(--text-primary);
        }

        .title-icon {
          color: var(--accent-color);
        }

        .auto-toggle-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 0.35rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auto-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .auto-toggle-btn.active {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 2px 10px var(--glow-color);
        }

        .solar-timeline {
          display: flex;
          justify-content: space-between;
          position: relative;
          padding: 0.5rem 0.25rem;
        }

        .timeline-bar {
          position: absolute;
          top: 26px;
          left: 10%;
          width: 80%;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }

        .timeline-node {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          position: relative;
          z-index: 2;
          width: 60px;
        }

        .node-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .timeline-node:hover .node-icon-wrapper {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.1);
        }

        .timeline-node.active .node-icon-wrapper {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 0 15px var(--accent-color);
          transform: scale(1.15);
        }

        .node-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
        }

        .timeline-node.active .node-label {
          color: var(--text-primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default ThemeSlider;
