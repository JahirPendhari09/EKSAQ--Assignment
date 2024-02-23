import axios from "axios";
import { ERROR, GET_SPEECHES, LOADING, POST_SPEECHES } from "./actionTypes";

export const getSpeeches = () => (dispatch) => {
    dispatch({ type: LOADING });
    axios.get("https://drab-plum-boa-yoke.cyclic.app/speech")
        .then(res => dispatch({ type: GET_SPEECHES, payload: res.data.speeches }))
        .catch(err => dispatch({ type: ERROR }));
};

export const postSpeech = (speech) => (dispatch) => {
    dispatch({ type: LOADING });
    axios.post("https://drab-plum-boa-yoke.cyclic.app/speech/create", speech)
        .then(res => {
            dispatch({ type: POST_SPEECHES, payload: speech });
        })
        .catch(err => dispatch({ type: ERROR }));
};
