export function GameInfo({
  score,
  bestScore,
  pokemonsCount,
  setPokemonsCount,
}) {
  function handleChange(e) {
    setPokemonsCount(Number(e.target.value));
  }

  return (
    <div className="info">
      <p>
        Get points by clicking on an image but don't click on any more than
        once!
      </p>
      <div>
        <label for="difficulty">Difficulty:</label>
        {"  "}
        <select
          value={pokemonsCount}
          onChange={handleChange}
          className="select"
          id="difficulty"
        >
          <option value="10">Easy</option>
          <option value="15">Medium</option>
          <option value="20">Hard</option>
          <option value="30">Extra Hard</option>
        </select>
      </div>

      <div className="scores">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
    </div>
  );
}
