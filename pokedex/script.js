const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

let todosPokemons = [];
const itensPorPagina = 24;

const parametrosURL = new URLSearchParams(window.location.search);
let paginaAtual = Number(parametrosURL.get("pagina")) || 1;

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

  const totalPaginas = Math.ceil(listaDeDados.length / itensPorPagina);

  const containerNumeros = document.querySelector(".page-numbers");
  containerNumeros.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    if (i === paginaAtual) {
      containerNumeros.innerHTML += `<button class="page-num active">${i}</button>`; // add classe "active"
    } else {
      containerNumeros.innerHTML += `<button class="page-num">${i}</button>`;
    }
  }

  window.history.pushState(null, "", `?pagina=${paginaAtual}`);

  const botoesNumero = document.querySelectorAll(".page-num");

  for (let i = 0; i < botoesNumero.length; i++) {
    botoesNumero[i].addEventListener("click", function () {
      paginaAtual = Number(this.textContent); // Pega o número que está escrito dentro e transforma em  (Number)

      desenharTela(listaDeDados);
    });
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
  } else {
    document.querySelector("#pokemon-grid").innerHTML =
      "<p class='erro-busca'> Erro ao carregar os dados.</p>";
  }
}

const input = document.querySelector(".search-input"); // input para pesquisa

input.addEventListener("input", function () {
  const valorInput = input.value.toLowerCase();
  const pokemonsFiltrados = todosPokemons.filter((pokemon) =>
    pokemon.name.includes(valorInput),
  );

  if (input.value === "") {
    paginaAtual = 1;
    desenharTela(todosPokemons);
  }

  if (pokemonsFiltrados.length === 0) {
    document.querySelector("#pokemon-grid").innerHTML =
      "<p class='erro-busca'> Nenhum Pokémon encontrado.</p>";

    document.querySelector(".page-numbers").innerHTML = "";
    document.querySelector(".page-next").innerHTML = "";
    document.querySelector(".page-prev").innerHTML = "";

    return;
  }

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
