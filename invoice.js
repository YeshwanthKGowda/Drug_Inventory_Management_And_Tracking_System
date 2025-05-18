window.onload = function () {
    const invoiceNo = 'INV-' + Date.now();
    const date = new Date().toLocaleString();
    // Load cart directly from localStorage
    const cartStr = localStorage.getItem('invoiceCart') || localStorage.getItem('cart');


    if (!cartStr) {
        alert("No cart data found.");
        return;
    }

    const cart = JSON.parse(cartStr);

    document.getElementById('invoiceNo').textContent = invoiceNo;
    document.getElementById('invoiceDate').textContent = date;

    const itemsContainer = document.getElementById('invoiceItems');
    itemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.quantity * item.price;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>₹${subtotal.toFixed(2)}</td>
        `;
        itemsContainer.appendChild(row);
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);

    setTimeout(() => {
        generatePDF(invoiceNo, date, cart, total);
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 10000);
};

function generatePDF(invoiceNo, date, items, total) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Drug Purchase Invoice", 70, 20);

    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoiceNo}`, 14, 30);
    doc.text(`Date: ${date}`, 14, 37);

    let startY = 50;
    doc.text("Drug Name", 14, startY);
    doc.text("Qty", 80, startY);
    doc.text("Price", 100, startY);
    doc.text("Subtotal", 140, startY);
    startY += 7;

    items.forEach(item => {
        const subtotal = item.quantity * item.price;
        doc.text(item.name, 14, startY);
        doc.text(item.quantity.toString(), 80, startY);
        doc.text(`₹${item.price.toFixed(2)}`, 100, startY);
        doc.text(`₹${subtotal.toFixed(2)}`, 140, startY);
        startY += 7;
    });

    doc.text(`Total: ₹${total.toFixed(2)}`, 140, startY + 10);
    doc.save(`${invoiceNo}.pdf`);
}
