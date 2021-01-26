import _ from "lodash";

const listingReducer = (state = [], action) => {
  switch (action.type) {
    case "BATCH_UPDATE_LISTINGS":
      console.log("Batch Update Listings");
      return [...action.listings];
    case "ADD_LISTING":
      let newAddState = state.slice();
      newAddState.push(action.newListing);
      return newAddState;
    case "UPDATE_LISTING":
      let newUpdateState = _.cloneDeep(state);
      let index = -1;
      newUpdateState.forEach((listing, i) => {
        if (listing.Id === action.id) {
          index = i;
        }
      });
      if (index !== -1) {
        newUpdateState[index] = action.listing;
      } else {
        newUpdateState.push(action.listing);
      }
      return newUpdateState;
    default:
      return state;
  }
};

export default listingReducer;
