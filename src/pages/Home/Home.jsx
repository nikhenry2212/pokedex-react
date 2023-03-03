/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import json from "./../../shared/pokemonTypes.json";
// import { api } from "../../api/axios";
import axios from "axios";

// import { DeleteIcon  } from '@mui/icons-material';

import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
// import { axios } from 'axios';
import ClearIcon from "@mui/icons-material/Clear";

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [value, setValue] = useState([]);
  const [cleanField, setCleanField] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        searchPokemonId(values.name.toLocaleLowerCase());

        resolve();
      }, 3000);
    });
  }

  const searchPokemonId = (idOrName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
      .then((res) => {
        setValue(res.data);
        setCleanField(true);
      })
      .catch((err) => console.error(err));
  };

  const cleanFieldAndForm = () => {
    console.log("aqui");
    setCleanField(false);
    reset();
  };

  return (
    <div style={{ backgroundColor: "#393053" }}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          width={"400px"}
          flexDirection={"row"}
          justifyContent="center"
          display={"flex"}
          marginTop={"16px"}
          alignItems={"center"}
          color="#fff"
          backgroundColor={"#393053"}
          isInvalid={errors.name}
        >
          <Input
            id="name"
            placeholder="Capture um Pokemon"
            onChange={(e) => onSubmit(e)}
            {...register("name", {
              required: "Campo obrigatório",
              minLength: { value: 4, message: "Minimo de 4 caracteres" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
          <Button
            marginLeft={"16px"}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Capturar
          </Button>
        </FormControl>
      </form>

      {value.length !== 0 && cleanField ? (
        <Flex display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Card
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            width={"300px"}
            marginTop={8}
          >
            <CardBody
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                width={"100px"}
                backgroundColor={"#000"}
                borderRadius="lg"
                src={value.sprites.front_default}
              />
              <Stack mt="" spacing="3">
                <Heading ml="6" size="md">
                  {value.name.toLocaleUpperCase()}
                </Heading>

                {/* <DeleteIcon/> */}
              </Stack>
              <Button
                onClick={() => cleanFieldAndForm()}
                size={"sm"}
                ml="4"
                color={"#dd0a03"}
                backgroundColor={"#6371aa"}
              >
                <ClearIcon color={"success"} />
              </Button>
            </CardBody>
          </Card>
        </Flex>
      ) : (
        <span></span>
      )}
      {/* <Flex></Flex> */}

      <Flex
        backgroundColor={"#393053"}
        minWidth="100%"
        alignItems="center"
        gap="2"
        flexDirection={"row"}
        flexWrap={"wrap"}
        justifyContent="center"
        
      >
     { pokemons.length === 0 ?
     <Flex minWidth="100%"
     backgroundColor={"#393053"}
     alignItems="center"
     gap="2"
     flexDirection={"row"}
     height="900px"
     flexWrap={"wrap"}
     justifyContent="center">
      <Image
      
        src={"https://media.tenor.com/_3R8EL8_DQYAAAAi/pokeball-pokemon.gif"}
      />  
      <Text color={'#fff'} fontSize={24}>
        Carregando...
      </Text>
     </Flex>

      :
        pokemons.map((pokemon, index) => (
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
