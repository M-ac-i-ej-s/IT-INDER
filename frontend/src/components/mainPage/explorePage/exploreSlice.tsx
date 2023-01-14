import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */ 
import type { PayloadAction } from '@reduxjs/toolkit'
/* eslint-enable */

interface stateType {
    user: {
        id: string;
        type: string;
        name: string;
        description: string;
        languages: string[];
        likes: string[];
        dislikes:string[];
        matches: string[];
        email: string;
        password: string;
    };
    users: {
        id: string;
        type: string;
        name: string;
        description: string;
        languages: string[];
        likes: string[];
        dislikes:string[];
        matches: string[];
        email: string;
        password: string;
    }[];
}

const initialState: stateType = {
    user: {
            id: '',
            type:'',
            name: '',
            description:'',
            languages: [''],
            likes:[],
            dislikes:[],
            matches:[],
            email:'',
            password:'' 
        },
    users: [
        {
            id: '',
            type:'',
            name:'Loading',
            description:'',
            languages: [''],
            likes:[],
            dislikes:[],
            matches:[],
            email:'',
            password:''
        },
    ]
} 

export const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    LIKED: (state: stateType, action: PayloadAction<string>) => {
        state.user.likes.push(action.payload)
    },
    DISLIKED: (state: stateType, action:PayloadAction<string>) => {
        state.user.dislikes.push(action.payload)
    },
    LOADUSERS: (state, action) => {
        state.users = action.payload
    },
    SETUSER: (state, action) => {
        state.user = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { LIKED, DISLIKED, LOADUSERS, SETUSER } =
  exploreSlice.actions;

export default exploreSlice.reducer;
