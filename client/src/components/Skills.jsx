import React, { useState } from 'react';

const SkillCard = ({ category, items }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const skillCount = items.length;
  const proficiency = Math.min(90 + (skillCount % 10), 100);

  return (
    <div 
      className="flip-card-container"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <div className="flip-card-front glass-card">
          <h3 className="skill-cat-title">{category}</h3>
          <div className="skill-list-grid">
            {items.map((item, idx) => (
              <div key={idx} className="skill-item-bubble">
                <span className="skill-bullet" />
                <span className="skill-name">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back">
          <div className="flip-title">{category}</div>
          <div className="flip-text">
            <p><strong>{skillCount} Skills</strong></p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.8 }}>
              Proficiency: <strong>{proficiency}%</strong>
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
              Click to see skills
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="skills-section">
      <div className="content-wrapper">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <SkillCard 
              key={idx} 
              category={skill.category} 
              items={skill.items} 
            />
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .skill-card {
          position: relative;
          padding: 2.25rem 2rem;
          border: 1px solid var(--card-border);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--card-bg);
        }



        .skill-cat-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .skill-list-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-item-bubble {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--card-border);
          padding: 0.45rem 0.9rem;
          border-radius: 30px;
          transition: all 0.2s ease;
        }



        .skill-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-color);
        }

        .skill-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        @media (max-width: 576px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .skill-card {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
