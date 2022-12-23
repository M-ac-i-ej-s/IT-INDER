import { configureStore } from '@reduxjs/toolkit';
import exploreReducer from '../explorePage/exploreSlice';

export const store = configureStore({
  reducer: {
    explore: exploreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch