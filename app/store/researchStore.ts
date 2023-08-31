import { create } from "zustand";

export enum TechnologyStatus {
    Locked,
    CanBeUnlocked,
    Unlocked,
}

const technologies: Technologies = {
    Pottery: {
        name: "Pottery",
        cost: 50,
        row: 4,
        column: 1,
        status: TechnologyStatus.CanBeUnlocked,
        techUnlocks: ["Writing", "Irrigation"],
        buildingUnlocks: ["Granary"],
    },
    "Animal Husbandry": {
        name: "Animal Husbandry",
        cost: 50,
        row: 5,
        column: 1,
        status: TechnologyStatus.CanBeUnlocked,
        techUnlocks: ["Archery"],
    },
    Mining: {
        name: "Mining",
        cost: 50,
        row: 7,
        column: 1,
        status: TechnologyStatus.CanBeUnlocked,
        techUnlocks: ["Masonry", "Bronze Working", "Wheel"],
        buildingUnlocks: ["Mine"],
    },
    Sailing: {
        name: "Sailing",
        cost: 50,
        row: 1,
        column: 2,
        status: TechnologyStatus.CanBeUnlocked,
    },
    Astrology: {
        name: "Astrology",
        cost: 50,
        row: 2,
        column: 2,
        status: TechnologyStatus.CanBeUnlocked,
    },
    Irrigation: {
        name: "Irrigation",
        cost: 50,
        row: 3,
        column: 2,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
    },
    Writing: {
        name: "Writing",
        cost: 50,
        row: 4,
        column: 2,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
        buildingUnlocks: ["Library"],
    },
    Archery: {
        name: "Archery",
        cost: 50,
        row: 5,
        column: 2,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
    },
    Masonry: {
        name: "Masonry",
        cost: 50,
        row: 6,
        column: 3,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
    },
    "Bronze Working": {
        name: "Bronze Working",
        cost: 50,
        row: 7,
        column: 3,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
    },
    Wheel: {
        name: "Wheel",
        cost: 50,
        row: 8,
        column: 3,
        status: TechnologyStatus.Locked,
        requiredTechs: 1,
    },
};

const useResearchStore = create<ResearchState>((set) => ({
    technologies,
    technologiesUpdateWatcher: 0,
    buyTechnology: (technologyName: TechnologyName) => {
        set((state) => {
            const tech = state.technologies[technologyName];
            tech.status = TechnologyStatus.Unlocked;

            tech.techUnlocks?.forEach((techName) => {
                const unlockedTech = state.technologies[techName];

                unlockedTech.requiredTechs! -= 1; // TODO: fix later

                if (!unlockedTech.requiredTechs) {
                    unlockedTech.status = TechnologyStatus.CanBeUnlocked;
                }
            });

            return {
                technologies: state.technologies,
                technologiesUpdateWatcher: state.technologiesUpdateWatcher + 1,
            };
        });
    },
}));

export default useResearchStore;
