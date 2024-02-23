import React from 'react'
import { ERROR, GET_SPEECHES, LOADING, POST_SPEECHES } from './actionTypes'

const initialState ={
    speeches :[],
    isLoading:false,
    isError:false
}

 export const reducer = (state=initialState, {type,payload}) => {
    switch(type){
        case LOADING: {
            return {...state, isLoading:true}
        }
        case ERROR: {
            return {...state, isLoading:false, isError:true}
        }
        case GET_SPEECHES: {
            return {...state, isLoading:false, speeches:payload}
        }
        case POST_SPEECHES: {
            return {...state, isLoading:false, speeches:[...state.speeches,payload]}
        }
        default : {
            return state 
        }
    }
}

