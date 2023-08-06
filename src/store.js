import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import playersSlice from './slices/playersSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        players: playersSlice,
    },
});
