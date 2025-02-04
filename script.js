let users = {};

// Função para carregar as credenciais do arquivo txt
function loadCredentials() {
    fetch('credenciais.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                const [username, password] = line.split(':');
                if (username && password) {
                    users[username.trim()] = password.trim();
                }
            });
        })
        .catch(error => console.error('Erro ao carregar credenciais:', error));
}

// Carrega as credenciais ao iniciar a página
loadCredentials();

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (users[username] === password) {
        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("welcomeContainer").style.display = "flex";
        document.getElementById("welcomeMessage").classList.remove("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
        document.getElementById("user").textContent = username;
        
        // Carrega o iframe e ajusta para tela cheia
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
    
    // Esconde o iframe ao deslogar
    const iframe = document.getElementById("dashboardFrame");
    iframe.src = "";
    iframe.style.display = "none";
}

function checkEnter(event) {
    if (event.key === "Enter") {
        login();
    }
}