import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame, filterForGenre, showGenres } from "../todos/action";
import { Link } from "react-router-dom";

export default function AddGame() {
  const genres = useSelector((state) => state.genres);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (loading) {
      dispatch(showGenres());
      setLoading(false);
    }
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "Name is required";
    }

    if (!input.description) {
      errors.description = "Description is required";
    }

    return errors;
  }

  const handleSubmit = function () {
    if (Object.keys(validate(input)).length === 0) {
      dispatch(
        addGame(
          input.name,
          "background_image",
          input.description,
          "released",
          "rating",
          "Adventure",
          "platforms"
        )
      );
    }
  };

  return (
    <div>
      <Link to="/home">BACK TO HOME</Link>
      <form onSubmit={() => handleSubmit()}>
        <label>Nombre: </label>
        <input
          className={errors.name && "danger"}
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
        />
        {errors.name && <p className="danger">{errors.name}</p>}
        <label>Descripción: </label>
        <textarea
          className={errors.description && "danger"}
          type="text"
          name="description"
          onChange={handleInputChange}
          value={input.description}
        />
        {errors.description && <p className="danger">{errors.description}</p>}
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
        <button type="submit">CREAR VIDEOJUEGO</button>
      </form>
    </div>
  );
}
