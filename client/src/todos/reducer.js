import {
  FILTER_GAMES_INPUT,
  FILTER_GAMES_GENRE,
  SHOW_GAMES,
  SHOW_GENRES,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  HIGHER_RATING,
  LOWER_RATING,
  SHOW_DETAILS,
  ADD_GAME,
} from "./action";

let initialState = {
  details: {},
  games: [],
  genres: [],
  clickedGenre: false,
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_GAMES:
      // Guardo los juegos en la store
      return {
        ...state,
        games: action.payload,
      };

    case FILTER_GAMES_INPUT:
      // Guardo los juegos filtrados por el valor del input en la store
      // EJ: input("Tomb")
      // filteredGames = ["Tomb Raider"]

      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          // Si el nombre del juego comienza con el valor del input
          if (game.name.toLowerCase().startsWith(action.query.toLowerCase())) {
            // Retorno el juego
            return game;
          }
        }),
      };

    case FILTER_GAMES_GENRE:
      // Guardo los juegos filtrados por el género
      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          // Si existen juegos con ese género entonces los retorno
          let exist = false;
          game.genres.map((g) => {
            if (g.name === action.genre) {
              exist = true;
              console.log(g.name);
            }
          });

          if (exist) return game;
        }),
      };

    case ASCENDING_ORDER:
      // Los ordeno en forma ascendente
      action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      // Los guardo en el store
      return {
        ...state,
        games: action.payload,
      };

    case DESCENDING_ORDER:
      // Los ordeno en forma descendente
      action.payload.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      // Los guardo en el store
      return {
        ...state,
        games: action.payload,
      };

    case HIGHER_RATING:
      // Los ordeno por mayor rating
      action.payload.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });
      // Los guardo en el store
      return {
        ...state,
        games: action.payload,
      };

    case LOWER_RATING:
      // Los ordeno por menor rating
      action.payload.sort((a, b) => {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        return 0;
      });
      // Los guardo en el store
      return {
        ...state,
        games: action.payload,
      };

    case SHOW_GENRES:
      // Guardo los géneros en el store para poder mostrarlos en el front
      return {
        ...state,
        genres: action.payload,
      };

    case SHOW_DETAILS:
      // Guardo los detalles en el store para poder mostrarlos en el front
      return {
        ...state,
        details: action.payload,
      };

    case ADD_GAME:
      // Devuelvo solo el estado
      return state;

    default:
      // Por defecto devuelvo el estado
      return state;
  }
};

export default todos;
