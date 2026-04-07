// This is the front end logic also known as
// the UI logic

//this logic is for account creation
async function signup(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    } 

    try {
        const res = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            alert("Account Successfully Created!")
            window.location.href = "login.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.eror(err);
        alert("Sign up Failed!");
    }
}

// this logic is for entering your credentials
async function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html"
    alert("Successfully Logged in!");
}

// sends the security code to securely reset the password
async function sendCode(){
    const email = document.getElementById("email").value;
    
    if (!email) {
        alert("Enter your email");
        return;
    }
    try {
        const res = await fetch("http://localhost:3000/api/auth/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const data = await res.json();

        if (res.ok) {
            alert("Reset Code sent to your email!");
            window.location.href = "reset.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert("Failed to send code");
    }
}

// Logic to type in your new password and the code
async function resetPassword(){
    const email = document.getElementById("email").value;
    const code = document.getElementById("code").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!email || !code || !newPassword) {
        alert("Please Fill in all the fields below");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, code, newPassword })
        });
        const data = await res.json();

        if (res.ok) {
            alert("Password Successfully reset!");
            window.location.href = "login.html";
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error(err);
        alert("Sorry, the reset was unsuccessful")
    }
}

async function askAI() {
    const question = document.getElementById("question").value;
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ question })
    });
    const data = await res.json()

    document.getElementById("ai-response").textContent = data.reply;
}