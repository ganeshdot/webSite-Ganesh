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
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { resumeData } from '../../server/data/resumeData.js'; // fallback local copy
import { Menu, X, ArrowUp, Download } from 'lucide-react';

const SERVER_URL = 'http://localhost:5001';

const App = () => {
  const [data, setData] = useState(resumeData);
  const [theme, setTheme] = useState('sunrise');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
      
      // Update active nav link based on scroll position
      const sections = ['hero', 'experience', 'skills', 'contact'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize scroll animations
  useScrollAnimation();

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

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
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
              <a href="#hero" className={activeSection === 'hero' ? 'active-link' : ''} onClick={() => handleNavClick('hero')}>Home</a>
              <a href="#experience" className={activeSection === 'experience' ? 'active-link' : ''} onClick={() => handleNavClick('experience')}>Experience</a>
              <a href="#skills" className={activeSection === 'skills' ? 'active-link' : ''} onClick={() => handleNavClick('skills')}>Skills</a>
              <a href="#contact" className={activeSection === 'contact' ? 'active-link' : ''} onClick={() => handleNavClick('contact')}>Contact</a>
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
          <a href="#hero" className={activeSection === 'hero' ? 'active-link' : ''} onClick={() => handleNavClick('hero')}>About</a>
          <a href="#experience" className={activeSection === 'experience' ? 'active-link' : ''} onClick={() => handleNavClick('experience')}>Experience</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active-link' : ''} onClick={() => handleNavClick('skills')}>Skills</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active-link' : ''} onClick={() => handleNavClick('contact')}>Contact</a>
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
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .mobile-menu-trigger:hover {
          transform: scale(1.1) rotate(90deg);
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-menu-trigger:active {
          transform: scale(0.95);
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

        .mobile-nav a.active-link {
          color: #ffffff;
          background: var(--accent-color);
          padding: 0.5rem 1.1rem;
          border-radius: 6px;
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
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 999;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .scroll-top-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0.2;
          transform: translate(-50%, -50%);
        }

        .scroll-top-btn:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 8px 20px var(--glow-color);
        }

        .scroll-top-btn:hover::before {
          animation: rippleEffect 0.6s ease-out;
        }

        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 0.3;
          }
          100% {
            width: 60px;
            height: 60px;
            opacity: 0;
          }
        }

        .scroll-top-btn:active {
          transform: translateY(-2px) scale(0.95);
          box-shadow: 0 3px 10px var(--glow-color);
        }

        .scroll-top-btn.visible {
          opacity: 1;
          pointer-events: all;
        }

        /* Footer styling */
        footer {
          border-top: 1px solid var(--card-border);
          background: var(--header-bg, rgba(255, 255, 255, 0.7));
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
            display: flex;
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
