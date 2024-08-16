export function WonDisplay({ onResetGame }) {
  return (
    <div className="won">
      <h1>You Won</h1>
      <button className="btn" onClick={onResetGame}>
        Play Again
      </button>
    </div>
  );
}
