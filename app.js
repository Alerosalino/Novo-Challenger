// Seleção dos elementos HTML
const inputName = document.getElementById('input-name');
const buttonAdd = document.querySelector('.buttonAdd');
const listaParticipantes = document.getElementById('listaParticipantes');
const resultadoDiv = document.getElementById('resultado');
const buttonDraw = document.querySelector('.button-draw'); // Botão "Sortear amigo"

// Array para armazenar os nomes dos participantes
let participantes = [];

// Função para adicionar um participante
function adicionarParticipante() {
    const nome = inputName.value.toLowerCase().trim(); // Obtém o nome e remove espaços em branco
    if (participantes.includes(nome)) {
        alert('Este participante já foi adicionado!');
        inputName.value = "";
        return;
    } if(nome === ""){
        alert('Adicione ao menos um participante');
        return;
    }
     else { // Verifica se o nome não está vazio e não é duplicado
        participantes.push(nome); // Adiciona o nome ao array
        exibirParticipantes(); // Atualiza a exibição na tela
        inputName.value = ''; // Limpa o campo de input
        inputName.focus(); // Retorna o foco para o input
        atualizarBotoes(); // Habilita/desabilita o botão de sortear)
    }
}

// Função para exibir os participantes na lista
function exibirParticipantes() {
    listaParticipantes.innerHTML = ''; // Limpa a lista antes de redesenhar
    participantes.forEach((participante, index) => {
        const li = document.createElement('li');
        li.classList.add('name-list-item');
        li.textContent = participante;

        // Adiciona um botão para remover o participante
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button');
        removeButton.onclick = () => removerParticipante(index);

        li.appendChild(removeButton);
        listaParticipantes.appendChild(li);
    });
}

// Função para remover um participante
function removerParticipante(index) {
    participantes.splice(index, 1); // Remove o participante do array
    exibirParticipantes(); // Atualiza a exibição
    atualizarBotoes(); // Habilita/desabilita o botão de sortear
    resultadoDiv.innerHTML = ''; // Limpa o resultado se remover alguém após sortear
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (participantes.length < 1) {
        alert('Adicione pelo menos dois participantes para fazer o sorteio!');
        return;
    }

    // Gera um índice aleatório baseado no comprimento do array de participantes.
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const nomeSorteado = participantes[indiceAleatorio];

    if (resultadoDiv) {
        resultadoDiv.innerHTML = `O nome do sorteado é: <strong>${nomeSorteado}</strong>`;
    } else {
        console.log(`O nome do sorteado é: ${nomeSorteado}`);
        alert(`O nome do sorteado é: ${nomeSorteado}`);
    }

    // Adiciona um botão para reiniciar o sorteio após o sorteio
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Reiniciar Sorteio';
    restartButton.classList.add('button-reset');
    restartButton.onclick = reiniciarSorteio;
    resultadoDiv.appendChild(restartButton);

 // Desabilita o botão de sortear após o sorteio
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
    participantes = []; // Limpa o array de participantes
    listaParticipantes.innerHTML = ''; // Limpa a lista na tela
    resultadoDiv.innerHTML = ''; // Limpa os resultados do sorteio
    inputName.value = ''; // Limpa o input
    inputName.focus(); // Retorna o foco
    atualizarBotoes(); // Reabilita o botão de sortear
}

// Função para habilitar/desabilitar o botão de sortear
function atualizarBotoes() {
    buttonDraw.disabled = participantes.length < 2; // Desabilita se menos de 2 participantes
}

// --- Event Listeners ---

// Evento para o botão "Adicionar"
buttonAdd.addEventListener('click', adicionarParticipante);

// Evento para a tecla "Enter" no campo de input
inputName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarParticipante();
    }
});

// Evento para o botão "Sortear amigo"
// Nota: O HTML original tinha 'onclick="sortearAmigo"()'. Removi os parênteses extras e coloquei no JS.
buttonDraw.addEventListener('click', sortearAmigo);

// Inicialização: Desabilita o botão de sortear ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
atualizarBotoes();
});