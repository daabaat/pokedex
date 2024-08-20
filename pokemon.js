const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        response.json();
      }),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
        (response) => {
          response.json();
        }
      ),
    ]);
    return true;
  } catch (error) {
    console.eroor("데이터를 불러오는데 실패했습니다.");
  }
}

// 포켓몬을 화면에 보여주는 함수

function displayPokemons(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pokemon) => {
    // https://pokeapi.co/api/v2/pokemon/${id}
    const pokemonId = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class = "number-wrap">
            <p class="caption-fonts">#${pokemonId} </p>
        </div>
        <div class = "img-wrap">
            <img src = "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt=${pokemon.name}/>
        </div>
        <div class="name-wrap>
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
        `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonId);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonId}`;
      }
    });
    listWrapper.appendChild(listItem);
  });
}
