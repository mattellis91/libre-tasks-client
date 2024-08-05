import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import boardsReducer from "../features/boards/boardSlice";
import modalReducer from "../features/global/modalSlice";
import sidebarReducer from "../features/global/sidebarSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme", "boards"],
  blacklist: ["modal", "sidebar"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  boards: boardsReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
