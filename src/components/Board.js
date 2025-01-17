import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ stage }) => (
  <div className="board">
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </div>
);

export default Board;