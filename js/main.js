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
// PAGINATION
function showPage(page) {
  document.querySelectorAll('.product-page').forEach(p => p.classList.add('d-none'));
  document.getElementById('page' + page).classList.remove('d-none');

  document.querySelectorAll('.page-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.page-item')[page - 1].classList.add('active');
}

// searchProducts
function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const pages = document.querySelectorAll('.product-page');

  pages.forEach(page => {
    let pageHasMatch = false;
    const products = page.querySelectorAll('.product-item');

    products.forEach(product => {
      const productName = product.querySelector('.card-title').textContent.toLowerCase();
      const productDesc = product.querySelector('.card-text').textContent.toLowerCase();

      // Check if the input matches the name or description
      if (productName.includes(input) || productDesc.includes(input)) {
        product.style.display = ''; // Show product
        pageHasMatch = true;        // At least one product in page matches
      } else {
        product.style.display = 'none'; // Hide product
      }
    });

    // Show page only if it has matching products
    if (pageHasMatch) {
      page.classList.remove('d-none');
    } else {
      page.classList.add('d-none');
    }
  });

  // Optional: Highlight the active pagination page based on visible pages
  updatePagination();
}

// Function to handle pagination visibility
function showPage(pageNumber) {
  const pages = document.querySelectorAll('.product-page');
  pages.forEach((page, index) => {
    if (index === pageNumber - 1) {
      page.classList.remove('d-none');
    } else {
      page.classList.add('d-none');
    }
  });

  // Update pagination active class
  document.querySelectorAll('.pagination .page-item').forEach((item, i) => {
    if (i === pageNumber - 1) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Optional helper to keep pagination in sync after searching
function updatePagination() {
  const pages = document.querySelectorAll('.product-page');
  const pageItems = document.querySelectorAll('.pagination .page-item');

  pages.forEach((page, index) => {
    if (!page.classList.contains('d-none')) {
      pageItems.forEach(item => item.classList.remove('active'));
      pageItems[index].classList.add('active');
      return;
    }
  });
}
