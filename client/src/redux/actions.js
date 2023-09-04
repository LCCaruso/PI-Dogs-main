import axios from "axios";


export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
// export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

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



// export const filteredBySource = () => {
//     dispatch({type: "FILTER_BY_SOURCE"});
// };