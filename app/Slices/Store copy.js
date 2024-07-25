import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './ReduxSlice';

const reducer = {
    page: counterSlice,
};

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;
