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

type BuildingNames = "Farm" | "Mine" | "Granary" | "Library";
type Buildings = Partial<Record<BuildingNames, Building>>;

type BuildingsState = {
    unlockedBuildings: Buildings;
    currentlyConstructedBuilding: BuildingNames | null;
    constructionTimeout: Timeout | null;
    setCurrentlyConstructedBuilding: (
        currentlyConstructedBuilding: BuildingNames,
    ) => void;
    setConstructionTimeout: (constructionTimeout: Timeout) => void;
    constructBuilding: (buildingName: BuildingNames) => void;
    unlockBuilding: (buildingName: BuildingNames) => void;
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

type TechnologyStatus = 0 | 1 | 2;

type TechnologyName =
    | "Pottery"
    | "Animal Husbandry"
    | "Mining"
    | "Sailing"
    | "Astrology"
    | "Irrigation"
    | "Writing"
    | "Archery"
    | "Masonry"
    | "Bronze Working"
    | "Wheel";

interface Technology {
    name: string;
    cost: number;
    row: number;
    column: number;
    status: ITechnologyStatus;
    techUnlocks?: TechnologyName[];
    buildingUnlocks?: BuildingNames[];
    requiredTechs?: number;
}

type Technologies = Record<TechnologyName, Technology>;

type TechTreeLinks = {
    [key in TechnologyName]: [xOffset: number, yOffset: number][];
};

type ResearchState = {
    technologies: Technologies;
    technologiesUpdateWatcher: number;
    buyTechnology: (technologyName: TechnologyName) => void;
};
