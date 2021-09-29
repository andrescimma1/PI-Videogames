import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showGames } from "../todos/action";

export default function Home(props) {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  return (
    <div>
      <button onClick={() => dispatch(showGames())}>BUTTON</button>
      <span>
        {games.map((game) => (
          <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} />
          </div>
        ))}
      </span>
    </div>
  );
}
