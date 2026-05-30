import React, { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import ThemeSlider from './components/ThemeSlider';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import Chatbot from './components/Chatbot';
import ResumePDF from './components/ResumePDF';
import MouseFollower from './components/MouseFollower';
import { resumeData } from '../../server/data/resumeData.js'; // fallback local copy
import { Menu, X, ArrowUp, Download } from 'lucide-react';

const SERVER_URL = 'http://localhost:5001';

const App = () => {
  const [data, setData] = useState(resumeData);
  const [theme, setTheme] = useState('sunrise');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch resume data from server
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/resume`);
        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        }
      } catch (error) {
        console.warn('Backend API server unreachable. Using fallback static resume dataset.', error);
      }
    };
    fetchResume();
  }, []);



  // Handle scroll events for "back to top" and nav blur
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger CV printable PDF generation
  const handleDownloadCV = () => {
    window.print();
  };

  const handleChatOpen = () => {
    // Scroll to chatbot or simulate opening
    const chatToggle = document.querySelector('.chat-toggle-btn');
    if (chatToggle) {
      chatToggle.click();
    }
  };

  return (
    <div className={`theme-${theme}`}>
      {/* Mouse Glow Follower */}
      <MouseFollower />

      {/* 3D background rendering */}
      <Background3D theme={theme} />

      {/* Main Container */}
      <div className="app-container">
        
        {/* Navigation Header */}
        <header>
          <div className="nav-container">
            <div className="logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="logo-badge">G</div>
              <span className="logo-text">Ganeshbabu</span>
            </div>
            
            <nav className="nav-links">
              <a href="#hero" className="active-link">Home</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="nav-actions">
              <button 
                className="nav-btn cv-btn header-cv-btn" 
                onClick={handleDownloadCV}
              >
                <Download size={16} />
                <span>Resume</span>
              </button>
              
              {/* Mobile menu trigger */}
              <button 
                className="mobile-menu-trigger" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button 
            className="nav-btn" 
            onClick={() => {
              setMobileMenuOpen(false);
              handleDownloadCV();
            }}
          >
            Download CV
          </button>
        </div>

        {/* Floating Theme Selector */}
        <ThemeSlider theme={theme} setTheme={setTheme} />

        {/* Main Sections */}
        <main>
          <Hero 
            personalInfo={data.personalInfo} 
            onChatClick={handleChatOpen} 
            onDownloadClick={handleDownloadCV} 
          />
          <Experience experience={data.experience} />
          <Skills skills={data.skills} />
          <ContactForm serverUrl={SERVER_URL} />
        </main>

        {/* Footer */}
        <footer>
          <div className="content-wrapper footer-content">
            <p>© {new Date().getFullYear()} Ganeshbabu Kannan. All Rights Reserved.</p>
            
          </div>
        </footer>

        {/* AI Chatbot floating assistant */}
        <Chatbot serverUrl={SERVER_URL} />

        {/* Print template container (hidden from view, only rendered on print) */}
        <ResumePDF data={data} />

        {/* Back to top button */}
        <button 
          className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      <style>{`
        /* Header additions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-menu-trigger {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.25rem;
          transition: transform 0.2s ease;
        }

        .mobile-menu-trigger:hover {
          transform: scale(1.05);
        }

        /* Mobile nav menu */
        .mobile-nav {
          position: fixed;
          top: 70px;
          left: 0;
          width: 100%;
          background: var(--card-bg);
          border-bottom: 1px solid var(--card-border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 0;
          gap: 1.5rem;
          z-index: 999;
          transform: translateY(-120%);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .mobile-nav.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .mobile-nav a {
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .mobile-nav a:hover {
          color: var(--accent-color);
        }



        /* Back to top button style */
        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s ease;
          z-index: 999;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .scroll-top-btn:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px var(--glow-color);
        }

        .scroll-top-btn.visible {
          opacity: 1;
          pointer-events: all;
        }

        /* Footer styling */
        footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.15);
          padding: 2.5rem 0;
          margin-top: 5rem;
          text-align: center;
        }

        .footer-content {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-credits {
          font-weight: 500;
          color: var(--accent-color);
        }

        @media (max-width: 768px) {
          .mobile-menu-trigger {
            display: block;
          }
          .nav-links {
            display: none;
          }
          .nav-actions .nav-btn {
            display: none; /* Hidden on header for mobile, placed inside menu drawer */
          }
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
