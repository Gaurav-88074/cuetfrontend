import {configureStore} from '@reduxjs/toolkit';

import authSlice from './AuthSlice';
// import batchInfoSlice from './BatchSlice';
const store = configureStore({
    reducer:{
        // "batchInfoReducer":batchInfoSlice.reducer,
        "authReducer"    :authSlice.reducer,
    },
});
export default store;
