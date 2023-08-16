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
            const gk = state.selectedPlayers.filter(
                (player) => player.player_type === 'Goalkeepers'
            );
            const df = state.selectedPlayers.filter(
                (player) => player.player_type === 'Defenders'
            );
            const mf = state.selectedPlayers.filter(
                (player) => player.player_type === 'Midfielders'
            );
            const fw = state.selectedPlayers.filter(
                (player) => player.player_type === 'Forwards'
            );
            const teamNumber = state.selectedPlayers.filter(
                (player) => player.team_name === playerToAdd.team_name
            );
            if (!isPlayerAlreadySelected && state.selectedPlayers.length < 15) {
                if (teamNumber.length > 2) {
                    alert(
                        'You already have 3 players from ' +
                            playerToAdd.team_name
                    );
                    return;
                }
                if (
                    gk.length > 1 &&
                    playerToAdd.player_type === 'Goalkeepers'
                ) {
                    alert('Goalkeepers number is full');
                    return;
                }
                if (df.length > 4 && playerToAdd.player_type === 'Defenders') {
                    alert('Defenders number is full');

                    return;
                }
                if (
                    mf.length > 4 &&
                    playerToAdd.player_type === 'Midfielders'
                ) {
                    alert('Midfielders number is full');

                    return;
                }
                if (fw.length > 2 && playerToAdd.player_type === 'Forwards') {
                    alert('Forwards number is full');

                    return;
                }

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
