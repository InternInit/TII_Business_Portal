import { combineReducers } from "redux";
import companyInfoReducer from "./companyInfoReducer";
import listingsReducer from "./listingsReducer";
import loadingsReducer from "./loadingsReducer";
import internsReducer from "./internsReducer";

const rootReducer = combineReducers({
  interns: internsReducer,
  companyInfo: companyInfoReducer,
  listings: listingsReducer,
  loadingStatuses: loadingsReducer,
});

export default rootReducer;
