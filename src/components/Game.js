import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import Board from './Board';
import Display from './Display';
import './Game.css';

const Game = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(30);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className="game" role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <Board stage={stage} />
      <aside>
        {gameOver ? (
          <Display gameOver={gameOver} text="Game Over" />
        ) : (
          <div>
            <Display text={`Score: 0`} />
            <Display text={`Rows: 0`} />
            <Display text={`Level: 0`} />
          </div>
        )}
        <button onClick={startGame}>Start Game</button>
      </aside>
    </div>
  );
};

export default Game;