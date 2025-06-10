// This is the beginning of the script.js file

// Wait for Google Analytics to be ready
function waitForGA(callback) {
  if (typeof gtag !== "undefined" && window.dataLayer) {
    callback();
  } else {
    setTimeout(function () {
      waitForGA(callback);
    }, 100);
  }
}

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

      // Track login button click event
      waitForGA(function () {
        gtag("event", "login_button_click", {
          event_category: "engagement",
          event_label: "login_with_linkedin",
          value: 1,
        });
      });

      window.location.href = "https://app.linkedgoals.app/login";
    });
  });

  // "Watch Demo" Modal Implementation
  const demoModal = document.getElementById("demo-modal");
  const watchDemoBtn = document.getElementById("watch-demo-btn");
  const closeButton = document.querySelector("#demo-modal .close-button");

  if (watchDemoBtn && demoModal && closeButton) {
    watchDemoBtn.addEventListener("click", () => {
      // Track demo modal open event
      waitForGA(function () {
        gtag("event", "demo_modal_open", {
          event_category: "engagement",
          event_label: "watch_demo",
          value: 1,
        });
      });

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

  // Track pricing plan selection
  const selectPlanButtons = document.querySelectorAll(".select-plan-button");
  selectPlanButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planType = button
        .closest(".pricing-tier")
        .classList.contains("premium-tier")
        ? "premium"
        : "free";

      waitForGA(function () {
        gtag("event", "select_plan_click", {
          event_category: "conversion",
          event_label: planType,
          value: planType === "premium" ? 10 : 1,
        });
      });
    });
  });

  // Track LinkedIn sharing clicks
  const shareButtons = document.querySelectorAll(".share-plan-link");
  shareButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planType = button
        .closest(".pricing-tier")
        .classList.contains("premium-tier")
        ? "premium"
        : "free";

      waitForGA(function () {
        gtag("event", "linkedin_share_click", {
          event_category: "social",
          event_label: planType + "_plan_share",
          value: 1,
        });
      });
    });
  });

  // Track navigation clicks
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionName = button.textContent.toLowerCase().replace(/\s+/g, "_");

      waitForGA(function () {
        gtag("event", "navigation_click", {
          event_category: "navigation",
          event_label: sectionName,
          value: 1,
        });
      });
    });
  });
});
