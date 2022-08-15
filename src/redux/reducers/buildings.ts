import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { buyTechnology } from './technologies';

interface BuildingInterface {
    name: string,
    cost: number,
    limit: number,
    built: number,
    buildProgress: number,
}

interface BuildingsState {
    [key: string]: BuildingInterface
}

const buildings: BuildingsState = {
    Farm: {
        name: 'Farm',
        cost: 20,
        limit: Infinity,
        built: 0,
        buildProgress: 0,
    },
    Granary: {
        name: 'Granary',
        cost: 50,
        limit: 1,
        built: 0,
        buildProgress: 0,
    },
};

const initialState: BuildingsState = { Farm: buildings.Farm };

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState,
    reducers: {
        buildBuilding: (state, action: PayloadAction<string>) => {
            const building = state[action.payload];

            building.built += 1;
            building.buildProgress = 0;
        },
        addBuilding: (state, action: PayloadAction<string>) => {
            state[action.payload] = buildings[action.payload];
        },
        setBuildProgress:
            (state, action: PayloadAction<{ name: string, buildProgress: number }>) => {
                state[action.payload.name].buildProgress = action.payload.buildProgress;
            },
    },
    extraReducers(builder) {
        builder.addCase(buyTechnology, (state, action) => {
            action.payload.buildingUnlocks?.forEach((building) => {
                state[building] = buildings[building];
            });
        });
    },
});

export const { buildBuilding, addBuilding, setBuildProgress } = buildingsSlice.actions;
export const selectBuildings = (state: RootState) => state.buildings;

export default buildingsSlice.reducer;
