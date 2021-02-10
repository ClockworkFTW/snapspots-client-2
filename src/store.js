import { configureStore } from "@reduxjs/toolkit";

import userReducer from "pages/Auth/userSlice";
import spotReducer from "pages/View/spotSlice";
import spotsReducer from "pages/Explore/Spots/spotsSlice";
import popupReducer from "pages/Explore/Map/popupSlice";
import viewportReducer from "pages/Explore/Map/viewportSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    spot: spotReducer,
    spots: spotsReducer,
    popup: popupReducer,
    viewport: viewportReducer,
  },
});
