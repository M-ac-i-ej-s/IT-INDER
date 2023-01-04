import { configureStore } from '@reduxjs/toolkit';
import exploreReducer from '../explorePage/exploreSlice';
import profileReducer from '../yourProfilePage/profileSlice';
import matchesReducer from '../matchesPage/matchesSlice'

export const store = configureStore({
  reducer: {
    explore: exploreReducer,
    profile: profileReducer,
    matches: matchesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch