import axios from "axios";


export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CREATE_DOG = "CREATE_DOG";
// export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";




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
            console.log("error en devolver la action", error.message)
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


// export const filteredBySource = () => {
//     dispatch({type: "FILTER_BY_SOURCE"});
// };