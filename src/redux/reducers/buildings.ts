import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { buyTechnology } from './technologies';

interface BuildingInterface {
    name: string,
    cost: number,
    isBuilt: boolean,
}

interface BuildingsState {
    [key: string]: BuildingInterface
}

const buildings: BuildingsState = {
    Granary: {
        name: 'Granary',
        cost: 50,
        isBuilt: false,
    },
};

const initialState: BuildingsState = {};

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState,
    reducers: {
        buildBuilding: (state, action: PayloadAction<string>) => {
            const building = state[action.payload];

            building.isBuilt = true;
        },
        addBuilding: (state, action: PayloadAction<BuildingInterface>) => {
            const building = action.payload;

            state[building.name] = building;
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

export const { buildBuilding, addBuilding } = buildingsSlice.actions;
export const selectBuildings = (state: RootState) => state.buildings;

export default buildingsSlice.reducer;
