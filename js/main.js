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

/* =========================
  PAGINATION
========================= */
function showPage(pageNumber) {
  // Hide all pages
  document.querySelectorAll(".product-page").forEach(page => {
    page.classList.add("d-none");
  });

  // Show selected page
  const activePage = document.getElementById("page" + pageNumber);
  if (activePage) activePage.classList.remove("d-none");

  // Update active pagination button
  document.querySelectorAll("#productPagination .page-item").forEach(item => {
    item.classList.remove("active");
  });

  const activeBtn = document.querySelector(`#productPagination .page-item:nth-child(${pageNumber})`);
  if (activeBtn) activeBtn.classList.add("active");

  // Optional: scroll back to top of products nicely
  const firstPage = document.getElementById("page1");
  if (firstPage) firstPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Make sure page 1 shows on load
document.addEventListener("DOMContentLoaded", () => showPage(1));


/* =========================
   GLOBAL SEARCH (ALL PAGES)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  // Redirect search from any page (if the global form exists)
  const globalForm = document.getElementById("globalSearchForm");
  const globalInput = document.getElementById("globalSearchInput");

  if (globalForm && globalInput) {
    globalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = globalInput.value.trim();
      if (!q) return;
      window.location.href = "products.html?q=" + encodeURIComponent(q);
    });
  }

  // Products page: enable filtering + apply ?q=
  initProductsSearch();
});
document.addEventListener("DOMContentLoaded", () => {
  const globalForm = document.getElementById("globalSearchForm");
  const globalInput = document.getElementById("globalSearchInput");

  if (globalForm && globalInput) {
    globalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = globalInput.value.trim();
      if (!q) return;
      window.location.href = "products.html?q=" + encodeURIComponent(q);
    });
  }

  initProductsSearch(); // keeps your filtering on products.html
});


/* =========================
   PRODUCTS SEARCH (FIXED FOR d-none PAGES)
========================= */
function initProductsSearch() {
  const items = document.querySelectorAll(".product-item");
  if (!items.length) return; // not on products page

  // Your products page search input (local filter)
  const productsInput = document.getElementById("searchInput");
  if (productsInput) {
    productsInput.addEventListener("input", () => filterProducts(productsInput.value));
  }

  // Apply URL query ?q=
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("q") || "").trim();

  if (q) {
    if (productsInput) productsInput.value = q;
    filterProducts(q);
  }
}


/* =========================
   FILTER (Shows pages correctly)
========================= */
function filterProducts(query) {
  const q = (query || "").trim().toLowerCase();

  const pages = Array.from(document.querySelectorAll(".product-page"));
  const items = Array.from(document.querySelectorAll(".product-item"));
  const pagination = document.querySelector(".pagination");

  // If empty: restore default view (page system)
  if (!q) {
    // show all items
    items.forEach((item) => {
      item.classList.remove("d-none");
      item.style.display = "";
    });

    // restore pages: page1 visible, others hidden (like your original design)
    pages.forEach((page) => {
      if (page.id === "page1") page.classList.remove("d-none");
      else page.classList.add("d-none");
      page.style.display = "";
    });

    // show pagination again
    if (pagination) pagination.style.display = "";

    hideNoResultsMessage();
    return;
  }

  // Searching: show all pages first (remove bootstrap d-none)
  pages.forEach((p) => {
    p.classList.remove("d-none");
    p.style.display = "";
  });

  // Filter items + track which pages contain matches
  let anyMatch = false;
  const pageHasMatch = new Map(); // pageElement -> boolean
  pages.forEach((p) => pageHasMatch.set(p, false));

  items.forEach((item) => {
    const title = (item.querySelector(".card-title")?.textContent || "").toLowerCase();
    const desc  = (item.querySelector(".card-text")?.textContent || "").toLowerCase();
    const alt   = (item.querySelector("img")?.getAttribute("alt") || "").toLowerCase();

    const match = (`${title} ${desc} ${alt}`).includes(q);

    // show/hide each item
    item.style.display = match ? "" : "none";

    if (match) {
      anyMatch = true;
      const parentPage = item.closest(".product-page");
      if (parentPage) pageHasMatch.set(parentPage, true);
    }
  });

  // Hide pages that have ZERO matches (so you don't see empty page containers)
  pages.forEach((p) => {
    p.style.display = pageHasMatch.get(p) ? "" : "none";
  });

  // Hide pagination while searching
  if (pagination) pagination.style.display = "none";

  // No results message
  if (!anyMatch) showNoResultsMessage();
  else hideNoResultsMessage();
}


/* =========================
   NO RESULTS MESSAGE
========================= */
function showNoResultsMessage() {
  let el = document.getElementById("noResultsMsg");
  if (!el) {
    el = document.createElement("div");
    el.id = "noResultsMsg";
    el.style.marginTop = "14px";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "14px";
    el.style.background = "rgba(255,255,255,0.20)";
    el.style.border = "1px solid rgba(255,255,255,0.30)";
    el.style.backdropFilter = "blur(10px)";
    el.textContent = "No products matched your search.";

    const input = document.getElementById("searchInput");
    if (input && input.parentElement) input.parentElement.insertAdjacentElement("afterend", el);
    else document.body.appendChild(el);
  }
  el.style.display = "";
}

function hideNoResultsMessage() {
  const el = document.getElementById("noResultsMsg");
  if (el) el.style.display = "none";
}

/* =========================
   contactForm
========================= */
const form = document.getElementById("contactForm");
 const alertBox = document.getElementById("formAlert");
 const sendBtn = document.getElementById("sendBtn");

 function showAlert(type, msg) {
   // type: "success" | "danger" | "warning" | "info"
   alertBox.className = `alert alert-${type}`;
   alertBox.textContent = msg;
   alertBox.classList.remove("d-none");
 }

 function setLoading(isLoading) {
   if (isLoading) {
     sendBtn.disabled = true;
     sendBtn.textContent = "Sending...";
   } else {
     sendBtn.disabled = false;
     sendBtn.textContent = "Send Message";
   }
 }

 form.addEventListener("submit", async (e) => {
   e.preventDefault(); // stop page redirect
   alertBox.classList.add("d-none");

   setLoading(true);

   try {
     const formData = new FormData(form);

     const res = await fetch(form.action, {
       method: "POST",
       body: formData,
       headers: {
         "Accept": "application/json"
       }
     });

     if (res.ok) {
       showAlert("success", "✅ Message sent successfully. We’ll get back to you shortly.");
       form.reset();
     } else {
       // Try to read Formspree error details
       let data = null;
       try { data = await res.json(); } catch (_) {}

       const msg = (data && data.errors && data.errors.length)
         ? "❌ " + data.errors.map(e => e.message).join(" | ")
         : "❌ Message not sent. Please try again.";

       showAlert("danger", msg);
     }
   } catch (err) {
     showAlert("danger", "❌ Network error. Check your internet and try again.");
   } finally {
     setLoading(false);
   }
 });
