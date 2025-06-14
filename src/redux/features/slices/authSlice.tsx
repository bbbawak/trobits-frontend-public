/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user data
interface IUser {
    email: string;
    password: string;
    // Add other user properties as needed
}

interface IInitialState {
    user: any | null;
    token: string | null;
    previousPath: string | null;
    currentPath: string | null;
    isPublicAccess: boolean;
}

// Create a function to get the user from localStorage safely
const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') { // Check if running in the browser
        const userFromLocalStorage = localStorage.getItem("user");
        return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    }
    return null; // Return null if not in the browser
};

// Use the function to set the initial state
const initialState: IInitialState = {
    user: null,
    token: null,
    previousPath: null,
    currentPath: null,
    isPublicAccess: true
};

// Create the slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any | null>) => {
            state.user = action.payload;
            state.isPublicAccess = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isPublicAccess = true;
        },
        setPaths: (state, action: PayloadAction<string | null>) => {
            if (state.previousPath === null && state.currentPath === null) {
                state.previousPath = null;
                state.currentPath = action.payload;
            } else {
                state.previousPath = state.currentPath;
                state.currentPath = action.payload;
            }
        }
    },
});

// Export actions and reducer
export const { setUser, clearUser, setPaths } = authSlice.actions;
export default authSlice.reducer;
