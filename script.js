document.addEventListener("DOMContentLoaded", function () {
  
  // Cart Counter Global Variable
  let cartCount = 0;

  // ==========================================
  // 1. HELPER: FILTER PRODUCTS ON CURRENT PAGE
  // ==========================================
  function filterProducts(query) {
    const filterValue = query.toLowerCase().trim();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const titleText = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      const fullContent = card.textContent.toLowerCase();

      if (titleText.includes(filterValue) || fullContent.includes(filterValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // ==========================================
  // 2. SEARCH FUNCTIONALITY (LIVE + REDIRECT)
  // ==========================================
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    // Check if redirected from another page with ?search=term
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");

    if (searchParam) {
      searchInput.value = searchParam;
      filterProducts(searchParam);
    }

    // A) Live filtering as user types
    searchInput.addEventListener("input", function () {
      filterProducts(this.value);
    });

    // B) Redirect on ENTER Key
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault(); // Form refresh issue prevent karta hai
        const query = searchInput.value.toLowerCase().trim();

        if (!query) return;

        if (query.includes("ring") || query.includes("jewel") || query.includes("necklace") || query.includes("earring") || query.includes("jhumka") || query.includes("payal")) {
          window.location.href = "jewelry.html?search=" + encodeURIComponent(query);
        } else if (query.includes("bag") || query.includes("clutch") || query.includes("tote") || query.includes("satchel") || query.includes("purse")) {
          window.location.href = "handbags.html?search=" + encodeURIComponent(query);
        } else if (query.includes("shirt") || query.includes("dress") || query.includes("kurti") || query.includes("frock") || query.includes("maxi") || query.includes("suit")) {
          window.location.href = "clothing.html?search=" + encodeURIComponent(query);
        } else {
          // Default fallback
          filterProducts(query);
        }
      }
    });
  }

  // ==========================================
  // 3. FEATURED CATEGORIES FILTER
  // ==========================================
  const categoryCards = document.querySelectorAll(".category-card");
  const productCards = document.querySelectorAll(".product-card");

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const selectedCategory = this.querySelector("h3")?.textContent.trim().toLowerCase() || "";

      productCards.forEach((product) => {
        const productCategory = product.getAttribute("data-category")?.toLowerCase() || "";

        if (selectedCategory === "all" || productCategory === selectedCategory) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    });
  });

  // ==========================================
  // 4. QUICK LINKS CATEGORIES DROPDOWN
  // ==========================================
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parentLi = this.parentElement;
      
      // Toggle class 'open' to hide/show submenu
      parentLi.classList.toggle("open");
    });
  }

  // ==========================================
  // 5. GLOBAL CLICK HANDLER (ADD TO CART / BUY NOW / POPUPS)
  // ==========================================
  document.addEventListener("click", function (e) {
    
    // A) ADD TO CART
    if (e.target && e.target.classList.contains("add-to-cart")) {
      cartCount++;
      const cartBtn = document.querySelector(".cart-btn");
      if (cartBtn) {
        cartBtn.textContent = `Cart (${cartCount})`;
      }

      const card = e.target.closest(".product-card");
      const title = card ? card.querySelector(".product-title")?.textContent || "Item" : "Item";
      alert(`✅ ${title} has been added to your cart!`);
    }

    // B) BUY NOW
    if (e.target && e.target.classList.contains("buy-now-btn")) {
      const card = e.target.closest(".product-card");
      const title = card ? card.querySelector(".product-title")?.textContent || "Product" : "Product";
      const price = card ? card.querySelector(".product-price")?.textContent || "" : "";

      window.location.href = `checkout.html?item=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
    }

    // C) FEATURE ITEMS POPUPS
    const featureItem = e.target.closest(".feature-item");
    if (featureItem) {
      const text = featureItem.textContent.trim();

      if (text.includes("Free Shipping")) {
        alert("🚚 Free Shipping is available on all orders above 2500 PKR across Pakistan!");
      } else if (text.includes("Easy Returns")) {
        alert("🔄 Easy 7-Days Return Policy! If you receive damaged items, replace them hassle-free.");
      } else if (text.includes("Secure COD")) {
        alert("🛡️ Cash on Delivery (COD) available nationwide. Pay safely when you receive your order!");
      } else if (text.includes("24/7 Support")) {
        alert("🎧 Need help? Contact us anytime via WhatsApp or Email at contact@premiumstore.com");
      }
    }
  });

});