// Simple cart array to hold items
let cart = [];

// Function to add items to cart
function addToCart(productName, productPrice) {
  // Add item to cart array
  cart.push({ name: productName, price: productPrice });
  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} has been added to your cart!`);
  updateCartCount();
}

// Function to update cart count in the navigation
function updateCartCount() {
  let cartCount = cart.length;
  document.querySelector(
    'nav ul li a[href="cart.html"]'
  ).textContent = `Cart (${cartCount})`;
}

// Function to display cart items on the cart page
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");
  let cartHTML = "";
  let total = 0;

  cart.forEach((item) => {
    cartHTML += `<div class="cart-item">
                        <p>${item.name}</p>
                        <p>₹${item.price}</p>
                     </div>`;
    total += item.price;
  });

  cartItemsContainer.innerHTML = cartHTML;
  document.getElementById("totalAmount").textContent = total;
}

// Function to load cart from localStorage
function loadCart() {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    cart = storedCart;
  }
  updateCartCount();
  if (document.getElementById("cartItems")) {
    displayCartItems();
  }
}

// Function to handle checkout (simplified)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Proceeding to checkout...");
  // Clear cart after checkout
  cart = [];
  localStorage.removeItem("cart");
  displayCartItems();
  updateCartCount();
}

// Load cart when the page loads
document.addEventListener("DOMContentLoaded", loadCart);

// Sample product data
const products = {
  product1: {
    name: "Flower Bouquet",
    price: 399,
    description:
      "A beautiful bouquet of fresh flowers to brighten anyone's day.",
    image: "images/product1.jpg",
  },
  product2: {
    name: "Customised Gifts",
    price: 199,
    description: "A variety of personalized gifts for your loved ones.",
    image: "images/product2.jpg",
  },
  product3: {
    name: "Jewelry",
    price: 199,
    description: "Elegant jewelry that complements any outfit.",
    image: "images/product3.jpg",
  },
  product4: {
    name: "Cakes",
    price: 599,
    description: "Sweeten every moment with a slice of happiness!",
    image: "images/product4.jpg",
  },
  product5: {
    name: "Balloons",
    price: 99,
    description: "Where celebrations take flight!",
    image: "images/product5.jpg",
  },
};

// Function to load product details based on URL parameters
function loadProductDetails() {
  // Get the product ID from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // Get product details from the products object
  const product = products[productId];

  // If the product exists, update the page with its details
  if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = `₹${product.price}`;
    document.getElementById("productDescription").innerText =
      product.description;
  } else {
    // If product does not exist, show a message or redirect
    document.getElementById("productName").innerText = "Product not found";
    document.getElementById("productPrice").innerText = "";
    document.getElementById("productDescription").innerText = "";
    document.getElementById("productImage").style.display = "none";
  }
}

// Call the function to load product details when the page loads
window.onload = loadProductDetails;
