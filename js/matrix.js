var canvas = document.getElementById("matrix");
var ctx = canvas.getContext("2d");



// Define o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define o tamanho e a cor das letras
var fontSize = 14;
var columns = canvas.width / fontSize;
var drops = [];

// Cria um array com as palavras
var words = [" Aceitação ", " API ", " Appium ", " Automation ", " Automação ", " BDD ", " Beta ", " Bruno ", " Bug ", " C# ", " CSS ", " Caixa Branca ", " Caixa Preta ", 
    " Carga ", " Componente ", " Cypress ", " Defeito ", " Developer "," DevOps ", " Erro ", " Exploratório ", " Falha ", " Funcional ", " Git ", " Github ", " Gherkin ", 
    " Google "," Gonçalves ", " HTML ", " Integração ", " Java ", " JavaScript ", " Jira ", " JUnit ", " K6 ", " Kanban ", " Linkedin ", " Manual ", " Mocha ", " Não Funcional ",
    " Performance ", " Postman ", " Product Owner ", " Pytest ", " Python ", " QA ", " Qualidade de Software ", " Quality Assurance ", " Regressão ", " Robot Framework ", " Ruby ",
    " Sanidade ", " Scrum ", " Scrum Master "," Segurança ", " Selenium ", " Selenium WebDriver ", " Siqueira ", " Sistema ", " Tech Lead "," TDD ", " TestNG ", " Trello ", 
    " TypeScript ", " Unidade ", " Unitário ", " Usabilidade ", "VS Code"];

//" ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()-=_+[]{}|;:,.<>?/~` ".split("") - Poderão ser adicionadas a var acima


function drawMatrix() {
    // Preenche o canvas com o fundo preto
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Adiciona as letras na tela
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var color = (Math.random() < 0.25) ? "gray" : (Math.random() < 0.5) ? "darkgray" : (Math.random() < 0.75) ? "light gray" : "white";
        ctx.fillStyle = color;
        ctx.font = fontSize + "px arial";

        // Define a coluna em que a palavra será adicionada
        var column = Math.floor(Math.random() * columns);

        // Adiciona cada letra da palavra na tela, em uma nova linha
        for (var j = 0; j < word.length; j++) {
            var letter = word.charAt(j);
            ctx.fillText(letter, column * fontSize, (drops[column] + j) * fontSize);

            // Se a letra cair fora da tela, é adicionada novamente no topo
            if ((drops[column] + j) * fontSize > canvas.height && Math.random() > 0.975) {
                drops[column] = 0;
            }
        }

        // Adiciona o tamanho da palavra à posição inicial da coluna
        drops[column] += word.length;

    }
}


// Cria um array com as posições iniciais das letras
for (var i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height);
}

// Executa o efeito Matrix a cada 30 milissegundos
setInterval(drawMatrix, 200);
//velocidade de apresentação

var botao2 = document.getElementById("rede-social");
botao2.addEventListener("click", toggleImage);

function toggleImage() {
    var image = document.getElementById("rede-social");
    image.classList.toggle("hide");
    image.classList.remove("hide"); // Adicione esta linha para fazer a imagem aparecer
}
