import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { buyTechnology } from './technologies';

export interface ResourcesState {
    food: number,
    foodProduction: number,
    production: number,
    science: number,
    culture: number,
    money: number,
    population: number,
    populationCost: number,
    populationFoodYield: number,
    populationProductionYield: number,
    farmers: number,
}

const initialState: ResourcesState = {
    food: 0,
    foodProduction: 2,
    production: 2,
    science: 0,
    culture: 0,
    money: 0,
    population: 0,
    populationCost: 10,
    populationFoodYield: 1,
    populationProductionYield: 1,
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

            for (let i = 0; i < action.payload; i += 1) {
                state.food -= state.populationCost;
                state.populationCost *= 2;
                state.foodProduction += 1;
            }
        },
        increaseFarmers: (state, action: PayloadAction<number>) => {
            state.farmers += action.payload;
            state.population -= action.payload;

            // Since it goes from 1/1 to 3/0
            // TODO: does not account for increased prod/food from pops
            state.foodProduction += 2 * action.payload;
            state.production -= action.payload;
        },
        updateResources: (state) => {
            state.food += state.foodProduction - state.population * 2;
            if (state.food >= state.populationCost) {
                state.population += 1;
                state.food -= state.populationCost;
                state.populationCost *= 2;
                state.foodProduction += 1;
            }
            state.production = 2 + state.population; // TODO: fix magic 2
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
export const selectPopulationCost = (state: RootState) => state.resources.populationCost;
export const selectPopulationFoodYield = (state: RootState) => state.resources.populationFoodYield;
export const selectPopProdYield = (state: RootState) => state.resources.populationProductionYield;
// TODO: why does this line above thinks it can tell me how to name my variables?!

export const selectFarmers = (state: RootState) => state.resources.farmers;

export default resourcesSlice.reducer;
