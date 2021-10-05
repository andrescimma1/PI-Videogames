import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [loading, setLoading] = useState(true);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage !== 7) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (loading) {
      dispatch(showGames());
      dispatch(showGenres());
      setLoading(false);
    }
  });

  return (
    <div>
      <input
        onChange={(e) => {
          if (e.target.value.length !== 0) {
            setAlphabetic(false);
            dispatch(filterForInput(e.target.value, games));
          }
          setInput(e.target.value);
        }}
      />
      <div>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            if (genre) setGenre(false);
            else setGenre(true);

            if (e.target.value !== 0) {
              dispatch(filterForGenre(e.target.value, games));
              setGenre(!genre);
            } else {
              setGenre(!genre);
            }
          }}
        >
          <option selected value="0">
            Elige un género
          </option>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setAlphabetic(!alphabetic);
            if (e.target.value == 1) {
              dispatch(ascendingOrder(games));
              setAlphabetic(!alphabetic);
            } else if (e.target.value == 2) {
              dispatch(descendingOrder(games));
              setAlphabetic(!alphabetic);
            }
          }}
        >
          <option selected value="0" disabled>
            Elige una opción
          </option>
          <option value="1">Ascendente</option>
          <option value="2">Descendente</option>
        </select>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setRating(!rating);
            if (e.target.value == 1) {
              dispatch(higherRating(games));
              setRating(!rating);
            } else if (e.target.value == 2) {
              dispatch(lowerRating(games));
              setRating(!rating);
            } else setRating(false);
          }}
        >
          <option selected value="0" disabled>
            Elige una opción
          </option>
          <option value="1">Mayor Rating</option>
          <option value="2">Menor Rating</option>
        </select>
        <Link to="/addGame">Agregar juego</Link>
      </div>
      <div class="container">
        {(input.length === 0 || alphabetic || rating) && !genre
          ? currentPosts.map((game) => (
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating}</p>
                <p>{game.genres.map((genre) => genre.name)}</p>
                <Link to={(id) => `/games/${game.id}`}>Ver más..</Link>
              </div>
            ))
          : filteredGames.map((game) => (
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating}</p>
                <p>{game.genres.map((genre) => genre.name)}</p>
                <Link to={(id) => `/games/${game.id}`}>Ver más..</Link>
              </div>
            ))}
        <button onClick={() => prevPage()}>Anterior</button>
        <button onClick={() => nextPage()}>Siguiente</button>
      </div>
    </div>
  );
}
