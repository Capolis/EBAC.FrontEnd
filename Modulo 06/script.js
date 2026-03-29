// Variáveis Globais de Estado do Jogo
let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;

// Capturando os elementos do HTML
const inputPalpite = document.getElementById('palpite');
const pMensagem = document.getElementById('mensagem');
const pTentativas = document.getElementById('tentativas');
const btnChutar = document.getElementById('btn-chutar');

// Função executada automaticamente ao carregar a página
function iniciarJogo() {
    // Gera um número entre 1 e 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = maxTentativas;

    // Configura os textos iniciais
    pTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    pMensagem.textContent = "Faça seu primeiro palpite!";
    pMensagem.style.color = "#34495e";

    // Garante que o input e botão estão ativos
    inputPalpite.value = "";
    btnChutar.disabled = false;
    inputPalpite.disabled = false;
}

// Função principal disparada pelo botão "Chutar"
function verificarPalpite() {
    const palpite = parseInt(inputPalpite.value);

    // 1. Validação de segurança
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        pMensagem.textContent = "Por favor, digite um número entre 1 e 100.";
        pMensagem.style.color = "#e74c3c"; // Vermelho
        return; // Para a execução da função aqui
    }

    // 2. Decrementa o contador
    tentativasRestantes--;

    // 3. Lógica de comparação
    if (palpite === numeroSecreto) {
        pMensagem.textContent = "🎉 Você acertou! Parabéns!";
        pMensagem.style.color = "#27ae60"; // Verde
        encerrarJogo();
    } else if (tentativasRestantes === 0) {
        pMensagem.textContent = `Você perdeu! O número era ${numeroSecreto}.`;
        pMensagem.style.color = "#c0392b"; // Vermelho escuro
        encerrarJogo();
    } else if (palpite < numeroSecreto) {
        pMensagem.textContent = "O número secreto é MAIOR! 📈";
        pMensagem.style.color = "#2980b9"; // Azul
    } else {
        pMensagem.textContent = "O número secreto é MENOR! 📉";
        pMensagem.style.color = "#2980b9"; // Azul
    }

    // 4. Atualiza a tela e prepara para a próxima jogada
    pTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    inputPalpite.value = "";
    inputPalpite.focus(); // Retorna o cursor piscando para o input
}

// Função auxiliar para travar o jogo ao ganhar ou perder
function encerrarJogo() {
    btnChutar.disabled = true;
    inputPalpite.disabled = true;
}

// Chama a função iniciarJogo assim que o arquivo é lido
window.onload = iniciarJogo;