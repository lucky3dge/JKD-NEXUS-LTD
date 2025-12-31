// Carousel
document.addEventListener("DOMContentLoaded", () => {
    const rails = document.querySelectorAll(".slide_rail_inner");

    rails.forEach((rail, railIndex) => {
        const ulElements = rail.querySelectorAll("ul");

        // Set base speed: middle rail slower, side rails faster
        let baseSpeed;
        if (railIndex === 1) {
            baseSpeed = 0.05; // middle rail slower
        } else {
            baseSpeed = 0.05; // side rails faster
        }

        let positions = Array.from(ulElements).map(() => 0);

        // Determine direction: middle rail moves down, sides move up
        const direction = (railIndex === 1) ? 1 : -1;

        function animate() {
            ulElements.forEach((ul, index) => {
                positions[index] += baseSpeed * direction;
                const ulHeight = ul.scrollHeight / 2; // duplicated UL

                // Reset positions for infinite loop
                if (direction === -1 && positions[index] <= -ulHeight) {
                    positions[index] = 0;
                } else if (direction === 1 && positions[index] >= ulHeight) {
                    positions[index] = 0;
                }

                ul.style.transform = `translateY(${positions[index]}px)`;
            });

            requestAnimationFrame(animate);
        }

        animate();
    });
});

// Menu
function openMobileMenu() {
  if (window.innerWidth < 992) {
    window.location.href = "menu.html";
  }
}
// BACK ARROW
document.addEventListener("DOMContentLoaded", function() {
  const backArrow = document.getElementById("mobileBackArrow");

  backArrow.addEventListener("click", function(e) {
    e.preventDefault();

    // If there is a history, go back
    if (window.history.length > 1) {
      history.back();
    } else {
      // No history: determine fallback page based on current URL
      const currentPage = window.location.pathname.split("/").pop().toLowerCase();

      let fallback = "index.html"; // default fallback
      if (currentPage === "products.html") fallback = "products.html";
      if (currentPage === "contactus.html") fallback = "contactus.html";
      if (currentPage === "aboutus.html") fallback = "aboutus.html";

      window.location.href = fallback;
    }
  });
});

// Make contact section collapsible
document.addEventListener("DOMContentLoaded", function() {
  const toggles = document.querySelectorAll('.toggle-contact');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const parent = this.closest('.get-in-touch-collapsible');
      parent.classList.toggle('open');
    });
  });
});
