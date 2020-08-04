import { combineReducers } from "redux";
import companyInfoReducer from './companyInfoReducer';


const rootReducer = combineReducers({
    companyInfo: companyInfoReducer
});

export default rootReducer;
