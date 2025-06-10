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

  // Premium Notification Modal Functionality
  const premiumNotifyButton = document.querySelector(
    '.coming-soon-button[href="#notify-premium"]'
  );
  const premiumModal = document.getElementById("premium-notify-modal");
  const premiumClose = document.getElementById("premium-close");
  const premiumForm = document.getElementById("premium-notify-form");
  const premiumSuccess = document.getElementById("premium-success");

  // Open premium modal
  if (premiumNotifyButton && premiumModal) {
    premiumNotifyButton.addEventListener("click", function (e) {
      e.preventDefault();
      premiumModal.style.display = "block";

      // Track premium interest
      waitForGA(function () {
        gtag("event", "premium_notify_open", {
          event_category: "conversion",
          event_label: "premium_interest",
          value: 10,
        });
      });
    });
  }

  // Close premium modal
  if (premiumClose) {
    premiumClose.addEventListener("click", function () {
      premiumModal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === premiumModal) {
      premiumModal.style.display = "none";
    }
  });

  // Handle premium form submission
  if (premiumForm) {
    premiumForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = premiumForm.querySelector(".premium-notify-button");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      // Track form submission attempt
      waitForGA(function () {
        gtag("event", "premium_notify_submit", {
          event_category: "conversion",
          event_label: "premium_signup_attempt",
          value: 15,
        });
      });

      // Submit to Formspree
      const formData = new FormData(premiumForm);

      fetch(premiumForm.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Hide form, show success
            premiumForm.style.display = "none";
            premiumSuccess.style.display = "block";

            // Track successful submission
            waitForGA(function () {
              gtag("event", "premium_notify_success", {
                event_category: "conversion",
                event_label: "premium_signup_success",
                value: 25,
              });
            });
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "Sorry, there was an error. Please try again or email us at info@linkedgoals.app"
          );

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Check for premium notification success
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("premium_notify") === "success") {
    if (premiumModal && premiumForm && premiumSuccess) {
      premiumModal.style.display = "block";
      premiumForm.style.display = "none";
      premiumSuccess.style.display = "block";

      // Track success page view
      waitForGA(function () {
        gtag("event", "premium_notify_success_view", {
          event_category: "conversion",
          event_label: "premium_signup_success_page",
          value: 25,
        });
      });
    }
  }
});

// Global function to close premium modal (for success button)
function closePremiumModal() {
  const premiumModal = document.getElementById("premium-notify-modal");
  if (premiumModal) {
    premiumModal.style.display = "none";

    // Reset form for next use
    const premiumForm = document.getElementById("premium-notify-form");
    const premiumSuccess = document.getElementById("premium-success");
    if (premiumForm && premiumSuccess) {
      premiumForm.style.display = "block";
      premiumSuccess.style.display = "none";
      premiumForm.reset();
    }
  }
}
