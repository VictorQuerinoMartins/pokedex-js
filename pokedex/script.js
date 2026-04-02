const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

let todosPokemons = [];
let paginaAtual = 1;
const itensPorPagina = 24;

function desenharTela(listaDeDados) {
  let pginicio = (paginaAtual - 1) * itensPorPagina;
  let pgfim = paginaAtual * itensPorPagina;
  const pokemonsDaPagina = listaDeDados.slice(pginicio, pgfim);

  const grid = document.querySelector("#pokemon-grid");
  grid.innerHTML = "";

  for (let i = 0; i < pokemonsDaPagina.length; i++) {
    const dadosPokemon = pokemonsDaPagina[i];

    const cardHTML = `<div class="pokemon-card">
        <div class="card-top">
          <span class="pokemon-type ${dadosPokemon.types[0].type.name}">${dadosPokemon.types[0].type.name}</span>
          <span class="pokemon-number">${dadosPokemon.order}</span>
        </div>
        <img
          src="${dadosPokemon.sprites.front_default}"
          alt="${dadosPokemon.name}"
          class="pokemon-img"
        >
        <p class="pokemon-name">${dadosPokemon.name}</p>
      </div>`;

    grid.innerHTML += cardHTML;
  }
}

async function chamarAPI() {
  const resposta = await fetch(URL);
  if (resposta.status === 200) {
    const obj = await resposta.json();

    for (let i = 0; i < obj.results.length; i++) {
      const respostaD = await fetch(obj.results[i].url);
      const dadosPokemon = await respostaD.json(); // dados do pokemon específico
      todosPokemons.push(dadosPokemon);
    }

    desenharTela(todosPokemons);
  }
}

const input = document.querySelector(".search-input"); // input para pesquisa

input.addEventListener("input", function () {
  const valorInput = input.value.toLowerCase();
  const pokemonsFiltrados = todosPokemons.filter((pokemon) =>
    pokemon.name.includes(valorInput),
  );

  paginaAtual = 1;

  desenharTela(pokemonsFiltrados); // desenha os pokemons filtrados
});

document.querySelector(".page-next").addEventListener("click", function () {
  paginaAtual++;
  desenharTela(todosPokemons);
});

document.querySelector(".page-prev").addEventListener("click", function () {
  if (paginaAtual > 1) {
    paginaAtual--;
    desenharTela(todosPokemons);
  }
});

chamarAPI();
