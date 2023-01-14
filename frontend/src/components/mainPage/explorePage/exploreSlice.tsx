import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */ 
import type { PayloadAction } from '@reduxjs/toolkit'
/* eslint-enable */

interface stateType {
    matchStyle: {left : string},
    render: boolean
}

const initialState: stateType = {
    matchStyle: {left:'-3250px'},
    render: true,
} 

export const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    SETLEFT: (state: stateType, action: PayloadAction<string>) => {
        state.matchStyle.left = action.payload
    },
    SETRENDER: (state: stateType, action:PayloadAction<boolean>) => {
        state.render = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { SETLEFT, SETRENDER } =
  exploreSlice.actions;

export default exploreSlice.reducer;
