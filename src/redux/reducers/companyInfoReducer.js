const companyInfoReducer = (
  state = {
    name: "",
    description: "",
    website: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    id: "",
    candidates: [],
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return Object.assign({}, state, {
        name: action.name,
      });
    case "UPDATE_DESCRIPTION":
      return Object.assign({}, state, {
        description: action.description,
      });
    case "UPDATE_WEBSITE":
      return Object.assign({}, state, {
        website: action.website,
      });
    case "UPDATE_EMAIL":
      return Object.assign({}, state, {
        email: action.email,
      });
    case "UPDATE_PHONE_NUMBER":
      return Object.assign({}, state, {
        phoneNumber: action.phoneNumber,
      });
    case "UPDATE_AVATAR":
      return Object.assign({}, state, {
        avatar: action.avatar,
      });
    case "UPDATE_ID":
      return Object.assign({}, state, {
        id: action.id,
      });
    case "UPDATE_CANDIDATES":
      return Object.assign({}, state, {
        candidates: action.candidates,
      });
    case "UPDATE_CANDIDATE_STATUS":
      let newCandidates = state.candidates.slice();
      newCandidates[action.index].status = action.status;
      return Object.assign({}, state, {
        candidates: newCandidates,
      });
    default:
      return state;
  }
};

export default companyInfoReducer;
