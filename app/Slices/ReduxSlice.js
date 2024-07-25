import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const counterSlice = createSlice({
    name: 'page',
    initialState: { value: { pages: [] } },
    reducers: {
        setpageobj: (state, action) => {
            var tempstate = state.value;
            var temppagesarr = tempstate.pages;
            temppagesarr.forEach(function (item, index) {
                if (item.pageid == action.payload.pageid) {
                    temppagesarr.splice(index, 1);
                }
            });
            temppagesarr.push({ pageid: action.payload.pageid, cacheid: action.payload.cacheid, pageobj: action.payload.pageobj });
            tempstate.pages = temppagesarr;
            state.value = tempstate;
        },
    },
});

// Action creators
export const { setpageobj } = counterSlice.actions;

export default counterSlice.reducer;
