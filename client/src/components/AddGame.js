import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterForGenre, showGenres } from "../todos/action";

export default function AddGame() {
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState(false);

  useEffect(() => {
    if (loading) {
      dispatch(showGenres());
      setLoading(false);
    }
  });

  return (
    <div>
      <form>
        <label>Nombre: </label>
        <input />
        <label>Descripción: </label>
        <textarea />
        <label>Fecha de lanzamiento: </label>
        <input />
        <label>Rating: </label>
        <input />
        <select
          onChange={(e) => {
            // console.log(e.target.value);
            // if (genre) setGenre(false);
            // else setGenre(true);
            // if (e.target.value !== 0) {
            //   dispatch(filterForGenre(e.target.value, games));
            //   setGenre(!genre);
            // } else {
            //   setGenre(!genre);
            // }
          }}
        >
          <option selected value="0">
            Elige un género
          </option>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <select>
          <option selected value="0">
            Elige las plataformas
          </option>
          <option value="Android">Android</option>
          <option value="Apple Macintosh">Apple Macintosh</option>
          <option value="Linux">Linux</option>
          <option value="Nintendo">Nintendo</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="XBOX">XBOX</option>
        </select>
      </form>
    </div>
  );
}
