interface Building {
    name: string;
    cost: number;
    limit: number;
    built: number;
    buildProgress: number;
    effects?: {
        housing?: number;
        foodProduction?: number;
        scienceProduction?: number;
        scientistLimit?: number;
    };
}

type BuildingNames = "farm" | "mine" | "granary" | "library";
type Buildings = Partial<Record<BuildingNames, Building>>;

type BuildingsState = {
    unlockedBuildings: Buildings;
    constructBuilding: (buildingName: BuildingNames) => void;
    addBuilding: (buildingName: BuildingNames) => void;
    setBuildProgress: ({
        buildingName,
        buildProgress,
    }: {
        buildingName: BuildingNames;
        buildProgress: number;
    }) => void;
};

interface ResourcesState {
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
    increaseFood: (foodIncrease: number) => void;
    increaseScience: (scienceIncrease: number) => void;
    increaseProduction: (productionIncrease: number) => void;
    increasePopulation: (populationIncrease: number) => void;
    increaseFarmers: (farmersIncrease: number) => void;
    increaseMiners: (minersIncrease: number) => void;
    updateResources: () => void;
}
