// Function to Get Order ID from URL
function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

// Function to Load Order Details
function loadOrderDetails() {
    const orderId = getOrderIdFromURL();
    if (!orderId) {
        alert("No Order ID found!");
        return;
    }

    // Retrieve Order History from Local Storage
    let orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    let order = orders.find(o => o.orderId === orderId);

    if (!order) {
        alert("Order not found!");
        return;
    }

    // Populate Order Details
    document.getElementById("order-id").innerText = order.orderId;
    document.getElementById("vendor-name").innerText = order.vendorName;
    document.getElementById("order-date").innerText = order.orderDate;
    document.getElementById("payment-status").innerText = order.paymentStatus;
    document.getElementById("payment-mode").innerText = order.paymentMode;
    document.getElementById("delivery-status").innerText = order.status;
    document.getElementById("from-location").innerText = "Warehouse, Bangalore"; // Example Location
    document.getElementById("to-location").innerText = "Customer's Address"; // Example Address
    document.getElementById("delivery-date").innerText = order.deliveryDate;

    // Populate Drug List
    let drugList = document.getElementById("drug-list");
    drugList.innerHTML = ""; // Clear existing data
    order.drugs.forEach(drug => {
        let row = `<tr>
            <td>${drug.name}</td>
            <td>${drug.quantity}</td>
            <td>₹${drug.price}</td>
        </tr>`;
        drugList.innerHTML += row;
    });
}

// Load Order Details on Page Load
window.onload = loadOrderDetails;
