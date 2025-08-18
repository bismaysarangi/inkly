import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import themeReducer from "./theme/themeSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
