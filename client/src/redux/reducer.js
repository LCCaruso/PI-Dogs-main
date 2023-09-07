//el reducer es el unico q modifica el estado global
import {GET_DOGS, GET_BY_NAME, GET_DOG, GET_TEMPERAMENTS, CREATE_DOG} from "./actions";

const initialState = {
    dogs: [],
    temperamento: [],
    dog: null,
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return { ...state, dogs: action.payload };
        case GET_DOG:
            return { ...state, dog: action.payload };
        case GET_TEMPERAMENTS: 
            return { ...state, temperamento: action.payload };
        case CREATE_DOG:
            return { ...state, dog: action.payload };
        case GET_BY_NAME:
            return { ...state, dogs: action.payload }
        default:
            return { ...state };
    }
};

export default rootReducer;