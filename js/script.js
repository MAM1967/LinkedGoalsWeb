// This is the beginning of the script.js file

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Functionality
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const navUl = document.querySelector("header nav ul");

  if (hamburgerButton && navUl) {
    hamburgerButton.addEventListener("click", () => {
      navUl.classList.toggle("nav-open");
      const isExpanded = navUl.classList.contains("nav-open");
      hamburgerButton.setAttribute("aria-expanded", isExpanded);
    });
  }

  // "Login with LinkedIn" Button Interactivity
  const loginButtons = document.querySelectorAll(".login-button");
  loginButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action (e.g., form submission if it's a button, or link navigation if it's an <a> before we manually navigate)
      window.location.href = "https://app.linkedgoals.app/login";
    });
  });

  // "Watch Demo" Modal Implementation
  const demoModal = document.getElementById("demo-modal");
  const watchDemoBtn = document.getElementById("watch-demo-btn");
  const closeButton = document.querySelector("#demo-modal .close-button");

  if (watchDemoBtn && demoModal && closeButton) {
    watchDemoBtn.addEventListener("click", () => {
      demoModal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
      demoModal.style.display = "none";
    });

    // Close modal if user clicks outside of the modal content
    window.addEventListener("click", (event) => {
      if (event.target === demoModal) {
        demoModal.style.display = "none";
      }
    });
  }

  // "Contact Us" Link Interactivity
  /*
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            alert('Contact form/page will be available soon!');
        });
    });
    */

  // Placeholder for future "Share on LinkedIn" buttons
  // const shareButtons = document.querySelectorAll('.share-linkedin-btn');
  // shareButtons.forEach(button => {
  //     button.addEventListener('click', () => {
  //         alert('Social sharing functionality will be implemented soon!');
  //     });
  // });
});
