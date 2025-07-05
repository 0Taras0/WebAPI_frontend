import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import {apiAccount} from "../services/apiAccoount.ts";
import authReducer from './authSlice.ts'
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apiProducts} from "../services/apiProducts.ts";
import {apiUser} from "../services/apiUser.ts";


export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiProducts.reducerPath]: apiProducts.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiCategory.middleware)
            .concat(apiAccount.middleware)
            .concat(apiProducts.middleware)
            .concat(apiUser.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector