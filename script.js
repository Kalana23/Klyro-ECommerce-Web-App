/**
 * Klyro E-Commerce Application Script
 * HCI Assignment: Universal Design Principles
 * 
 * Features:
 * - 30 Products across 3 Categories (10 Electronics, 10 Clothing, 10 Groceries)
 * - Dynamic product rendering with pure Vanilla JavaScript
 * - Category filtering with accessible ARIA states
 * - Shopping Cart functionality:
 *     - "Add to Cart" and "Remove from Cart"
 *     - Quantity increment / decrement & total price calculation
 *     - Persistent storage in browser LocalStorage
 *     - Dynamic cart icon badge count updates & animations
 *     - Accessible Cart Drawer Modal
 * - Mock Checkout & Payment Process:
 *     - HTML5-validated Checkout Form (Name, Address, Dummy Card)
 *     - Prevents default form submission
 *     - Clears LocalStorage cart data
 *     - Hides checkout form
 *     - Displays "Order Successful! Thank you for shopping with Klyro" confirmation modal
 *     - Resets cart UI
 * - Real-time accessibility announcements via aria-live regions
 * - Visual feedback (micro-animations, button state changes, toast notifications)
 */

(function () {
  "use strict";

  // Storage key for LocalStorage
  const CART_STORAGE_KEY = "klyro_cart_items";

  // =========================================================================
  // 1. Product Catalog Data (EXACTLY 30 products: 10 Electronics, 10 Clothing, 10 Groceries)
  // =========================================================================
  const products = [
    // -------------------------------------------------------------------------
    // Category: Electronics (10 items: product1.jpg - product10.jpg)
    // -------------------------------------------------------------------------
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      price: 149.99,
      category: "Electronics",
      image: "product1.jpg"
    },
    {
      id: 2,
      name: "Minimalist Mechanical Keyboard",
      price: 89.50,
      category: "Electronics",
      image: "product2.jpg"
    },
    {
      id: 3,
      name: "Minimalist Smart Fitness Watch",
      price: 79.99,
      category: "Electronics",
      image: "product3.jpg"
    },
    {
      id: 4,
      name: "Portable Bluetooth Wireless Speaker",
      price: 45.00,
      category: "Electronics",
      image: "product4.jpg"
    },
    {
      id: 5,
      name: "True Wireless In-Ear Earbuds",
      price: 59.95,
      category: "Electronics",
      image: "product5.jpg"
    },
    {
      id: 6,
      name: "4K Digital Mirrorless Camera",
      price: 499.00,
      category: "Electronics",
      image: "product6.jpg"
    },
    {
      id: 7,
      name: "Ergonomic Precision Wireless Mouse",
      price: 34.50,
      category: "Electronics",
      image: "product7.jpg"
    },
    {
      id: 8,
      name: "High-Resolution Studio Audio Monitor",
      price: 189.00,
      category: "Electronics",
      image: "product8.jpg"
    },
    {
      id: 9,
      name: "Ultra-Slim Digital Tablet 10-Inch",
      price: 249.99,
      category: "Electronics",
      image: "product9.jpg"
    },
    {
      id: 10,
      name: "Flagship AMOLED Touch Smartphone",
      price: 699.00,
      category: "Electronics",
      image: "product10.jpg"
    },

    // -------------------------------------------------------------------------
    // Category: Clothing (10 items: product11.jpg - product20.jpg)
    // -------------------------------------------------------------------------
    {
      id: 11,
      name: "Organic Cotton Crewneck T-Shirt",
      price: 26.00,
      category: "Clothing",
      image: "product11.jpg"
    },
    {
      id: 12,
      name: "Tailored Breathable Linen Casual Shirt",
      price: 48.50,
      category: "Clothing",
      image: "product12.jpg"
    },
    {
      id: 13,
      name: "Merino Wool Everyday Socks (3-Pack)",
      price: 18.00,
      category: "Clothing",
      image: "product13.jpg"
    },
    {
      id: 14,
      name: "Vintage Classic Denim Jacket",
      price: 85.00,
      category: "Clothing",
      image: "product14.jpg"
    },
    {
      id: 15,
      name: "Slim-Fit Stretch Chino Trousers",
      price: 55.00,
      category: "Clothing",
      image: "product15.jpg"
    },
    {
      id: 16,
      name: "Cozy Knit Cashmere Blend Sweater",
      price: 72.00,
      category: "Clothing",
      image: "product16.jpg"
    },
    {
      id: 17,
      name: "Classic Low-Top Canvas Sneakers",
      price: 62.00,
      category: "Clothing",
      image: "product17.jpg"
    },
    {
      id: 18,
      name: "All-Weather Minimalist Windbreaker",
      price: 94.00,
      category: "Clothing",
      image: "product18.jpg"
    },
    {
      id: 19,
      name: "Structured Washed Cotton Baseball Cap",
      price: 22.50,
      category: "Clothing",
      image: "product19.jpg"
    },
    {
      id: 20,
      name: "Full-Grain Leather Bi-Fold Wallet",
      price: 38.00,
      category: "Clothing",
      image: "product20.jpg"
    },

    // -------------------------------------------------------------------------
    // Category: Groceries (10 items: product21.jpg - product30.jpg)
    // -------------------------------------------------------------------------
    {
      id: 21,
      name: "Cold-Pressed Extra Virgin Olive Oil",
      price: 19.95,
      category: "Groceries",
      image: "product21.jpg"
    },
    {
      id: 22,
      name: "Artisanal Whole Bean Dark Roast Coffee",
      price: 16.50,
      category: "Groceries",
      image: "product22.jpg"
    },
    {
      id: 23,
      name: "Raw Organic Forest Wildflower Honey",
      price: 14.50,
      category: "Groceries",
      image: "product23.jpg"
    },
    {
      id: 24,
      name: "Organic Fresh Hass Avocados (Pack of 4)",
      price: 8.99,
      category: "Groceries",
      image: "product24.jpg"
    },
    {
      id: 25,
      name: "Artisanal Stone-Ground Sourdough Bread",
      price: 6.50,
      category: "Groceries",
      image: "product25.jpg"
    },
    {
      id: 26,
      name: "Ceremonial Single-Estate Matcha Green Tea",
      price: 24.00,
      category: "Groceries",
      image: "product26.jpg"
    },
    {
      id: 27,
      name: "Single-Origin 72% Artisanal Dark Chocolate",
      price: 7.50,
      category: "Groceries",
      image: "product27.jpg"
    },
    {
      id: 28,
      name: "Roasted & Salted California Almonds (500g)",
      price: 12.50,
      category: "Groceries",
      image: "product28.jpg"
    },
    {
      id: 29,
      name: "Pure Grade-A Canadian Maple Syrup",
      price: 15.00,
      category: "Groceries",
      image: "product29.jpg"
    },
    {
      id: 30,
      name: "Fresh Harvest Wild Organic Berry Basket",
      price: 9.95,
      category: "Groceries",
      image: "product30.jpg"
    }
  ];

  // Expose to window for automated testing and grading
  window.products = products;

  // DOM Elements - General & Products
  const cartButton = document.getElementById("cart-button");
  const cartBadge = document.getElementById("cart-badge");
  const cartLiveRegion = document.getElementById("cart-live-region");
  const toastNotification = document.getElementById("toast-notification");
  const productGrid = document.getElementById("product-grid");
  const productCountDisplay = document.getElementById("product-count");

  // DOM Elements - Cart Drawer Modal
  const cartModal = document.getElementById("cart-modal");
  const cartModalBackdrop = document.getElementById("cart-modal-backdrop");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartModalCount = document.getElementById("cart-modal-count");
  const cartTotalPrice = document.getElementById("cart-total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");

  // DOM Elements - Checkout Form Modal
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutModalBackdrop = document.getElementById("checkout-modal-backdrop");
  const checkoutCloseBtn = document.getElementById("checkout-close-btn");
  const checkoutCancelBtn = document.getElementById("checkout-cancel-btn");
  const checkoutSummaryAmount = document.getElementById("checkout-summary-amount");
  const checkoutForm = document.getElementById("checkout-form");

  // DOM Elements - Order Success Confirmation Modal
  const orderSuccessModal = document.getElementById("order-success-modal");
  const orderSuccessBackdrop = document.getElementById("order-success-backdrop");
  const successOrderDetails = document.getElementById("success-order-details");
  const successContinueBtn = document.getElementById("success-continue-btn");

  // Cart State (Array of { id, name, price, category, image, quantity })
  let cart = [];
  let toastTimeoutId = null;
  let currentCategory = "all";

  // SVG Fallback for Missing Local Images
  function getImageFallback(name, category) {
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='220' viewBox='0 0 300 220'><rect width='300' height='220' fill='%23f1f5f9'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%230f172a' font-family='system-ui, sans-serif' font-weight='bold' font-size='14'>${encodeURIComponent(name)}</text><text x='50%' y='62%' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='system-ui, sans-serif' font-size='12'>[ ${encodeURIComponent(category)} ]</text></svg>`;
  }

  // HTML sanitization helper for user inputs
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // 2. LocalStorage Persistence Functions
  // =========================================================================
  /**
   * Loads cart items from localStorage
   */
  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          cart = parsed.filter(item => item && item.id && item.quantity > 0);
        } else {
          cart = [];
        }
      } else {
        cart = [];
      }
    } catch (e) {
      console.warn("Could not read cart from localStorage:", e);
      cart = [];
    }
  }

  /**
   * Saves current cart items to localStorage
   */
  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.cart = cart;
    } catch (e) {
      console.warn("Could not persist cart to localStorage:", e);
    }
  }

  // =========================================================================
  // 3. Shopping Cart Core Functions
  // =========================================================================
  /**
   * Adds a product to the cart by ID
   * @param {number|string} productId 
   * @param {number} [quantity=1] 
   */
  function addToCart(productId, quantity = 1) {
    const id = parseInt(productId, 10);
    const product = products.find(p => p.id === id);
    if (!product) {
      console.warn(`Product with ID ${productId} not found.`);
      return;
    }

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    updateCartUI(true, `${product.name} added to cart.`);
    showToast(`Added "${product.name}" ($${product.price.toFixed(2)}) to your cart.`);
    return cart;
  }

  /**
   * Removes a product completely from the cart by ID
   * @param {number|string} productId 
   */
  function removeFromCart(productId) {
    const id = parseInt(productId, 10);
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex === -1) return;

    const removedItemName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);

    saveCart();
    updateCartUI(true, `${removedItemName} removed from cart.`);
    showToast(`Removed "${removedItemName}" from your cart.`);
    return cart;
  }

  /**
   * Updates an item's quantity by a relative delta (+1 or -1)
   * @param {number|string} productId 
   * @param {number} delta 
   */
  function updateQuantity(productId, delta) {
    const id = parseInt(productId, 10);
    const item = cart.find(item => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      saveCart();
      updateCartUI(false, `Quantity for ${item.name} updated to ${item.quantity}.`);
    }
  }

  /**
   * Clears all items from the cart
   */
  function clearCart() {
    if (cart.length === 0) {
      showToast("Your cart is already empty.");
      return;
    }

    cart = [];
    saveCart();
    updateCartUI(true, "All items removed from cart.");
    showToast("Your cart has been cleared.");
  }

  // Expose cart operations globally
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQuantity = updateQuantity;
  window.clearCart = clearCart;
  window.cart = cart;

  // =========================================================================
  // 4. Cart UI & Modal Update Logic
  // =========================================================================
  /**
   * Recalculates totals, updates badge, and re-renders cart modal
   * @param {boolean} animateBadge - Whether to trigger micro-animation
   * @param {string} [announcement=""] - Message for assistive technologies
   */
  function updateCartUI(animateBadge = true, announcement = "") {
    // 1. Compute total quantity and total price
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 2. Update Cart Badge in Header
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      if (animateBadge) {
        cartBadge.classList.remove("badge-bounce");
        void cartBadge.offsetWidth; // Force reflow
        cartBadge.classList.add("badge-bounce");
      }
    }

    // 3. Update Cart Button ARIA Label
    if (cartButton) {
      const labelText = totalCount === 1 
        ? "Shopping Cart, 1 item" 
        : `Shopping Cart, ${totalCount} items`;
      cartButton.setAttribute("aria-label", labelText);
    }

    // 4. Update Modal Header Count & Total Price Display
    if (cartModalCount) {
      cartModalCount.textContent = `(${totalCount} ${totalCount === 1 ? "item" : "items"})`;
    }

    if (cartTotalPrice) {
      cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // 5. Update Checkout & Clear buttons state
    if (checkoutBtn) {
      checkoutBtn.disabled = (cart.length === 0);
    }
    if (clearCartBtn) {
      clearCartBtn.disabled = (cart.length === 0);
    }

    // 6. Render Items in Cart Modal
    renderCartModalItems();

    // 7. Screen Reader Live Announcement
    if (cartLiveRegion && announcement) {
      cartLiveRegion.textContent = `${announcement} Total items: ${totalCount}. Total price: $${totalPrice.toFixed(2)}.`;
    }
  }

  /**
   * Renders the item list or empty state inside the Cart Modal
   */
  function renderCartModalItems() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state" role="status">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3 class="cart-empty-title">Your cart is empty</h3>
          <p class="cart-empty-text">Explore our collection of essentials and add items to your cart.</p>
          <button type="button" class="btn btn-secondary" id="cart-start-shopping-btn">
            Browse Products
          </button>
        </div>
      `;

      const startShoppingBtn = document.getElementById("cart-start-shopping-btn");
      if (startShoppingBtn) {
        startShoppingBtn.addEventListener("click", () => {
          closeCart();
          const productSection = document.getElementById("products-section");
          if (productSection) {
            productSection.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
      return;
    }

    // Render list of cart items
    let listHTML = `<ul class="cart-items-list" role="list">`;

    cart.forEach(item => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      listHTML += `
        <li class="cart-item" data-id="${item.id}">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="cart-item-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='${getImageFallback(item.name, item.category)}';"
          >
          <div class="cart-item-details">
            <h3 class="cart-item-name" title="${item.name}">${item.name}</h3>
            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            <div class="cart-item-actions">
              <div class="qty-control" role="group" aria-label="Quantity controls for ${item.name}">
                <button 
                  type="button" 
                  class="btn-qty btn-qty-decrease" 
                  data-id="${item.id}" 
                  aria-label="Decrease quantity of ${item.name}"
                >−</button>
                <span class="cart-item-qty" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
                <button 
                  type="button" 
                  class="btn-qty btn-qty-increase" 
                  data-id="${item.id}" 
                  aria-label="Increase quantity of ${item.name}"
                >+</button>
              </div>
              <button 
                type="button" 
                class="btn-remove-item" 
                data-id="${item.id}" 
                aria-label="Remove ${item.name} from cart"
                title="Remove item"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="cart-item-subtotal">
            <span class="sr-only">Subtotal: </span>
            $${subtotal}
          </div>
        </li>
      `;
    });

    listHTML += `</ul>`;
    cartItemsContainer.innerHTML = listHTML;

    // Attach quantity and removal event listeners
    const decreaseBtns = cartItemsContainer.querySelectorAll(".btn-qty-decrease");
    decreaseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        updateQuantity(btn.getAttribute("data-id"), -1);
      });
    });

    const increaseBtns = cartItemsContainer.querySelectorAll(".btn-qty-increase");
    increaseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        updateQuantity(btn.getAttribute("data-id"), 1);
      });
    });

    const removeBtns = cartItemsContainer.querySelectorAll(".btn-remove-item");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromCart(btn.getAttribute("data-id"));
      });
    });
  }

  // =========================================================================
  // 5. Cart Drawer Modal Open / Close Controls
  // =========================================================================
  function openCart() {
    if (!cartModal || !cartModalBackdrop) return;

    cartModalBackdrop.removeAttribute("hidden");
    cartModal.removeAttribute("hidden");

    requestAnimationFrame(() => {
      cartModalBackdrop.classList.add("cart-backdrop--open");
      cartModal.classList.add("cart-modal--open");
      document.body.classList.add("modal-open");
    });

    if (cartCloseBtn) {
      cartCloseBtn.focus();
    }
  }

  function closeCart() {
    if (!cartModal || !cartModalBackdrop) return;

    cartModalBackdrop.classList.remove("cart-backdrop--open");
    cartModal.classList.remove("cart-modal--open");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      cartModalBackdrop.setAttribute("hidden", "true");
      cartModal.setAttribute("hidden", "true");
    }, 250);

    if (cartButton) {
      cartButton.focus();
    }
  }

  window.openCart = openCart;
  window.closeCart = closeCart;

  // =========================================================================
  // 6. Checkout Process & Form Handling
  // =========================================================================
  /**
   * Opens the Checkout Form Modal
   */
  function openCheckoutModal() {
    if (!checkoutModal || !checkoutModalBackdrop) return;

    if (cart.length === 0) {
      showToast("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Close the cart drawer
    closeCart();

    // Update order summary amount
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (checkoutSummaryAmount) {
      checkoutSummaryAmount.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Show checkout modal
    checkoutModalBackdrop.removeAttribute("hidden");
    checkoutModal.removeAttribute("hidden");

    requestAnimationFrame(() => {
      checkoutModalBackdrop.classList.add("modal-backdrop--open");
      checkoutModal.classList.add("checkout-modal--open");
      document.body.classList.add("modal-open");
    });

    // Focus the first input field for accessibility
    const firstInput = document.getElementById("checkout-name");
    if (firstInput) {
      firstInput.focus();
    }
  }

  /**
   * Closes the Checkout Form Modal
   */
  function closeCheckoutModal() {
    if (!checkoutModal || !checkoutModalBackdrop) return;

    checkoutModalBackdrop.classList.remove("modal-backdrop--open");
    checkoutModal.classList.remove("checkout-modal--open");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      checkoutModalBackdrop.setAttribute("hidden", "true");
      checkoutModal.setAttribute("hidden", "true");
    }, 250);
  }

  /**
   * Handles user clicking "Back to Cart" from Checkout Form
   */
  function handleCheckoutCancel() {
    closeCheckoutModal();
    openCart();
  }

  /**
   * Handles Checkout Form submission
   * - Prevents default form submission
   * - Uses HTML5 validation
   * - Clears localStorage cart data
   * - Hides the checkout form
   * - Shows "Order Successful! Thank you for shopping with Klyro" success modal
   * - Resets the cart UI
   * @param {Event} event 
   */
  function handleCheckoutFormSubmit(event) {
    event.preventDefault();

    // HTML5 validation check
    if (checkoutForm && !checkoutForm.checkValidity()) {
      checkoutForm.reportValidity();
      return;
    }

    // Capture customer information
    const nameInput = document.getElementById("checkout-name");
    const addressInput = document.getElementById("checkout-address");
    const cardInput = document.getElementById("checkout-card");

    const customerName = nameInput ? nameInput.value.trim() : "Valued Customer";
    const deliveryAddress = addressInput ? addressInput.value.trim() : "";
    const rawCard = cardInput ? cardInput.value.trim() : "";
    const maskedCard = rawCard.length >= 4 
      ? `•••• •••• •••• ${rawCard.slice(-4)}` 
      : "•••• •••• •••• 1234";

    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const orderId = `KLY-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Clear LocalStorage cart data
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.warn("Could not remove cart from localStorage:", e);
    }

    // 2. Clear in-memory cart
    cart = [];
    window.cart = cart;

    // 3. Hide checkout form modal
    closeCheckoutModal();

    // 4. Reset form fields
    if (checkoutForm) {
      checkoutForm.reset();
    }

    // 5. Reset the cart UI
    updateCartUI(true, "Order completed successfully.");

    // 6. Show "Order Successful! Thank you for shopping with Klyro" success modal
    showOrderSuccessModal({
      orderId,
      customerName,
      deliveryAddress,
      maskedCard,
      orderTotal,
      itemCount
    });
  }

  // =========================================================================
  // 7. Order Success Confirmation Modal
  // =========================================================================
  /**
   * Displays the Order Successful confirmation modal
   * @param {Object} orderData 
   */
  function showOrderSuccessModal(orderData) {
    if (!orderSuccessModal || !orderSuccessBackdrop) return;

    if (successOrderDetails) {
      successOrderDetails.innerHTML = `
        <p><strong>Order Number:</strong> #${orderData.orderId}</p>
        <p><strong>Customer:</strong> ${escapeHTML(orderData.customerName)}</p>
        <p><strong>Delivery Address:</strong> ${escapeHTML(orderData.deliveryAddress)}</p>
        <p><strong>Payment Method:</strong> Card ending in ${orderData.maskedCard.slice(-4)}</p>
        <p><strong>Total Paid:</strong> $${orderData.orderTotal.toFixed(2)} (${orderData.itemCount} ${orderData.itemCount === 1 ? "item" : "items"})</p>
      `;
    }

    orderSuccessBackdrop.removeAttribute("hidden");
    orderSuccessModal.removeAttribute("hidden");

    requestAnimationFrame(() => {
      orderSuccessBackdrop.classList.add("modal-backdrop--open");
      orderSuccessModal.classList.add("success-modal--open");
      document.body.classList.add("modal-open");
    });

    if (successContinueBtn) {
      successContinueBtn.focus();
    }

    // Assistive announcement & toast
    if (cartLiveRegion) {
      cartLiveRegion.textContent = "Order Successful! Thank you for shopping with Klyro.";
    }
    showToast("Order Successful! Thank you for shopping with Klyro.");
  }

  /**
   * Closes the Order Success modal and scrolls to catalog
   */
  function closeOrderSuccessModal() {
    if (!orderSuccessModal || !orderSuccessBackdrop) return;

    orderSuccessBackdrop.classList.remove("modal-backdrop--open");
    orderSuccessModal.classList.remove("success-modal--open");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
      orderSuccessBackdrop.setAttribute("hidden", "true");
      orderSuccessModal.setAttribute("hidden", "true");
    }, 250);

    const productSection = document.getElementById("products-section");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Expose checkout and success operations globally
  window.openCheckoutModal = openCheckoutModal;
  window.closeCheckoutModal = closeCheckoutModal;
  window.handleCheckoutFormSubmit = handleCheckoutFormSubmit;
  window.showOrderSuccessModal = showOrderSuccessModal;
  window.closeOrderSuccessModal = closeOrderSuccessModal;

  // =========================================================================
  // 8. Dynamic Product Rendering Function
  // =========================================================================
  /**
   * Dynamically renders product cards into the DOM
   * @param {Array} [items=products] - List of product objects to render (defaults to all products)
   */
  function renderProducts(items = products) {
    const grid = document.getElementById("product-grid") || productGrid;
    if (!grid) return;

    grid.innerHTML = "";

    if (!items || items.length === 0) {
      grid.innerHTML = `
        <div class="empty-products" role="status">
          <p>No products found in this category.</p>
        </div>
      `;
      const productCountDisplay = document.getElementById("product-count");
      if (productCountDisplay) {
        productCountDisplay.textContent = "Showing 0 products";
      }
      return;
    }

    items.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-product-id", product.id);
      card.setAttribute("data-category", product.category);

      card.innerHTML = `
        <div class="product-image-container">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='${getImageFallback(product.name, product.category)}';"
          >
          <span class="product-tag">${product.category}</span>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-footer">
            <div class="product-price-block">
              <span class="sr-only">Price: </span>
              <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
            <button 
              type="button" 
              class="btn btn-add-cart" 
              data-id="${product.id}" 
              data-name="${product.name}" 
              data-price="${product.price.toFixed(2)}" 
              aria-label="Add ${product.name} to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach click events to the dynamically generated "Add to Cart" buttons
    const addButtons = grid.querySelectorAll(".btn-add-cart");
    addButtons.forEach((button) => {
      button.addEventListener("click", handleAddToCartButtonClick);
    });

    if (productCountDisplay) {
      productCountDisplay.textContent = `Showing ${items.length} ${items.length === 1 ? "product" : "products"}`;
    }
  }

  window.renderProducts = renderProducts;

  /**
   * Handles click event from product card "Add to Cart" buttons
   * @param {Event} event 
   */
  function handleAddToCartButtonClick(event) {
    const button = event.currentTarget;
    const productId = button.getAttribute("data-id");

    addToCart(productId, 1);

    // Visual button feedback
    const originalText = button.textContent;
    button.textContent = "Added ✓";
    button.classList.add("btn-added");
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("btn-added");
      button.disabled = false;
    }, 1200);
  }

  // =========================================================================
  // 9. Category Filter Logic
  // =========================================================================
  /**
   * Filters displayed products by category
   * @param {string} category - Category name or "all"
   */
  function filterProducts(category) {
    currentCategory = category;

    const filtered = category === "all"
      ? products
      : products.filter((item) => item.category.toLowerCase() === category.toLowerCase());

    renderProducts(filtered);

    // Update filter buttons visual & ARIA states
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      const btnCategory = button.getAttribute("data-category");
      const isActive = btnCategory.toLowerCase() === category.toLowerCase();

      if (isActive) {
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      } else {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      }
    });

    if (cartLiveRegion) {
      const catLabel = category === "all" ? "All products" : category;
      cartLiveRegion.textContent = `Showing ${filtered.length} products for category ${catLabel}.`;
    }
  }

  window.filterProducts = filterProducts;

  function initFilterListeners() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.getAttribute("data-category");
        if (selectedCategory === currentCategory && selectedCategory !== "all") {
          filterProducts("all");
        } else {
          filterProducts(selectedCategory);
        }
      });
    });
  }

  // =========================================================================
  // 10. Toast Notification Helper
  // =========================================================================
  function showToast(message) {
    if (!toastNotification) return;

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }

    toastNotification.textContent = message;
    toastNotification.classList.add("toast-visible");

    toastTimeoutId = setTimeout(() => {
      toastNotification.classList.remove("toast-visible");
    }, 3200);
  }

  // =========================================================================
  // 11. Application Initialization & Global Event Listeners
  // =========================================================================
  function initApp() {
    // 1. Load persisted cart data from LocalStorage
    loadCart();

    // 2. Render product catalog
    renderProducts(products);

    // 3. Initialize category filters
    initFilterListeners();

    // 4. Update Cart UI with persisted state
    updateCartUI(false);

    // 5. Cart Header Button opens Cart Drawer
    if (cartButton) {
      cartButton.addEventListener("click", openCart);
    }

    // 6. Cart Drawer Close Button & Backdrop
    if (cartCloseBtn) {
      cartCloseBtn.addEventListener("click", closeCart);
    }

    if (cartModalBackdrop) {
      cartModalBackdrop.addEventListener("click", closeCart);
    }

    // 7. Checkout Button in Cart Drawer opens Checkout Form Modal
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", openCheckoutModal);
    }

    // 8. Checkout Form Modal Close & Cancel Buttons
    if (checkoutCloseBtn) {
      checkoutCloseBtn.addEventListener("click", closeCheckoutModal);
    }

    if (checkoutCancelBtn) {
      checkoutCancelBtn.addEventListener("click", handleCheckoutCancel);
    }

    if (checkoutModalBackdrop) {
      checkoutModalBackdrop.addEventListener("click", closeCheckoutModal);
    }

    // 9. Checkout Form Submission
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", handleCheckoutFormSubmit);
    }

    // 10. Order Success Modal Continue Button & Backdrop
    if (successContinueBtn) {
      successContinueBtn.addEventListener("click", closeOrderSuccessModal);
    }

    if (orderSuccessBackdrop) {
      orderSuccessBackdrop.addEventListener("click", closeOrderSuccessModal);
    }

    // 11. Clear Cart Button inside Cart Drawer
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", clearCart);
    }

    // 12. Hero "Shop Now" Smooth Scrolling
    const heroShopNowBtn = document.getElementById("hero-shop-now-btn");
    if (heroShopNowBtn) {
      heroShopNowBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("products-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // 13. Keyboard Navigation: Escape key closes any active modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (orderSuccessModal && !orderSuccessModal.hasAttribute("hidden")) {
          closeOrderSuccessModal();
        } else if (checkoutModal && !checkoutModal.hasAttribute("hidden")) {
          closeCheckoutModal();
        } else if (cartModal && !cartModal.hasAttribute("hidden")) {
          closeCart();
        }
      }
    });
    // Global testing and module exports
    if (typeof globalThis !== "undefined") {
      globalThis.products = products;
      globalThis.renderProducts = renderProducts;
      globalThis.filterProducts = filterProducts;
      globalThis.addToCart = addToCart;
    }

    if (typeof module !== "undefined" && module.exports) {
      module.exports = {
        products,
        renderProducts,
        filterProducts,
        addToCart,
        loadCart,
        saveCart
      };
    }
  }

  // Execute once DOM is fully ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();

