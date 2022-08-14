import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { buyTechnology } from './technologies';

export interface ResourcesState {
    food: number,
    production: number,
    science: number,
    culture: number,
    money: number,
    population: number,
    farmers: number,
}

const initialState: ResourcesState = {
    food: 0,
    production: 0,
    science: 1000,
    culture: 0,
    money: 0,
    population: 0,
    farmers: 0,
};

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        increaseFood: (state, action: PayloadAction<number>) => {
            state.food += action.payload;
        },
        increaseScience: (state, action: PayloadAction<number>) => {
            state.science += action.payload;
        },
        increaseProduction: (state, action: PayloadAction<number>) => {
            state.production += action.payload;
        },
        increasePopulation: (state, action: PayloadAction<number>) => {
            state.population += action.payload;
            state.food -= 10 * action.payload;
        },
        increaseFarmers: (state, action: PayloadAction<number>) => {
            state.farmers += action.payload;
            state.population -= action.payload;
        },
        updateResources: (state) => {
            state.food += state.farmers;
            state.food += state.population * 0.1;
            state.production += state.population * 0.1;
            state.science += state.population * 0.1;
            state.culture += state.population * 0.1;
            state.money += state.population * 0.1;
        },
    },
    extraReducers(builder) {
        builder.addCase(buyTechnology, (state, action) => {
            state.science -= action.payload.cost;
        });
    },
});

export const {
    increaseFood,
    increaseScience,
    increaseProduction,
    increasePopulation,
    increaseFarmers,
    updateResources,
} = resourcesSlice.actions;

export const selectFood = (state: RootState) => state.resources.food;
export const selectProduction = (state: RootState) => state.resources.production;
export const selectScience = (state: RootState) => state.resources.science;
export const selectPopulation = (state: RootState) => state.resources.population;
export const selectFarmers = (state: RootState) => state.resources.farmers;

export default resourcesSlice.reducer;
