const listingReducer = (state = [], action) => {
  switch (action.type) {
    case "BATCH_UPDATE_LISTINGS":
      return action.listings;
    case "ADD_LISTING":
      let newState = state.slice();
      newState.push(action.newListing);
      return newState;
    default:
      return state;
  }
};

export default listingReducer;
