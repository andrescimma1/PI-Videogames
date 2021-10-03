import React, { useState } from "react";
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
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [alphabetic, setAlphabetic] = useState(false);
  const [rating, setRating] = useState(false);

  return (
    <div>
      <button onClick={() => dispatch(showGames())}>MOSTRAR JUEGOS</button>
      <button onClick={() => {
        console.log(filteredGames);
        dispatch(showGenres())
        }}>MOSTRAR GENEROS</button>
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
        {genres.map((genre) => (
          <div>
            <button
              onClick={(e) => {
                setClicked(!clicked);
                console.log(clicked);
                if(input.length === 0) dispatch(filterForGenre(e.target.innerHTML, games));
                else dispatch(filterForGenre(e.target.innerHTML, filteredGames));
              }}
            >
              {genre.name}
            </button>
          </div>
        ))}
        <select onChange={(e) => {
          console.log(e.target.value);
          if(e.target.value == 1) 
          {
            setAlphabetic(!alphabetic);
            dispatch(ascendingOrder(games));
            setAlphabetic(!alphabetic);
          }
          else if(e.target.value == 2){ 
            setAlphabetic(!alphabetic);
            dispatch(descendingOrder(games));
            setAlphabetic(!alphabetic);
          } 
        }} >
          <option selected value="0">Elige una opción</option>
          <option value="1">Ascendente</option>
          <option value="2">Descendente</option>
        </select>
        <select onChange={(e) => {
          console.log(e.target.value);
          if(e.target.value == 1) 
          {
            setRating(!rating);
            dispatch(higherRating(games));
            setRating(!rating);
          }
          else if(e.target.value == 2){ 
            setRating(!rating);
            dispatch(lowerRating(games));
            setRating(!rating);
          } 
        }} >
          <option selected value="0">Elige una opción</option>
          <option value="1">Mayor Rating</option>
          <option value="2">Menor Rating</option>
        </select>
      </div>
      <div>
        {input.length === 0 && !clicked || alphabetic || rating ? games.map((game) => (
            <div class="container">
              <div class="card">
                <img src={game.background_image} />
                <h4>{game.name}</h4>
                <p>{game.rating} ID:{game.id}</p>
                <p>
                  {game.genres.map((genre) => genre.name)}
                </p>
                <Link to={id => `/games/${game.id}`}>Ver más..</Link>
              </div>
            </div>
            ))
          : filteredGames.map((game) => (
              <div>
                <h1>{game.name}</h1>
                {game.genres.map((genre) => (
                  <h2>{genre.name}</h2>
                ))}
                <img src={game.background_image} />
              </div>
            ))}
      </div>
    </div>
  );
}
