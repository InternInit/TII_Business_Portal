const initialState = {
  finishedGlobalLoading: false,
  finishedCandidiateLoading: false,
}

const loadingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "START_GLOBAL_LOADING":
        return {
          ...state,
          finishedGlobalLoading: false
        };
      case "FINISH_GLOBAL_LOADING":
        return {
          ...state,
          finishedGlobalLoading: true
        };
      case "START_CANDIDATE_LOADING":
        return {
          ...state,
          finishedCandidiateLoading: false
        };
      case "FINISH_CANDIDATE_LOADING":
        return {
          ...state,
          finishedCandidiateLoading: true 
        };
      default:
        return state;
    }
  };
  
  export default loadingsReducer;