// SMOOTH SCROLLING for navigation links
// This makes clicking nav links scroll smoothly instead of jumping

// Select all links that start with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // Add click event listener to each link
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Prevents default jump behavior

    // Get the target section id from the href attribute
    const targetId = this.getAttribute('href');
    // Find the target element
    const targetSection = document.querySelector(targetId);

    // Scroll to the target section smoothly
    targetSection.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling animation
      block: 'start' // Aligns section to top of viewport
    });
  });
});

// FORM SUBMISSION HANDLER
// Note: This currently just prevents default and shows alert
// You'll need to connect it to a backend service to actually send emails

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevents page reload on submit

  // Get form data
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // For now, just show an alert
  alert(`Thanks ${name}! Your message has been received. (Note: To actually send emails, you'll need to connect this to a backend service like FormSpree, EmailJS, or your own server.)`);

  // Reset the form
  form.reset();

  // TO MAKE THIS FUNCTIONAL:
  // Option 1: Use a service like FormSpree (https://formspree.io/)
  // Option 2: Use EmailJS (https://www.emailjs.com/)
  // Option 3: Connect to your own backend server
});

// ACTIVE NAVIGATION HIGHLIGHTING
// This highlights the nav link for the section you're currently viewing

window.addEventListener('scroll', function() {
  // Get all sections
  const sections = document.querySelectorAll('section');
  // Get all nav links
  const navLinks = document.querySelectorAll('nav a');

  // Current scroll position
  let currentScroll = window.pageYOffset;

  // Loop through sections to find which one is in view
  sections.forEach(section => {
    // Get section position and height
    const sectionTop = section.offsetTop - 100; // Offset for fixed nav
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    // Check if section is in viewport
    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.style.color = '#333'; // Reset to default color
      });

      // Add active styling to current section's link
      const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.style.color = '#666'; // Highlight color
      }
    }
  });
});
