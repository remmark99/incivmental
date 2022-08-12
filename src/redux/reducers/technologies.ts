import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

export enum TechnologyStatus {
    Locked,
    CanBeUnlocked,
    Unlocked,
}

export interface TechnologyType {
    name: string, // TODO: use kewl TS techniques
    cost: number,
    row: number,
    column: number,
    status: TechnologyStatus,
}

export interface TechnologiesState {
    [key: string]: TechnologyType,
}

const initialState: TechnologiesState = {
    Pottery: {
        name: 'Pottery', cost: 50, row: 4, column: 1, status: TechnologyStatus.CanBeUnlocked,
    },
    'Animal Husbandry': {
        name: 'Animal Husbandry', cost: 50, row: 5, column: 1, status: TechnologyStatus.CanBeUnlocked,
    },
    Mining: {
        name: 'Mining', cost: 50, row: 7, column: 1, status: TechnologyStatus.CanBeUnlocked,
    },
    Sailing: {
        name: 'Sailing', cost: 50, row: 1, column: 2, status: TechnologyStatus.CanBeUnlocked,
    },
    Astrology: {
        name: 'Astrology', cost: 50, row: 2, column: 2, status: TechnologyStatus.CanBeUnlocked,
    },
    Irrigation: {
        name: 'Irrigation', cost: 50, row: 3, column: 2, status: TechnologyStatus.Locked,
    },
    Writing: {
        name: 'Writing', cost: 50, row: 4, column: 2, status: TechnologyStatus.Locked,
    },
    Archery: {
        name: 'Archery', cost: 50, row: 5, column: 2, status: TechnologyStatus.Locked,
    },
    Masonry: {
        name: 'Masonry', cost: 50, row: 6, column: 3, status: TechnologyStatus.Locked,
    },
    'Bronze Working': {
        name: 'Bronze Working', cost: 50, row: 7, column: 3, status: TechnologyStatus.Locked,
    },
    Wheel: {
        name: 'Wheel', cost: 50, row: 8, column: 3, status: TechnologyStatus.Locked,
    },
};

export const technologiesSlice = createSlice({
    name: 'technologies',
    initialState,
    reducers: {
        buyTechnology: (state, action: PayloadAction<TechnologyType>) => {
            const tech = state[action.payload.name];
            tech.status = TechnologyStatus.Unlocked;
        },
    },
});

export const { buyTechnology } = technologiesSlice.actions;
export const selectTechnologies = (state: RootState) => state.technologies;

export default technologiesSlice.reducer;
