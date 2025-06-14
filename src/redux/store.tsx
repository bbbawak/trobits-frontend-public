// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/slices/authSlice"
// import { baseApi } from "./features/api/baseApi";
// import {storage} from "redux-persist"

// const persisitConfig = {
//     key:"root",
//     storage:storage
// }


// export const store = configureStore({
//     reducer: {
//         [ baseApi.reducerPath ]: baseApi.reducer,
//         auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(baseApi.middleware),

// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;






// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './features/api/baseApi';
import authReducer from './features/slices/authSlice';

// Configure Store without persistence
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(baseApi.middleware),
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
