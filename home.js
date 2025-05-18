// Function to Load User Profile Data
function loadUserProfile() {
    let user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    document.getElementById("user-name").innerText = user.name || "N/A";
    document.getElementById("user-email").innerText = user.email || "N/A";
    document.getElementById("user-phone").innerText = user.phone || "N/A";
    document.getElementById("user-address").innerText = user.address || "N/A";
    document.getElementById("user-state").innerText = user.state || "N/A";
    document.getElementById("user-pincode").innerText = user.pincode || "N/A";
}

// Function to Logout User
function logoutUser() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("loggedInUser"); // Remove user session
        window.location.href = "index.html"; // Redirect to Login Page
    }
}

// Function to Delete Account
function deleteAccount() {
    if (confirm("⚠️ Are you sure you want to DELETE your account? This action cannot be undone!")) {
        localStorage.removeItem("loggedInUser"); // Remove user data
        alert("Your account has been deleted successfully.");
        window.location.href = "index.html"; // Redirect to Signup Page
    }
}

// Load User Profile on Page Load
window.onload = loadUserProfile;
