import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PopCard from '../components/PopCard';
import ProgressBar from '../components/ProgressBar';
import MainLayout from '../layouts/main';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    buildBuilding, BuildingInterface, selectBuildings, setBuildProgress,
} from '../redux/reducers/buildings';
import { selectProduction } from '../redux/reducers/resources';
import styles from './buildings.module.scss';

function Buildings() {
    const buildings = useAppSelector(selectBuildings);
    const production = useAppSelector(selectProduction);
    const dispatch = useAppDispatch();

    function startBuilding(building: BuildingInterface) {
        const { name, cost } = building;
        let { buildProgress } = building;

        const interval = setInterval(() => {
            if (buildProgress >= cost) {
                clearInterval(interval);

                dispatch(buildBuilding(building));

                return 0;
            }

            buildProgress += production;

            dispatch(setBuildProgress({ name, buildProgress }));

            return Math.min(buildProgress, cost);
        }, 1000);
    }

    return (
        <MainLayout>
            <Grid container spacing={2}>
                {Object.keys(buildings).map((buildingName) => (
                    <Grid xs={2}>
                        <PopCard
                            icon={buildingName}
                            cardTitle={`${buildingName} (${buildings[buildingName].built})`}
                            foodYield={3}
                            progressVal={buildings[buildingName].buildProgress}
                            progressMax={buildings[buildingName].cost}
                            buttonText="Build"
                        />
                    </Grid>
                ))}
            </Grid>
        </MainLayout>
    );
}

export default Buildings;
