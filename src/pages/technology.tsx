import React from 'react';
import TechnologyBadge from '../components/TechnologyBadge';
import MainLayout from '../layouts/main';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectScience } from '../redux/reducers/resources';
import {
    buyTechnology, selectTechnologies, TechnologyStatus, TechnologyType,
} from '../redux/reducers/technologies';
import styles from './technology.module.scss';

function Technology() {
    const technologies = useAppSelector(selectTechnologies);
    const science = useAppSelector(selectScience);
    const dispatch = useAppDispatch();

    const handleTechClick = (tech: TechnologyType) => {
        if (tech.status === TechnologyStatus.CanBeUnlocked && science >= tech.cost) {
            dispatch(buyTechnology(tech));
        }
    };

    return (
        <MainLayout>
            <div className={styles.tree}>
                { Object.keys(technologies).map((name: string) => (
                    <TechnologyBadge
                        key={name}
                        name={name}
                        cost={technologies[name].cost}
                        row={technologies[name].row}
                        column={technologies[name].column}
                        status={technologies[name].status}
                        unlocks={technologies[name].buildingUnlocks}
                        onClick={() => handleTechClick(technologies[name])}
                    />
                ))}
            </div>
        </MainLayout>
    );
}

export default Technology;
