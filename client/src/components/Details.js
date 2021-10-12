import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../todos/action";
import { Link } from "react-router-dom";

export function Details(props) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      console.log(window.location.pathname);
      dispatch(showDetails(window.location.pathname));
    }
    setLoading(false);
  });

  return (
    <>
      {Object.keys(details).length !== 0 ? (
        <main>
          <div class="container-details">
            <div class="cover">
              <img class="background" src={details.background_image} />
              <div class="platforms">
                <span class="rating">Rating: {details.rating}</span>
              </div>
              <div>
                Platforms:
                {!details.hasOwnProperty("db") ? (
                  details.platforms.map((object) => (
                    <span> {object.platform.name} | </span>
                  ))
                ) : (
                  <span> {details.platforms}</span>
                )}
              </div>
              <div>
                Genres:
                {details.genres.map((genre) => (
                  <span> {genre.name} | </span>
                ))}
              </div>
              <Link class="link" to="/home">
                <button class="btn back-btn">Back</button>
              </Link>
            </div>
            <div class="content">
              <div class="content-body">
                <div class="black-label">
                  <span class="title">{details.name}</span>
                  <p>{details.description.replaceAll(/<\/?[^>]+(>|$)/g, "")}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
