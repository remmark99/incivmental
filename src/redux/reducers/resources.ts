import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { buyTechnology } from "./technologies";
import { buildBuilding } from "./buildings";

export interface ResourcesState {
    food: number;
    foodProduction: number;
    production: number;
    science: number;
    scienceProduction: number;
    culture: number;
    money: number;
    population: number;
    populationCost: number;
    populationFoodYield: number;
    populationProductionYield: number;
    housing: number;
    farmers: number;
    miners: number;
    scientists: number;
}

const initialState: ResourcesState = {
    food: 0,
    foodProduction: 2,
    production: 2,
    science: 0,
    scienceProduction: 0,
    culture: 0,
    money: 0,
    population: 0,
    populationCost: 10,
    populationFoodYield: 1,
    populationProductionYield: 1,
    housing: 5,
    farmers: 0,
    miners: 0,
    scientists: 0,
};

const getHousingModifier = (availableHousing: number): number => {
    let housingModifier;

    if (availableHousing > 1) housingModifier = 1;
    else if (availableHousing === 1) housingModifier = 0.5;
    else if (availableHousing > -5) housingModifier = 0.25;
    else housingModifier = 0;

    return housingModifier;
};

export const resourcesSlice = createSlice({
    name: "resources",
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
                state.scienceProduction += 0.5;
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
        increaseMiners: (state, action: PayloadAction<number>) => {
            state.miners += action.payload;
            state.population -= action.payload;

            // Read above
            state.production += 2 * action.payload;
            state.foodProduction -= action.payload;
        },
        updateResources: (state) => {
            const housingModifier = getHousingModifier(state.housing);

            state.food +=
                (state.foodProduction - state.population * 2) * housingModifier;
            if (state.food >= state.populationCost) {
                state.population += 1;
                state.food -= state.populationCost;
                state.populationCost *= 2;
                state.foodProduction += 1;
                state.housing -= 1;
                state.scienceProduction += 0.5;
            }
            state.production = 2 + state.population + state.miners * 3; // TODO: fix magic 2
            state.science += state.scienceProduction;
            state.culture += state.population * 0.1;
            state.money += state.population * 0.1;
        },
    },
    extraReducers(builder) {
        builder.addCase(buyTechnology, (state, action) => {
            state.science -= action.payload.cost;
        });
        builder.addCase(buildBuilding, (state, action) => {
            const building = action.payload;
            // TODO: merge into destruction
            const foodProduction = building.effects?.foodProduction;
            const housing = building.effects?.housing;
            const scienceProduction = building.effects?.scienceProduction;

            if (foodProduction) state.foodProduction += foodProduction;
            if (housing) state.housing += housing;
            if (scienceProduction) state.scienceProduction += scienceProduction;
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
    increaseMiners,
} = resourcesSlice.actions;

export const selectFood = (state: RootState) => state.resources.food;
export const selectProduction = (state: RootState) =>
    state.resources.production;
export const selectScience = (state: RootState) => state.resources.science;
export const selectPopulation = (state: RootState) =>
    state.resources.population;
export const selectPopulationCost = (state: RootState) =>
    state.resources.populationCost;
export const selectPopulationFoodYield = (state: RootState) =>
    state.resources.populationFoodYield;
export const selectPopProdYield = (state: RootState) =>
    state.resources.populationProductionYield;
// TODO: why does this line above thinks it can tell me how to name my variables?!
export const selectHousing = (state: RootState) => state.resources.housing;

export const selectFarmers = (state: RootState) => state.resources.farmers;
export const selectMiners = (state: RootState) => state.resources.miners;
export const selectScientists = (state: RootState) =>
    state.resources.scientists;

export default resourcesSlice.reducer;
