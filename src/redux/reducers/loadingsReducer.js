const initialState = {
  isGlobalLoading: true,
  isCandidateLoading: true,
}

const loadingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "START_GLOBAL_LOADING":
        return {
          ...state,
          isGlobalLoading: true
        };
      case "FINISH_GLOBAL_LOADING":
        return {
          ...state,
          isGlobalLoading: false
        };
      case "START_CANDIDATE_LOADING":
        return {
          ...state,
          isCandidateLoading: true
        };
      case "FINISH_CANDIDATE_LOADING":
        return {
          ...state,
          isCandidateLoading: false 
        };
      default:
        return state;
    }
  };
  
  export default loadingsReducer;