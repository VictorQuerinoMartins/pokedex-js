const URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

let todosPokemons = [];

async function chamarAPI() {
  const resposta = await fetch(URL);
  if (resposta.status === 200) {
    const obj = await resposta.json(); // transformar em objeto

    for (let i = 0; i < obj.results.length; i++) {
      const respostaD = await fetch(obj.results[i].url);
      const dadosPokemon = await respostaD.json();
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

      todosPokemons.push(dadosPokemon);

      document.querySelector("#pokemon-grid").innerHTML += cardHTML;
    }
  }
}

input = document.querySelector(".search-input");

input.addEventListener("input", function () {
  const valorInput = input.value.toLowerCase();

  const pokemonsFiltrados = todosPokemons.filter((pokemon) => pokemon.name.includes(valorInput),);

  document.querySelector("#pokemon-grid").innerHTML = ""; // Limpa o grid antes de exibir os result filtrados

  for (let i = 0; i < pokemonsFiltrados.length; i++) {
    const dadosPokemon = pokemonsFiltrados[i];

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

    document.querySelector("#pokemon-grid").innerHTML += cardHTML;
  }
});

chamarAPI();
