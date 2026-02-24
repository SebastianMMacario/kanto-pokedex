const pokedex = document.getElementById("pokedex");

async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

  renderPokemonList(data.results);
}

function renderPokemonList(pokemonArray) {
  pokemonArray.forEach(pokemon => {
    createPokemonCard(pokemon);
  });
}

async function createPokemonCard(pokemon) {
  const response = await fetch(pokemon.url);
  const data = await response.json();

  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const id = data.id.toString().padStart(3, "0");
  const image = data.sprites.other["official-artwork"].front_default;
  const name = data.name;

  card.innerHTML = `
    <p>#${id}</p>
    <img src="${image}" alt="${name}" />
    <h3>${name}</h3>
  `;

  pokedex.appendChild(card);
}

getPokemonList();