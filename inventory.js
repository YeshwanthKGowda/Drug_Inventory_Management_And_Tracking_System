document.addEventListener("DOMContentLoaded", function () {
    const inventoryData = [
        { name: "Paracetamol", manufacturer: "XYZ Pharma", batch: "PA2023B1", expiry: "2025-08-12", stock: 500 },
        { name: "Ibuprofen", manufacturer: "ABC Medics", batch: "IB2023C2", expiry: "2026-01-20", stock: 20 },
        { name: "Amoxicillin", manufacturer: "DEF Pharma", batch: "AMX2023D3", expiry: "2024-11-05", stock: 200 },
        { name: "Cetirizine", manufacturer: "MediCare Pvt Ltd", batch: "CET2023E4", expiry: "2025-06-15", stock: 10 }
    ];

    const inventoryBody = document.getElementById("inventory-body");

    inventoryData.forEach((drug, index) => {
        let row = document.createElement("tr");

        // Expiry Date Alert
        let expiryDate = new Date(drug.expiry);
        let today = new Date();
        let colorClass = expiryDate < today ? "expired" : expiryDate - today < 30 * 24 * 60 * 60 * 1000 ? "warning" : "safe";

        row.innerHTML = `
            <td>${drug.name}</td>
            <td>${drug.manufacturer}</td>
            <td>${drug.batch}</td>
            <td class="${colorClass}">${drug.expiry}</td>
            <td class="${drug.stock < 50 ? 'low-stock' : ''}">${drug.stock}</td>
        `;

        inventoryBody.appendChild(row);

        
    });

    // AI-Based Demand Prediction (Random Sample Data)
    const ctx = document.getElementById('demandChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Paracetamol", "Ibuprofen", "Amoxicillin", "Cetirizine"],
            datasets: [{
                label: 'Predicted Sales',
                data: [300, 150, 100, 200],
                backgroundColor: ['blue', 'green', 'red', 'orange']
            }]
        }
    });
});


