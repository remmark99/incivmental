import React from 'react';
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
            {Object.keys(buildings).map((buildingName) => (
                <button
                    key={buildingName}
                    onClick={startBuilding.bind(null, buildings[buildingName])}
                    type="button"
                    className={styles.container}
                >
                    <span>{buildingName}</span>
                    <img src={`${buildingName}.svg`} alt={`${buildingName} building`} className={styles.icon} />
                    <span>
                        Cost:
                        {buildings[buildingName].cost}
                        {' '}
                        production
                        {' '}
                    </span>
                    <span className={styles.limit}>
                        {`${buildings[buildingName].built} / ${buildings[buildingName].limit}`}
                    </span>
                    <ProgressBar
                        value={buildings[buildingName].buildProgress}
                        max={buildings[buildingName].cost}
                    />
                </button>
            ))}
        </MainLayout>
    );
}

export default Buildings;
