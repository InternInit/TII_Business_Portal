import { combineReducers } from "redux";
import companyInfoReducer from "./companyInfoReducer";
import listingsReducer from "./listingsReducer";
import loadingsReducer from "./loadingsReducer";

const rootReducer = combineReducers({
  companyInfo: companyInfoReducer,
  listings: listingsReducer,
  loadingStatuses: loadingsReducer,
});

export default rootReducer;
