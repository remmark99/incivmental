"use client";

import React, { useEffect, useMemo, useState } from "react";
import TechnologyBadge from "@/src/components/TechnologyBadge";
import { shallow } from "zustand/shallow";
import useResourcesStore from "../store/resourcesStore";
import useResearchStore, { TechnologyStatus } from "../store/researchStore";
import useBuildingsStore from "../store/buildingsStore";

function Technology() {
    // TODO: adding shallow according to docs says it's deprecated
    const [technologies, buyTechnology, technologiesUpdateWatcher] =
        useResearchStore(
            (state) => [
                state.technologies,
                state.buyTechnology,
                state.technologiesUpdateWatcher,
            ],
            shallow,
        );
    const [science, increaseScience] = useResourcesStore(
        (state) => [state.science, state.increaseScience],
        shallow,
    );
    const unlockBuilding = useBuildingsStore((state) => state.unlockBuilding);
    const [cheapestTechCost, setCheapestTechCost] = useState(0);
    const [shouldRerenderBadges, setShouldRerenderBadges] = useState(0);

    useEffect(() => {
        setCheapestTechCost(
            // find all techs that can be unlocked,
            // then find the cost of the cheapest one
            Math.min(
                ...Object.entries(technologies)
                    .filter(
                        ([_, technology]) =>
                            technology.status ===
                            TechnologyStatus.CanBeUnlocked,
                    )
                    .map(([_, technology]) => technology.cost),
            ),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [technologiesUpdateWatcher]);

    useEffect(() => {
        if (science >= cheapestTechCost)
            setShouldRerenderBadges(shouldRerenderBadges + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [science, cheapestTechCost]);

    const handleTechClick = (tech: Technology) => {
        if (
            tech.status === TechnologyStatus.CanBeUnlocked &&
            science >= tech.cost
        ) {
            buyTechnology(tech.name as TechnologyName);
            increaseScience(-tech.cost);
            tech.buildingUnlocks?.forEach((building) =>
                unlockBuilding(building),
            );
        }
    };

    const technologyBadges = useMemo(
        () =>
            Object.entries(technologies).map(([technologyName, technology]) => (
                <TechnologyBadge
                    key={technologyName}
                    name={technologyName}
                    cost={technology.cost}
                    row={technology.row}
                    column={technology.column}
                    status={technology.status}
                    unlocks={technology.buildingUnlocks}
                    onClick={() => handleTechClick(technology)}
                />
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [technologiesUpdateWatcher, shouldRerenderBadges],
    );

    return (
        <div className="grid grid-rows-8 h-full grid-cols-tech_tree gap-y-2.5">
            {technologyBadges}
        </div>
    );
}

export default Technology;
