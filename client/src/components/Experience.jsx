import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const Experience = ({ experience }) => {
  const [expandedIndex, setExpandedIndex] = useState(0); // Start with first expanded

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section id="experience" className="experience-section">
      <div className="content-wrapper">
        <h2 className="section-title">Professional Journey</h2>
        
        <div className="timeline-container">
          {experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div 
                key={idx} 
                className={`timeline-item ${isExpanded ? 'active' : ''}`}
              >
                {/* Timeline node */}
                <div className="timeline-badge">
                  <Briefcase size={16} />
                </div>
                
                {/* Timeline card */}
                <div className="timeline-card glass-card">
                  <div className="card-header" onClick={() => toggleExpand(idx)}>
                    <div className="header-meta">
                      <span className="company-name">{exp.company}</span>
                      <h3 className="job-role">{exp.role}</h3>
                      <div className="location-date-row">
                        <span className="info-item">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                        <span className="info-item">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <button className="expand-toggle" aria-label="Toggle details">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  <div className={`card-content ${isExpanded ? 'show' : ''}`}>
                    {exp.project && (
                      <div className="project-highlight">
                        <strong>Project:</strong> {exp.project} {exp.description && `— ${exp.description}`}
                      </div>
                    )}
                    {!exp.project && exp.description && (
                      <p className="experience-desc">{exp.description}</p>
                    )}

                    <ul className="highlights-list">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx}>{highlight}</li>
                      ))}
                    </ul>

                    <div className="tech-tags">
                      {exp.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .experience-section {
          position: relative;
        }

        .timeline-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding-left: 50px;
        }

        /* Timeline connector line */
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 17px;
          top: 5px;
          width: 2px;
          height: calc(100% - 30px);
          background: linear-gradient(to bottom, var(--accent-color), rgba(255, 255, 255, 0.05));
          z-index: 1;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .timeline-badge {
          position: absolute;
          left: -50px;
          top: 0px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
          z-index: 2;
          transition: all 0.3s ease;
        }

        .timeline-item.active .timeline-badge {
          background: var(--accent-color);
          border-color: var(--accent-color);
          color: #fff;
          box-shadow: 0 0 12px var(--accent-color);
        }

        .timeline-card {
          padding: 1.5rem 2rem;
          transition: all 0.4s ease;
          border: 1px solid var(--card-border);
          perspective: 1000px;
          position: relative;
          cursor: pointer;
        }



        .timeline-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(var(--accent-rgb, 249, 115, 22), 0.05) 100%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }



        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .company-name {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--accent-color);
          margin-bottom: 0.25rem;
          display: inline-block;
        }

        .job-role {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .location-date-row {
          display: flex;
          gap: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .expand-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }



        .card-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0, 1, 0, 1); /* Quick CSS expand */
        }

        .card-content.show {
          max-height: 2000px;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          transition: max-height 1s cubic-bezier(1, 0, 1, 0); /* Custom physics */
        }

        .project-highlight {
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid var(--accent-color);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .experience-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .highlights-list {
          list-style: none;
          margin-bottom: 1.5rem;
        }

        .highlights-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .highlights-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: var(--accent-color);
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }



        @media (max-width: 768px) {
          .timeline-container {
            padding-left: 30px;
          }
          .timeline-container::before {
            left: 7px;
          }
          .timeline-badge {
            left: -30px;
            width: 30px;
            height: 30px;
            top: 13px;
          }
          .timeline-card {
            padding: 1.25rem 1.5rem;
          }
          .job-role {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
