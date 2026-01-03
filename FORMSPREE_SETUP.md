# Configuração do Formspree (Fallback para EmailJS)

## O que foi feito

O formulário agora tenta enviar com **EmailJS primeiro**. Se falhar, tenta automaticamente com **Formspree** (serviço gratuito, sem OAuth).

## Como configurar o Formspree

1. Abra https://formspree.io/
2. Clique em **Sign Up** e use seu email (ou GitHub)
3. Crie um novo formulário:
   - Nome: `brunogsiq-contato` (ou qualquer nome)
   - Selecione seu email como destinatário: `brunogsiq@gmail.com`
   - Copie o **endpoint** exibido (formato: `https://formspree.io/f/XXXXX`)
4. Substitua o valor em `js/script.js` (linha ~360):
   ```javascript
   fetch('https://formspree.io/f/xyzkvdnb', {  // ← SUBSTITUA ESTE CÓDIGO
   ```
   Coloque seu endpoint real.

## Teste

1. Abra a página
2. Preencha o formulário (nome + mensagem obrigatórios; outros opcionais)
3. Clique "Enviar Solicitação"
4. Veja o Console (F12) para logs:
   - `✅ EmailJS response:` = sucesso no EmailJS
   - `🔄 Tentando fallback com Formspree...` = EmailJS falhou, tentando Formspree
   - `✅ Formspree sucesso` = sucesso no Formspree
5. Confirme a chegada do email em `brunogsiq@gmail.com`

## Detalhes Técnicos

- **EmailJS**: Primary (precisa do Service ID, Template ID e Public Key corretos)
- **Formspree**: Fallback automático (sem dependências, apenas HTTP POST)
- **Validação local**: Nome e Mensagem obrigatórios; outros opcionais
- **Valores padrão**: Email/Telefone/Selects vazios enviam "Não informado"
