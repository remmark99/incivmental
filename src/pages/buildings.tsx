import React from 'react';
import MainLayout from '../layouts/main';
import { useAppSelector } from '../redux/hooks';
import { selectBuildings } from '../redux/reducers/buildings';
import styles from './buildings.module.scss';

function Buildings() {
    const buildings = useAppSelector(selectBuildings);

    return (
        <MainLayout>
            {Object.keys(buildings).map((buildingName) => (
                <div className={styles.container}>
                    <span>{buildingName}</span>
                    <img src={`${buildingName}.svg`} alt={`${buildingName} building`} className={styles.icon} />
                    <span>
                        Cost:
                        {buildings[buildingName].cost}
                        {' '}
                        production
                        {' '}
                    </span>
                </div>
            ))}
        </MainLayout>
    );
}

export default Buildings;
