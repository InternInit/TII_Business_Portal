const initialState = {
  isGlobalLoading: true,
  isCandidateLoading: true,
  isInternLoading: true,
  isListingLoading: true,
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
      case "START_INTERN_LOADING":
        return {
          ...state,
          isInternLoading: true
        };
      case "FINISH_INTERN_LOADING":
        return {
          ...state,
          isInternLoading: false 
        };
      case "START_LISTING_LOADING":
        return {
          ...state,
          isListingLoading: true
        };
      case "FINISH_LISTING_LOADING":
        return {
          ...state,
          isListingLoading: false
        };
      default:
        return state;
    }
  };
  
  export default loadingsReducer;