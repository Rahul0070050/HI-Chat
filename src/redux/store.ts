import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user'
import globalReducer from './global'

export const store = configureStore({
    reducer: {
        global: globalReducer,
        user: userReducer
    }
})