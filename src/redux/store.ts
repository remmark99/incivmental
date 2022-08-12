import { configureStore } from '@reduxjs/toolkit';
import resourcesReducer from './reducers/resources';
import technologiesReducer from './reducers/technologies';
import gameReducer from './reducers/game';

export const store = configureStore({
    reducer: {
        resources: resourcesReducer,
        technologies: technologiesReducer,
        game: gameReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
