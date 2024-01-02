// src/components/Cell.js
import React from 'react';
import { TETROMINOS } from '../tetrominos';
import './Cell.css';

const Cell = ({ type }) => (
  <div className={`cell ${type}`} style={{ backgroundColor: TETROMINOS[type].color }} />
);

export default Cell;