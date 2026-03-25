// Capturando os elementos do DOM
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const btnCalcular = document.getElementById('calcular');
const divResultado = document.getElementById('resultado-container');
const spanValorImc = document.getElementById('valor-imc');
const spanClassificacao = document.getElementById('classificacao-imc');
const btnThemeToggle = document.getElementById('theme-toggle');

// Função principal de cálculo
btnCalcular.addEventListener('click', function () {
    // Pegando os valores digitados e convertendo para números decimais
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    // Validação de segurança
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    // Calculando o IMC
    const imc = peso / (altura * altura);
    let classificacao = '';

    // Definindo a classificação com base na tabela da OMS
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = 'Peso normal';
    } else if (imc >= 25 && imc <= 29.9) {
        classificacao = 'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.9) {
        classificacao = 'Obesidade grau I';
    } else if (imc >= 35 && imc <= 39.9) {
        classificacao = 'Obesidade grau II';
    } else {
        classificacao = 'Obesidade grau III';
    }

    // Atualizando o HTML com os resultados
    spanValorImc.textContent = imc.toFixed(2); // Duas casas decimais
    spanClassificacao.textContent = classificacao;

    // Removendo a classe 'hidden' para mostrar a div
    divResultado.classList.remove('hidden');
});

// Lógica para alternar entre Modo Claro e Escuro
btnThemeToggle.addEventListener('click', function () {
    // Verifica qual é o tema atual
    const temaAtual = document.body.getAttribute('data-theme');

    if (temaAtual === 'dark') {
        // Volta pro claro
        document.body.removeAttribute('data-theme');
        btnThemeToggle.textContent = '☀️';
    } else {
        // Muda pro escuro
        document.body.setAttribute('data-theme', 'dark');
        btnThemeToggle.textContent = '🌙';
    }
});