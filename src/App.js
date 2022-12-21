import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import xtype from 'xtypejs'

function App() {
  const [pokemons, setPokemon] = useState([]);
  const [amount, setAmount] = useState(1);
  const [randomOffset, setRandomOffset] = useState(0);

  const fetchPokemon = async () => {
    const pokemonResponse = await axios(
      `https://pokeapi.co/api/v2/pokemon/?offset=${randomOffset}&limit=${amount}`
    );
    const pokemonData = pokemonResponse.data.results;
    if(xtype.type(pokemonData) === 'array'){
      setPokemon(pokemonData);
    }
    else{
      console.log("Something went wrong.")
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [randomOffset]);

  const handleClick = () => {
    setRandomOffset(Math.floor(Math.random()*1000));
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if(value >= 0){
      setAmount(value);
    }
  };

  if (pokemons.length > 0) {
    return (
      <div className="App">
        <h1>How many pokemons do you want to summon?</h1>
        <input type="number" value={amount} min={0} onChange={handleChange}></input>
        <button onClick={handleClick}>Summon!</button>
        <ol>
          {pokemons.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ol>
      </div>
    );
  } else {
    return (
      <div>
        <p>Oops! Couldn't fetch any pokemons...</p>
      </div>
    );
  }
}

export default App;
