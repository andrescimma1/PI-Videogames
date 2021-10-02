import {
  FILTER_GAMES_INPUT,
  FILTER_GAMES_GENRE,
  SHOW_GAMES,
  SHOW_GENRES,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from "./action";

let initialState = {
  details: {},
  games: [],
  genres: [],
  clickedGenre: false
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_GAMES:
      return {
        ...state,
        games: action.payload,
      };
    case FILTER_GAMES_INPUT:
      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          if (game.name.toLowerCase().startsWith(action.query.toLowerCase())) {
            return game;
          }
        }),
      };
    case FILTER_GAMES_GENRE:
      return {
        ...state,
        filteredGames: action.payload.filter((game) => {
          let exist = false;
          game.genres.map((g) => {
            if (g.name === action.genre) exist = true;
          });

          if (exist) return game;
        }),
      };
    case ASCENDING_ORDER:
      action.payload.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        games: action.payload,
      };
    case DESCENDING_ORDER:
      action.payload.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        games: action.payload,
      };
    case SHOW_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default todos;
