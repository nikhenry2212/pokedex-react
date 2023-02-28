/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
// import { api } from "../../api/axios";
import axios from "axios";
import "./Home.css";
// import { axios } from 'axios';

export function Home() {


  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 200; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };
  return (
    <div className="container">

      {pokemons.map((pokemon, i) => (
        <h1 key={i}>{pokemon.data.name}</h1>
      ))}
    </div>
  );
}
