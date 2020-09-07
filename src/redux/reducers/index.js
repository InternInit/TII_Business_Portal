import { combineReducers } from "redux";
import companyInfoReducer from "./companyInfoReducer";
import listingsReducer from "./listingsReducer";

const rootReducer = combineReducers({
  companyInfo: companyInfoReducer,
  listings: listingsReducer,
});

export default rootReducer;
