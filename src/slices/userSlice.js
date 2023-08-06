import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isSignedIn: false,
        user: null,
    },
    reducers: {
        setUser(state, action) {
            state.isSignedIn = true;
            state.user = action.payload;
        },
        removeUser(state) {
            state.isSignedIn = false;
            state.user = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
