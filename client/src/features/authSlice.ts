import { createSlice } from "@reduxjs/toolkit";

type AuthDetails = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    password: string
}

const initialState: AuthDetails = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    password: ""
}

const authSlice = createSlice({
    name: "authDetails",
    initialState,
    reducers: {
        addAuthDetails: (state, action) => {
            console.log('payload in authslice: ', action.payload);
            return action.payload;
        }
    }
})

export const { addAuthDetails } = authSlice.actions;
export default authSlice.reducer; 