import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  APIorDB,
  API_OR_DB,
  ascendingOrder,
  descendingOrder,
  filterForGenre,
  filterForInput,
  higherRating,
  lowerRating,
  showGames,
  showGenres,
} from "../todos/action";

export default function Home(props) {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const filteredGames = useSelector((state) => {
    if (state.filteredGames) return state.filteredGames;
  });
  const genres = useSelector((state) => state.genres);

  const [genre, setGenre] = useState(false);
  const [input, setInput] = useState("");
  const [alphabetic, setAlphabetic] = useState(false);
  const [rating, setRating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiOrDb, setApiOrDb] = useState(false);

  // Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  const indexOfLastPost = currentPage * postsPerPage; // 1 x 15 = 15
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 1 - 15 = -14
  // Con el slice reparto los juegos en posts de 15
  const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    // Si no es la última página entonces cambiar a la siguiente página
    if (currentPage !== 7) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    // Si no es la primer página entonces cambiar a la página anterior
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // Después de cargar el DOM
  useEffect(() => {
    if (loading) {
      // Si la página está cargando entonces..
      // Muestro los juegos y los géneros
      // Seteo el loading el false
      dispatch(showGames());
      dispatch(showGenres());
      setLoading(false);
    }
  });

  return (
    <div>
      <div class="container-top">
        <select
          onChange={(e) => {
            // Si no selecciona ningún género entonces..
            if (e.target.value == 0) {
              setGenre(false);
            } else {
              // Sino los filtro por el género seleccionado
              setGenre(false);
              dispatch(filterForGenre(e.target.value, games));
              setGenre(true);
            }
          }}
        >
          <option selected value="0">
            By genre:
          </option>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <span class="custom-arrow"></span>
        <select
          onChange={(e) => {
            setAlphabetic(!alphabetic);
            if (e.target.value == 1) {
              // Si selecciona de forma ascendente (A-Z) entonces..
              dispatch(ascendingOrder(games));
              setAlphabetic(!alphabetic);
            } else if (e.target.value == 2) {
              // Sino.. si selecciona de forma descendente (Z-A) entonces..
              dispatch(descendingOrder(games));
              setAlphabetic(!alphabetic);
            }
          }}
        >
          <option selected value="0" disabled>
            Alphabetically
          </option>
          <option value="1">A - Z</option>
          <option value="2">Z - A</option>
        </select>
        <span class="custom-arrow"></span>
        <select
          onChange={(e) => {
            setRating(!rating);
            if (e.target.value == 1) {
              // Si selecciona por mayor rating entonces..
              dispatch(higherRating(games));
              setRating(!rating);
            } else if (e.target.value == 2) {
              // Sino.. si selecciona por menor rating entonces..
              dispatch(lowerRating(games));
              setRating(!rating);
            } else setRating(false);
          }}
        >
          <option selected value="0" disabled>
            By rating:
          </option>
          <option value="1">Higher Rating</option>
          <option value="2">Lower Rating</option>
        </select>
        <select
          onChange={(e) => {
            setApiOrDb(false);
            if (e.target.value == 0) setApiOrDb(false);
            else {
              dispatch(APIorDB(games, e.target.value));
              setApiOrDb(true);
            }
          }}
        >
          <option selected value="0">
            API or Database:
          </option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
        <span class="custom-arrow"></span>
        <input
          class="placeholder"
          placeholder="Search game.."
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              // Si el usuario ingresa al menos una letra en el input entonces..
              setAlphabetic(false);
              // Buscar los juegos que tengan esa letra o palabra
              dispatch(filterForInput(e.target.value, games));
            }
            setInput(e.target.value);
          }}
        />
        <Link to="/videogame">
          <button class="btn">Add Game</button>
        </Link>
      </div>
      <div class="container">
        {(input.length === 0 || alphabetic || rating) && !genre && !apiOrDb
          ? // Si no buscaron ni filtraron nada entonces..
            currentPosts.map((game) => (
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating}</p>
                <p>{game.genres.map((genre) => genre.name + " | ")}</p>
                <Link to={() => `/videogame/${game.id}`}>See more..</Link>
              </div>
            ))
          : // Sino mostrar el array de los juegos filtrados
            filteredGames.map((game) => (
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating}</p>
                <p>{game.genres.map((genre) => genre.name + " | ")}</p>
                <Link to={() => `/videogame/${game.id}`}>Show more..</Link>
              </div>
            ))}
      </div>
      <div class="button-container">
        <button class="btn" onClick={() => prevPage()}>
          Previous
        </button>
        <button class="btn" onClick={() => nextPage()}>
          Next
        </button>
      </div>
    </div>
  );
}
