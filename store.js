// List of drugs with IDs, prices, stock, and manufacturer
const drugs = [
    { id: 1, name: "Paracetamol", manufacturer: "ABC Pharma", price: 20, stock: 100 },
    { id: 2, name: "Ibuprofen", manufacturer: "MediCure", price: 30, stock: 80 },
    { id: 3, name: "Amoxicillin", manufacturer: "BioHeal", price: 50, stock: 60 },
    { id: 4, name: "Cetirizine", manufacturer: "ReliefCorp", price: 15, stock: 120 },
    { id: 5, name: "Metformin", manufacturer: "DiabetCare", price: 40, stock: 50 },
    { id: 6, name: "Aspirin", manufacturer: "PainAway", price: 25, stock: 75 },
    { id: 7, name: "Omeprazole", manufacturer: "StomachWell", price: 35, stock: 90 },
    { id: 8, name: "Loratadine", manufacturer: "AllergyStop", price: 18, stock: 100 },
    { id: 9, name: "Azithromycin", manufacturer: "InfectoKill", price: 60, stock: 40 },
    { id: 10, name: "Vitamin D", manufacturer: "NutriHealth", price: 10, stock: 150 },
    { id: 11, name: "Hydroxychloroquine", manufacturer: "MalariaCure", price: 45, stock: 30 },
    { id: 12, name: "Ciprofloxacin", manufacturer: "CureFast", price: 55, stock: 35 },
    { id: 13, name: "Doxycycline", manufacturer: "TetraPharma", price: 42, stock: 25 },
    { id: 14, name: "Levothyroxine", manufacturer: "ThyroLife", price: 33, stock: 80 },
    { id: 15, name: "Losartan", manufacturer: "BP Relief", price: 27, stock: 60 },
    { id: 16, name: "Atorvastatin", manufacturer: "HeartPlus", price: 29, stock: 70 },
    { id: 17, name: "Salbutamol", manufacturer: "BreathWell", price: 31, stock: 65 },
    { id: 18, name: "Montelukast", manufacturer: "LungsCare", price: 22, stock: 55 },
    { id: 19, name: "Ranitidine", manufacturer: "AcidGuard", price: 24, stock: 95 },
    { id: 20, name: "Furosemide", manufacturer: "WaterFlush", price: 37, stock: 40 },
    { id: 21, name: "Clindamycin", manufacturer: "InfexMed", price: 58, stock: 28 },
    { id: 22, name: "Pantoprazole", manufacturer: "AcidEase", price: 36, stock: 50 },
    { id: 23, name: "Esomeprazole", manufacturer: "RefluxStop", price: 39, stock: 45 },
    { id: 24, name: "Zinc Tablets", manufacturer: "VitalZinc", price: 12, stock: 100 },
    { id: 25, name: "Calcium Carbonate", manufacturer: "BoneHealth", price: 19, stock: 85 }
];

const cart = [];

function loadDrugs() {
    const drugList = document.getElementById("drug-list");
    if (!drugList) {
        console.error("Element with id 'drug-list' not found!");
        return;
    }
    drugList.innerHTML = "";

    drugs.forEach((drug, index) => {
        const row = `<tr>
            <td>${drug.name}</td>
            <td>${drug.manufacturer}</td>
            <td>₹${drug.price.toFixed(2)}</td>
            <td>${drug.stock}</td>
            <td><button onclick="addToCart(${index})">Add to Cart</button></td>
        </tr>`;
        drugList.innerHTML += row;
    });
}

function addToCart(index) {
    const selectedDrug = drugs[index];
    const existing = cart.find(item => item.id === selectedDrug.id);
    if (existing) {
        // Increase quantity but not beyond stock available
        if (existing.quantity < selectedDrug.stock) {
            existing.quantity++;
        } else {
            alert("No more stock available for this drug.");
        }
    } else {
        cart.push({ ...selectedDrug, quantity: 1 }); // keep id and other props
    }
    updateCart();
}

function updateCart() {
    const cartTable = document.getElementById("cart-items");
    if (!cartTable) {
        console.error("Element with id 'cart-items' not found!");
        return;
    }
    cartTable.innerHTML = "";
    let totalAmount = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        const row = `<tr>
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>₹${subtotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
        totalAmount += subtotal;
    });

    const totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.innerText = totalAmount.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "billing.html";
}

window.onload = loadDrugs;
