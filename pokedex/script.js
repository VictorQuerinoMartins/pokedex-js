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
  grid.classList.remove("grid-fade");
  void grid.offsetWidth;
  grid.classList.add("grid-fade");
  grid.innerHTML = "";

  for (let i = 0; i < pokemonsDaPagina.length; i++) {
    const dadosPokemon = pokemonsDaPagina[i];

    const tiposHTML = dadosPokemon.types
      .map(t => `<span class="pokemon-type ${t.type.name}">${t.type.name}</span>`)
      .join("");

    const cardHTML = `<div class="pokemon-card">
        <div class="card-top">
          <div class="pokemon-tipos">${tiposHTML}</div>
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

function desenharSkeleton() {
  const grid = document.querySelector("#pokemon-grid");
  grid.innerHTML = "";

  for (let i = 0; i < itensPorPagina; i++) {
    const skeletonHTML = `
      <div class="pokemon-card skeleton-card">
        <div class="card-top">
          <div class="skeleton skeleton-text-small"></div>
          <div class="skeleton skeleton-text-small"></div>
        </div>
        <div class="skeleton skeleton-img-box"></div>
        <div class="skeleton skeleton-text-large"></div>
      </div>
    `;
    grid.innerHTML += skeletonHTML;
  }
}

async function chamarAPI() {
  desenharSkeleton();

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

const btnTema = document.querySelector("#btn-tema");

btnTema.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

const input = document.querySelector(".search-input"); // input para pesquisa
const selectTipo = document.querySelector("#filtro-tipo");

input.addEventListener("input", aplicarFiltros);
selectTipo.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const valorTexto = input.value.toLowerCase();
  const valorTipo = selectTipo.value;

  if (valorTexto === "" && valorTipo === "") {
    paginaAtual = 1;
    desenharTela(todosPokemons);
    return;
  }

  const pokemonsFiltrados = todosPokemons.filter((pokemon) => {
    const passaNome = pokemon.name.includes(valorTexto);
   
    const passaTipo = valorTipo === "" || pokemon.types.some(t => t.type.name === valorTipo);

    return passaNome && passaTipo; 
  });

  if (pokemonsFiltrados.length === 0) {
    document.querySelector("#pokemon-grid").innerHTML = 
      "<p class='ERRO-BUSCA'>Nenhum Pokémon encontrado com esses filtros.</p>";
    document.querySelector(".page-numbers").innerHTML = ""; 
    return;
  }

  paginaAtual = 1;
  desenharTela(pokemonsFiltrados);
}

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
lucide.createIcons();

