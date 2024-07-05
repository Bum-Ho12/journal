import { Journal } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    journals: <Journal[]>[],
    status: 'idle',
    error: null,
};

const journalSlice = createSlice({
    name: 'journals',
    initialState,
    reducers: {
        setJournals: (state, action) => {
        state.journals = action.payload;
        },
    },
});

export const { setJournals } = journalSlice.actions;
export default journalSlice.reducer;
