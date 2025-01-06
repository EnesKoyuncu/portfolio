import React from "react";
import myImage from "../img/pp2kARE.jpg";
import "../css/hero.css";

export default function Hero() {
  // 10x10'luk grid için koordinatları oluştur
  const createGridItems = () => {
    const items = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        items.push(
          <div
            className={`hero-right-container-item grid-item-${row}-${col}`}
            key={`${row}-${col}`}
            data-row={row}
            data-col={col}
          />
        );
      }
    }
    return items;
  };

  return (
    <div className="hero-main">
      <div className="hero-left">
        <div className="hero-left-card">
          <img src={myImage} alt="my-image" />
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-right-container">{createGridItems()}</div>
      </div>
    </div>
  );
}
