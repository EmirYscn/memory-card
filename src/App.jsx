import { useEffect, useState } from "react";

const POKEMON_API = `https://pokeapi.co/api/v2/pokemon/`;
const POKEMON_COUNT = 15;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //TODO: Shuffle array function
  function shuffle(array) {
    return;
  }

  // fetch pokemons
  useEffect(() => {
    async function fetchPokemon() {
      const pokis = [];

      setIsLoading(true);
      for (let i = 1; i < POKEMON_COUNT + 1; i++) {
        const res = await fetch(`${POKEMON_API}${i}/`);
        const data = await res.json();
        const imgUrl = data.sprites.front_default;
        const name = data.name;
        pokis.push({ id: i, name, imgUrl });
      }
      // shuffle poki array before setting
      shuffle(pokis);
      setPokemons(pokis);
      setIsLoading(false);
      console.log(pokemons);
    }

    fetchPokemon();
  }, []);

  return (
    <>
      <Header />
      <GameInfo />
      {isLoading ? <Loading /> : <Pokemons pokemons={pokemons} />}
    </>
  );
}

function Loading() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Memory Game</h1>
    </header>
  );
}

function GameInfo() {
  return (
    <div className="info">
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <div className="scores">
        <p>Score: 0</p>
        <p>Best Score: 0</p>
      </div>
    </div>
  );
}

function Pokemons({ pokemons }) {
  return (
    <div className="pokemons">
      {pokemons.map((pokemon) => (
        <Pokemon pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}

function Pokemon({ pokemon }) {
  return (
    <div className="pokemon">
      <img src={pokemon.imgUrl} alt={pokemon.name} />
      <p>
        <em>{pokemon.name}</em>
      </p>
    </div>
  );
}

//TODO: Fetch pokemons
//TODO: Shuffle pokemons
//TODO: Display pokemons
