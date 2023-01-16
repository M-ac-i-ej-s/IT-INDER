import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */ 
import type { PayloadAction } from '@reduxjs/toolkit'
/* eslint-enable */


const initialState = {
    languages: [{value: '', label: ''}],
    description:'',
    name:''
} 

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    SETLANGUAGES: (state, action: PayloadAction<any>) => {
      state.languages = action.payload
    },
    SETDESCRIPTION: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    SETNAME: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { SETDESCRIPTION, SETLANGUAGES, SETNAME } =
  profileSlice.actions;

export default profileSlice.reducer;
