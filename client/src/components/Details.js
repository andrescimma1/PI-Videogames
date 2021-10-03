import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDetails } from "../todos/action";

export function Details(props){
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    return(
        <div>
            <button onClick={() => dispatch(showDetails(window.location.pathname))}>Mostrar detalles</button>
            {Object.keys(details).length !== 0 ? 
            <div>
                <img src={details.background_image} />
                <h4>{details.name}</h4>
                <p>{details.description}</p>
                <div>
                    {details.parent_platforms.map((object) => <p>{object.platform.name} |</p>)}
                </div>
                <div class="container-rating">
                    <img class="star" src="https://pubwriter.net/images/gif/star.gif"/>
                    <p>{details.rating}</p>
                </div>
                <p>
                {details.genres.map((genre) => genre.name)}
                </p>
            </div> : <p></p>}
            
        </div>
    );
}