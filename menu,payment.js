let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.borderLeft = "5px solid #ff4d4d";
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price, id: Date.now() }); // Added unique ID for easier deleting
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
    showToast(`${name} added to cart!`);
}

// NEW: Remove item from cart
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1); // Remove the item at that specific position
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
    showToast(`${itemName} removed from cart.`, true);
}

function updateUI() {
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    const finalTotalEl = document.getElementById('final-total');
    const cartListEl = document.getElementById('cart-items-list');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    if (countEl) countEl.innerText = cart.length;
    if (totalEl) totalEl.innerText = total.toFixed(2);
    if (finalTotalEl) finalTotalEl.innerText = total.toFixed(2);

    // NEW: Display the list of items with delete buttons
    if (cartListEl) {
        cartListEl.innerHTML = ""; // Clear current list
        if (cart.length === 0) {
            cartListEl.innerHTML = "<li>Your cart is empty</li>";
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = "cart-item-row";
                li.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
                `;
                cartListEl.appendChild(li);
            });
        }
    }
}

function goToPayment() {
    if (cart.length === 0) showToast("Your cart is empty!", true);
    else window.location.href = "payment.html";
}

function processPayment() {
    const name = document.getElementById('cardName').value.trim();
    const number = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (name === "" || number === "" || expiry === "" || cvv === "") {
        showToast("Please fill in all fields.", true);
    } else if (number.length !== 16 || isNaN(number)) {
        showToast("Enter a valid 16-digit card number.", true);
    } else if (!expiry.includes('/')) {
        showToast("Use MM/YY format for expiry.", true);
    } else if (cvv.length !== 3 || isNaN(cvv)) {
        showToast("CVV must be 3 digits.", true);
    } else {
        showToast("Payment Successful! Order placed.");
        setTimeout(() => {
            localStorage.removeItem('cart');
            window.location.href = "menu.html";
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', updateUI);
