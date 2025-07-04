/*Início*/

/* Botão Ver mais - Seção Sobre */
function toggleTexto() {
    const texto = document.getElementById("sobreTexto");
    const botao = document.querySelector(".verExpandido");

    texto.classList.toggle("expandido");

    if (texto.classList.contains("expandido")) {
        botao.textContent = "Ver menos";
    } else {
        botao.textContent = "Ver mais";
    }
}

/* Botão - Voltar a Base */

// Mostrar/esconder botão de "Voltar à base"
const botaoBase = document.getElementById("botaoBase");
const secaoFooter = document.querySelector("footer"); // ou por id se for <footer id="footer">

window.addEventListener("scroll", () => {
    const posicaoRodape = secaoFooter.getBoundingClientRect().top;

    // Se a parte de cima do rodapé estiver visível (ou quase visível)
    if (posicaoRodape < window.innerHeight) {
        botaoBase.style.display = "none"; // Esconde o botão
    } else {
        botaoBase.style.display = "block"; // Mostra o botão
    }
});

// Função ao clicar no botão
function voltarABase() {
    const rodape = document.querySelector("footer");
    rodape.scrollIntoView({ behavior: "smooth" });
}

/* Botão - Voltar ao Topo */

const botaoTopo = document.getElementById("botaoTopo");
const secaoSobreMim = document.querySelector('h2');

window.addEventListener("scroll", () => {
    // Verifica a posição do topo da seção "Um pouco sobre mim"
    const posicaoSecao = secaoSobreMim.getBoundingClientRect().top;

    if (posicaoSecao < window.innerHeight / 2) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Formulário de contato */

// Inicializa EmailJS com sua Public Key
(function () {
    emailjs.init("mStIjKEyJWrKzpkMY"); // ✅ Sua Public Key
})();

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_g87zjpf', 'template_wyk7sje', this)
        .then(() => {
            mostrarMensagem('Mensagem enviada com sucesso!', true);
            form.reset();
        }, (error) => {
            mostrarMensagem('Falha ao enviar mensagem. Tente novamente.', false);
            console.error('Erro:', error);
        });
});

function mostrarMensagem(mensagem, sucesso) {
    // Limpa o conteúdo anterior
    formMessage.innerHTML = '';

    // Cria botão de fechar
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.style.float = 'right';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '10px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.onclick = () => {
        formMessage.style.display = 'none';
    };

    // Adiciona a mensagem e botão ao elemento
    formMessage.textContent = mensagem;
    formMessage.appendChild(closeBtn);

    // Estilização condicional
    formMessage.style.display = 'block';
    formMessage.style.color = 'white';
    formMessage.style.background = sucesso ? '#00bbff' : '#e60023';
    formMessage.style.border = sucesso ? '1px solid #1f015c' : '1px solid #8a0000';
    formMessage.style.padding = '10px';
    formMessage.style.borderRadius = '5px';

    // Esconde após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

/*Fim*/