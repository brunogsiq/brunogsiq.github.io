/**
 * Test.Me - Script Principal
 * Funções interativas para o playground de testes
 * Automação, Validações, API e CTFL Quiz
 */

// ========== COMPONENTES BÁSICOS ==========

/**
 * Adiciona elemento dinâmico à página
 */
function adicionarElemento() {
    const novo = document.createElement('p');
    novo.textContent = '✓ Elemento adicionado em ' + new Date().toLocaleTimeString('pt-BR');
    novo.style.margin = '5px 0';
    document.getElementById('elementosDinamicos').appendChild(novo);
}

// ========== INICIALIZAÇÃO - DOMContentLoaded ==========

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ACCORDION - CRITÉRIOS DE ACEITE ==========
    document.querySelectorAll('.acceptance-header').forEach(header => {
        header.addEventListener('click', function() {
            const body = this.nextElementSibling;
            const toggle = this.querySelector('.acceptance-toggle');
            
            // Fechar outros accordions abertos
            document.querySelectorAll('.acceptance-body').forEach(el => {
                if (el !== body) {
                    el.classList.remove('open');
                    el.previousElementSibling.querySelector('.acceptance-toggle').classList.remove('open');
                }
            });
            
            // Toggle do accordion atual
            body.classList.toggle('open');
            toggle.classList.toggle('open');
        });
    });
    
    // ========== BLOCO 1: ENTRADA DE TEXTO COM VALIDAÇÕES ==========
    const bloco1TextComum = document.getElementById('bloco1TextComum');
    const bloco1Numeros = document.getElementById('bloco1Numeros');
    const bloco1Alfabetico = document.getElementById('bloco1Alfabetico');
    const bloco1Especiais = document.getElementById('bloco1Especiais');
    const bloco1Validacao = document.getElementById('bloco1Validacao');
    const bloco1TextComumContador = document.getElementById('bloco1TextComumContador');

    if (bloco1Numeros) {
        bloco1Numeros.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    if (bloco1Alfabetico) {
        bloco1Alfabetico.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-záéíóúâêôãõçA-ZÁÉÍÓÚÂÊÔÃÕÇ ]/g, '');
        });
    }

    if (bloco1Especiais) {
        bloco1Especiais.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+=\-\[\]{};':"\\|,.<>?/ ]/g, '');
        });
    }

    if (bloco1TextComum) {
        bloco1TextComum.addEventListener('input', function() {
            const contador = this.value.length;
            bloco1TextComumContador.textContent = `${contador}/50`;
            bloco1TextComumContador.style.color = contador > 40 ? '#d32f2f' : '#999';
        });
        bloco1TextComum.addEventListener('change', function() {
            bloco1Validacao.textContent = this.value ? '✓ Texto válido' : '';
        });
    }

    // ========== BLOCO 2: CAMPOS ESPECIAIS ==========
    const bloco2OlhoSenha = document.getElementById('bloco2OlhoSenha');
    const bloco2Senha = document.getElementById('bloco2Senha');
    const bloco2SenhaConfirma = document.getElementById('bloco2SenhaConfirma');
    const bloco2SenhaConfirmaMsg = document.getElementById('bloco2SenhaConfirmaMsg');
    const bloco2Data = document.getElementById('bloco2Data');
    const bloco2DataValidacao = document.getElementById('bloco2DataValidacao');
    
    // Validação de força de senha
    function validarForcaSenha(senha) {
        let forca = 0;
        let requisitos = {
            maiuscula: /[A-Z]/.test(senha),
            minuscula: /[a-z]/.test(senha),
            numero: /[0-9]/.test(senha),
            especial: /[!@#$%^&*()_+=\-\[\]{};':"\\|,.<>?/]/.test(senha),
            comprimento: senha.length >= 8
        };

        if (requisitos.maiuscula) forca++;
        if (requisitos.minuscula) forca++;
        if (requisitos.numero) forca++;
        if (requisitos.especial) forca++;
        if (requisitos.comprimento) forca++;

        return { forca, requisitos };
    }

    if (bloco2Senha) {
        bloco2Senha.addEventListener('input', function() {
            const { forca, requisitos } = validarForcaSenha(this.value);
            
            // Atualizar barras de força
            const bar1 = document.getElementById('bloco2ForcaBar1');
            const bar2 = document.getElementById('bloco2ForcaBar2');
            const bar3 = document.getElementById('bloco2ForcaBar3');
            const texto = document.getElementById('bloco2ForcaTexto');
            
            bar1.style.background = forca >= 2 ? '#d32f2f' : '#ddd';
            bar2.style.background = forca >= 3 ? '#d32f2f' : '#ddd';
            bar3.style.background = forca >= 4 ? '#0066cc' : '#ddd';
            
            let forcaTexto = '';
            if (this.value.length === 0) {
                forcaTexto = 'Nenhuma';
            } else if (forca === 1) {
                forcaTexto = '🔴 Muito Fraca';
            } else if (forca === 2) {
                forcaTexto = '🟠 Fraca';
            } else if (forca === 3) {
                forcaTexto = '🟡 Média';
            } else if (forca === 4) {
                forcaTexto = '🟢 Forte';
            } else {
                forcaTexto = '🟢 Muito Forte';
            }
            
            texto.textContent = forcaTexto;
            
            // Atualizar requisitos
            document.getElementById('bloco2Req1').style.color = requisitos.maiuscula ? '#0066cc' : '#999';
            document.getElementById('bloco2Req1').textContent = requisitos.maiuscula ? '✓ Maiúscula (A-Z)' : '✗ Maiúscula (A-Z)';
            
            document.getElementById('bloco2Req2').style.color = requisitos.minuscula ? '#0066cc' : '#999';
            document.getElementById('bloco2Req2').textContent = requisitos.minuscula ? '✓ Minúscula (a-z)' : '✗ Minúscula (a-z)';
            
            document.getElementById('bloco2Req3').style.color = requisitos.numero ? '#0066cc' : '#999';
            document.getElementById('bloco2Req3').textContent = requisitos.numero ? '✓ Número (0-9)' : '✗ Número (0-9)';
            
            document.getElementById('bloco2Req4').style.color = requisitos.especial ? '#0066cc' : '#999';
            document.getElementById('bloco2Req4').textContent = requisitos.especial ? '✓ Especial (!@#$%)' : '✗ Especial (!@#$%)';
            
            document.getElementById('bloco2Req5').style.color = requisitos.comprimento ? '#0066cc' : '#999';
            document.getElementById('bloco2Req5').textContent = requisitos.comprimento ? '✓ Mínimo 8 caracteres' : '✗ Mínimo 8 caracteres';
        });
    }

    if (bloco2SenhaConfirma) {
        bloco2SenhaConfirma.addEventListener('input', function() {
            if (bloco2Senha.value === this.value && this.value.length > 0) {
                bloco2SenhaConfirmaMsg.textContent = '✓ Senhas coincidem';
                bloco2SenhaConfirmaMsg.style.color = '#0066cc';
            } else if (this.value.length > 0) {
                bloco2SenhaConfirmaMsg.textContent = '❌ Senhas não coincidem';
                bloco2SenhaConfirmaMsg.style.color = '#f44336';
            } else {
                bloco2SenhaConfirmaMsg.textContent = '';
            }
        });
    }

    if (bloco2OlhoSenha && bloco2Senha) {
        bloco2OlhoSenha.addEventListener('click', function(e) {
            e.preventDefault();
            const isPassword = bloco2Senha.type === 'password';
            bloco2Senha.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    if (bloco2Data) {
        bloco2Data.addEventListener('change', function() {
            const data = new Date(this.value + 'T00:00:00');
            const dia = data.getDate();
            const mes = data.getMonth() + 1;
            const ano = data.getFullYear();
            let msg = '';

            // Validar dia
            if (dia === 0 || dia > 31) {
                msg = '❌ Dia inválido (deve ser 1-31)';
                bloco2DataValidacao.style.color = '#f44336';
            }
            // Validar mês
            else if (mes < 1 || mes > 12) {
                msg = '❌ Mês inválido (deve ser 1-12)';
                bloco2DataValidacao.style.color = '#f44336';
            }
            // Validar data futura
            else if (data > new Date()) {
                msg = '⚠️ Alerta: Data futura detectada';
                bloco2DataValidacao.style.color = '#d32f2f';
            }
            // Validar data anterior a 1925
            else if (ano < 1925) {
                msg = '⚠️ Alerta: Data anterior a 1925';
                bloco2DataValidacao.style.color = '#d32f2f';
            }
            // Data válida
            else {
                msg = `✓ Data válida: ${dia}/${mes}/${ano}`;
                bloco2DataValidacao.style.color = '#0066cc';
            }

            bloco2DataValidacao.textContent = msg;
        });
    }

    // ========== BLOCO 3: RADIO BUTTONS COM VALIDAÇÃO ==========
    const bloco3Validar = document.getElementById('bloco3Validar');
    const bloco3Validacao = document.getElementById('bloco3Validacao');

    if (bloco3Validar) {
        bloco3Validar.addEventListener('click', function() {
            const radiobotoes = document.querySelectorAll('input[name="bloco3Notificacoes"]');
            const selecionado = Array.from(radiobotoes).find(r => r.checked);

            if (!selecionado) {
                bloco3Validacao.textContent = '❌ Selecione uma opção de notificação antes de validar';
                bloco3Validacao.style.color = '#f44336';
            } else {
                const opcoes = {
                    'email': '📧 Email selecionado',
                    'sms': '📱 SMS selecionado',
                    'push': '🔔 Push selecionado'
                };
                bloco3Validacao.textContent = `✓ ${opcoes[selecionado.value] || 'Opção válida'}`;
                bloco3Validacao.style.color = '#0066cc';
            }
        });
    }

    // ========== BLOCO 5: SELETORES COM VALIDAÇÃO ==========
    const bloco5Select = document.getElementById('bloco5Select');
    const bloco5Btn = document.getElementById('bloco5Btn');
    const bloco5Resultado = document.getElementById('bloco5Resultado');

    if (bloco5Btn) {
        bloco5Btn.addEventListener('click', function() {
            if (!bloco5Select || bloco5Select.value === '') {
                bloco5Resultado.textContent = '❌ Selecione uma opção';
                bloco5Resultado.style.color = '#f44336';
            } else {
                bloco5Resultado.textContent = `✓ Selecionado: ${bloco5Select.options[bloco5Select.selectedIndex].text}`;
                bloco5Resultado.style.color = '#0066cc';
            }
        });
    }

    // ========== BLOCO 6: CHECKBOXES COM MENSAGEM ==========
    const bloco6Checks = document.querySelectorAll('.bloco6Check');
    const bloco6Resultado = document.getElementById('bloco6Resultado');

    if (bloco6Checks.length > 0) {
        bloco6Checks.forEach(check => {
            check.addEventListener('change', function() {
                const selecionados = Array.from(bloco6Checks)
                    .filter(c => c.checked)
                    .map(c => c.nextElementSibling.textContent)
                    .join(', ');
                
                const naoSelecionados = Array.from(bloco6Checks)
                    .filter(c => !c.checked)
                    .map(c => c.nextElementSibling.textContent)
                    .join(', ');

                let msg = '';
                if (selecionados) msg += `✓ Selecionados: ${selecionados}. `;
                if (naoSelecionados) msg += `○ Não selecionados: ${naoSelecionados}`;

                bloco6Resultado.textContent = msg;
                bloco6Resultado.style.color = '#ffd700';
            });
        });
    }

    // ========== BLOCO 7: RADIO BUTTONS COM MENSAGEM ==========
    const bloco7Radios = document.querySelectorAll('input[name="bloco7Genero"]');
    const bloco7Resultado = document.getElementById('bloco7Resultado');

    if (bloco7Radios.length > 0) {
        bloco7Radios.forEach(radio => {
            radio.addEventListener('change', function() {
                bloco7Resultado.textContent = `✓ Selecionado: ${this.value}`;
                bloco7Resultado.style.color = '#0066cc';
            });
        });
    }

    // ========== BLOCO 13: BOTÃO DE COPIAR ==========
    const bloco13Copiar = document.getElementById('bloco13Copiar');
    const bloco13CopiarMsg = document.getElementById('bloco13CopiarMsg');

    if (bloco13Copiar) {
        bloco13Copiar.addEventListener('click', function() {
            const dados = 'Usuário Teste\nID: #12345\nStatus: Ativo\nÚltimo: Hoje';
            navigator.clipboard.writeText(dados).then(() => {
                bloco13CopiarMsg.textContent = '✓ Dados copiados!';
                bloco13CopiarMsg.style.color = '#0066cc';
                setTimeout(() => {
                    bloco13CopiarMsg.textContent = '';
                }, 3000);
            }).catch(() => {
                bloco13CopiarMsg.textContent = '❌ Erro ao copiar';
                bloco13CopiarMsg.style.color = '#f44336';
            });
        });
    }

    // ========== BLOCO 16: UPLOAD COM VALIDAÇÃO ==========
    const bloco16Upload = document.getElementById('bloco16Upload');
    const bloco16Enviar = document.getElementById('bloco16Enviar');
    const bloco16Resultado = document.getElementById('bloco16Resultado');
    const extensoesPermitidas = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx'];
    const tamanhoMaximoMB = 5;

    if (bloco16Enviar) {
        bloco16Enviar.addEventListener('click', function() {
            if (!bloco16Upload || !bloco16Upload.files.length) {
                bloco16Resultado.textContent = '❌ Selecione um arquivo antes de enviar';
                bloco16Resultado.style.color = '#f44336';
            } else {
                const arquivo = bloco16Upload.files[0];
                const extensao = arquivo.name.split('.').pop().toLowerCase();
                const tamMB = (arquivo.size / (1024 * 1024)).toFixed(2);
                
                // Validar extensão
                if (!extensoesPermitidas.includes(extensao)) {
                    bloco16Resultado.textContent = `❌ Extensão não permitida. Aceitos: ${extensoesPermitidas.join(', ').toUpperCase()}`;
                    bloco16Resultado.style.color = '#f44336';
                }
                // Validar tamanho
                else if (tamMB > tamanhoMaximoMB) {
                    bloco16Resultado.textContent = `❌ Arquivo muito grande (${tamMB}MB). Máximo permitido: ${tamanhoMaximoMB}MB`;
                    bloco16Resultado.style.color = '#f44336';
                }
                // Arquivo válido
                else {
                    bloco16Resultado.textContent = `✓ Arquivo válido: ${arquivo.name} (${tamMB}MB)`;
                    bloco16Resultado.style.color = '#0066cc';
                }
            }
        });
    }

    // ========== BLOCO 18: VALIDAÇÃO DE CÓDIGO ==========
    const bloco18Validar = document.getElementById('bloco18Validar');
    const bloco18Input = document.getElementById('bloco18Input');
    const bloco18Resultado = document.getElementById('bloco18Resultado');
    const bloco18Codigo = document.getElementById('bloco18Codigo');

    if (bloco18Validar) {
        bloco18Validar.addEventListener('click', function() {
            const codigoEsperado = bloco18Codigo.textContent.trim();
            const codigoDigitado = bloco18Input.value.trim();

            if (codigoDigitado === codigoEsperado) {
                bloco18Resultado.textContent = '✓ CORRETO! Código válido!';
                bloco18Resultado.style.color = '#0066cc';
                bloco18Input.style.borderColor = '#0066cc';
            } else {
                bloco18Resultado.textContent = '❌ INCORRETO! Tente novamente.';
                bloco18Resultado.style.color = '#f44336';
                bloco18Input.style.borderColor = '#f44336';
            }
        });
    }
    
    // ========== SLIDER BLOCO 3 ==========
    const slider = document.getElementById('sliderNivel');
    const valorNivel = document.getElementById('valorNivel');
    if (slider && valorNivel) {
        function atualizarSliderCategoria(valor) {
            const bar1 = document.getElementById('sliderBar1');
            const bar2 = document.getElementById('sliderBar2');
            const bar3 = document.getElementById('sliderBar3');
            let categoria = '';
            
            // Limpar barras
            bar1.style.background = '#ddd';
            bar2.style.background = '#ddd';
            bar3.style.background = '#ddd';
            
            // Definir cores por faixa
            if (valor <= 3) {
                categoria = '🔴 Baixo';
                bar1.style.background = '#f44336';
            } else if (valor <= 6) {
                categoria = '🟡 Médio';
                bar1.style.background = '#d32f2f';
                bar2.style.background = '#d32f2f';
            } else {
                categoria = '🟢 Alto';
                bar1.style.background = '#0066cc';
                bar2.style.background = '#0066cc';
                bar3.style.background = '#0066cc';
            }
            
            valorNivel.textContent = `Valor: ${valor} ${categoria}`;
        }
        
        slider.addEventListener('input', function() {
            atualizarSliderCategoria(this.value);
        });
        
        // Inicializar
        atualizarSliderCategoria(slider.value);
    }

    // ========== SELETOR DE CORES ==========
    // Bloco 8: color selector logic
    const bloco8Input = document.getElementById('bloco8Input');
    const bloco8Preview = document.getElementById('bloco8Preview');
    if (bloco8Input && bloco8Preview) {
        bloco8Input.addEventListener('change', function() {
            bloco8Preview.style.background = this.value || '#fff';
        });
    }

    // ========== DATA CONGELADA ==========
    const dataAtual = document.getElementById('dataAtual');
    if (dataAtual) {
        const agora = new Date();
        dataAtual.textContent = agora.toLocaleString('pt-BR');
    }

    // ========== BLOCO 11: TABELA COM BUSCA E FILTRO ==========
    const tabelaBusca = document.getElementById('tabelaBusca');
    const tabelaBuscaNome = document.getElementById('tabelaBuscaNome');
    const tabelaBuscaEmail = document.getElementById('tabelaBuscaEmail');
    const tabelaBuscaLimpar = document.getElementById('tabelaBuscaLimpar');
    const tabelaDados = document.getElementById('tabelaDados');
    const tabelaTotalRegistros = document.getElementById('tabelaTotalRegistros');
    const tabelaTotalExibidos = document.getElementById('tabelaTotalExibidos');

    if (tabelaBusca && tabelaDados) {
        // Guardar dados originais
        const linhasOriginais = Array.from(tabelaDados.querySelectorAll('tbody tr'));
        const totalRegistros = linhasOriginais.length;
        
        function atualizarTabela(linhas) {
            const tbody = tabelaDados.querySelector('tbody');
            tbody.innerHTML = '';
            linhas.forEach(linha => {
                tbody.appendChild(linha.cloneNode(true));
            });
            tabelaTotalExibidos.textContent = linhas.length;
        }

        // Buscar por nome ou email
        tabelaBusca.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            const linhasFiltradas = linhasOriginais.filter(linha => {
                const nome = linha.cells[0].textContent.toLowerCase();
                const email = linha.cells[1].textContent.toLowerCase();
                return nome.includes(termo) || email.includes(termo);
            });
            atualizarTabela(linhasFiltradas);
        });

        // Ordenar por nome
        tabelaBuscaNome.addEventListener('click', function() {
            const linhasOrdenadas = [...linhasOriginais].sort((a, b) => {
                return a.cells[0].textContent.localeCompare(b.cells[0].textContent);
            });
            atualizarTabela(linhasOrdenadas);
            tabelaBusca.value = '';
        });

        // Ordenar por email
        tabelaBuscaEmail.addEventListener('click', function() {
            const linhasOrdenadas = [...linhasOriginais].sort((a, b) => {
                return a.cells[1].textContent.localeCompare(b.cells[1].textContent);
            });
            atualizarTabela(linhasOrdenadas);
            tabelaBusca.value = '';
        });

        // Limpar busca
        tabelaBuscaLimpar.addEventListener('click', function() {
            tabelaBusca.value = '';
            atualizarTabela(linhasOriginais);
        });
    }

    // ========== BOTÕES DE ALERTA ==========
    const btnAlert1 = document.querySelector('.btn-alert-1');
    const btnAlert2 = document.querySelector('.btn-alert-2');
    const btnAlert3 = document.querySelector('.btn-alert-3');
    const btnAddElemento = document.querySelector('.btn-add-elemento');
    
    if (btnAlert1) {
        btnAlert1.addEventListener('click', function() {
            alert('Alerta simples!');
        });
    }
    
    if (btnAlert2) {
        btnAlert2.addEventListener('click', function() {
            confirm('Você confirma?');
        });
    }
    
    if (btnAlert3) {
        btnAlert3.addEventListener('click', function() {
            prompt('Digite algo:');
        });
    }
    
    if (btnAddElemento) {
        btnAddElemento.addEventListener('click', adicionarElemento);
    }

    // ========== BOTÕES DE AÇÃO ==========
    const btnAcao = document.getElementById('btnAcao');
    const btnPerigoso = document.getElementById('btnPerigoso');
    
    if (btnAcao) {
        btnAcao.addEventListener('click', function() {
            alert('✓ Ação executada com sucesso!');
        });
    }
    
    if (btnPerigoso) {
        btnPerigoso.addEventListener('click', function() {
            if (confirm('⚠️ Esta ação é perigosa! Deseja continuar?')) {
                alert('✗ Operação cancelada com sucesso!');
            }
        });
    }

    // ========== QUIZ BUTTONS ==========
    const verificarBtn = document.getElementById('verificarBtn');
    const proximaBtn = document.getElementById('proximaBtn');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    const validarIntervaloBtn = document.getElementById('validarIntervaloBtn');
    
    if (verificarBtn) {
        verificarBtn.addEventListener('click', verificarResposta);
    }
    
    if (proximaBtn) {
        proximaBtn.addEventListener('click', proximaPergunta);
    }
    
    if (reiniciarBtn) {
        reiniciarBtn.addEventListener('click', resetarQuiz);
    }
    
    if (validarIntervaloBtn) {
        validarIntervaloBtn.addEventListener('click', validarIntervaloData);
    }

    // ========== API REQUEST BUTTONS ==========
    const apiGetBtn = document.getElementById('apiGetBtn');
    const apiPostBtn = document.getElementById('apiPostBtn');
    const apiPutBtn = document.getElementById('apiPutBtn');
    const apiDeleteBtn = document.getElementById('apiDeleteBtn');
    
    if (apiGetBtn) {
        apiGetBtn.addEventListener('click', () => enviarRequisicao('GET', 'https://jsonplaceholder.typicode.com/posts/1'));
    }
    
    if (apiPostBtn) {
        apiPostBtn.addEventListener('click', () => enviarRequisicao('POST', 'https://jsonplaceholder.typicode.com/posts'));
    }
    
    if (apiPutBtn) {
        apiPutBtn.addEventListener('click', () => enviarRequisicao('PUT', 'https://jsonplaceholder.typicode.com/posts/1'));
    }
    
    if (apiDeleteBtn) {
        apiDeleteBtn.addEventListener('click', () => enviarRequisicao('DELETE', 'https://jsonplaceholder.typicode.com/posts/1'));
    }

    // ========== BLOCO 28: DOWNLOAD SYLLABUS 4.0 ==========
    const downloadSyllabusBtn = document.getElementById('downloadSyllabusBtn');
    const downloadSyllabusMessage = document.getElementById('downloadSyllabusMessage');

    if (downloadSyllabusBtn) {
        downloadSyllabusBtn.addEventListener('click', function() {
            // Caminho do arquivo PDF no servidor
            const syllabusPath = '../../archive/Syllabus_CFTL_4.pdf';
            
            // Criar um elemento <a> temporário para fazer o download
            const link = document.createElement('a');
            link.href = syllabusPath;
            link.download = 'Syllabus_4.0_Portugues.pdf';
            
            // Verificar se o arquivo existe antes de fazer o download
            fetch(syllabusPath, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        // Arquivo existe, fazer o download
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        // Mostrar mensagem de sucesso
                        if (downloadSyllabusMessage) {
                            downloadSyllabusMessage.innerHTML = '<p style="color: #0066cc; margin-top: 10px;"><strong>✅ Download iniciado!</strong> Syllabus 4.0 em Português</p>';
                            setTimeout(() => {
                                downloadSyllabusMessage.innerHTML = '';
                            }, 5000);
                        }
                    } else {
                        throw new Error('Arquivo não encontrado');
                    }
                })
                .catch(erro => {
                    // Mostrar mensagem de erro
                    if (downloadSyllabusMessage) {
                        downloadSyllabusMessage.innerHTML = '<p style="color: #f44336; margin-top: 10px;"><strong>❌ Erro ao baixar o arquivo</strong><br/>O arquivo Syllabus 4.0 não está disponível neste momento.</p>';
                        setTimeout(() => {
                            downloadSyllabusMessage.innerHTML = '';
                        }, 5000);
                    }
                    console.error('Erro ao verificar arquivo Syllabus:', erro);
                });
        });
    }

    // ========== BOTÃO DE TOPO ==========
    const botaoTopo = document.getElementById('botaoTopo');
    if (botaoTopo) {
        botaoTopo.addEventListener('click', voltarAoTopo);
    }

    // ========== BOTÃO DE BASE ==========
    const botaoBase = document.getElementById('botaoBase');
    if (botaoBase) {
        botaoBase.addEventListener('click', voltarABase);
    }

    // ========== CTFL QUIZ - Carregar primeira pergunta ==========
    if (document.getElementById('pergunta')) {
        // quizManager é criado sincronamente em questions.js, então pode ser inicializado imediatamente
        sortearPergunta();
    }

    // ========== FORMULÁRIO DE FEEDBACK ==========
    const contactFormTestMe = document.getElementById('contactFormTestMe');
    if (contactFormTestMe) {
        contactFormTestMe.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta dados do formulário
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const suggestion = formData.get('suggestion');
            const linkedin = formData.get('linkedin');
            const instagram = formData.get('instagram');
            const screenshot = formData.get('screenshot');
            const consent = formData.get('consent');
            
            // Validações
            if (!name || !email || !suggestion) {
                mostrarMensagemFeedback('Por favor, preencha os campos obrigatórios (*)', false);
                return;
            }
            
            if (!consent) {
                mostrarMensagemFeedback('Você precisa concordar com os termos para enviar sua sugestão.', false);
                return;
            }
            
            // Preparar dados para envio
            const templateParams = {
                from_name: name,
                from_email: email,
                from_linkedin: linkedin || 'Não informado',
                from_instagram: instagram || 'Não informado',
                suggestion: suggestion,
                screenshot_name: screenshot ? screenshot.name : 'Sem captura'
            };
            
            // Enviar via EmailJS (se configurado)
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_testme', 'template_testme', templateParams)
                    .then(function(response) {
                        mostrarMensagemFeedback('✓ Sugestão enviada com sucesso! Obrigado por sua contribuição!', true);
                        contactFormTestMe.reset();
                    }, function(error) {
                        mostrarMensagemFeedback('Sua sugestão foi registrada localmente. Erro ao enviar por email, mas continuaremos com o processo!', true);
                        contactFormTestMe.reset();
                    });
            } else {
                // Fallback se EmailJS não estiver disponível
                mostrarMensagemFeedback('✓ Obrigado pela sua sugestão! Entraremos em contato em breve.', true);
                contactFormTestMe.reset();
            }
        });
    }

});

// ========== BLOCO 27: CTFL QUIZ COM ISTQB SYLLABUS 4.0 ==========

// Variável para armazenar o estado atual do quiz
let estadoQuiz = {
    perguntaCarregada: false,
    indiceRespostaCorretaEmbaralhada: null,
    perguntaEmbaralhada: null
};

/**
 * Carrega e exibe a pergunta atual do quiz
 */
function sortearPergunta() {
    if (!quizManager.carregado) {
        console.warn('Quiz não foi carregado ainda');
        return;
    }

    const pergunta = quizManager.obterPerguntaAtual();
    if (!pergunta) {
        finalizarQuiz();
        return;
    }

    // Embaralha as respostas
    const resultado = quizManager.embaralharRespostas(pergunta);
    estadoQuiz.perguntaEmbaralhada = resultado.respostasEmbaralhadas;
    estadoQuiz.indiceRespostaCorretaEmbaralhada = resultado.indiceRespostaCorreta;
    estadoQuiz.perguntaCarregada = true;

    // Exibe a pergunta
    document.getElementById('pergunta').textContent = pergunta.pergunta;
    
    // Exibe as respostas embaralhadas
    for (let i = 0; i < resultado.respostasEmbaralhadas.length; i++) {
        const respostaElement = document.getElementById('resposta' + i);
        if (respostaElement) {
            respostaElement.textContent = resultado.respostasEmbaralhadas[i];
        }
    }

    // Limpa a mensagem anterior
    const quizMensagem = document.getElementById('quizMensagem');
    if (quizMensagem) {
        quizMensagem.textContent = '';
        quizMensagem.style.color = '';
    }

    // Reseta o formulário
    document.getElementById('formRespostas').reset();

    // Atualiza a posição do quiz
    const posicao = quizManager.obterPosicaoAtual();
    console.log(`Pergunta ${posicao} carregada`);
}

/**
 * Verifica se a resposta selecionada está correta
 */
function verificarResposta() {
    if (!estadoQuiz.perguntaCarregada) {
        alert('Nenhuma pergunta carregada. Clique em "Próxima" para começar.');
        return;
    }

    const selecionada = document.querySelector('input[name="resposta"]:checked');
    if (!selecionada) {
        alert('Selecione uma resposta!');
        return;
    }

    const indiceRespostaUsuario = parseInt(selecionada.value);
    const acertou = quizManager.validarResposta(indiceRespostaUsuario, estadoQuiz.indiceRespostaCorretaEmbaralhada);

    const quizMensagem = document.getElementById('quizMensagem');
    const pontuacao = quizManager.obterPontuacao();

    if (acertou) {
        if (quizMensagem) {
            quizMensagem.textContent = '✓ Resposta Correta!';
            quizMensagem.style.color = '#0066cc';
        }
    } else {
        if (quizMensagem) {
            quizMensagem.textContent = `✗ Resposta Incorreta! A resposta correta é: "${estadoQuiz.perguntaEmbaralhada[estadoQuiz.indiceRespostaCorretaEmbaralhada]}"`;
            quizMensagem.style.color = '#f44336';
        }
    }

    // Atualiza a exibição da pontuação
    const quizPontuacaoDisplay = document.getElementById('quizPontuacao');
    if (quizPontuacaoDisplay) {
        quizPontuacaoDisplay.textContent = `${pontuacao.acertos}/${pontuacao.total}`;
    }

    // Desabilita a resposta após verificação
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.disabled = true;
    });
}

/**
 * Avança para a próxima pergunta
 */
function proximaPergunta() {
    if (!quizManager.carregado) {
        console.warn('Quiz não foi carregado ainda');
        return;
    }

    // Habilita as respostas novamente
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.disabled = false;
    });

    if (!quizManager.temMaisPerguntas()) {
        finalizarQuiz();
        return;
    }

    quizManager.proximaPergunta();
    sortearPergunta();
}

/**
 * Finaliza o quiz e exibe resumo
 */
function finalizarQuiz() {
    const quizMensagem = document.getElementById('quizMensagem');
    const pontuacao = quizManager.obterPontuacao();

    const mensagem = `🎉 Quiz Finalizado!<br/>
        <strong>Pontuação Final: ${pontuacao.acertos}/${pontuacao.total} (${pontuacao.percentual}%)</strong><br/>
        <small>Clique em "Reiniciar" para tentar novamente com novas perguntas embaralhadas</small>`;

    if (quizMensagem) {
        quizMensagem.innerHTML = mensagem;
        quizMensagem.style.color = pontuacao.percentual >= 70 ? '#0066cc' : '#d32f2f';
    }

    document.getElementById('pergunta').textContent = 'Quiz Finalizado!';
    document.getElementById('formRespostas').reset();
    
    // Limpa as opções
    for (let i = 0; i < 4; i++) {
        const respostaElement = document.getElementById('resposta' + i);
        if (respostaElement) {
            respostaElement.textContent = '';
        }
    }

    estadoQuiz.perguntaCarregada = false;

    // Log do desempenho
    console.log('Resumo do Desempenho:', quizManager.obterResumoDesempenho());
}

/**
 * Reseta o quiz e a pontuação
 */
function resetarQuiz() {
    quizManager.reiniciar();
    
    const quizPontuacaoDisplay = document.getElementById('quizPontuacao');
    if (quizPontuacaoDisplay) {
        const totalPerguntas = quizManager.perguntasEmbaralhadas.length;
        quizPontuacaoDisplay.textContent = `0/${totalPerguntas}`;
    }

    const quizMensagem = document.getElementById('quizMensagem');
    if (quizMensagem) {
        quizMensagem.textContent = '';
        quizMensagem.style.color = '';
    }

    document.getElementById('formRespostas').reset();
    
    // Habilita as respostas
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.disabled = false;
    });

    sortearPergunta();
}

// ========== FORMULÁRIO DE FEEDBACK ==========

/**
 * Exibe mensagem de feedback
 * @param {string} mensagem - Texto da mensagem
 * @param {boolean} sucesso - true para sucesso, false para erro
 */
function mostrarMensagemFeedback(mensagem, sucesso) {
    const formMessage = document.getElementById('formMessageTestMe');
    
    if (!formMessage) return;

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

    // Limpa e adiciona novo conteúdo
    formMessage.innerHTML = '';
    formMessage.textContent = mensagem;
    formMessage.appendChild(closeBtn);

    // Estilização
    formMessage.style.display = 'block';
    formMessage.style.color = 'white';
    formMessage.style.background = sucesso ? '#0066cc' : '#f44336';
    formMessage.style.border = sucesso ? '1px solid #2e7d32' : '1px solid #c62828';
    formMessage.style.padding = '10px';
    formMessage.style.borderRadius = '5px';

    // Esconde após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== ZION - LABORATÓRIO AVANÇADO - COMPONENTES INTERATIVOS =====

/**
 * Inicializa todos os componentes de Zion - Laboratório Avançado
 */
function inicializarZionComponents() {
    // 1. Assinatura com Preview
    const zionSignature = document.getElementById('zionSignature');
    const signaturePreview = document.getElementById('signaturePreview');
    const zionSignatureContador = document.getElementById('zionSignatureContador');
    if (zionSignature && signaturePreview) {
        zionSignature.addEventListener('input', function() {
            signaturePreview.textContent = this.value || '-';
            if (zionSignatureContador) {
                const contador = this.value.length;
                zionSignatureContador.textContent = `${contador}/50`;
                zionSignatureContador.style.color = contador > 40 ? '#d32f2f' : '#999';
            }
        });
    }

    // 2. Checkbox com Toggle de Preview
    const zionShowSignature = document.getElementById('zionShowSignature');
    const signaturePreviewContainer = document.getElementById('signaturePreviewContainer');
    const signaturePreviewFinal = document.getElementById('signaturePreviewFinal');
    if (zionShowSignature && signaturePreviewContainer) {
        zionShowSignature.addEventListener('change', function() {
            if (this.checked) {
                signaturePreviewContainer.style.display = 'block';
                signaturePreviewFinal.textContent = zionSignature.value || '-';
            } else {
                signaturePreviewContainer.style.display = 'none';
            }
        });
    }

    // 3. Radio Buttons On/Off
    const radios = document.querySelectorAll('input[name="status"]');
    const statusResult = document.getElementById('statusResult');
    if (radios.length > 0 && statusResult) {
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                statusResult.textContent = this.value.toUpperCase();
            });
        });
    }

    // 4. Select Simples - Tipo
    const zionSelectType = document.getElementById('zionSelectType');
    const typeResult = document.getElementById('typeResult');
    if (zionSelectType && typeResult) {
        zionSelectType.addEventListener('change', function() {
            const tipoPT = {
                'basic': 'Básico',
                'standard': 'Padrão',
                'premium': 'Premium'
            };
            typeResult.textContent = this.value ? tipoPT[this.value] : 'Nenhum tipo selecionado';
        });
    }

    // 5. Select Múltiplo - Frutas
    const zionSelectFruits = document.getElementById('zionSelectFruits');
    const fruitsResult = document.getElementById('fruitsResult');
    if (zionSelectFruits && fruitsResult) {
        zionSelectFruits.addEventListener('change', function() {
            const selectedOptions = Array.from(this.selectedOptions);
            const frutas = {
                'apple': 'Maçã',
                'banana': 'Banana',
                'cherry': 'Cereja',
                'date': 'Tâmara',
                'elderberry': 'Sabugueiro'
            };
            
            if (selectedOptions.length > 0) {
                fruitsResult.textContent = selectedOptions
                    .map(opt => frutas[opt.value])
                    .join(', ');
            } else {
                fruitsResult.textContent = 'Nenhuma fruta selecionada';
            }
        });
    }

    // 6. Upload de Arquivo
    const zionFileInput = document.getElementById('zionFileInput');
    const fileResult = document.getElementById('fileResult');
    if (zionFileInput && fileResult) {
        const extensoesZion = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx'];
        const tamanhoMaxZion = 5;
        
        zionFileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const arquivo = this.files[0];
                const tamanhoMB = (arquivo.size / (1024 * 1024)).toFixed(2);
                const extensao = arquivo.name.split('.').pop().toLowerCase();
                
                // Validar extensão
                if (!extensoesZion.includes(extensao)) {
                    fileResult.textContent = `❌ Extensão não permitida. Aceitos: ${extensoesZion.join(', ').toUpperCase()}`;
                    fileResult.style.color = '#f44336';
                }
                // Validar tamanho
                else if (tamanhoMB > tamanhoMaxZion) {
                    fileResult.textContent = `❌ Arquivo muito grande (${tamanhoMB}MB). Máximo: ${tamanhoMaxZion}MB`;
                    fileResult.style.color = '#f44336';
                }
                // Arquivo válido
                else {
                    fileResult.textContent = `✓ ${arquivo.name} (${tamanhoMB}MB)`;
                    fileResult.style.color = '#0066cc';
                }
            } else {
                fileResult.textContent = 'Nenhum arquivo escolhido';
                fileResult.style.color = '#ffd700';
            }
        });
    }

    // Suportar Drag & Drop para Zion File Input
    if (zionFileInput) {
        zionFileInput.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.background = 'rgba(0, 102, 204, 0.2)';
        });
        
        zionFileInput.addEventListener('dragleave', function() {
            this.style.background = '';
        });
        
        zionFileInput.addEventListener('drop', function(e) {
            e.preventDefault();
            this.files = e.dataTransfer.files;
            this.style.background = '';
            // Disparar evento de change
            const evento = new Event('change', { bubbles: true });
            this.dispatchEvent(evento);
        });
    }

    // 7. Range Slider - Nível
    const zionRange = document.getElementById('zionRange');
    const rangeResult = document.getElementById('rangeResult');
    if (zionRange && rangeResult) {
        function atualizarZionRangeCategoria(valor) {
            const bar1 = document.getElementById('zionRangeBar1');
            const bar2 = document.getElementById('zionRangeBar2');
            const bar3 = document.getElementById('zionRangeBar3');
            const categoria = document.getElementById('zionRangeCategoria');
            
            // Limpar barras
            bar1.style.background = '#ddd';
            bar2.style.background = '#ddd';
            bar3.style.background = '#ddd';
            
            let cat = '';
            if (valor <= 3) {
                cat = '🔴 Baixo';
                bar1.style.background = '#f44336';
            } else if (valor <= 6) {
                cat = '🟡 Médio';
                bar1.style.background = '#d32f2f';
                bar2.style.background = '#d32f2f';
            } else {
                cat = '🟢 Alto';
                bar1.style.background = '#0066cc';
                bar2.style.background = '#0066cc';
                bar3.style.background = '#0066cc';
            }
            
            rangeResult.textContent = valor;
            categoria.textContent = cat;
        }
        
        zionRange.addEventListener('input', function() {
            atualizarZionRangeCategoria(this.value);
        });
        
        // Inicializar
        atualizarZionRangeCategoria(zionRange.value);
    }

    // 8. Date Picker - Seletor de Data
    const zionDate = document.getElementById('zionDate');
    const dateResult = document.getElementById('dateResult');
    if (zionDate && dateResult) {
        zionDate.addEventListener('change', function() {
            if (this.value) {
                const data = new Date(this.value + 'T00:00:00');
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                dateResult.textContent = `${dia}/${mes}/${ano}`;
            } else {
                dateResult.textContent = 'dd/mm/aaaa';
            }
        });
    }

    // 9. Password com Toggle Show/Hide
    const zionPassword = document.getElementById('zionPassword');
    const zionShowPassword = document.getElementById('zionShowPassword');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    if (zionShowPassword && zionPassword) {
        zionShowPassword.addEventListener('change', function() {
            zionPassword.type = this.checked ? 'text' : 'password';
            if (togglePasswordBtn) {
                togglePasswordBtn.textContent = this.checked ? '🙈 Ocultar' : '👁️ Mostrar';
            }
        });
    }
    if (togglePasswordBtn && zionPassword) {
        togglePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isPassword = zionPassword.type === 'password';
            zionPassword.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '🙈 Ocultar' : '👁️ Mostrar';
            if (zionShowPassword) {
                zionShowPassword.checked = isPassword;
            }
        });
    }

    // 10. Código Dinâmico para Copiar
    const dynamicCode = document.getElementById('dynamicCode');
    const zionCodeInput = document.getElementById('zionCodeInput');
    const submitCodeBtn = document.getElementById('submitCodeBtn');
    const codeResult = document.getElementById('codeResult');
    
    if (dynamicCode) {
        const codigoGerado = Date.now().toString();
        dynamicCode.textContent = codigoGerado;
        
        if (submitCodeBtn) {
            submitCodeBtn.addEventListener('click', function() {
                const codigoDigitado = zionCodeInput.value.trim();
                
                if (codigoDigitado === codigoGerado) {
                    codeResult.textContent = '✓ Código correto! Sucesso!';
                    codeResult.className = 'code-result success';
                    zionCodeInput.value = '';
                    // Gera novo código
                    const novoCodigoGerado = Date.now().toString();
                    dynamicCode.textContent = novoCodigoGerado;
                } else {
                    codeResult.textContent = '✗ Código incorreto. Tente novamente.';
                    codeResult.className = 'code-result error';
                }
                
                setTimeout(() => {
                    codeResult.textContent = '';
                    codeResult.className = 'code-result';
                }, 3000);
            });
        }
    }

    // 11. Botão com Requisição GET TODO
    const getTodoBtn = document.getElementById('getTodoBtn');
    const todoLoadingSpinner = document.getElementById('todoLoadingSpinner');
    const todoResultContainer = document.getElementById('todoResultContainer');
    const todoContent = document.getElementById('todoContent');
    const todoErrorContainer = document.getElementById('todoErrorContainer');
    const todoError = document.getElementById('todoError');
    
    if (getTodoBtn) {
        getTodoBtn.addEventListener('click', function() {
            // Reset
            todoResultContainer.style.display = 'none';
            todoErrorContainer.style.display = 'none';
            todoLoadingSpinner.style.display = 'block';
            
            // Requisição
            fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => {
                    if (!response.ok) throw new Error('Erro na requisição');
                    return response.json();
                })
                .then(data => {
                    todoLoadingSpinner.style.display = 'none';
                    todoResultContainer.style.display = 'block';
                    todoContent.innerHTML = `
                        <strong>ID:</strong> ${data.id}<br>
                        <strong>Título:</strong> ${data.title}<br>
                        <strong>Completado:</strong> ${data.completed ? 'Sim ✓' : 'Não ✗'}
                    `;
                })
                .catch(error => {
                    todoLoadingSpinner.style.display = 'none';
                    todoErrorContainer.style.display = 'block';
                    todoError.textContent = `Oops! Erro: ${error.message}`;
                });
        });
    }

    // 12. Lista com Contagem de Elementos (já feito no HTML, só contar)
    const animalsList = document.getElementById('animalsList');
    const animalCount = document.getElementById('animalCount');
    if (animalsList && animalCount) {
        const count = animalsList.querySelectorAll('li').length;
        animalCount.textContent = count;
    }

    // 13. Download de Arquivo - Zion
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const conteudo = 'Foi um prazer colaborar com sua evolução nos testes, sejam eles manuais ou automatizados.\n\nEspero estar contribuindo com sua melhoria.\n\nData e hora: ' + new Date().toLocaleString('pt-BR') + '\n\nAtenciosamente,\n\nQAtrix Tecnologia & Bruno Siqueira';
            const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'exemplo.txt';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
    
    // 14. Download de Arquivo - Base
    const downloadBaseBtn = document.getElementById('downloadBaseBtn');
    if (downloadBaseBtn) {
        downloadBaseBtn.addEventListener('click', function() {
            const conteudo = 'Relatório Base - Test.Me\n' +
                '========================\n\n' +
                'Data: ' + new Date().toLocaleDateString('pt-BR') + '\n' +
                'Hora: ' + new Date().toLocaleTimeString('pt-BR') + '\n\n' +
                'Status: ✓ Análise Concluída\n' +
                'Blocos Base Testados: 18\n' +
                'Validações: 5/5\n' +
                'Resultado: APROVADO\n\n' +
                'Desenvolvido por: Bruno Siqueira\n' +
                'QAtrix Tecnologia';
            const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'relatorio-base.txt';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
}

// ========== BLOCO 26: DATA PICKER COM INTERVALO ==========

/**
 * Valida intervalo de datas
 */
function validarIntervaloData() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const resultadoDiv = document.getElementById('resultadoIntervalo');
    
    if (!dataInicial || !dataFinal) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.style.background = 'rgba(244, 67, 54, 0.1)';
        resultadoDiv.textContent = '❌ Por favor, preencha ambas as datas.';
        resultadoDiv.style.color = '#f44336';
        return;
    }
    
    const dataInicialObj = new Date(dataInicial);
    const dataFinalObj = new Date(dataFinal);
    
    if (dataFinalObj < dataInicialObj) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.style.background = 'rgba(244, 67, 54, 0.1)';
        resultadoDiv.textContent = '❌ A data final deve ser posterior à data inicial.';
        resultadoDiv.style.color = '#f44336';
        return;
    }
    
    const diferenca = Math.floor((dataFinalObj - dataInicialObj) / (1000 * 60 * 60 * 24));
    resultadoDiv.style.display = 'block';
    resultadoDiv.style.background = 'rgba(76, 175, 80, 0.1)';
    resultadoDiv.innerHTML = `✅ <strong>Intervalo Válido!</strong><br/>De: ${dataInicial}<br/>Até: ${dataFinal}<br/>Dias: ${diferenca} 📅`;
    resultadoDiv.style.color = '#4caf50';
}

// ========== BLOCO 25: REQUISIÇÕES DE API VARIADAS ==========

/**
 * Envia requisições HTTP variadas (GET, POST, PUT, DELETE)
 */
async function enviarRequisicao(metodo, url) {
    const resultadoDiv = document.getElementById('resultadoApi');
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = '⏳ Enviando requisição ' + metodo + '...';
    
    try {
        let opcoes = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // Adiciona body para POST e PUT
        if (metodo === 'POST') {
            opcoes.body = JSON.stringify({
                title: 'Post de Teste QA',
                body: 'Este é um post criado por um teste automatizado.',
                userId: 1
            });
        } else if (metodo === 'PUT') {
            opcoes.body = JSON.stringify({
                id: 1,
                title: 'Post Atualizado',
                body: 'Post modificado por teste de API PUT.',
                userId: 1
            });
        }
        
        const resposta = await fetch(url, opcoes);
        const dados = await resposta.json();
        
        resultadoDiv.innerHTML = `<strong>✅ ${metodo} ${resposta.status}</strong><br/>` +
            `<strong>URL:</strong> ${url}<br/>` +
            `<strong>Status:</strong> ${resposta.status} ${resposta.statusText}<br/>` +
            `<strong>Resposta:</strong> <pre style="margin: 0; overflow: auto;">${JSON.stringify(dados, null, 2)}</pre>`;
        resultadoDiv.style.color = '#0066cc';
    } catch (erro) {
        resultadoDiv.innerHTML = `<strong>❌ Erro na Requisição ${metodo}</strong><br/>` +
            `<strong>URL:</strong> ${url}<br/>` +
            `<strong>Erro:</strong> ${erro.message}`;
        resultadoDiv.style.color = '#f44336';
    }
}

    // ========== BLOCO 26: MODAL / DIALOG ==========
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalResult = document.getElementById('modalResult');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
            modalResult.textContent = '📂 Modal aberto';
            modalResult.style.color = '#0066cc';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalResult.textContent = '✓ Modal fechado pelo botão X';
            modalResult.style.color = '#666';
        });
    }

    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalResult.textContent = '❌ Ação cancelada';
            modalResult.style.color = '#d32f2f';
        });
    }

    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalResult.textContent = '✅ Ação confirmada com sucesso!';
            modalResult.style.color = '#4caf50';
        });
    }

    // Fechar modal ao clicar no overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === this) {
                this.style.display = 'none';
                modalResult.textContent = '✓ Modal fechado (clique fora)';
                modalResult.style.color = '#666';
            }
        });
    }

    // ========== BLOCO 27: TOAST / NOTIFICAÇÕES ==========
    const successToastBtn = document.getElementById('successToastBtn');
    const errorToastBtn = document.getElementById('errorToastBtn');
    const warningToastBtn = document.getElementById('warningToastBtn');
    const infoToastBtn = document.getElementById('infoToastBtn');
    const toastContainer = document.getElementById('toastContainer');

    function mostrarToast(tipo, mensagem) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.textContent = mensagem;
        toast.style.cssText = `
            padding: 16px;
            margin-bottom: 10px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
        `;

        if (tipo === 'success') {
            toast.style.backgroundColor = '#4caf50';
        } else if (tipo === 'error') {
            toast.style.backgroundColor = '#d32f2f';
        } else if (tipo === 'warning') {
            toast.style.backgroundColor = '#ff9800';
        } else if (tipo === 'info') {
            toast.style.backgroundColor = '#0066cc';
        }

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    if (successToastBtn) {
        successToastBtn.addEventListener('click', () => mostrarToast('success', '✅ Sucesso! Operação concluída.'));
    }

    if (errorToastBtn) {
        errorToastBtn.addEventListener('click', () => mostrarToast('error', '❌ Erro! Algo deu errado.'));
    }

    if (warningToastBtn) {
        warningToastBtn.addEventListener('click', () => mostrarToast('warning', '⚠️ Aviso! Verifique seus dados.'));
    }

    if (infoToastBtn) {
        infoToastBtn.addEventListener('click', () => mostrarToast('info', 'ℹ️ Informação: Ação realizada.'));
    }

    // ========== BLOCO 28: TABS / ABAS ==========
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabResult = document.getElementById('tabResult');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            // Esconde todas as abas
            tabPanes.forEach(pane => pane.style.display = 'none');
            // Mostra a aba selecionada
            document.getElementById(tabId).style.display = 'block';
            
            if (tabResult) {
                tabResult.textContent = `✓ Aba "${tabId.replace('tab', 'Aba ')}" selecionada`;
                tabResult.style.color = '#0066cc';
            }
        });
    });

    // ========== BLOCO 29: LOADING STATES ==========
    const triggerLoadingBtn = document.getElementById('triggerLoadingBtn');
    const loadingContainer = document.getElementById('loadingContainer');
    const loadedContent = document.getElementById('loadedContent');

    if (triggerLoadingBtn) {
        triggerLoadingBtn.addEventListener('click', function() {
            loadingContainer.style.display = 'block';
            loadedContent.style.display = 'none';
            triggerLoadingBtn.disabled = true;
            triggerLoadingBtn.style.opacity = '0.5';

            setTimeout(() => {
                loadingContainer.style.display = 'none';
                loadedContent.style.display = 'block';
                triggerLoadingBtn.disabled = false;
                triggerLoadingBtn.style.opacity = '1';
            }, 2000);
        });
    }

    // ========== BLOCO 30: DROPDOWN MENU ==========
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownResult = document.getElementById('dropdownResult');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        });
    }

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const texto = this.textContent.trim();
            if (dropdownResult) {
                dropdownResult.textContent = `✓ Selecionado: "${texto}"`;
                dropdownResult.style.color = '#0066cc';
            }
            dropdownMenu.style.display = 'none';
        });
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) {
            dropdownMenu.style.display = 'none';
        }
    });

    // ========== BLOCO 31: AUTOCOMPLETE COM MÚLTIPLAS CATEGORIAS ==========
    const categorySelect = document.getElementById('autocompleteCategorySelect');
    const countriesContainer = document.getElementById('autocompleteCountries');
    const teamsContainer = document.getElementById('autocompleteTeams');
    
    const autocompleteInputCountries = document.getElementById('autocompleteInputCountries');
    const autocompleteListCountries = document.getElementById('autocompleteListCountries');
    const autocompleteItemsCountries = document.querySelectorAll('#autocompleteListCountries li');
    
    const autocompleteInputTeams = document.getElementById('autocompleteInputTeams');
    const autocompleteListTeams = document.getElementById('autocompleteListTeams');
    const autocompleteItemsTeams = document.querySelectorAll('#autocompleteListTeams li');
    
    const autocompleteResult = document.getElementById('autocompleteResult');

    // Função para ocultar todos os containers
    function hideAllAutocompleteContainers() {
        countriesContainer.style.display = 'none';
        teamsContainer.style.display = 'none';
    }

    // Event listener para seletor de categoria
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            hideAllAutocompleteContainers();
            
            // Limpar inputs e listas
            autocompleteInputCountries.value = '';
            autocompleteInputTeams.value = '';
            autocompleteListCountries.style.display = 'none';
            autocompleteListTeams.style.display = 'none';
            autocompleteResult.textContent = '';
            
            // Mostrar container selecionado
            switch(selectedCategory) {
                case 'paises':
                    countriesContainer.style.display = 'block';
                    autocompleteInputCountries.focus();
                    break;
                case 'times':
                    teamsContainer.style.display = 'block';
                    autocompleteInputTeams.focus();
                    break;
            }
        });
    }

    // ===== AUTOCOMPLETE PAÍSES =====
    if (autocompleteInputCountries) {
        autocompleteInputCountries.addEventListener('input', function() {
            const valor = this.value.toLowerCase();
            let encontrou = false;

            autocompleteItemsCountries.forEach(item => {
                const texto = item.textContent.toLowerCase();
                if (valor && texto.includes(valor)) {
                    item.style.display = 'block';
                    encontrou = true;
                } else {
                    item.style.display = 'none';
                }
            });

            autocompleteListCountries.style.display = valor && encontrou ? 'block' : 'none';
        });
    }

    autocompleteItemsCountries.forEach(item => {
        item.addEventListener('click', function() {
            const valor = this.getAttribute('data-value');
            autocompleteInputCountries.value = valor;
            autocompleteListCountries.style.display = 'none';
            if (autocompleteResult) {
                autocompleteResult.textContent = `✓ País selecionado: "${valor}"`;
                autocompleteResult.style.color = '#0066cc';
            }
        });
    });

    // ===== AUTOCOMPLETE TIMES =====
    if (autocompleteInputTeams) {
        autocompleteInputTeams.addEventListener('input', function() {
            const valor = this.value.toLowerCase();
            let encontrou = false;

            autocompleteItemsTeams.forEach(item => {
                const texto = item.textContent.toLowerCase();
                if (valor && texto.includes(valor)) {
                    item.style.display = 'block';
                    encontrou = true;
                } else {
                    item.style.display = 'none';
                }
            });

            autocompleteListTeams.style.display = valor && encontrou ? 'block' : 'none';
        });
    }

    autocompleteItemsTeams.forEach(item => {
        item.addEventListener('click', function() {
            const valor = this.getAttribute('data-value');
            autocompleteInputTeams.value = valor;
            autocompleteListTeams.style.display = 'none';
            if (autocompleteResult) {
                autocompleteResult.textContent = `✓ Time selecionado: "${valor}"`;
                autocompleteResult.style.color = '#0066cc';
            }
        });
    });

    // ========== BLOCO 32: PAGINATION ==========
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    const paginationContent = document.getElementById('paginationContent');
    
    let currentPage = 1;
    const totalPages = 5;
    const itemsPerPage = 3;

    function atualizarPaginacao() {
        // Atualizar conteúdo
        paginationContent.innerHTML = '';
        const inicio = (currentPage - 1) * itemsPerPage;
        const fim = inicio + itemsPerPage;

        for (let i = inicio + 1; i <= fim; i++) {
            const item = document.createElement('p');
            item.textContent = `📄 Item ${i}`;
            item.style.padding = '8px';
            item.style.backgroundColor = '#f5f5f5';
            item.style.margin = '5px 0';
            item.style.borderRadius = '4px';
            paginationContent.appendChild(item);
        }

        // Atualizar indicador
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

        // Desabilitar/habilitar botões
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
            prevPageBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
        }

        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages;
            nextPageBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
        }
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                atualizarPaginacao();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                atualizarPaginacao();
            }
        });
    }

    atualizarPaginacao();

    // ========== BLOCO 33: DRAG & DROP ==========
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropTarget = document.getElementById('dropTarget');
    const dragDropResult = document.getElementById('dragDropResult');
    let draggedElement = null;
    let droppedCount = 0;

    function adicionarEventoRemocao(elemento) {
        elemento.style.cursor = 'pointer';
        elemento.title = 'Clique para remover';
        
        elemento.onclick = function(e) {
            e.stopPropagation();
            
            // Animação de saída
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'all 0.3s ease-out';
            
            setTimeout(() => {
                this.remove();
                droppedCount--;
                
                // Se nenhum item restou, mostrar mensagem padrão
                if (dropTarget.children.length === 0) {
                    const msgPadrao = document.createElement('p');
                    msgPadrao.className = 'text-info';
                    msgPadrao.textContent = 'Área de soltar itens';
                    dropTarget.appendChild(msgPadrao);
                }
                
                // Atualizar resultado
                if (dragDropResult) {
                    if (droppedCount === 0) {
                        dragDropResult.textContent = '✓ Nenhum item solto';
                        dragDropResult.style.color = '#999';
                    } else {
                        dragDropResult.textContent = `✓ ${droppedCount} item(ns) solto(s)`;
                        dragDropResult.style.color = '#0066cc';
                    }
                }
            }, 300);
        };
    }

    // Adicionar eventos aos items originais
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function(event) {
            draggedElement = this;
            this.style.opacity = '0.5';
        });

        item.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });

    if (dropTarget) {
        dropTarget.addEventListener('dragover', function(event) {
            event.preventDefault();
            this.style.backgroundColor = '#e3f2fd';
        });

        dropTarget.addEventListener('dragleave', function() {
            this.style.backgroundColor = 'transparent';
        });

        dropTarget.addEventListener('drop', function(event) {
            event.preventDefault();
            this.style.backgroundColor = 'transparent';

            if (draggedElement) {
                const clone = draggedElement.cloneNode(true);
                clone.style.opacity = '1';
                clone.style.marginBottom = '8px';
                clone.draggable = false;
                
                // Remover parágrafo padrão se existe
                const textoPadrao = this.querySelector('.text-info');
                if (textoPadrao) {
                    textoPadrao.remove();
                }

                // Adicionar o clone ao container
                this.appendChild(clone);
                
                // Adicionar evento de remoção ao clone
                adicionarEventoRemocao(clone);
                
                droppedCount++;

                // Atualizar resultado
                if (dragDropResult) {
                    dragDropResult.textContent = `✓ ${droppedCount} item(ns) solto(s)`;
                    dragDropResult.style.color = '#0066cc';
                }
            }
        });
    }

    // ========== BLOCO 34: BREADCRUMB ==========
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-item');

    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const texto = this.textContent;
            console.log(`✓ Navegou para: ${texto}`);
        });
    });

    // ========== BLOCO 35: TOOLTIP ==========
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');

    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-box';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                margin-top: 8px;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top + window.scrollY + rect.height) + 'px';

            this.tooltip = tooltip;
        });

        trigger.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });

// Executa ao carregar a página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarZionComponents);
} else {
    inicializarZionComponents();
}
