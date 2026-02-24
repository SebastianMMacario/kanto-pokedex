// 1️⃣ Referencias al DOM
const pokedex = document.getElementById("pokedex");

// 2️⃣ Configuración / constantes globales
const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8"
};

// 3️⃣ Funciones
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

  // 🎨 Aplicamos color según tipo
  const mainType = data.types[0].type.name;
  card.style.backgroundColor = typeColors[mainType] || "#777";

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