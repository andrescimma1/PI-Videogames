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
      <div class="container-top">
        <select
          onChange={(e) => {
            if (e.target.value == 0) {
              setGenre(false);
            } else {
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
            Alphabetically
          </option>
          <option value="1">A - Z</option>
          <option value="2">Z - A</option>
        </select>
        <span class="custom-arrow"></span>
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
            By rating:
          </option>
          <option value="1">Higher Rating</option>
          <option value="2">Lower Rating</option>
        </select>
        <span class="custom-arrow"></span>
        <input
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              setAlphabetic(false);
              dispatch(filterForInput(e.target.value, games));
            }
            setInput(e.target.value);
          }}
        />
        <Link class="link-button" to="/videogame">
          Add Game
        </Link>
      </div>
      <div class="container">
        {(input.length === 0 || alphabetic || rating) && !genre
          ? currentPosts.map((game) => (
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating}</p>
                <p>
                  {game.genres ? (
                    game.genres.map((genre) => genre.name + " | ")
                  ) : (
                    <p>No genre</p>
                  )}
                </p>
                <Link to={() => `/videogame/${game.id}`}>See more..</Link>
              </div>
            ))
          : filteredGames.map((game) => (
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
