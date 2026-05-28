import React from 'react';
import { Mail, Phone, MessageSquare, Download } from 'lucide-react';
import developerAvatar from '../assets/developer_avatar.png';

const Linkedin = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Hero = ({ personalInfo, onChatClick, onDownloadClick }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="content-wrapper hero-grid-container">
        
        {/* Left Content column */}
        <div className="hero-text-content">
          <h1 className="hero-title-name">
            Hello, I’m <br />
            <span className="bold-name">{personalInfo.name}</span>
          </h1>
          
          <p className="hero-description-paragraph">
            I’m a <strong>Senior Front-End Developer</strong> and <strong>DevOps Engineer</strong> based in Chennai, India. I strive to build immersive and beautiful web applications through carefully crafted code and scalable cloud architectures.
          </p>
          
          <div className="hero-action-row">
            <button className="nav-btn say-hello-btn" onClick={onChatClick}>
              <span>Say Hello!</span>
            </button>
            <button className="cta-download-btn" onClick={onDownloadClick}>
              <Download size={16} />
              <span>Get Resume</span>
            </button>
          </div>

          {/* Stats blocks matching screenshot style */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-value">12+ Y.</span>
              <span className="stat-label">Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100+</span>
              <span className="stat-label">Releases Managed</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">SLA Uptime</span>
            </div>
          </div>
        </div>

        {/* Right Portrait column */}
        <div className="hero-image-content">
          <div className="portrait-card">
            <img 
              src={developerAvatar} 
              alt={personalInfo.name} 
              className="portrait-img" 
            />
          </div>
        </div>

      </div>

      <style>{`
        .hero-section {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding-top: 120px;
          padding-bottom: 60px;
        }

        .hero-grid-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }

        /* Left Side */
        .hero-text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-title-name {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }

        .bold-name {
          font-weight: 800;
        }

        .hero-description-paragraph {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2.25rem;
          max-width: 520px;
        }

        .hero-description-paragraph strong {
          color: #111827;
          font-weight: 600;
        }

        .hero-action-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 3.5rem;
          align-items: center;
        }

        .say-hello-btn {
          padding: 0.8rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
        }

        .cta-download-btn {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #111827;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .cta-download-btn:hover {
          background: rgba(0, 0, 0, 0.06);
          border-color: var(--accent-color);
        }

        /* Stats Blocks matching screenshot */
        .stats-row {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 540px;
        }

        .stat-card {
          flex: 1;
          background: var(--stat-bg);
          border-radius: 8px;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        /* Right Side (Portrait Card) */
        .hero-image-content {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        .portrait-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          width: 100%;
          max-width: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portrait-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        @media (max-width: 968px) {
          .hero-grid-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-title-name {
            font-size: 2.8rem;
          }
          .hero-image-content {
            justify-content: center;
          }
          .portrait-card {
            max-width: 360px;
          }
        }

        @media (max-width: 576px) {
          .hero-title-name {
            font-size: 2.3rem;
          }
          .hero-action-row {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
          }
          .say-hello-btn, .cta-download-btn {
            justify-content: center;
          }
          .stats-row {
            flex-direction: column;
            gap: 0.75rem;
          }
          .stat-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
