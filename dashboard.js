// Function to Load Recent Orders and Display Order ID
function loadDashboardData() {
    let orders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    let recentOrderList = document.getElementById("recent-order-list");

    // Clear previous data in the table
    recentOrderList.innerHTML = "";

    // Load Recent Orders
    orders.forEach(order => {
        order.drugs.forEach(drug => {
            let row = `<tr>
                <td>${order.orderId}</td>
                <td>${drug.name}</td>
                <td>${drug.manufacturer || "N/A"}</td>
                <td>₹${drug.price}</td>
                <td>${drug.quantity}</td>
                <td>${order.orderDate || "N/A"}</td>
                <td><a href="order_tracking.html?orderId=${order.orderId}"><button>Track</button></a></td>
            </tr>`;
            recentOrderList.innerHTML += row;
        });
    });
}

// Load Data on Page Load
window.onload = loadDashboardData;
