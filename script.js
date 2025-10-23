// ============================================
// PARTICLE BACKGROUND ANIMATION
// ============================================
// Creates floating particles in the background for sci-fi effect

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50; // Number of particles to create

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random animation delay for variety
    particle.style.animationDelay = Math.random() * 20 + 's';

    // Random animation duration
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';

    particlesContainer.appendChild(particle);
  }
}

// Create particles when page loads
createParticles();

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================
// Makes clicking nav links scroll smoothly to sections

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
// Highlights the nav link for the section currently in view

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentScroll = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = '';
      });

      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--primary-color)';
      }
    }
  });
});

// ============================================
// ANIMATED COUNTERS FOR STATS
// ============================================
// Makes the numbers in stat cards count up when scrolled into view

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // Animation duration in milliseconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for triggering animations when elements come into view
const observerOptions = {
  threshold: 0.5, // Trigger when 50% of element is visible
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate stat numbers
      if (entry.target.classList.contains('stat-number')) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }

      // Animate skill bars
      if (entry.target.classList.contains('skill-progress')) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }

      // Fade in elements
      if (entry.target.classList.contains('fade-in')) {
        entry.target.classList.add('visible');
      }
    }
  });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
  observer.observe(stat);
});

// Observe all skill progress bars
document.querySelectorAll('.skill-progress').forEach(skill => {
  observer.observe(skill);
});

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
// Handles contact form submission

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Show success message
  alert(`Message received, ${name}! 🚀\n\nI'll get back to you at ${email} as soon as possible.\n\n(Note: To actually send emails, connect this form to a service like FormSpree, EmailJS, or your own backend.)`);

  // Reset form
  form.reset();

  // TO MAKE THIS FUNCTIONAL:
  // 1. Sign up for FormSpree (https://formspree.io/)
  // 2. Get your form endpoint
  // 3. Add action="https://formspree.io/f/YOUR_FORM_ID" to the form tag
  // 4. Add method="POST" to the form tag
  // 5. Remove this JavaScript handler or modify it for custom behavior
});

// ============================================
// ADD FADE-IN ANIMATION TO SECTIONS
// ============================================
// Automatically adds fade-in class to major elements

document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // Add fade-in to timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
  });

  // Add fade-in to skill items
  document.querySelectorAll('.skill-item').forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
  });
});

// ============================================
// TYPING EFFECT FOR TERMINAL (OPTIONAL)
// ============================================
// Uncomment this section if you want a typing animation in the terminal

/*
function typeText(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Use it like this:
// const terminalText = document.querySelector('.terminal-text');
// typeText(terminalText, 'Your terminal text here');
*/
