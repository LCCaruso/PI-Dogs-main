// YOUR_API_KEY=live_bJP2tDWY4rRPLFojMdRMIKMFOQCb2MQHt4XHuJppeoxGMAYaJ9z0beclexauU0Yh
import axios from "axios";


export const GET_DOGS = "GET_DOGS";

export const getDogs = () => {
    return async function (dispatch){
        const dogsData = await axios.get(
            "https://api.thedogapi.com/v1/breeds?api_key={live_bJP2tDWY4rRPLFojMdRMIKMFOQCb2MQHt4XHuJppeoxGMAYaJ9z0beclexauU0Yh}"
        );
        console.log(dogsData);
        const dogs = dogsData.data;
        dispatch({type: GET_DOGS, payload: dogs});
    };
};

