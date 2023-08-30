"use client";

import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import PopCard from "../src/components/PopCard";
import useAppStore from "./store/resourcesStore";
import useBuildingsStore from "./store/buildingsStore";

function Home() {
    const {
        food,
        populationFoodYield,
        populationProductionYield,
        population,
        populationCost,
        farmers,
        miners,
        scientists,
        increaseFarmers,
        increaseMiners,
    } = useAppStore((state) => state);
    const { unlockedBuildings } = useBuildingsStore((state) => state);
    const { farm, mine } = unlockedBuildings;

    return (
        <div className="h-full">
            <Grid container spacing={1}>
                <Grid xs={6} md={4} lg={2} xl={2}>
                    <PopCard
                        icon="Pop"
                        cardTitle={`Population (${population})`}
                        foodYield={populationFoodYield}
                        prodYield={populationProductionYield}
                        progressVal={food}
                        progressMax={populationCost}
                        buttonText="TODO"
                        onButtonClick={() => console.log("haha")}
                    />
                </Grid>
                <Grid xs={6} md={4} lg={2} xl={2}>
                    <PopCard
                        icon="Farmer"
                        cardTitle={`Farmer (${farmers})`}
                        foodYield={3}
                        buttonText="Buy"
                        hasTextField
                        onButtonClick={(value: number) =>
                            increaseFarmers(value)
                        }
                        max={Math.min(
                            population,
                            farm ? farm.built - farmers : 0,
                        )}
                    />
                </Grid>
                <Grid xs={6} md={4} lg={2} xl={2}>
                    <PopCard
                        icon="Miner"
                        cardTitle={`Miner (${miners})`}
                        prodYield={3}
                        buttonText="Buy"
                        hasTextField
                        onButtonClick={(value: number) => increaseMiners(value)}
                        max={Math.min(
                            population,
                            mine ? mine.built - miners : 0,
                        )}
                    />
                </Grid>
                <Grid xs={6} md={4} lg={2} xl={2}>
                    <PopCard
                        icon="Scientist"
                        cardTitle={`Scientist (${scientists})`}
                        prodYield={3}
                        buttonText="Buy"
                        hasTextField
                        onButtonClick={(value: number) => increaseMiners(value)}
                        max={Math.min(
                            population,
                            mine ? mine.built - miners : 0,
                        )}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
