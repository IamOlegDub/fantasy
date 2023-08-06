import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
    name: 'players',
    initialState: {
        allPlayers: [],
        selectedPlayers: [],
    },
    reducers: {
        addPlayer(state, action) {
            const playerToAdd = action.payload;
            const isPlayerAlreadySelected = state.selectedPlayers.some(
                (player) => player.player_id === playerToAdd.id
            );
            if (!isPlayerAlreadySelected) {
                state.selectedPlayers.push(playerToAdd);
            }
        },
        removePlayer(state, action) {
            const playerId = action.payload;
            state.selectedPlayers = state.selectedPlayers.filter(
                (player) => player.player_id !== playerId
            );
        },
        setAllPlayers(state, action) {
            state.allPlayers = action.payload;
        },
    },
});

export const { addPlayer, removePlayer, setAllPlayers } = playersSlice.actions;

export default playersSlice.reducer;
