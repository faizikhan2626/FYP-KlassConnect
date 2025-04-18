'use client'
import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice"

export const store = configureStore ({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice
    },
    devTools:false,  //so that Other cannot use redux for debugging
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

//call load user everytime page loads
const initializeApp = async ()=>{
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}));
}

initializeApp()