import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Linkedin = ({ size = 12 }) => (
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

const ResumePDF = ({ data }) => {
  const { personalInfo, skills, experience, certifications, education } = data;

  return (
    <div id="resume-pdf-container" className="resume-pdf-layout">
      {/* Header */}
      <div className="pdf-header">
        <h1 className="pdf-name">{personalInfo.name}</h1>
        <h2 className="pdf-title">{personalInfo.title}</h2>
        <div className="pdf-contact-grid">
          <div className="pdf-contact-item">
            <Mail size={12} />
            <span>{personalInfo.email}</span>
          </div>
          <div className="pdf-contact-item">
            <Phone size={12} />
            <span>{personalInfo.phone.join(' | ')}</span>
          </div>
          <div className="pdf-contact-item">
            <Linkedin size={12} />
            <span>{personalInfo.linkedin}</span>
          </div>
          <div className="pdf-contact-item">
            <MapPin size={12} />
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      <div className="pdf-divider" />

      {/* Professional Summary */}
      <div className="pdf-section">
        <h3 className="pdf-section-title">Professional Summary</h3>
        <p className="pdf-summary-text">{personalInfo.summary}</p>
      </div>

      {/* Technical Skills */}
      <div className="pdf-section">
        <h3 className="pdf-section-title">Technical Skills</h3>
        <div className="pdf-skills-table">
          {skills.map((skill, idx) => (
            <div key={idx} className="pdf-skills-row">
              <div className="pdf-skill-category"><strong>{skill.category}:</strong></div>
              <div className="pdf-skill-items">{skill.items.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="pdf-section">
        <h3 className="pdf-section-title">Professional Experience</h3>
        {experience.map((exp, idx) => (
          <div key={idx} className="pdf-exp-item">
            <div className="pdf-exp-header">
              <div>
                <span className="pdf-exp-role"><strong>{exp.role}</strong></span>
                <span className="pdf-exp-company"> | {exp.company}</span>
              </div>
              <span className="pdf-exp-period">{exp.period}</span>
            </div>
            {exp.project && (
              <div className="pdf-exp-project">
                <strong>Project:</strong> {exp.project} {exp.description && `— ${exp.description}`}
              </div>
            )}
            <ul className="pdf-bullet-list">
              {exp.highlights.map((highlight, hIdx) => (
                <li key={hIdx}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Certifications & Education */}
      <div className="pdf-double-section">
        <div className="pdf-sub-section">
          <h3 className="pdf-section-title">Certifications</h3>
          <ul className="pdf-bullet-list clean">
            {certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
        </div>
        
        <div className="pdf-sub-section">
          <h3 className="pdf-section-title">Education</h3>
          {education.map((edu, idx) => (
            <div key={idx} className="pdf-edu-item">
              <div className="pdf-edu-degree"><strong>{edu.degree}</strong></div>
              <div className="pdf-edu-details">
                {edu.institution}, {edu.location} ({edu.period})
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Invisible on screen by default */
        .resume-pdf-layout {
          display: none;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          color: #2D3748;
          font-family: 'Inter', sans-serif;
          padding: 30px 40px;
          box-sizing: border-box;
          line-height: 1.4;
        }

        /* Printable layout variables */
        .pdf-header {
          text-align: center;
          margin-bottom: 12px;
        }

        .pdf-name {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #1A365D;
          letter-spacing: -0.5px;
          margin-bottom: 2px;
        }

        .pdf-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #4A5568;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .pdf-contact-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          font-size: 10px;
          color: #4A5568;
        }

        .pdf-contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pdf-divider {
          height: 1.5px;
          background: #E2E8F0;
          margin-bottom: 15px;
        }

        .pdf-section {
          margin-bottom: 15px;
        }

        .pdf-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #1A365D;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 3px;
          margin-bottom: 8px;
        }

        .pdf-summary-text {
          font-size: 10px;
          color: #4A5568;
          text-align: justify;
        }

        .pdf-skills-table {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pdf-skills-row {
          display: flex;
          font-size: 10px;
        }

        .pdf-skill-category {
          width: 150px;
          flex-shrink: 0;
          color: #2D3748;
        }

        .pdf-skill-items {
          color: #4A5568;
        }

        .pdf-exp-item {
          margin-bottom: 10px;
        }

        .pdf-exp-header {
          display: flex;
          justify-content: space-between;
          font-size: 10.5px;
          margin-bottom: 2px;
        }

        .pdf-exp-role {
          color: #1A365D;
        }

        .pdf-exp-company {
          color: #4A5568;
        }

        .pdf-exp-period {
          color: #718096;
          font-size: 9.5px;
        }

        .pdf-exp-project {
          background: #F7FAFC;
          padding: 4px 8px;
          border-left: 2px solid #3182CE;
          font-size: 9.5px;
          color: #2D3748;
          margin-bottom: 4px;
          border-radius: 0 4px 4px 0;
        }

        .pdf-bullet-list {
          margin-left: 12px;
          font-size: 9.5px;
          color: #4A5568;
        }

        .pdf-bullet-list li {
          margin-bottom: 3px;
          text-align: justify;
        }

        .pdf-bullet-list.clean {
          list-style: square;
          margin-left: 12px;
        }

        .pdf-double-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .pdf-edu-item {
          margin-bottom: 8px;
        }

        .pdf-edu-degree {
          font-size: 10px;
          color: #1A365D;
        }

        .pdf-edu-details {
          font-size: 9.5px;
          color: #4A5568;
        }

        /* Screen Print mode overlays (activated during window.print()) */
        @media print {
          body * {
            visibility: hidden;
            background: #fff !important;
          }
          
          #resume-pdf-container, #resume-pdf-container * {
            visibility: visible;
          }
          
          #resume-pdf-container {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
          }
          
          @page {
            size: A4 portrait;
            margin: 1.2cm;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePDF;
