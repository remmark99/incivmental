import { create } from "zustand";

const buildings: Buildings = {
    Farm: {
        name: "Farm",
        cost: 20,
        limit: Infinity,
        built: 0,
        buildProgress: 0,
    },
    Granary: {
        name: "Granary",
        cost: 50,
        limit: 1,
        built: 0,
        buildProgress: 0,
        effects: {
            housing: 2,
            foodProduction: 1,
        },
    },
    Mine: {
        name: "Mine",
        cost: 20,
        limit: Infinity,
        built: 0,
        buildProgress: 0,
    },
    Library: {
        name: "Library",
        cost: 20,
        limit: 1,
        built: 0,
        buildProgress: 0,
        effects: {
            scienceProduction: 2,
            scientistLimit: 1,
        },
    },
};

const useBuildingsStore = create<BuildingsState>((set) => ({
    unlockedBuildings: { Farm: buildings.Farm },
    currentlyConstructedBuilding: null,
    constructionTimeout: null,
    setCurrentlyConstructedBuilding: (currentlyConstructedBuilding) =>
        set(() => ({ currentlyConstructedBuilding })),
    setConstructionTimeout: (constructionTimeout) =>
        set((state) => {
            clearInterval(state.constructionTimeout);

            return { constructionTimeout };
        }),
    constructBuilding: (buildingName: BuildingNames) =>
        set((state) => {
            // TODO: is it bad that I modify state prop?
            const { unlockedBuildings } = state;
            const building = unlockedBuildings[buildingName];

            if (!building) return state;

            building.built++;
            building.buildProgress = 0;

            return {
                unlockedBuildings,
                currentlyConstructedBuilding: null,
            } as Partial<BuildingsState>;
        }),
    unlockBuilding: (buildingName: BuildingNames) =>
        set((state) => ({
            unlockedBuildings: {
                ...state.unlockedBuildings,
                [buildingName]: buildings[buildingName],
            },
        })),
    setBuildProgress: ({
        buildingName,
        buildProgress,
    }: {
        buildingName: BuildingNames;
        buildProgress: number;
    }) =>
        set((state) => {
            const { unlockedBuildings } = state;
            const building = unlockedBuildings[buildingName];

            if (!building) return state;

            building.buildProgress = buildProgress;

            return { unlockedBuildings } as Partial<BuildingsState>;
        }),
}));

export default useBuildingsStore;
