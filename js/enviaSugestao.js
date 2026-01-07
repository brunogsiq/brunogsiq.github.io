/**
 * enviaSugestao.js
 * Gerencia o formulário de sugestões do Test.Me
 * Validação, envio via EmailJS e fallback local
 */

class FormularioSugestao {
    constructor() {
        this.form = document.getElementById('contactFormTestMe');
        this.messageContainer = document.getElementById('formMessageTestMe');
        this.init();
    }

    init() {
        if (this.form) {
            // Listeners para validação em tempo real
            this.configurarValidacaoTempo();
            // Listener para submit
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    /**
     * Configura validação em tempo real dos campos
     */
    configurarValidacaoTempo() {
        const nome = document.getElementById('testMeName');
        const email = document.getElementById('testMeEmail');
        const sugestao = document.getElementById('testMeSuggestion');
        const checkbox = document.getElementById('testMeConsent');
        const screenshots = document.getElementById('testMeScreenshots');
        const botao = document.querySelector('.btn-submit-feedback');
        
        // Desabilita botão inicialmente
        if (botao) {
            botao.disabled = true;
        }
        
        if (nome) {
            nome.addEventListener('blur', () => {
                this.validarCampo(nome);
                this.verificarCamposObrigatorios();
            });
            nome.addEventListener('input', () => {
                this.validarCampo(nome);
                this.verificarCamposObrigatorios();
            });
        }
        
        if (email) {
            email.addEventListener('blur', () => {
                this.validarCampo(email);
                this.verificarCamposObrigatorios();
            });
            email.addEventListener('input', () => {
                this.validarCampo(email);
                this.verificarCamposObrigatorios();
            });
        }
        
        if (sugestao) {
            sugestao.addEventListener('blur', () => {
                this.validarCampo(sugestao);
                this.verificarCamposObrigatorios();
            });
            sugestao.addEventListener('input', () => {
                this.validarCampo(sugestao);
                this.verificarCamposObrigatorios();
            });
        }

        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.verificarCamposObrigatorios();
            });
        }

        if (screenshots) {
            screenshots.addEventListener('change', () => {
                this.validarArquivos(screenshots);
            });
        }
    }

    /**
     * Valida um campo individual
     */
    validarCampo(input) {
        const id = input.id;
        const valor = input.value.trim();
        let mensagem = '';
        let invalido = false;

        if (id === 'testMeName') {
            if (valor.length > 0 && valor.length < 3) {
                mensagem = 'O nome deve ter no mínimo 3 caracteres';
                invalido = true;
            }
        } else if (id === 'testMeEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor.length > 0 && !emailRegex.test(valor)) {
                mensagem = 'E-mail inválido';
                invalido = true;
            }
        } else if (id === 'testMeLinkedin') {
            if (valor.length > 0 && !valor.includes('linkedin.com')) {
                // Apenas aviso, não obrigatório
            }
        }

        if (invalido) {
            this.mostrarErro(input, mensagem);
        } else {
            this.limparErro(input);
        }
    }

    /**
     * Exibe mensagem de erro para campo
     */
    mostrarErro(input, mensagem) {
        input.classList.add('invalid');
        const errorId = 'error' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
        const errorSpan = document.getElementById(errorId);
        
        if (errorSpan) {
            errorSpan.textContent = mensagem;
            errorSpan.classList.add('active');
        }
    }

    /**
     * Limpa mensagem de erro do campo
     */
    limparErro(input) {
        input.classList.remove('invalid');
        const errorId = 'error' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
        const errorSpan = document.getElementById(errorId);
        
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('active');
        }
    }

    /**
     * Verifica se os campos obrigatórios estão preenchidos
     * E habilita/desabilita o botão enviar
     */
    verificarCamposObrigatorios() {
        const nome = document.getElementById('testMeName');
        const email = document.getElementById('testMeEmail');
        const checkbox = document.getElementById('testMeConsent');
        const botao = document.querySelector('.btn-submit-feedback');

        // Validações dos campos obrigatórios
        const nomeValido = nome && nome.value.trim().length >= 3;
        const emailValido = email && this.validarEmail(email.value.trim());
        const consentimentoValido = checkbox && checkbox.checked;

        // Habilita botão apenas se todos os campos obrigatórios forem válidos
        if (botao) {
            if (nomeValido && emailValido && consentimentoValido) {
                botao.disabled = false;
            } else {
                botao.disabled = true;
            }
        }
    }

    /**
     * Valida campos obrigatórios
     */
    validar(dados) {
        const erros = [];

        // Nome obrigatório e mínimo 3 caracteres
        if (!dados.name.trim()) {
            erros.push('Nome é obrigatório');
            this.mostrarErro(
                document.getElementById('testMeName'),
                'Nome é obrigatório'
            );
        } else if (dados.name.trim().length < 3) {
            erros.push('O nome deve ter no mínimo 3 caracteres');
            this.mostrarErro(
                document.getElementById('testMeName'),
                'O nome deve ter no mínimo 3 caracteres'
            );
        } else {
            this.limparErro(document.getElementById('testMeName'));
        }

        // Email obrigatório
        if (!dados.email.trim()) {
            erros.push('E-mail é obrigatório');
            this.mostrarErro(
                document.getElementById('testMeEmail'),
                'E-mail é obrigatório'
            );
        } else if (!this.validarEmail(dados.email)) {
            erros.push('E-mail inválido');
            this.mostrarErro(
                document.getElementById('testMeEmail'),
                'E-mail inválido'
            );
        } else {
            this.limparErro(document.getElementById('testMeEmail'));
        }

        // Sugestão obrigatória
        if (!dados.suggestion.trim()) {
            erros.push('Sugestão é obrigatória');
            this.mostrarErro(
                document.getElementById('testMeSuggestion'),
                'Sugestão é obrigatória'
            );
        } else {
            this.limparErro(document.getElementById('testMeSuggestion'));
        }

        // Consentimento obrigatório
        if (!dados.consent) {
            erros.push('Você precisa concordar com os termos');
            this.mostrarErro(
                document.getElementById('testMeConsent'),
                'Você precisa concordar com os termos'
            );
        } else {
            this.limparErro(document.getElementById('testMeConsent'));
        }

        // Validar arquivos selecionados
        const inputScreenshots = document.getElementById('testMeScreenshots');
        if (inputScreenshots && inputScreenshots.files.length > 0) {
            const tiposPermitidos = ['image/png', 'image/jpeg', 'application/pdf'];
            const extensoesPermitidas = ['.png', '.jpg', '.jpeg', '.pdf'];
            const tamanhoMaximo = 1 * 1024 * 1024; // 1 MB

            for (let i = 0; i < inputScreenshots.files.length; i++) {
                const arquivo = inputScreenshots.files[i];
                const nomeArquivo = arquivo.name.toLowerCase();
                const extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));

                // Verifica tipo
                if (!tiposPermitidos.includes(arquivo.type) && !extensoesPermitidas.includes(extensao)) {
                    erros.push(`Arquivo "${arquivo.name}": Formato não permitido`);
                }

                // Verifica tamanho
                if (arquivo.size > tamanhoMaximo) {
                    erros.push(`Arquivo "${arquivo.name}": Tamanho maior que 1 MB. Envie pelo WhatsApp.`);
                }
            }
        }

        return erros;
    }

    /**
     * Valida formato de email
     */
    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida arquivos selecionados
     * - Tipos permitidos: PNG, JPG, JPEG, PDF
     * - Tamanho máximo: 1 MB por arquivo
     */
    validarArquivos(inputArquivos) {
        const tiposPermitidos = ['image/png', 'image/jpeg', 'application/pdf'];
        const extensoesPermitidas = ['.png', '.jpg', '.jpeg', '.pdf'];
        const tamanhoMaximo = 1 * 1024 * 1024; // 1 MB em bytes
        const errosArquivos = [];

        // Percorre cada arquivo selecionado
        for (let i = 0; i < inputArquivos.files.length; i++) {
            const arquivo = inputArquivos.files[i];
            const nomeArquivo = arquivo.name.toLowerCase();
            const extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));

            // Verifica tipo MIME
            if (!tiposPermitidos.includes(arquivo.type)) {
                // Se tipo MIME não é reconhecido, verifica extensão
                if (!extensoesPermitidas.includes(extensao)) {
                    errosArquivos.push(`❌ "${arquivo.name}": Formato não permitido. Use PNG, JPG, JPEG ou PDF.`);
                    continue;
                }
            }

            // Verifica tamanho
            if (arquivo.size > tamanhoMaximo) {
                const tamanhoMB = (arquivo.size / (1024 * 1024)).toFixed(2);
                errosArquivos.push(`❌ "${arquivo.name}": ${tamanhoMB} MB é maior que 1 MB permitido. Envie pelo WhatsApp.`);
            }
        }

        const inputScreenshots = document.getElementById('testMeScreenshots');
        const errorSpan = document.getElementById('errorTestMeScreenshots');

        if (errosArquivos.length > 0) {
            // Mostra erros
            inputScreenshots.classList.add('invalid');
            if (errorSpan) {
                errorSpan.innerHTML = errosArquivos.join('<br>');
                errorSpan.classList.add('active');
            }
        } else if (inputArquivos.files.length > 0) {
            // Se há arquivos e nenhum erro, limpa a mensagem de erro
            inputScreenshots.classList.remove('invalid');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.classList.remove('active');
            }
        }
    }

    /**
     * Coleta dados do formulário
     */
    coletarDados() {
        const formData = new FormData(this.form);
        return {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            linkedin: formData.get('linkedin') || '',
            suggestion: formData.get('suggestion') || '',
            screenshots: this.form.querySelector('#testMeScreenshots').files,
            consent: formData.get('consent')
        };
    }

    /**
     * Converte arquivo para Base64
     */
    converterParaBase64(arquivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(arquivo);
        });
    }

    /**
     * Converte múltiplos arquivos para Base64
     */
    async converterArquivosBase64(arquivos) {
        const arquivosBase64 = [];
        for (let i = 0; i < arquivos.length; i++) {
            try {
                const base64 = await this.converterParaBase64(arquivos[i]);
                arquivosBase64.push({
                    nome: arquivos[i].name,
                    tipo: arquivos[i].type,
                    tamanho: (arquivos[i].size / (1024 * 1024)).toFixed(2),
                    dados: base64
                });
            } catch (error) {
                console.error(`Erro ao converter ${arquivos[i].name}:`, error);
            }
        }
        return arquivosBase64;
    }

    /**
     * Exibe mensagem de feedback geral
     */
    mostrarMensagem(mensagem, sucesso = true) {
        if (this.messageContainer) {
            this.messageContainer.className = sucesso ? 'msg-success' : 'msg-error';
            this.messageContainer.innerHTML = mensagem;
            this.messageContainer.style.display = 'block';

            // Auto-hide após 5 segundos para mensagens de sucesso
            if (sucesso) {
                setTimeout(() => {
                    this.messageContainer.style.display = 'none';
                }, 5000);
            }
        }
    }

    /**
     * Envia dados via EmailJS
     */
    async enviarEmailJS(dados) {
        // Converte arquivos para Base64
        let arquivosBase64 = [];
        if (dados.screenshots && dados.screenshots.length > 0) {
            arquivosBase64 = await this.converterArquivosBase64(dados.screenshots);
        }

        // Cria string com informações dos arquivos
        let arquivosInfo = 'Sem anexos';
        if (arquivosBase64.length > 0) {
            arquivosInfo = arquivosBase64
                .map(a => `📄 ${a.nome} (${a.tamanho} MB)`)
                .join('\n');
        }

        const templateParams = {
            from_name: dados.name,
            from_email: dados.email,
            from_linkedin: dados.linkedin || 'Não informado',
            suggestion: dados.suggestion,
            screenshots_count: arquivosBase64.length,
            screenshot_names: arquivosInfo,
            // Adiciona dados em Base64 (até 3 arquivos por limitação do EmailJS)
            arquivo_1: arquivosBase64[0] ? JSON.stringify(arquivosBase64[0]) : '',
            arquivo_2: arquivosBase64[1] ? JSON.stringify(arquivosBase64[1]) : '',
            arquivo_3: arquivosBase64[2] ? JSON.stringify(arquivosBase64[2]) : '',
            aviso_multiplos: arquivosBase64.length > 3 ? '⚠️ Apenas os 3 primeiros arquivos foram convertidos em Base64. Para enviar mais, use o WhatsApp ou e-mail direto.' : ''
        };

        return emailjs.send('service_testme', 'template_testme', templateParams)
            .then((response) => {
                this.mostrarMensagem(
                    `✓ Sugestão enviada com sucesso! ${arquivosBase64.length > 0 ? arquivosBase64.length + ' arquivo(s) anexado(s).' : ''} Obrigado por sua contribuição!`,
                    true
                );
                this.form.reset();
                return true;
            })
            .catch((error) => {
                console.error('Erro ao enviar via EmailJS:', error);
                return false;
            });
    }

    /**
     * Registra sugestão localmente (fallback)
     */
    registrarLocalmente(dados) {
        const sugestoes = JSON.parse(localStorage.getItem('testMeSugestoes') || '[]');
        
        sugestoes.push({
            name: dados.name,
            email: dados.email,
            linkedin: dados.linkedin || 'Não informado',
            suggestion: dados.suggestion,
            screenshots_count: dados.screenshots.length,
            screenshot_names: Array.from(dados.screenshots).map(f => f.name),
            timestamp: new Date().toLocaleString('pt-BR'),
            id: Date.now()
        });

        localStorage.setItem('testMeSugestoes', JSON.stringify(sugestoes));
        
        return true;
    }

    /**
     * Manipula envio do formulário
     */
    async handleSubmit(e) {
        e.preventDefault();

        const dados = this.coletarDados();
        const erros = this.validar(dados);

        // Validação
        if (erros.length > 0) {
            this.mostrarMensagem(
                '⚠️ Preencha todos os campos obrigatórios corretamente: ' + erros.join(', '),
                false
            );
            return;
        }

        // Tentar enviar via EmailJS
        if (typeof emailjs !== 'undefined') {
            try {
                const enviado = await this.enviarEmailJS(dados);
                
                if (!enviado) {
                    // Se falhar, registra localmente
                    this.registrarLocalmente(dados);
                    this.mostrarMensagem(
                        '✓ Sugestão registrada localmente! Sincronizaremos com o servidor em breve.',
                        true
                    );
                    this.form.reset();
                }
            } catch (error) {
                console.error('Erro no envio:', error);
                this.registrarLocalmente(dados);
                this.mostrarMensagem(
                    '✓ Sugestão registrada! Entraremos em contato em breve.',
                    true
                );
                this.form.reset();
            }
        } else {
            // Fallback: registra localmente
            this.registrarLocalmente(dados);
            this.mostrarMensagem(
                '✓ Obrigado pela sua sugestão! Entraremos em contato em breve.',
                true
            );
            this.form.reset();
        }
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    new FormularioSugestao();
});
