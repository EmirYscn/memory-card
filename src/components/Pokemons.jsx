import { Loading } from "./Loading";

function PokiDisplay({ isLoading, pokemons, onclick }) {
  return isLoading ? (
    <Loading />
  ) : (
    <Pokemons pokemons={pokemons} onclick={onclick} />
  );
}

function Pokemons({ pokemons, onclick }) {
  return (
    <div className="pokemons">
      {pokemons.map((pokemon) => (
        <Pokemon pokemon={pokemon} key={pokemon.id} onclick={onclick} />
      ))}
    </div>
  );
}
function Pokemon({ pokemon, onclick }) {
  return (
    <div className="pokemon" onClick={() => onclick(pokemon.id)}>
      <img src={pokemon.imgUrl} alt={pokemon.name} />
      <p>
        <em>{pokemon.name}</em>
      </p>
    </div>
  );
}

export { PokiDisplay };
