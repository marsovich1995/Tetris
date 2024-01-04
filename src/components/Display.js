import React from 'react';
import './Display.css';

const Display = ({ gameOver, text }) => (
  <div className="display">{text}</div>
);

export default Display;