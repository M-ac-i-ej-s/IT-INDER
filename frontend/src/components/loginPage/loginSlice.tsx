import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLogged: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        LOGGEDIN: (state, action) => {
            state.isLogged = true;
            state.user = action.payload;
        },
        LOGGEDOUT: (state) => {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const { LOGGEDIN, LOGGEDOUT } = loginSlice.actions;
export default loginSlice.reducer;
