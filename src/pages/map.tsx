import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import * as Honeycomb from 'honeycomb-grid';
import MainLayout from '../layouts/main';
import styles from './map.module.scss';

const Map = () => {
    useEffect(() => {
        const app = new PIXI.Application({ width: 2000, height: 2000, transparent: true });
        const graphics = new PIXI.Graphics();

        const Hex = Honeycomb.extendHex({ size: 75 });
        const Grid = Honeycomb.defineGrid(Hex);

        document.body.querySelector('#canvas')?.appendChild(app.view);
        graphics.lineStyle(1, 0xFF0000);

        Grid.rectangle({ width: 10, height: 10 }).forEach((hex) => {
            graphics.beginFill(0xDCDCDC);

            const point = hex.toPoint();
            const corners = hex.corners().map((corner) => corner.add(point));
            const [firstCorner, ...otherCorners] = corners;

            graphics.moveTo(firstCorner.x + 5, firstCorner.y + 5);
            otherCorners.forEach(({ x, y }) => graphics.lineTo(x + 5, y + 5));
            graphics.lineTo(firstCorner.x + 5, firstCorner.y + 5);

            graphics.endFill();

            app.stage.addChild(graphics);
        });
    }, []);

    return (
        <MainLayout>
            <div id="canvas" className={styles.canvas} />
        </MainLayout>
    );
};

export default Map;
