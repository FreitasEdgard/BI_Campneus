let users = {};

function loadCredentials() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const lines = content.split('\n');
        lines.forEach(line => {
            const [username, password] = line.split(':');
            if (username && password) {
                users[username.trim()] = password.trim();
            }
        });
        alert('Credenciais carregadas com sucesso!');
    };
    reader.readAsText(file);
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] === password) {
        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("welcomeContainer").style.display = "flex";
        document.getElementById("welcomeMessage").classList.remove("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
        document.getElementById("user").textContent = username;
        
        const iframe = document.getElementById("dashboardFrame");
        iframe.src = "https://app.powerbi.com/view?r=eyJrIjoiYjFkMGI5NjQtNTJkZi00OWU3LTlmYWEtMWY0MGMwOGY4Yjc3IiwidCI6IjMxMjY2ODM1LTYwNDAtNGRlZS04NzA2LTkzY2M4OTYyMTYwNCJ9";
        iframe.style.display = "block";
    } else {
        document.getElementById("error").textContent = "Usuário ou senha incorretos";
    }
}

function logout() {
    document.getElementById("loginContainer").classList.remove("hidden");
    document.getElementById("welcomeContainer").style.display = "none";
    document.getElementById("welcomeMessage").classList.add("hidden");
    document.getElementById("logoutButton").classList.add("hidden");
    
    const iframe = document.getElementById("dashboardFrame");
    iframe.src = "";
    iframe.style.display = "none";
}

function checkEnter(event) {
    if (event.key === "Enter") {
        login();
    }
}
