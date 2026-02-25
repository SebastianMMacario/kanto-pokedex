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

async function renderPokemonList(pokemonArray) {
  const promises = pokemonArray.map(pokemon => createPokemonCardData(pokemon));
  
  const allPokemonData = await Promise.all(promises);

  allPokemonData
    .sort((a, b) => a.id - b.id)
    .forEach(data => createPokemonCard(data));
}

async function createPokemonCardData(pokemon) {
  const response = await fetch(pokemon.url);
  return await response.json();
}

function createPokemonCard(data) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const id = data.id.toString().padStart(3, "0");
  const image = data.sprites.other["official-artwork"].front_default;
  const name = data.name;
  // Obtenemos tipo de Pokemon
  const mainType = data.types[0].type.name;

card.innerHTML = `
  <div class="card-inner">
    <div class="card-front">
      <p>#${id}</p>
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
    </div>

    <div class="card-back">
      <h4>Type</h4>
      <p>${data.types.map(t => t.type.name).join(", ")}</p>

      <h4>Stats</h4>
      ${data.stats.map(stat => `
        <p>${stat.stat.name}: ${stat.base_stat}</p>
      `).join("")}
    </div>
  </div>
`;

  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");

  // 🎨 Aplicamos color según tipo
  const color = typeColors[mainType] || "#777";

  front.style.backgroundColor = color;
  back.style.background = `linear-gradient(135deg, ${color}, #222)`;

  pokedex.appendChild(card);
}

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

getPokemonList();