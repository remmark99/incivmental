import { create } from "zustand";

const buildings: Buildings = {
    farm: {
        name: "Farm",
        cost: 20,
        limit: Infinity,
        built: 0,
        buildProgress: 0,
    },
    granary: {
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
    mine: {
        name: "Mine",
        cost: 20,
        limit: Infinity,
        built: 0,
        buildProgress: 0,
    },
    library: {
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
    unlockedBuildings: { farm: buildings.farm },
    constructBuilding: (buildingName: BuildingNames) =>
        set((state) => {
            // TODO: is it bad that I modify state prop?
            const { unlockedBuildings } = state;
            const building = unlockedBuildings[buildingName];

            if (!building) return state;

            building.built = 1;
            building.buildProgress = 0;

            return { unlockedBuildings } as Partial<BuildingsState>;
        }),
    addBuilding: (buildingName: BuildingNames) =>
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

// extraReducers(builder) {
//     builder.addCase(buyTechnology, (state, action) => {
//         action.payload.buildingUnlocks?.forEach((building) => {
//             state[building] = buildings[building];
//         });
//     });
// }
