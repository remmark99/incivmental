import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export interface GameState {
    hasIntervalStarted: boolean,
}

const initialState: GameState = {
    hasIntervalStarted: false,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setIntervalStarted: (state) => {
            state.hasIntervalStarted = true;
        },
    },
});

export const { setIntervalStarted } = gameSlice.actions;
export const selectHasIntervalStarted = (state: RootState) => state.game.hasIntervalStarted;

export default gameSlice.reducer;
