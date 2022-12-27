import { configureStore } from '@reduxjs/toolkit';
import exploreReducer from '../explorePage/exploreSlice';
import profileReducer from '../yourProfilePage/profileSlice';

export const store = configureStore({
  reducer: {
    explore: exploreReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch