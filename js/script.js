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

// Elementos dos botões
const botaoBase = document.getElementById("botaoBase");
const botaoTopo = document.getElementById("botaoTopo");
const secaoFooter = document.querySelector("footer");
const secaoSobreMim = document.querySelector('section.sobre h2') || document.querySelector('h2');

// Listener único para controlar ambos os botões
window.addEventListener("scroll", () => {
    const posicaoRodape = secaoFooter.getBoundingClientRect().top;

    // Controla botão de voltar ao topo (aparece quando footer fica visível)
    if (posicaoRodape < window.innerHeight) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }

    // Controla botão de voltar à base (desaparece quando footer fica visível)
    if (posicaoRodape < window.innerHeight) {
        botaoBase.style.display = "none";
    } else {
        botaoBase.style.display = "block";
    }
});

// Função ao clicar no botão de voltar à base
function voltarABase() {
    const rodape = document.querySelector("footer");
    rodape.scrollIntoView({ behavior: "smooth" });
}

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Formulário de contato */

// Formatação automática de telefone
const phonInput = document.getElementById('phonContact');
const contactInput = document.getElementById('contactInput');
const emailInput = document.getElementById('emailInput');
const servicoSelect = document.getElementById('servicoSelect');
const retornoSelect = document.getElementById('retornoSelect');

if (phonInput) {
    phonInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        
        if (value.length > 12) {
            value = value.slice(0, 12); // Limita a 12 dígitos
        }
        
        if (value.length <= 2) {
            e.target.value = value;
        } else if (value.length <= 7) {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
        
        // Validar em tempo real
        validarCampo(phonInput);
    });
    
    phonInput.addEventListener('blur', function () {
        validarCampo(phonInput);
    });
}

if (contactInput) {
    contactInput.addEventListener('blur', function () {
        validarCampo(contactInput);
    });
    
    contactInput.addEventListener('input', function () {
        validarCampo(contactInput);
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', function () {
        validarCampo(emailInput);
    });
    
    emailInput.addEventListener('input', function () {
        validarCampo(emailInput);
    });
}

if (servicoSelect) {
    servicoSelect.addEventListener('change', function () {
        validarCampo(servicoSelect);
    });
}

if (retornoSelect) {
    retornoSelect.addEventListener('change', function () {
        validarCampo(retornoSelect);
    });
}

/* Validação customizada do formulário */

// Função para validar campo individual
function validarCampo(input) {
    if (input.id === 'contactInput') {
        if (input.value.trim().length < 3 && input.value.trim().length > 0) {
            mostrarErro(input, 'O nome deve ter no mínimo 3 caracteres');
        } else if (input.value.trim().length === 0) {
            limparErro(input);
        } else {
            limparErro(input);
        }
    } else if (input.id === 'emailInput') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value) && input.value.trim().length > 0) {
            mostrarErro(input, 'E-mail inválido');
        } else if (input.value.trim().length === 0) {
            limparErro(input);
        } else {
            limparErro(input);
        }
    } else if (input.id === 'phonContact') {
        const apenasNumeros = input.value.replace(/\D/g, '');
        if ((apenasNumeros.length < 10 || apenasNumeros.length > 12) && input.value.trim().length > 0) {
            mostrarErro(input, 'O telefone deve ter entre 10 e 12 dígitos');
        } else if (input.value.trim().length === 0) {
            limparErro(input);
        } else {
            limparErro(input);
        }
    } else if (input.id === 'servicoSelect') {
        if (!input.value) {
            mostrarErro(input, 'Selecione um interesse');
        } else {
            limparErro(input);
        }
    } else if (input.id === 'retornoSelect') {
        if (!input.value) {
            mostrarErro(input, 'Selecione uma preferência de contato');
        } else {
            limparErro(input);
        }
    }
}

function validarFormulario() {
    const contactInput = document.getElementById('contactInput');
    const emailInput = document.getElementById('emailInput');
    const phonContact = document.getElementById('phonContact');
    const messageContato = document.getElementById('messageContato');
    
    let isValid = true;

    // Validar nome
    if (contactInput.value.trim().length < 3) {
        mostrarErro(contactInput, 'O nome deve ter no mínimo 3 caracteres');
        isValid = false;
    } else {
        limparErro(contactInput);
    }

    // Validar e-mail (opcional): apenas se preenchido, checar formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && emailInput.value.trim().length > 0) {
        if (!emailRegex.test(emailInput.value.trim())) {
            mostrarErro(emailInput, 'E-mail inválido');
            isValid = false;
        } else {
            limparErro(emailInput);
        }
    } else if (emailInput) {
        limparErro(emailInput);
    }

    // Validar telefone (opcional): apenas se preenchido, checar dígitos
    if (phonContact && phonContact.value.trim().length > 0) {
        const apenasNumeros = phonContact.value.replace(/\D/g, '');
        if (apenasNumeros.length < 10 || apenasNumeros.length > 12) {
            mostrarErro(phonContact, 'O telefone deve ter entre 10 e 12 dígitos');
            isValid = false;
        } else {
            limparErro(phonContact);
        }
    } else if (phonContact) {
        limparErro(phonContact);
    }

    // Validar mensagem
    if (messageContato.value.trim().length === 0) {
        mostrarErro(messageContato, 'A mensagem não pode estar vazia');
        isValid = false;
    } else {
        limparErro(messageContato);
    }

    return isValid;
}

function mostrarErro(input, mensagem) {
    input.classList.add('invalid');
    
    // Calcula o ID do span de erro
    let errorId;
    if (input.id === 'servicoSelect') {
        errorId = 'errorServicoSelect';
    } else if (input.id === 'retornoSelect') {
        errorId = 'errorRetornoSelect';
    } else {
        errorId = 'error' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
        errorSpan.textContent = mensagem;
        errorSpan.classList.add('active');
        console.log('✅ Erro mostrado para', input.id, ':', mensagem);
    } else {
        console.warn('⚠️ Elemento de erro não encontrado:', errorId);
    }
}

function limparErro(input) {
    input.classList.remove('invalid');
    
    // Calcula o ID do span de erro
    let errorId;
    if (input.id === 'servicoSelect') {
        errorId = 'errorServicoSelect';
    } else if (input.id === 'retornoSelect') {
        errorId = 'errorRetornoSelect';
    } else {
        errorId = 'error' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }
    
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.classList.remove('active');
    }
}

// Inicializa EmailJS com sua Public Key
(function () {
    emailjs.init("BK6_sLVZgd2N2v9-F"); // ✅ Sua Public Key
})();

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Salva posição exata do scroll
    const currentScrollY = window.scrollY;
    
    // Valida antes de enviar
    if (!validarFormulario()) {
        return;
    }

    // Bloqueia scroll AGRESSIVAMENTE
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollY = currentScrollY;
    
    // Também bloqueia o evento de scroll
    const preventScroll = (e) => {
        window.scrollTo(currentScrollY, currentScrollY);
    };
    window.addEventListener('scroll', preventScroll, { passive: false });

    // Pega os valores dos campos
    const contactName = document.getElementById('contactInput').value;
    const contactEmail = document.getElementById('emailInput').value;
    const contactPhone = document.getElementById('phonContact').value;
    const servicoValue = document.querySelector('#servicoSelect option:checked').textContent || 'Não informado';
    const retornoValue = document.querySelector('#retornoSelect option:checked').textContent || 'Não informado';
    const contactMessage = document.getElementById('messageContato').value;

    // Envia com emailjs.send() para ter mais controle
    const payload = {
        name: contactName,
        email: contactEmail || 'Não informado',
        phone: contactPhone || 'Não informado',
        servico: servicoValue,
        retorno: retornoValue,
        message: contactMessage,
        sent_date: new Date().toLocaleString('pt-BR')
    };

    console.log('📤 Enviando payload para EmailJS:', payload);
    console.log('🔎 emailjs disponível:', typeof emailjs !== 'undefined');

    if (typeof emailjs === 'undefined') {
        window.removeEventListener('scroll', preventScroll);
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        console.error('❌ emailjs não está carregado. Aborting send.');
        mostrarMensagem('Falha ao enviar mensagem. Serviço não disponível.', false);
        return;
    }

    emailjs.send('service_j34kzxh', 'template_wyk7sje', payload)
        .then((response) => {
            console.log('✅ EmailJS response:', response);
            // Remove listener de scroll
            window.removeEventListener('scroll', preventScroll);
            
            // Força volta à posição com delay
            setTimeout(() => {
                // Define scroll em múltiplas propriedades
                window.scrollTo(0, currentScrollY);
                document.documentElement.scrollTop = currentScrollY;
                document.body.scrollTop = currentScrollY;
                
                // Restaura scroll
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
                
                console.log('✅ Scroll restaurado para:', currentScrollY);
                console.log('✅ Chamando mostrarMensagem');
                
                mostrarMensagem('Mensagem enviada com sucesso!', true);
                form.reset();
                
                // Limpar erros após envio
                document.getElementById('contactInput').classList.remove('invalid');
                document.getElementById('phonContact').classList.remove('invalid');
                document.getElementById('messageContato').classList.remove('invalid');
                document.getElementById('errorContactInput').classList.remove('active');
                document.getElementById('errorPhonContact').classList.remove('active');
            }, 50);
        }, (error) => {
            console.error('📛 EmailJS error object:', error);
            if (error && error.status) console.error('📛 status:', error.status);
            if (error && error.text) console.error('📛 text:', error.text);
            
            // Tenta fallback com Formspree (gratuito, sem OAuth)
            console.log('🔄 Tentando fallback com Formspree...');
            
            const formspreePayload = new FormData();
            formspreePayload.append('name', payload.name);
            formspreePayload.append('email', payload.email);
            formspreePayload.append('phone', payload.phone);
            formspreePayload.append('servico', payload.servico);
            formspreePayload.append('retorno', payload.retorno);
            formspreePayload.append('message', payload.message);
            formspreePayload.append('sent_date', payload.sent_date);
            
            fetch('https://formspree.io/f/xgovylar', {
                method: 'POST',
                body: formspreePayload,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(resp => {
                if (resp.ok) {
                    console.log('✅ Formspree sucesso');
                    // Remove listener de scroll
                    window.removeEventListener('scroll', preventScroll);
                    
                    setTimeout(() => {
                        window.scrollTo(0, currentScrollY);
                        document.documentElement.scrollTop = currentScrollY;
                        document.body.scrollTop = currentScrollY;
                        
                        document.body.style.overflow = 'auto';
                        document.documentElement.style.overflow = 'auto';
                        
                        mostrarMensagem('Mensagem enviada com sucesso (via servidor alternativo)!', true);
                        form.reset();
                        
                        document.getElementById('contactInput').classList.remove('invalid');
                        document.getElementById('phonContact').classList.remove('invalid');
                        document.getElementById('messageContato').classList.remove('invalid');
                        document.getElementById('errorContactInput').classList.remove('active');
                        document.getElementById('errorPhonContact').classList.remove('active');
                    }, 50);
                } else {
                    throw new Error('Formspree retornou ' + resp.status);
                }
            })
            .catch(fallbackError => {
                console.error('❌ Ambos EmailJS e Formspree falharam:', fallbackError);
                
                // Remove listener de scroll
                window.removeEventListener('scroll', preventScroll);
                
                setTimeout(() => {
                    window.scrollTo(0, currentScrollY);
                    document.documentElement.scrollTop = currentScrollY;
                    document.body.scrollTop = currentScrollY;
                    
                    document.body.style.overflow = 'auto';
                    document.documentElement.style.overflow = 'auto';
                    
                    mostrarMensagem('Falha ao enviar. Tente novamente ou contato via WhatsApp.', false);
                }, 50);
            });
        });
});

function mostrarMensagem(mensagem, sucesso) {
    console.log('📢 Mostrando mensagem:', mensagem, 'Sucesso:', sucesso);
    
    // Pega elemento
    const msgElement = document.getElementById('formMessage');
    console.log('🔍 Elemento encontrado:', msgElement);
    
    if (!msgElement) {
        console.error('❌ #formMessage não encontrado!');
        alert(mensagem); // Fallback
        return;
    }
    
    // Limpa o conteúdo anterior
    msgElement.innerHTML = '';
    msgElement.className = sucesso ? 'success' : 'error';
    msgElement.style.display = 'flex'; // Garante display flex

    // Cria o container de conteúdo
    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.alignItems = 'center';
    contentDiv.style.gap = '15px';
    contentDiv.style.flex = '1';
    
    // Adiciona a mensagem
    const messageText = document.createElement('span');
    messageText.textContent = mensagem;
    contentDiv.appendChild(messageText);

    // Cria botão de fechar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.type = 'button';
    closeBtn.onclick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        fecharMensagem();
    };

    msgElement.appendChild(contentDiv);
    msgElement.appendChild(closeBtn);

    // Força o display
    msgElement.style.opacity = '1';
    msgElement.style.pointerEvents = 'auto';

    console.log('✅ Mensagem exibida com sucesso');

    // Esconde após 5 segundos
    setTimeout(() => {
        fecharMensagem();
    }, 5000);
}

function fecharMensagem() {
    const formMessage = document.getElementById('formMessage');
    formMessage.style.animation = 'slideOutBottom 0.3s ease-out';
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.style.animation = 'slideInBottom 0.4s ease-out';
    }, 300);
}

/* Acordeões do Currículo */
function toggleAccordion(header) {
    // Remove a classe 'active' de todos os headers
    const allHeaders = document.querySelectorAll('.accordion-header');
    allHeaders.forEach(h => {
        if (h !== header) {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('active');
        }
    });

    // Toggle o header e body clicado
    header.classList.toggle('active');
    const body = header.nextElementSibling;
    body.classList.toggle('active');
}

/*Fim*/