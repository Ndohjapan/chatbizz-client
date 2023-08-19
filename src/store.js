import { configureStore } from "@reduxjs/toolkit";

import authReducer, {setNewStoreType} from "./slices/authSlice";

import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

store.dispatch(setNewStoreType('Ecommerce'));

export default store;