// Pegando os elementos da página 
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pokemonAtual = 1;

// Função que irá fazer requisição na API
async function buscarPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    // realizando a requisição e obtendo a uma resposta 
    const response = await fetch(url);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    }
}

// Função que irá renderizar o pokemon na página
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await buscarPokemon(pokemon);
    console.log(data);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        pokemonAtual = data.id;
    }
    else {
        pokemonName.innerText = "Não encontrado :<";
        pokemonNumber.innerText = "";
        pokemonImage.style.display = 'none';
    }
}

// Evento de submit do formulário
form.addEventListener('submit', (e) => {
    // Impede a página de dar o 'reload'
    e.preventDefault();
    // Chamando a função renderPokemon passando o value digitado
    // no input
    renderPokemon(input.value.toLowerCase());
})


// Botão para passar para o proximo ou o anterior
btnNext.addEventListener('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
})

btnPrev.addEventListener('click', () =>{
    if (pokemonAtual > 1) {
        pokemonAtual--;
        renderPokemon(pokemonAtual);
    }

})

renderPokemon(pokemonAtual)
