import recetteReducer from './recetteReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    recette: recetteReducer,
    firestore: firestoreReducer
});

export default rootReducer