const matrizGastos = [
    ["Alimentação", 0],
    ["Transporte", 0],
    ["Lazer", 0],
    ["Outros", 0],
    ["Total", 0]
];

// Funções utilitárias
const obterElemento = (id) => document.getElementById(id);
const valorNegativo = (valor) => valor < 0;
const somaValor = (total, valor) => total + valor;
const limparCampos = () => { obterElemento("valor").value = ''; }

// Obter valores do formulário
// CORREÇÃO 1: Adicionado o .value
const obterValorInformada = () => parseFloat(obterElemento('valor').value); 

// CORREÇÃO 2: Pegando o texto ("Alimentação") em vez do value ("alimentacao")
const obterCategoriaInformada = () => {
    const select = obterElemento('categoria');
    return select.options[select.selectedIndex].text;
};

// Obter categoria a partir da matriz
const obterCategoria = (matriz, nomeCategoria) => matriz.find((item) => item[0] === nomeCategoria);

// Atualizar valores na matriz e na interface
const atualizarValorCategoria = (categoria, valor) => { categoria[1] = somaValor(categoria[1], valor); }

const atualizarInterface = () => {
    matrizGastos.forEach(([categoria, valor]) => {
        // CORREÇÃO 3: Tratar o id="total" que está minúsculo no HTML
        const idHtml = categoria === "Total" ? "Total" : categoria;
        const elemento = obterElemento(idHtml);
        
        // Formata para 2 casas decimais e troca ponto por vírgula
        const valorFormatado = valor.toFixed(2).replace('.', ',');
        elemento.textContent = `${categoria}: R$ ${valorFormatado}`;
    });
};

function adicionarGasto() {
    const valorInformado = obterValorInformada();
    const categoriaInformada = obterCategoriaInformada();

    // Validação extra: verifica se o campo está vazio (NaN) ou se a categoria não foi selecionada
    if (isNaN(valorInformado) || categoriaInformada === "Selecione a categoria") {
        alert("Por favor, preencha um valor válido e selecione uma categoria.");
        return;
    }

    if (valorNegativo(valorInformado)) {
        alert("O valor não pode ser negativo!");
        return;
    }

    const categoria = obterCategoria(matrizGastos, categoriaInformada);
    atualizarValorCategoria(categoria, valorInformado);

    const total = obterCategoria(matrizGastos, "Total");
    atualizarValorCategoria(total, valorInformado);

    atualizarInterface();
    limparCampos();
}