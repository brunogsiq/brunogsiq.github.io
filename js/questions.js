/**
 * Questions Manager - Gerenciador de Perguntas e Pontuação
 * ISTQB Syllabus 4.0 - 45 Perguntas Completas
 * Unificado com dados embutidos + lógica de quiz
 */

// ========== DADOS DAS PERGUNTAS ISTQB ==========
const perguntasData = [
    {
        id: 1,
        pergunta: "Qual é o principal objetivo do teste de software mencionado na Syllabus?",
        respostas: [
            "Avaliar a qualidade do software e ajudar a reduzir o risco de falha",
            "Corrigir todos os erros encontrados no código",
            "Documentar todos os requisitos do sistema",
            "Implementar novas funcionalidades no software"
        ],
        respostaCorreta: 0,
        topico: "Fundamentos do Teste",
        nivel: "Básico"
    },
    {
        id: 2,
        pergunta: "O que a Syllabus define como um equívoco comum sobre testes?",
        respostas: [
            "Que os testes consistem apenas na execução de testes, sem outras atividades",
            "Que testes são necessários durante todo o SDLC",
            "Que defeitos são sempre encontrados em produção",
            "Que QA e testes são diferentes"
        ],
        respostaCorreta: 0,
        topico: "Definição de Teste",
        nivel: "Básico"
    },
    {
        id: 3,
        pergunta: "Segundo a Syllabus, qual é a diferença entre teste dinâmico e teste estático?",
        respostas: [
            "O teste dinâmico envolve a execução do software, enquanto o teste estático não",
            "Teste dinâmico detecta mais defeitos que teste estático",
            "Teste estático é sempre executado antes do dinâmico",
            "Não há diferença significativa entre eles"
        ],
        respostaCorreta: 0,
        topico: "Tipos de Teste",
        nivel: "Básico"
    },
    {
        id: 4,
        pergunta: "O que a Syllabus define como 'erro' no contexto de teste?",
        respostas: [
            "Um equívoco (ação humana) que produz um defeito",
            "Uma falha observada durante a execução",
            "Um bug no código da produção",
            "Um problema no plano de teste"
        ],
        respostaCorreta: 0,
        topico: "Terminologia",
        nivel: "Básico"
    },
    {
        id: 5,
        pergunta: "De acordo com a Syllabus, qual é a relação entre QA e teste?",
        respostas: [
            "Teste é uma forma de controle de qualidade (QC), enquanto QA é um processo preventivo",
            "QA e teste são sinônimos",
            "Teste é mais importante que QA",
            "QA apenas documenta e teste valida"
        ],
        respostaCorreta: 0,
        topico: "QA e Teste",
        nivel: "Intermediário"
    },
    {
        id: 6,
        pergunta: "Segundo o primeiro princípio de teste da Syllabus, qual é a verdade sobre os testes?",
        respostas: [
            "Os testes mostram a presença de defeitos, não a ausência deles",
            "Os testes conseguem encontrar todos os defeitos",
            "Os testes garantem software sem falhas",
            "Os testes são desnecessários se o código está bem escrito"
        ],
        respostaCorreta: 0,
        topico: "Princípios de Teste",
        nivel: "Básico"
    },
    {
        id: 7,
        pergunta: "O que afirma o terceiro princípio de teste ('Testes antecipados economizam tempo e dinheiro')?",
        respostas: [
            "Defeitos removidos cedo não causarão defeitos em produtos de trabalho derivados",
            "Testes devem começar apenas após a implementação completa",
            "Testes antecipados aumentam custos desnecessariamente",
            "Apenas testes em produção são economicamente viáveis"
        ],
        respostaCorreta: 0,
        topico: "Princípios de Teste",
        nivel: "Intermediário"
    },
    {
        id: 8,
        pergunta: "De acordo com a Syllabus, quais são as principais atividades de teste?",
        respostas: [
            "Planejamento, análise, design, implementação, execução e conclusão",
            "Apenas execução de testes e relato de defeitos",
            "Análise e design, sem necessidade de planejamento",
            "Execução, validação e encerramento"
        ],
        respostaCorreta: 0,
        topico: "Atividades de Teste",
        nivel: "Intermediário"
    },
    {
        id: 9,
        pergunta: "Segundo a Syllabus, qual é o impacto do SDLC escolhido nos testes?",
        respostas: [
            "Afeta o escopo, cronograma, documentação, técnicas e grau de automação dos testes",
            "O SDLC não tem impacto significativo nos testes",
            "Todos os SDLCs requerem as mesmas estratégias de teste",
            "Apenas o modelo Waterfall é apropriado para testes"
        ],
        respostaCorreta: 0,
        topico: "SDLC e Teste",
        nivel: "Intermediário"
    },
    {
        id: 10,
        pergunta: "O que define a Syllabus como 'shift-left'?",
        respostas: [
            "Realizar testes mais cedo no SDLC, não esperando que o código esteja implementado",
            "Mover testes para o final do ciclo de desenvolvimento",
            "Automatizar todos os testes simultaneamente",
            "Reduzir a quantidade de testes durante o desenvolvimento"
        ],
        respostaCorreta: 0,
        topico: "Shift-Left",
        nivel: "Intermediário"
    },
    {
        id: 11,
        pergunta: "Qual é o foco do Teste de Componente (ou Teste Unitário) segundo a Syllabus?",
        respostas: [
            "Testar componentes isoladamente, geralmente realizado por desenvolvedores",
            "Testar a integração entre múltiplos componentes",
            "Testar o sistema completo em um ambiente de produção",
            "Testar a aceitação do usuário final"
        ],
        respostaCorreta: 0,
        topico: "Níveis de Teste",
        nivel: "Básico"
    },
    {
        id: 12,
        pergunta: "O que é Teste de Integração de Componentes de acordo com a Syllabus?",
        respostas: [
            "Testa interfaces e interações entre componentes",
            "Testa componentes de forma isolada",
            "Testa apenas o código executável",
            "Testa a compatibilidade com sistema externo"
        ],
        respostaCorreta: 0,
        topico: "Níveis de Teste",
        nivel: "Intermediário"
    },
    {
        id: 13,
        pergunta: "Qual é o objetivo do Teste de Sistema conforme descrito na Syllabus?",
        respostas: [
            "Focar no comportamento geral e recursos de todo um sistema ou produto",
            "Testar apenas módulos individuais",
            "Validar se o software atende as necessidades de negócio",
            "Executar testes de regressão"
        ],
        respostaCorreta: 0,
        topico: "Níveis de Teste",
        nivel: "Básico"
    },
    {
        id: 14,
        pergunta: "O que define o Teste de Aceite conforme a Syllabus?",
        respostas: [
            "Validação da disposição para implantação e se o sistema atende às necessidades de negócio",
            "Teste realizado apenas por desenvolvedores",
            "Um tipo de teste manual sem critérios definidos",
            "Teste que detecta todos os bugs do sistema"
        ],
        respostaCorreta: 0,
        topico: "Níveis de Teste",
        nivel: "Intermediário"
    },
    {
        id: 15,
        pergunta: "Qual é a diferença entre Teste de Confirmação e Teste de Regressão segundo a Syllabus?",
        respostas: [
            "Confirmação verifica que um defeito foi corrigido; regressão verifica que nenhuma consequência adversa foi causada",
            "Confirmação é manual e regressão é automatizada",
            "Regressão verifica apenas se há novos bugs",
            "Confirmação é em produção e regressão em desenvolvimento"
        ],
        respostaCorreta: 0,
        topico: "Tipos de Teste",
        nivel: "Intermediário"
    },
    {
        id: 16,
        pergunta: "Qual é um dos benefícios do DevOps mencionado na Syllabus?",
        respostas: [
            "Promove feedback rápido sobre a qualidade do código e CI/CD automatizados",
            "Elimina a necessidade de testes",
            "Reduz o tempo de desenvolvimento sem garantias de qualidade",
            "Torna os testes completamente manuais"
        ],
        respostaCorreta: 0,
        topico: "DevOps",
        nivel: "Intermediário"
    },
    {
        id: 17,
        pergunta: "Qual é a principal diferença entre testes estáticos e dinâmicos?",
        respostas: [
            "Testes estáticos não precisam executar o software; testes dinâmicos precisam",
            "Testes dinâmicos são mais rápidos que os estáticos",
            "Testes estáticos encontram mais bugs que dinâmicos",
            "Testes dinâmicos são apenas para interfaces"
        ],
        respostaCorreta: 0,
        topico: "Teste Estático",
        nivel: "Básico"
    },
    {
        id: 18,
        pergunta: "Segundo a Syllabus, quais são produtos de trabalho que podem ser examinados por testes estáticos?",
        respostas: [
            "Especificações, código-fonte, planos de teste, documentação do projeto",
            "Apenas código-fonte em execução",
            "Somente requisitos de negócio",
            "Documentação após a entrega"
        ],
        respostaCorreta: 0,
        topico: "Teste Estático",
        nivel: "Intermediário"
    },
    {
        id: 19,
        pergunta: "O que a análise estática pode detectar que os testes dinâmicos não conseguem?",
        respostas: [
            "Código inacessível, padrões de projeto não implementados corretamente, defeitos em produtos não executáveis",
            "Falhas de segurança em produção",
            "Problemas de performance",
            "Bugs que causam travamentos do sistema"
        ],
        respostaCorreta: 0,
        topico: "Teste Estático",
        nivel: "Avançado"
    },
    {
        id: 20,
        pergunta: "Qual é um benefício do feedback antecipado de stakeholders mencionado na Syllabus?",
        respostas: [
            "Evita mal-entendidos sobre requisitos e garante que mudanças sejam implementadas cedo",
            "Reduz a comunicação entre equipes",
            "Aumenta o custo do desenvolvimento",
            "Torna os testes mais complexos"
        ],
        respostaCorreta: 0,
        topico: "Engajamento",
        nivel: "Intermediário"
    },
    {
        id: 21,
        pergunta: "De acordo com a Syllabus, qual é o tipo mais formal de revisão?",
        respostas: [
            "Inspeção - segue processo completo com métricas coletadas",
            "Revisão técnica, que é mais informal",
            "Walk-through, que é conduzido sem estrutura",
            "Revisão por pares, que é sempre informal"
        ],
        respostaCorreta: 0,
        topico: "Revisões",
        nivel: "Intermediário"
    },
    {
        id: 22,
        pergunta: "O que é Particionamento de Equivalência (EP) segundo a Syllabus?",
        respostas: [
            "Divide dados em partições com base na expectativa que todos os elementos sejam processados da mesma forma",
            "Um método para automatizar testes",
            "Uma técnica que substitui análise de valor limite",
            "Divisão de código em componentes"
        ],
        respostaCorreta: 0,
        topico: "Particionamento de Equivalência",
        nivel: "Intermediário"
    },
    {
        id: 23,
        pergunta: "De acordo com a Syllabus, qual é o objetivo da Análise de Valor Limite (BVA)?",
        respostas: [
            "Executar testes nos limites das partições de equivalência",
            "Testar o valor máximo do sistema",
            "Validar apenas valores mínimos",
            "Encontrar todos os bugs do código"
        ],
        respostaCorreta: 0,
        topico: "Análise de Valor Limite",
        nivel: "Intermediário"
    },
    {
        id: 24,
        pergunta: "O que a Syllabus descreve como Teste de Tabela de Decisão?",
        respostas: [
            "Testa implementação de requisitos que especificam como combinações de condições resultam em diferentes resultados",
            "Uma tabela com todos os testes executados",
            "Um método para organizar relatórios de testes",
            "Uma ferramenta de automação de testes"
        ],
        respostaCorreta: 0,
        topico: "Teste de Tabela de Decisão",
        nivel: "Intermediário"
    },
    {
        id: 25,
        pergunta: "De acordo com a Syllabus, o que modela um Diagrama de Transição de Estados?",
        respostas: [
            "Os possíveis estados de um sistema e transições de estado válidas",
            "A sequência temporal de execução de testes",
            "Os componentes do código fonte",
            "A arquitetura do banco de dados"
        ],
        respostaCorreta: 0,
        topico: "Teste de Transição de Estados",
        nivel: "Intermediário"
    },
    {
        id: 26,
        pergunta: "Qual é o objetivo do Teste de Instrução (Statement Coverage) mencionado na Syllabus?",
        respostas: [
            "Exercitar instruções executáveis no código até alcançar um nível aceitável de cobertura",
            "Testar apenas linhas de código",
            "Validar a estrutura lógica do programa",
            "Verificar a sintaxe do código"
        ],
        respostaCorreta: 0,
        topico: "Cobertura de Código",
        nivel: "Avançado"
    },
    {
        id: 27,
        pergunta: "De acordo com a Syllabus, o que mede o Teste de Ramificação (Branch Coverage)?",
        respostas: [
            "O número de ramificações exercidas pelos casos de teste dividido pelo número total de ramificações",
            "A quantidade de testes criados",
            "O tempo total de execução dos testes",
            "O número de defeitos encontrados"
        ],
        respostaCorreta: 0,
        topico: "Cobertura de Código",
        nivel: "Avançado"
    },
    {
        id: 28,
        pergunta: "O que a Syllabus descreve como Suposição de Erro?",
        respostas: [
            "Uma técnica para prever erros, defeitos e falhas baseada no conhecimento do testador",
            "Um tipo de erro sistemático",
            "Uma ferramenta de teste automatizado",
            "Uma metodologia de análise estática"
        ],
        respostaCorreta: 0,
        topico: "Suposição de Erro",
        nivel: "Avançado"
    },
    {
        id: 29,
        pergunta: "De acordo com a Syllabus, o que caracteriza o Teste Exploratório?",
        respostas: [
            "Os testes são modelados, executados e avaliados simultaneamente enquanto o testador aprende",
            "Teste planejado com casos de teste predefinidos",
            "Teste que não requer qualquer documentação",
            "Teste executado apenas em produção"
        ],
        respostaCorreta: 0,
        topico: "Teste Exploratório",
        nivel: "Intermediário"
    },
    {
        id: 30,
        pergunta: "O que a Syllabus diz sobre Testes Baseados em Lista de Verificação?",
        respostas: [
            "Um testador projeta, implementa e executa testes para cobrir condições de uma lista de verificação",
            "Listas que documentam erros encontrados",
            "Ferramentas automatizadas para teste",
            "Documentação de requisitos completos"
        ],
        respostaCorreta: 0,
        topico: "Teste por Lista de Verificação",
        nivel: "Básico"
    },
    {
        id: 31,
        pergunta: "De acordo com a Syllabus, qual é o objetivo do ATDD (Acceptance Test-Driven Development)?",
        respostas: [
            "Criar casos de teste antes da implementação da história de usuário para derivar exemplos",
            "Testar apenas após a implementação completa",
            "Automatizar todos os testes manualmente",
            "Reduzir o número de testes"
        ],
        respostaCorreta: 0,
        topico: "ATDD",
        nivel: "Avançado"
    },
    {
        id: 32,
        pergunta: "Qual é o significado de INVEST em histórias de usuários conforme a Syllabus?",
        respostas: [
            "Independentes, negociáveis, valiosas, estimáveis, pequenas e testáveis",
            "Um método para estimar custos de desenvolvimento",
            "Uma ferramenta de gestão de projetos",
            "Um framework de teste automatizado"
        ],
        respostaCorreta: 0,
        topico: "User Stories",
        nivel: "Intermediário"
    },
    {
        id: 33,
        pergunta: "O que a Syllabus define como conteúdo típico de um Plano de Teste?",
        respostas: [
            "Contexto, objetivos, stakeholders, comunicação, riscos, abordagem, orçamento e cronograma",
            "Apenas uma lista de testes a executar",
            "Documentação de todos os bugs encontrados",
            "Relatório final de qualidade do software"
        ],
        respostaCorreta: 0,
        topico: "Planejamento de Teste",
        nivel: "Intermediário"
    },
    {
        id: 34,
        pergunta: "De acordo com a Syllabus, qual é a diferença entre Critérios de Entrada e Critérios de Saída?",
        respostas: [
            "Entrada define pré-condições para uma atividade; saída define o que deve ser alcançado para concluir",
            "Entrada é planejamento e saída é execução",
            "Não há diferença prática entre eles",
            "Entrada são testes e saída são defeitos"
        ],
        respostaCorreta: 0,
        topico: "Critérios de Teste",
        nivel: "Intermediário"
    },
    {
        id: 35,
        pergunta: "A Syllabus menciona quais técnicas de estimativa de esforço de teste?",
        respostas: [
            "Índices, extrapolação, Wideband Delphi e estimativa de três pontos",
            "Apenas métodos de automação",
            "Técnicas matemáticas complexas",
            "Estimativas baseadas em intuição"
        ],
        respostaCorreta: 0,
        topico: "Estimativa",
        nivel: "Avançado"
    },
    {
        id: 36,
        pergunta: "Qual é o objetivo da Priorização de Casos de Teste segundo a Syllabus?",
        respostas: [
            "Definir a ordem de execução dos testes com base em risco, cobertura ou requisitos",
            "Executar todos os testes simultaneamente",
            "Eliminar testes menos importantes",
            "Randomizar a ordem de testes"
        ],
        respostaCorreta: 0,
        topico: "Execução de Teste",
        nivel: "Intermediário"
    },
    {
        id: 37,
        pergunta: "O que a Syllabus descreve como Pirâmide de Testes?",
        respostas: [
            "Um modelo que mostra diferentes testes com diferentes granularidades em camadas",
            "Uma ferramenta para medir qualidade",
            "Um gráfico de progresso dos testes",
            "Uma estrutura hierárquica de defeitos"
        ],
        respostaCorreta: 0,
        topico: "Estratégia de Teste",
        nivel: "Intermediário"
    },
    {
        id: 38,
        pergunta: "De acordo com a Syllabus, qual é a relação entre probabilidade de risco e impacto?",
        respostas: [
            "O nível de risco é uma medida caracterizada por probabilidade e impacto",
            "Risco é apenas a probabilidade de falha",
            "Impacto é a causa e probabilidade é o efeito",
            "Não há relação entre os dois"
        ],
        respostaCorreta: 0,
        topico: "Gestão de Risco",
        nivel: "Intermediário"
    },
    {
        id: 39,
        pergunta: "Qual é a diferença entre Riscos de Projeto e Riscos de Produto mencionada na Syllabus?",
        respostas: [
            "Projeto afeta cronograma/orçamento; produto afeta características de qualidade do software",
            "Riscos de projeto são sempre maiores",
            "Produto afeta apenas documentação",
            "Não há diferença significativa"
        ],
        respostaCorreta: 0,
        topico: "Gestão de Risco",
        nivel: "Intermediário"
    },
    {
        id: 40,
        pergunta: "O que a Syllabus menciona sobre o Monitoramento de Testes?",
        respostas: [
            "Envolve coletar informações para avaliar progresso e se critérios de saída foram atendidos",
            "É apenas contar o número de testes executados",
            "Documentar todos os resultados manualmente",
            "Uma atividade realizada apenas ao final dos testes"
        ],
        respostaCorreta: 0,
        topico: "Monitoramento",
        nivel: "Intermediário"
    },
    {
        id: 41,
        pergunta: "De acordo com a Syllabus, quais são exemplos de métricas de teste?",
        respostas: [
            "Progresso, qualidade do produto, defeitos, risco, cobertura, custo",
            "Apenas número de testes executados",
            "Métricas de memória e processador",
            "Documentação dos requisitos"
        ],
        respostaCorreta: 0,
        topico: "Métricas",
        nivel: "Intermediário"
    },
    {
        id: 42,
        pergunta: "O que a Syllabus descreve como objetivo de um Relatório de Defeitos?",
        respostas: [
            "Fornecer informações suficientes para resolver o problema e rastrear qualidade do produto",
            "Apenas listar bugs encontrados",
            "Documentar o procedimento de teste",
            "Comunicar progresso do projeto"
        ],
        respostaCorreta: 0,
        topico: "Relatório de Defeitos",
        nivel: "Básico"
    },
    {
        id: 43,
        pergunta: "Qual é um benefício da Automação de Testes mencionado na Syllabus?",
        respostas: [
            "Economiza tempo com redução do trabalho manual repetitivo",
            "Elimina a necessidade de testes manuais completamente",
            "Detecta automaticamente todos os bugs do sistema",
            "Torna a documentação desnecessária"
        ],
        respostaCorreta: 0,
        topico: "Automação",
        nivel: "Básico"
    },
    {
        id: 44,
        pergunta: "Qual é um risco potencial da Automação de Testes conforme descrito na Syllabus?",
        respostas: [
            "Estimativas imprecisas de tempo, custos e esforço necessários para implementar e manter",
            "Automação reduz custos significativamente",
            "Testes automatizados não requerem manutenção",
            "Automação não tem riscos associados"
        ],
        respostaCorreta: 0,
        topico: "Automação",
        nivel: "Intermediário"
    },
    {
        id: 45,
        pergunta: "De acordo com a Syllabus, qual é o propósito principal do Gerenciamento de Configuração?",
        respostas: [
            "Identificar, controlar e rastrear produtos de trabalho como itens de configuração",
            "Apenas gerenciar versões de código",
            "Documentar requisitos de hardware",
            "Administrar permissões de acesso ao sistema"
        ],
        respostaCorreta: 0,
        topico: "Gerenciamento",
        nivel: "Avançado"
    }
];

// ========== CLASSE QUIZ MANAGER ==========
class QuizManager {
    constructor() {
        this.perguntas = perguntasData;
        this.perguntasEmbaralhadas = [];
        this.indicePerguntaAtual = 0;
        this.pontuacao = 0;
        this.totalPerguntasRespondidas = 0;
        this.respostasUsuario = [];
        this.carregado = false;
        
        // Embaralha e marca como carregado
        this.embaralharPerguntas();
        this.carregado = true;
    }

    /**
     * Embaralha as perguntas usando algoritmo Fisher-Yates
     */
    embaralharPerguntas() {
        this.perguntasEmbaralhadas = [...this.perguntas];
        for (let i = this.perguntasEmbaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.perguntasEmbaralhadas[i], this.perguntasEmbaralhadas[j]] = 
            [this.perguntasEmbaralhadas[j], this.perguntasEmbaralhadas[i]];
        }
    }

    /**
     * Embaralha as opções de resposta de uma pergunta
     */
    embaralharRespostas(pergunta) {
        const indicesOriginais = Array.from({ length: pergunta.respostas.length }, (_, i) => i);
        const indicesEmbaralhados = [...indicesOriginais];
        
        for (let i = indicesEmbaralhados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indicesEmbaralhados[i], indicesEmbaralhados[j]] = 
            [indicesEmbaralhados[j], indicesEmbaralhados[i]];
        }

        return {
            respostasEmbaralhadas: indicesEmbaralhados.map(i => pergunta.respostas[i]),
            indiceRespostaCorreta: indicesEmbaralhados.indexOf(pergunta.respostaCorreta)
        };
    }

    /**
     * Obtém a pergunta atual
     */
    obterPerguntaAtual() {
        if (this.indicePerguntaAtual < this.perguntasEmbaralhadas.length) {
            return this.perguntasEmbaralhadas[this.indicePerguntaAtual];
        }
        return null;
    }

    /**
     * Valida a resposta do usuário
     */
    validarResposta(indiceRespostaUsuario, indiceRespostaCorretaEmbaralhada) {
        const perguntaAtual = this.obterPerguntaAtual();
        
        if (!perguntaAtual) return false;

        const acertou = indiceRespostaUsuario === indiceRespostaCorretaEmbaralhada;
        
        if (acertou) {
            this.pontuacao++;
        }

        this.respostasUsuario.push({
            perguntaId: perguntaAtual.id,
            pergunta: perguntaAtual.pergunta,
            respostaUsuario: indiceRespostaUsuario,
            respostaCorreta: indiceRespostaCorretaEmbaralhada,
            acertou: acertou,
            topico: perguntaAtual.topico,
            nivel: perguntaAtual.nivel
        });

        this.totalPerguntasRespondidas++;
        return acertou;
    }

    /**
     * Avança para a próxima pergunta
     */
    proximaPergunta() {
        this.indicePerguntaAtual++;
        return this.obterPerguntaAtual() !== null;
    }

    /**
     * Verifica se há mais perguntas
     */
    temMaisPerguntas() {
        return this.indicePerguntaAtual < this.perguntasEmbaralhadas.length;
    }

    /**
     * Obtém a pontuação atual
     */
    obterPontuacao() {
        const total = this.perguntasEmbaralhadas.length;
        const percentual = total > 0 ? Math.round((this.pontuacao / total) * 100) : 0;
        return {
            acertos: this.pontuacao,
            total: total,
            percentual: percentual
        };
    }

    /**
     * Reinicia o quiz
     */
    reiniciar() {
        this.indicePerguntaAtual = 0;
        this.pontuacao = 0;
        this.totalPerguntasRespondidas = 0;
        this.respostasUsuario = [];
        this.embaralharPerguntas();
    }

    /**
     * Obtém um resumo do desempenho
     */
    obterResumoDesempenho() {
        const pontuacao = this.obterPontuacao();
        const porTopico = {};

        this.respostasUsuario.forEach(resposta => {
            if (!porTopico[resposta.topico]) {
                porTopico[resposta.topico] = { acertos: 0, total: 0 };
            }
            porTopico[resposta.topico].total++;
            if (resposta.acertou) {
                porTopico[resposta.topico].acertos++;
            }
        });

        return {
            pontuacao: pontuacao,
            porTopico: porTopico,
            totalRespostas: this.respostasUsuario
        };
    }

    /**
     * Obtém a posição atual do quiz (ex: "3 de 12")
     */
    obterPosicaoAtual() {
        return `${this.indicePerguntaAtual + 1} de ${this.perguntasEmbaralhadas.length}`;
    }
}

// ========== INSTÂNCIA GLOBAL E INICIALIZAÇÃO ==========
const quizManager = new QuizManager();

// ========== FUNÇÕES DE COMPATIBILIDADE (uso legado) ==========
const perguntas = quizManager.perguntas;
let perguntaAtual = 0;

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
    window.estadoQuiz = window.estadoQuiz || {};
    window.estadoQuiz.perguntaEmbaralhada = resultado.respostasEmbaralhadas;
    window.estadoQuiz.indiceRespostaCorretaEmbaralhada = resultado.indiceRespostaCorreta;
    window.estadoQuiz.perguntaCarregada = true;

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
    const formRespostas = document.getElementById('formRespostas');
    if (formRespostas) {
        formRespostas.reset();
    }

    console.log(`Pergunta ${quizManager.obterPosicaoAtual()} carregada`);
}

/**
 * Verifica se a resposta selecionada está correta
 */
function verificarResposta() {
    if (!window.estadoQuiz || !window.estadoQuiz.perguntaCarregada) {
        alert('Nenhuma pergunta carregada. Clique em "Próxima" para começar.');
        return;
    }

    const selecionada = document.querySelector('input[name="resposta"]:checked');
    if (!selecionada) {
        alert('Selecione uma resposta!');
        return;
    }

    const indiceRespostaUsuario = parseInt(selecionada.value);
    const acertou = quizManager.validarResposta(indiceRespostaUsuario, window.estadoQuiz.indiceRespostaCorretaEmbaralhada);

    const quizMensagem = document.getElementById('quizMensagem');
    const pontuacao = quizManager.obterPontuacao();

    if (acertou) {
        if (quizMensagem) {
            quizMensagem.textContent = '✓ Resposta Correta!';
            quizMensagem.style.color = '#4caf50';
        }
    } else {
        if (quizMensagem) {
            quizMensagem.textContent = `✗ Resposta Incorreta! A resposta correta é: "${window.estadoQuiz.perguntaEmbaralhada[window.estadoQuiz.indiceRespostaCorretaEmbaralhada]}"`;
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
        quizMensagem.style.color = pontuacao.percentual >= 70 ? '#4caf50' : '#ff9800';
    }

    document.getElementById('pergunta').textContent = 'Quiz Finalizado!';
    const formRespostas = document.getElementById('formRespostas');
    if (formRespostas) {
        formRespostas.reset();
    }
    
    // Limpa as opções
    for (let i = 0; i < 4; i++) {
        const respostaElement = document.getElementById('resposta' + i);
        if (respostaElement) {
            respostaElement.textContent = '';
        }
    }

    window.estadoQuiz = window.estadoQuiz || {};
    window.estadoQuiz.perguntaCarregada = false;

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
        quizPontuacaoDisplay.textContent = '0/12';
    }

    const quizMensagem = document.getElementById('quizMensagem');
    if (quizMensagem) {
        quizMensagem.textContent = '';
        quizMensagem.style.color = '';
    }

    const formRespostas = document.getElementById('formRespostas');
    if (formRespostas) {
        formRespostas.reset();
    }
    
    // Habilita as respostas
    document.querySelectorAll('input[name="resposta"]').forEach(input => {
        input.disabled = false;
    });

    sortearPergunta();
}

// Inicializa o quiz quando DOM está pronto
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('pergunta')) {
        sortearPergunta();
        console.log('✅ Questions Manager - Quiz ISTQB carregado com sucesso');
    }
});