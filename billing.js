const API_URL = "http://localhost:5000/api";

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");
    let total = 0;

    orderSummary.innerHTML = "";
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        orderSummary.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${subtotal.toFixed(2)}</td>
            </tr>`;
    });

    document.getElementById("total-amount").innerText = total.toFixed(2);
}

// Optional QR/Card logic (keep this if needed)
function showPaymentOptions() {
    const paymentMethod = document.getElementById("payment-method").value;
    const qrSection = document.getElementById("qr-section");
    const cardSection = document.getElementById("card-section");
    const qrImage = document.getElementById("qr-code");

    qrSection.classList.add("hidden");
    cardSection.classList.add("hidden");

    const qrCodes = {
        phonepe: "qr.png",
        gpay: "qr.png",
        paytm: "qr.png"
    };

    if (qrCodes[paymentMethod]) {
        qrSection.classList.remove("hidden");
        qrImage.src = qrCodes[paymentMethod];
    } else if (paymentMethod === "debit" || paymentMethod === "credit") {
        cardSection.classList.remove("hidden");
    }
}

async function processPayment() {
    const paymentMethod = document.getElementById("payment-method").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");

    if (!paymentMethod) {
        alert("Select a payment method.");
        return;
    }

    if (!token) {
        alert("You are not logged in.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    drugId: item.id,
                    quantity: item.quantity
                })),
                paymentMode: paymentMethod // ✅ Add this back for backend compatibility
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Payment Successful!");
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
localStorage.setItem("cart", JSON.stringify(cart));

// Then clear cart only after saving invoice data or after redirect if you want
// Or, if you prefer to clear, save to a separate key for invoice:
localStorage.setItem("invoiceCart", JSON.stringify(cart));
localStorage.removeItem("cart");

window.location.href = "invoice.html";
        } else {
            alert(result.message || "Payment failed.");
        }
    } catch (err) {
        console.error(err);
        alert("Error processing payment.");
    }
}

window.onload = loadOrderSummary;
