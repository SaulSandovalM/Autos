import {combineReducers} from 'redux';
import usuarioReducer from "./usuarioReducer";

const rootReducer = combineReducers({
    usuario: usuarioReducer,
});

export default rootReducer;
