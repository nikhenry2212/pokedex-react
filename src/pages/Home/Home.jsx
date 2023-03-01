/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import json from "./../../shared/pokemonTypes.json";
// import { api } from "../../api/axios";
import axios from "axios";
import "./Home.css";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
  Container,
  Input,
  Button,
} from "@chakra-ui/react";
// import { axios } from 'axios';

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    getPokemons();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 200; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      console.log(res);
      setPokemons(res);
    });
  };

  const searchPokemon =  (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
     axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`).then(res => console.log(res))
    // console.log(data);
   
  };
  return (
    <div style={{ backgroundColor: "#393053" }}>
      <Flex
        backgroundColor={"#393053"}
        // alignItems="center"
        width={"100%"}
        flexDirection={"row"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Input
          width={"400px"}
          placeholder="Capture um Pokemon "
          type={'text'}
          value={value}
          // eslint-disable-next-line no-restricted-globals
          onChange={searchPokemon}
          // onChangeCapture={value}
          marginTop={"32px"}
        />

        <Button
          marginLeft={"16px"}
          marginTop={"32px"}
          onChange={(e) => searchPokemon(e)}
        >
          Capturar
        </Button>
      </Flex>

      <Flex
        backgroundColor={"#393053"}
        minWidth="100%"
        alignItems="center"
        gap="2"
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent="center"
      >
        {pokemons.map((pokemon, index) => (
          <Card key={index} marginTop={8} width="400px">
            <CardBody>
              <Image
                backgroundColor={"#000"}
                src={
                  pokemon.data.sprites.other["official-artwork"].front_default
                }
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  {pokemon.data.name.toLocaleUpperCase()}
                </Heading>
                <Text
                  style={
                    pokemon.data.types.map((slot) => slot.type.name) !==
                    json.map((item) => item.english.charAt())
                      ? { background: json.map((item) => item.color) }
                      : { background: "#050505" }
                  }
                >
                  type: {pokemon.data.types.map((slot) => slot.type.name)}
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  weight: {pokemon.data.weight} kg
                </Text>
              </Stack>
            </CardBody>
            {/* <Divider /> */}
          </Card>
        ))}
      </Flex>
    </div>
  );
}
