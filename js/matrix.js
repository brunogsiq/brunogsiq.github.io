var canvas = document.getElementById("matrixCanvas");

// Verifica se o canvas existe antes de prosseguir
if (canvas) {
    var ctx = canvas.getContext("2d");

    // Cria um array com as palavras (QATRIX é destacado)
    var words = ["QAtrix", "Aceitação", "API", "Appium", "Automation", "Automação", "BDD", "Beta", "Bruno", "Bug", 
        "C#", "CSS", "Caixa Branca", "Caixa Preta", "Carga", "Componente", "Cypress", "Defeito", "Developer", "DevOps", 
        "Erro", "Exploratório", "Falha", "Funcional", "Git", "Github", "Gherkin", "Google", "Gonçalves", "HTML", 
        "Integração", "Java", "JavaScript", "Jira", "JUnit", "K6", "Kanban", "Linkedin", "Manual", "Mocha", 
        "Não Funcional", "Performance", "Postman", "Product Owner", "Pytest", "Python", "QA", "Qualidade de Software", 
        "Quality Assurance", "Regressão", "Robot Framework", "Ruby", "Sanidade", "Scrum", "Scrum Master", "Segurança", 
        "Selenium", "Selenium WebDriver", "Siqueira", "Sistema", "Tech Lead", "TDD", "TestNG", "Trello", "TypeScript", 
        "Unidade", "Unitário", "Usabilidade", "VS Code", "QAtrix Tecnologia"];

    // Ajusta o tamanho do canvas
    function adjustCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Variáveis para partículas/caracteres
    var fontSize = 16;
    var particleArray = [];
    
    adjustCanvasSize();

    // Classe para cada caractere/partícula
    class MatrixChar {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.char = words[Math.floor(Math.random() * words.length)];
            this.opacity = Math.random() * 0.5 + 0.5;
            this.life = Math.random() * 100 + 50;
            this.isQAtrix = this.char === "QAtrix" || this.char === "QAtrix Tecnologia";
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            this.opacity -= 0.01;

            // Bounce nas bordas
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Manter dentro do canvas
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.opacity);
            
            // QAtrix em vermelho neon
            if (this.isQAtrix) {
                ctx.fillStyle = "#FF0055";
                ctx.shadowColor = "#FF0055";
                ctx.shadowBlur = 20;
                ctx.font = "bold 20px 'Courier New', monospace";
            } else {
                // Branco neon
                ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#f0f0f0";
                ctx.shadowColor = "#ffffff";
                ctx.shadowBlur = 10;
                ctx.font = "14px 'Courier New', monospace";
            }
            
            ctx.fillText(this.char, this.x, this.y);
            ctx.restore();
        }
    }

    // Adiciona novas partículas continuamente
    function addParticles() {
        if (particleArray.length < 80) {
            particleArray.push(new MatrixChar());
        }
    }

    function drawMatrix() {
        // Fundo preto com pequeno fade
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Adiciona novas partículas
        addParticles();

        // Atualiza e desenha cada partícula
        for (let i = particleArray.length - 1; i >= 0; i--) {
            particleArray[i].update();
            particleArray[i].draw(ctx);

            // Remove partículas mortas
            if (particleArray[i].life <= 0 || particleArray[i].opacity <= 0) {
                particleArray.splice(i, 1);
            }
        }

        // Adiciona linhas conectando partículas próximas (efeito de rede)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particleArray.length; i++) {
            for (let j = i + 1; j < particleArray.length; j++) {
                const dx = particleArray[i].x - particleArray[j].x;
                const dy = particleArray[i].y - particleArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particleArray[i].x, particleArray[i].y);
                    ctx.lineTo(particleArray[j].x, particleArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }

    // Inicia a animação
    animate();

    // Ajusta o canvas ao redimensionar a janela
    window.addEventListener("resize", adjustCanvasSize);
}