import axios from "axios";


export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const PAGINATE = "PAGINATE";
export const ORDEN_AZ = "ORDEN_AZ";
export const ORDEN_PESO = "ORDEN_PESO";
export const FILTER_PESO = "FILTER_PESO";
export const RESET = "RESET";
export const FILTER_API_DB = "FILTER_API_DB";
export const RESET_DETAIL = "RESET_DETAIL";
export const DETAIL_PAGE = "DETAIL_PAGE";
export const BACK_TO_PREVIOUS_PAGE = "BACK_TO_PREVIOUS_PAGE";
export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const DOG_FAVS = "DOG_FAVS";
export const ACTUALIZAR_PAGE = "ACTUALIZAR_PAGE";

// export const ULTIMO_ESTADO = "ULTIMO_ESTADO";



export const createDog = (dog) => {
    return { type: CREATE_DOG, payload: dog };
};


export const getDogs = () => {
    return async function (dispatch){
        try{
            const dogsData = await axios('http://localhost:3001/dogs');
            const dogs = dogsData.data;
            dispatch({type: GET_DOGS, payload: dogs});
        } catch (error){
            console.log("error en devolver la action", error.message)
        }
    };
};

export const getByName = (name) => {
    return async function (dispatch){
        try{
            const dogsData = await axios(`http://localhost:3001/dogs?name=${name}`);
            const dogs = dogsData.data;
            dispatch({type: GET_BY_NAME, payload: dogs});
        } catch (error){
            alert(error.response.data.error)
            // console.log("error en devolver la action", error.message)
        }
    };
};



export const getDog = (id) => {
    return async function (dispatch){
        try{
            const dogData = await axios(`http://localhost:3001/dogs/${id}`);
            const dog = dogData.data;
            dispatch({type: GET_DOG, payload: dog});
        } catch (error){
            console.log("error en devolver la action", error.message)
        }
    };
};

export const getTemperaments = () => {
    return async function (dispatch){
        try{
            const temperamentoData = await axios("http://localhost:3001/dogs/temperaments");
            const temperamento = temperamentoData.data;
            dispatch({type: GET_TEMPERAMENTS, payload: temperamento});
        } catch (error){
            console.log("error en devolver la action", error.message)
        }
    };
};


export const filterByTemperament = (temperamento) => {
    return async function (dispatch){
        try{
            dispatch({type: FILTER_BY_TEMPERAMENT, payload: temperamento});
        } catch (error){
            console.log(error.message)
        }
    };
};



export const page = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: PAGINATE, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};


export const dogOrdenAz = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: ORDEN_AZ, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const dogOrdenPeso = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: ORDEN_PESO, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const dogFilterPeso = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: FILTER_PESO, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const resetDogs = () => {
    return async function (dispatch){
        try {
            dispatch({ type: RESET });
        } catch (error) {
            console.log(error.message);
        }
    };
};


export const dogFilterApiDb = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: FILTER_API_DB, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const resetSelectedDog = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: RESET_DETAIL, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const getDetailPage = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: DETAIL_PAGE, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const getBackPreviousPage = (order) => {
    return async function (dispatch){
        try{
            dispatch({type: BACK_TO_PREVIOUS_PAGE, payload: order});
        } catch (error){
            console.log(error.message)
        }
    };
};


export const addFav = (dog) => {
    return async function (dispatch){
        try{
            dispatch({type: ADD_FAV, payload: dog});
        } catch (error){
            console.log(error.message)
        }
    };
};


export const removeFav = (id) => {
    return async function (dispatch){
        try{
            dispatch({type: REMOVE_FAV, payload: id});
        } catch (error){
            console.log(error.message)
        }
    };
};

export const dogFavs = () => {
    return async function (dispatch){
        try{
            dispatch({type: DOG_FAVS, payload: "favorites"});
        } catch (error){
            console.log(error.message)
        }
    };
};
