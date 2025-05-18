function toggleAuth() {
    document.getElementById("login-box").classList.toggle("hidden");
    document.getElementById("signup-box").classList.toggle("hidden");
}

async function registerUser() {
    const username = document.getElementById("signup-firstname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        alert("Signup successful! Please login.");
        toggleAuth(); // Switch to login box
    } catch (err) {
        console.error(err);
        alert("Signup error");
    }
}

async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Login failed");
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } catch (err) {
        console.error(err);
        alert("Login error");
    }
}
