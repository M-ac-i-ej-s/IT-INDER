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
        likes: string[];
        dislikes:string[];
        matches: string[];
        email: string;
        password: string;
    }[];
}

const initialState: stateType = {
    user: {
            id: '7',
            type:'worker',
            name: 'Mateusz',
            description:'You got a paiy but you cant sleep at night Car alarm going off outside',
            likes:[],
            dislikes:[],
            matches:[],
            email:'abcde@gmail.com',
            password:'somepass' 
        },
    users: [
        {
            id: '4',
            type:'project',
            name:'roadMap',
            description:'Cause you re angry You re angry and you don t know why Yeah, you re angry You re angry and that s alright',
            likes:[],
            dislikes:[],
            matches:[],
            email:'tyuert@gmail.com',
            password:'somepass'
        },
        {
            id: '5',
            type:'project',
            name:'Faq',
            description:'And if you re feeling a little murderous inside today They say crime don t pay, well neither do they And if you re feeling like nothing ever fucking goes your way They say crime don t pay, well neither do they',
            likes:['7'],
            dislikes:[],
            matches:[],
            email:'ghjjkl@gmail.com',
            password:'somepass'
        },
        {
            id: '6',
            type:'project',
            name:'blog',
            description:'Packed out train like a tin of sardines Doors slide open but nobody leaves More pile in til you can t breathe',
            likes:['7'],
            dislikes:[],
            matches:[],
            email:'zxcasd@gmail.com',
            password:'somepass'
        }
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
  },
});

// Action creators are generated for each case reducer function
export const { LIKED, DISLIKED } =
  exploreSlice.actions;

export default exploreSlice.reducer;
