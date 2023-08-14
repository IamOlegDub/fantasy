import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
    name: 'players',
    initialState: {
        fullTeams: [],
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
            const playersInTeams = action.payload;
            const players = [];
            playersInTeams.forEach((teamItem) => {
                teamItem.players.forEach((player) => {
                    player['team_badge'] = teamItem.team_badge;
                    player['team_name'] = teamItem.team_name;
                });
                players.push(...teamItem.players);
            });
            state.allPlayers = players;
            state.fullTeams = playersInTeams;
        },
    },
});

export const { addPlayer, removePlayer, setAllPlayers } = playersSlice.actions;

export default playersSlice.reducer;
