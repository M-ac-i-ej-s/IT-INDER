import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */ 
import type { PayloadAction } from '@reduxjs/toolkit'
/* eslint-enable */

interface stateType {
    user: {
        id: string;
        type:string;
        name: string;
        description: string;
        languages: string[];
        likes: string[];
        dislikes:string[];
        matches: string[];
        email: string;
        password: string;
    };
}

const initialState: stateType = {
    user: {
            id: '7',
            type:'worker',
            name: 'Mateusz',
            description:'You got a paiy but you cant sleep at night Car alarm going off outside',
            languages: ['JavaScript', 'Vue', 'Angualar'],
            likes:[],
            dislikes:[],
            matches:[],
            email:'abcde@gmail.com',
            password:'somepass' 
        },
} 

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    UPDATE: (state: stateType, action: PayloadAction<string>) => {
        state.user.description = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE } =
  profileSlice.actions;

export default profileSlice.reducer;
