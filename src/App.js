import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";

// image for the pokemon
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png

const pokemon = [
  { id: "004", name: "charizard" },
  { id: "010", name: "caterpie" },
  { id: "077", name: "ponyta" },
  { id: "108", name: "lickitung" },
  { id: "132", name: "ditto" },
  { id: "133", name: "eevee" },
];
const doublePokemon = shuffle([...pokemon, ...pokemon]);
let alerted = false;

export default function App() {
  const [opened, setOpened] = useState([]);
  const [count, setCount] = useState(0);
  const [index1, setIndex1] = useState();
  const [index2, setIndex2] = useState();
  
  if (opened.length == 12 && !alerted) {
    alerted = true;
    setTimeout(() => alert("you won!"), 800);
  }

  if (count % 2 == 0 && (index1 || index2)) {
    determine(index1, index2);
    setIndex1();
    setIndex2();
  }
  
  function determine(index1, index2) {
    if (doublePokemon[index1].id != doublePokemon[index2].id) {
      const clouddOpened = [...opened];
      const afterRemove = clouddOpened.filter(index => index != index1 && index != index2);
      setTimeout(() => setOpened(afterRemove), 800);
    }
  }

  function flipCard(index) {
    if (opened.includes(index)) return;

    setCount(count + 1);
    setOpened([...opened, index]);
    
    
    if (count % 2 == 0) {
      setIndex1(index);
    } else {
      setIndex2(index);
    }

  }

  return (
    <div className="app">
      <p>
        {count} <strong>moves</strong>
      </p>

      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          if (opened.includes(index)) {
            isFlipped = true;
          }

          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

function PokemonCard({ index, pokemon, isFlipped, flipCard }) {
  return (
    <button
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}
