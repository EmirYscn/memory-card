import { useEffect, useState } from "react";
import { GameInfo } from "./components/GameInfo";
import { PokiDisplay } from "./components/Pokemons";
import { Header } from "./components/Header";
import { WonDisplay } from "./components/WonDisplay";

const POKEMON_API = `https://pokeapi.co/api/v2/pokemon/`;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsCount, setPokemonsCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIDs, setClickedIDs] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const hasWon = currentScore === pokemonsCount;

  //TODO: Shuffle array function using Fisher-Yates Sorting Algorithm
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  function handleClick(id) {
    if (clickedIDs.includes(id)) {
      if (currentScore > bestScore) setBestScore(currentScore);
      setClickedIDs([]);
      setCurrentScore(0);
    } else {
      const nextIDs = clickedIDs.slice();
      nextIDs.push(id);
      setClickedIDs(nextIDs);
      setCurrentScore((cur) => cur + 1);
    }

    const nextPokis = pokemons.slice();
    shuffle(nextPokis);
    setPokemons(nextPokis);
  }

  function resetGame() {
    setBestScore(currentScore);
    setCurrentScore(0);
    setClickedIDs([]);
  }

  // fetch pokemons
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchPokemon() {
      const pokis = [];

      setIsLoading(true);
      for (let i = 1; i < pokemonsCount + 1; i++) {
        const res = await fetch(`${POKEMON_API}${i}/`, {
          signal: abortController.signal,
        });
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

    return () => abortController.abort();
  }, [pokemonsCount]);

  return (
    <>
      <Header />
      <GameInfo
        score={currentScore}
        bestScore={bestScore}
        pokemonsCount={pokemonsCount}
        setPokemonsCount={setPokemonsCount}
      />
      {hasWon ? (
        <WonDisplay onResetGame={resetGame} />
      ) : (
        <PokiDisplay
          isLoading={isLoading}
          pokemons={pokemons}
          onclick={handleClick}
        />
      )}
    </>
  );
}
