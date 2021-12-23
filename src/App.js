import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  let colors = ["yellow", "red", "green", "blue"];
  const [gameStart, setGameStart] = useState(false);
  const [computerChoices, setComputerChoices] = useState([]);
  const [playerChoices, setPlayerChoices] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBlink = (ind) => {
    setSelectedBox(ind);
    setTimeout(() => {
      setSelectedBox(null);
    }, 333);
  };
  const handleRandomBox = () => {
    let randonIndex = Math.floor(Math.random() * 4);
    setComputerChoices([...computerChoices, randonIndex]);
    showComputerOrder([...computerChoices, randonIndex]);
  };
  const showComputerOrder = (pathern) => {
    for (let i = 0; i < pathern.length; i++) {
      setTimeout(() => {
        handleBlink(pathern[i]);
      }, 500 * (i + 1));
    }
  };
  const handleClick = (ind) => {
    handleBlink(ind);
    let newPlayerChoices = [...playerChoices, ind];
    if (computerChoices[currentIndex] !== ind) {
      setGameOver(true);
      setPlayerChoices([]);
      setCurrentIndex(0);
    } else {
      setPlayerChoices(newPlayerChoices);
      if (currentIndex < computerChoices.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex === computerChoices.length - 1) {
        setCurrentIndex(0);
        setPlayerChoices([]);
        handleRandomBox();
      }
    }
  };

  useEffect(() => {
    showComputerOrder([0, 1, 2, 3, 1, 0, 2, 3]);
  }, []);
  const playGame = () => {
    setGameStart(true);
    setComputerChoices([2]);
    showComputerOrder([2]);
  };
  const restartGame = () => {
    setGameOver(false);
    playGame();
  };
  return (
    <section>
      <div className="box-container">
        {colors.map((color, i) => (
          <div
            key={i}
            id={i}
            className="box"
            onClick={(e) => handleClick(i)}
            style={{
              backgroundColor: color,
              opacity: selectedBox === i ? 1 : 0.5,
            }}
          ></div>
        ))}
      </div>
      <div>
        {!gameStart && !gameOver && <button onClick={playGame}>Start</button>}
        {gameStart && gameOver && (
          <div>
            <button onClick={restartGame}>Restart</button>
            <h2>Grrrrrr You lost the game!</h2>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
