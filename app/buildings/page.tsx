"use client";

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import PopCard from "@/src/components/PopCard";
import useBuildingsStore from "../store/buildingsStore";
import useResourcesStore from "../store/resourcesStore";

function Buildings() {
    const { unlockedBuildings, constructBuilding, setBuildProgress } =
        useBuildingsStore((state) => state);
    const production = useResourcesStore((state) => state.production);

    const startBuilding = (buildingName: BuildingNames, building: Building) => {
        const { cost } = building;
        let { buildProgress } = building;

        const interval = setInterval(() => {
            buildProgress += production;

            if (buildProgress >= cost) {
                clearInterval(interval);

                constructBuilding(buildingName);

                return;
            }

            setBuildProgress({ buildingName, buildProgress });
        }, 100);
    };

    return (
        <Grid container spacing={2}>
            {Object.entries(unlockedBuildings).map(
                ([buildingName, building]) => (
                    <Grid key={buildingName} xs={2}>
                        <PopCard
                            icon={building.name}
                            cardTitle={`${building.name} (${building.built})`}
                            foodYield={3}
                            progressVal={building.buildProgress}
                            progressMax={building.cost}
                            buttonText="Build"
                            onButtonClick={(_value) =>
                                startBuilding(
                                    buildingName as BuildingNames,
                                    building,
                                )
                            }
                            max={-1}
                        />
                    </Grid>
                ),
            )}
        </Grid>
    );
}

export default Buildings;
