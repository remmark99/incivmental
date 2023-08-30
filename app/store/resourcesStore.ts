import { create } from "zustand";
import { RESOURCE_CONSTANTS } from "../constants";

const getHousingModifier = (availableHousing: number): number => {
    let housingModifier;

    if (availableHousing > 1) housingModifier = 1;
    else if (availableHousing === 1) housingModifier = 0.5;
    else if (availableHousing > -5) housingModifier = 0.25;
    else housingModifier = 0;

    return housingModifier;
};

const useResourcesStore = create<ResourcesState>((set) => ({
    food: 0,
    foodProduction: RESOURCE_CONSTANTS.BASE_FOOD_PRODUCTION,
    production: RESOURCE_CONSTANTS.BASE_PROD,
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
    increaseFood: (foodIncrease: number) =>
        set((state) => ({ food: state.food + foodIncrease })),
    increaseScience: (scienceIncrease: number) =>
        set((state) => ({ science: state.science + scienceIncrease })),
    increaseProduction: (productionIncrease: number) =>
        set((state) => ({ production: state.production + productionIncrease })),
    increasePopulation: (populationIncrease: number) => {
        set((state) => {
            let {
                food,
                populationCost,
                foodProduction,
                scienceProduction,
                population,
            } = state;

            // TODO: could that even happen?
            for (let i = 0; i < populationIncrease; i++) {
                food -= state.populationCost;
                populationCost *= 2;
                foodProduction += 1;
                scienceProduction += 0.5;
                population++;
            }

            return {
                food,
                populationCost,
                foodProduction,
                scienceProduction,
                population,
            };
        });
    },
    increaseFarmers: (farmersIncrease: number) =>
        set((state) => {
            let { farmers, population, foodProduction, production } = state;

            farmers += farmersIncrease;
            population -= farmersIncrease;
            foodProduction += 2 * farmersIncrease;
            production -= farmersIncrease;

            return { farmers, population, foodProduction, production };
        }),
    increaseMiners: (minersIncrease: number) =>
        set((state) => {
            let { miners, population, foodProduction, production } = state;

            miners += minersIncrease;
            population -= minersIncrease;
            foodProduction -= minersIncrease;
            production += 2 * minersIncrease;

            return { miners, population, foodProduction, production };
        }),
    updateResources: () =>
        set((state) => {
            const newState = { ...state };
            const housingModifier = getHousingModifier(newState.housing);

            newState.food +=
                (newState.foodProduction - newState.population * 2) *
                housingModifier;
            if (newState.food >= newState.populationCost) {
                newState.population++;
                newState.food -= newState.populationCost;
                newState.populationCost *= 2;
                newState.foodProduction++;
                newState.production++;
                newState.housing--;
                newState.scienceProduction += 0.5;
            }

            // TODO: I just increased prod by 1 (look up), maybe a mistake
            // newState.production =
            //     RESOURCE_CONSTANTS.BASE_PROD +
            //     newState.population +
            //     newState.miners * 3;
            newState.science += newState.scienceProduction;
            newState.culture += newState.population * 0.1;
            newState.money += newState.population * 0.1;

            return newState;
        }),
}));

export default useResourcesStore;
