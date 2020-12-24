import { combineReducers } from "redux";
import companyInfoReducer from "./companyInfoReducer";
import listingsReducer from "./listingsReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  companyInfo: companyInfoReducer,
  listings: listingsReducer,
  finishedLoading: loadingReducer,
});

export default rootReducer;
