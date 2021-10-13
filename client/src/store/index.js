import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

/* Redux Thunk es un middleware que nos permite llamar a los creadores de acciones que devuelven
 una función (thunk) que toma el método dispatch() del store como argumento, que luego se usa 
 para enviar la acción síncrona después de que la API o los efectos secundarios hayan finalizado. */

import reducer from "../todos/reducer";

export const store = createStore(reducer, applyMiddleware(thunk));
