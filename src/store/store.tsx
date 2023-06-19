import {configureStore, createReducer} from '@reduxjs/toolkit'

const testReducer = createReducer(0, (builder) => {
    builder.addCase('test', (state, action) => {
        return state + 1;
    })
});

export default configureStore({
    reducer: {
        test: testReducer,
    },
})
