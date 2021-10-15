import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame, showGenres } from "../todos/action";
import { Link } from "react-router-dom";

export default function AddGame() {
  // Obtengo los géneros del store
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    name: "",
    description: "",
    background_image: "",
    rating: "",
    released: "",
  });
  const [errors, setErrors] = useState({});
  const [checkbox, setCheckbox] = useState([]);
  const [checkboxPlatforms, setCheckboxPlatforms] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Despues de mostrar el DOM..
  useEffect(() => {
    // Si la página está cargando entonces..
    if (loading) {
      dispatch(showGenres()); // Muestro los géneros
      setLoading(false); // La página ya cargó
    }
  });

  const handleInputChange = function (e) {
    // Si el input cambia entonces obtener su valor
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    // Valida el dato escrito
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function validate(input) {
    let errors = {};

    // Si no hay nombre
    if (!input.name) {
      errors.name = "Name is required";
    }

    // Si no hay descripción
    if (!input.description) {
      errors.description = "Description is required";
    }

    return errors;
  }

  const handleCheckboxChange = function (e) {
    // Si es la primera vez que se marca un género
    if (checkbox.length === 0) {
      // Asigno su nombre al array checkbox
      // EJ: checkbox = ["Action"]
      setCheckbox([e.target.name]);
    } else {
      let exist = false;

      // Sino recorro el array checkbox y busco si ya tiene ese género
      for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i] === e.target.name) exist = true;
      }

      // Si lo tiene lo saco del array (es porque estoy desmarcando la casilla)
      if (exist) setCheckbox(checkbox.filter((name) => name !== e.target.name));
      // Sino lo sumo al array
      else setCheckbox([...checkbox, e.target.name]);
    }
  };

  const handleCheckboxPlatformsChange = function (e) {
    // Si es la primera vez que se marca una plataforma
    if (checkboxPlatforms.length === 0) {
      // Asigno su nombre al array checkboxPlatforms
      // EJ: checkboxPlatforms = ["PC"]
      setCheckboxPlatforms([e.target.name]);
    } else {
      let exist = false;

      // Sino recorro el array checkboxPlatforms y busco si ya tiene esa plataforma
      for (let i = 0; i < checkboxPlatforms.length; i++) {
        if (checkboxPlatforms[i] === e.target.name) exist = true;
      }

      // Si lo tiene lo saco del array (es porque estoy desmarcando la casilla)
      if (exist)
        setCheckboxPlatforms(
          checkboxPlatforms.filter((name) => name !== e.target.name)
        );
      // Sino lo sumo al array
      else setCheckboxPlatforms([...checkboxPlatforms, e.target.name]);
    }
  };

  // Si hago clic sobre el botón "CREATE VIDEOGAME"
  const handleSubmit = function () {
    if (
      Object.keys(validate(input)).length === 0 &&
      checkbox.length > 0 &&
      checkboxPlatforms.length > 0
    ) {
      // Si está todo OK entonces..
      // Despacho el juego
      dispatch(
        addGame(
          input.name,
          input.background_image,
          input.description,
          input.released,
          input.rating,
          checkbox,
          checkboxPlatforms
        )
      );
      // Muestro un mensaje satisfactorio
      setErrorMsg(false);
      setSuccessMsg(true);
    } else {
      // Sino muestro un mensaje de error
      setSuccessMsg(false);
      setErrorMsg(true);
    }
  };

  return (
    <div class="body-details">
      {successMsg ? (
        <div class="success show">
          <span class="check">
            <i class="fa fa-check-circle"></i>
          </span>
          <span class="msg">Success: Game created succesfully!</span>
          <span class="crose">
            <i class="fa fa-times"></i>
          </span>
        </div>
      ) : (
        <p></p>
      )}
      {/* Si hay un error entonces.. */}
      {errorMsg ? (
        <div class="error show">
          <span class="check">
            <i class="fa fa-check-circle"></i>
          </span>
          <span class="msg-error">Error: Add genres and platforms!</span>
          <span class="crose">
            <i class="fa fa-times"></i>
          </span>
        </div>
      ) : (
        <p></p>
      )}
      {/* Si está cargando entonces.. */}
      {loading ? (
        <p>Loading</p>
      ) : (
        <div class="container-form">
          <div class="title">Registration</div>
          <div class="game-details">
            <div class="input-box">
              <span class="details">Name: </span>
              <input
                className={errors.name && "danger"}
                autocomplete="off"
                type="text"
                name="name"
                placeholder="Enter the name.."
                onChange={handleInputChange}
                value={input.name}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div class="input-box">
              <span class="details">Description: </span>
              <input
                placeholder="Enter the description.."
                className={errors.description && "danger"}
                type="text"
                name="description"
                onChange={handleInputChange}
                value={input.description}
              />
              {errors.description && (
                <p className="danger">{errors.description}</p>
              )}
            </div>
            <div class="input-box">
              <span class="details">Released: </span>
              <input
                placeholder="Enter the released date.."
                type="text"
                name="released"
                onChange={handleInputChange}
                value={input.released}
              />
            </div>
            <div class="input-box">
              <span class="details">Rating: </span>
              <input
                placeholder="Enter the rating.."
                type="text"
                name="rating"
                onChange={handleInputChange}
                value={input.rating}
              />
            </div>
            <div class="input-box">
              <span class="details">Image: </span>
              <input
                placeholder="Enter a link image.."
                type="text"
                name="background_image"
                onChange={handleInputChange}
                value={input.background_image}
              />
            </div>

            <div class="gender-details">
              <span class="gender-title">Genres: </span>
              <div class="category">
                {/* Muestro todos los géneros */}
                {genres.map((genre) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        name={genre.name}
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      <label> {genre.name}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div class="gender-details platforms">
              <span class="gender-title">Platforms: </span>
              <div class="category">
                <div>
                  <input
                    name="Android"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Android</span>
                </div>
                <div>
                  <input
                    name="Apple Macintosh"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Apple Macintosh</span>
                </div>
                <div>
                  <input
                    name="Linux"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Linux</span>
                </div>
                <div>
                  <input
                    name="Nintendo"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>Nintendo</span>
                </div>
                <div>
                  <input
                    name="PC"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PC</span>
                </div>
                <div>
                  <input
                    name="PlayStation"
                    onChange={(e) => handleCheckboxPlatformsChange(e)}
                    type="checkbox"
                  />
                  <span>PlayStation</span>
                </div>
              </div>
            </div>
            <div class="button-container">
              <Link to="/home">
                <button class="btn back-btn">Back</button>
              </Link>
              <button class="btn" onClick={() => handleSubmit()}>
                CREATE VIDEOGAME
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
