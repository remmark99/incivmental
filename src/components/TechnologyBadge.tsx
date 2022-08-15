import { Tooltip } from '@mui/material';
import React from 'react';
import { TechnologyStatus } from '../redux/reducers/technologies';
import styles from './TechnologyBadge.module.scss';

interface Props {
    name: string,
    row: number,
    column: number,
    cost: number,
    status: TechnologyStatus,
    unlocks: string[] | undefined,
    onClick: any,
}

function TechnologyBadge({
    name, cost, row, column, status, unlocks, onClick,
}: Props) {
    const tooltip = (
        <>
            <div>{name}</div>
            <div>
                {cost}
                {' '}
                science
            </div>
        </>
    );

    let containerStyles = styles.unlocked;
    if (status === TechnologyStatus.Locked) {
        containerStyles = styles.locked;
    } else if (status === TechnologyStatus.CanBeUnlocked) {
        containerStyles = styles.can_be_unlocked;
    }

    let data;
    if (status !== TechnologyStatus.Locked) {
        data = (
            <>
                <div className={styles.icon}>
                    <img src={`/${name}.svg`} alt={`${name} technology`} />
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>
                        { name }
                    </div>
                    <div className={styles.unlocks}>
                        {unlocks && unlocks.map((unlock) => <img key={unlock} src={`${unlock}.svg`} alt={`${unlock} building`} />)}
                    </div>
                </div>
            </>
        );
    } else {
        data = <div>???</div>;
    }

    return (
        <Tooltip title={tooltip}>
            <div
                className={`${styles.container} ${containerStyles}`}
                style={{ gridRowStart: row, gridColumnStart: column }}
                onClick={onClick}
                role="presentation"
            >
                {data}
            </div>
        </Tooltip>
    );
}

export default TechnologyBadge;
