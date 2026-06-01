import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Map of element selectors to their animation classes
    const animationConfig = [
      // Section titles
      { selector: '.section-title', animation: 'fade-in-up' },
      
      // Hero section elements
      { selector: '.hero-title-name', animation: 'fade-in-up' },
      { selector: '.hero-description-paragraph', animation: 'fade-in-up', delay: 'stagger-1' },
      { selector: '.hero-action-row', animation: 'fade-in-up', delay: 'stagger-2' },
      { selector: '.stats-row', animation: 'fade-in-up', delay: 'stagger-3' },
      { selector: '.portrait-card', animation: 'fade-in-right', delay: 'stagger-2' },
      
      // Experience section
      { selector: '.experience-grid', animation: 'fade-in-up' },
      { selector: '.experience-card', animation: 'scale-up' },
      
      // Skills section
      { selector: '.skills-grid', animation: 'fade-in-up' },
      { selector: '.skill-item', animation: 'fade-in-up' },
      
      // Contact section
      { selector: '.contact-container', animation: 'fade-in-up' },
      { selector: '.form-group', animation: 'slide-up' },
    ];

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Get the animation class from data attribute or configuration
            const animationClass = element.dataset.animation || 'fade-in-up';
            const delayClass = element.dataset.delay || '';
            
            // Add animation classes
            element.classList.add('scroll-animate', animationClass);
            if (delayClass) {
              element.classList.add(delayClass);
            }
            
            // Remove from observer once animated
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
      }
    );

    // Observe elements based on configuration
    animationConfig.forEach(({ selector, animation, delay }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        // Set animation data attributes
        el.dataset.animation = animation;
        if (delay) {
          const delayNum = (index % 10) + 1;
          el.dataset.delay = `${delay === 'stagger' ? `stagger-${delayNum}` : delay}`;
        }
        observer.observe(el);
      });
    });

    // Also observe all elements with scroll-animate class that might be added dynamically
    const scrollAnimateElements = document.querySelectorAll('[data-animation]');
    scrollAnimateElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
