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
    interns: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.name
      }
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.description
      }
    case "UPDATE_WEBSITE":
      return {
        ...state,
        website: action.website
      }
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.email
      }
    case "UPDATE_PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.phoneNumber
      }
    case "UPDATE_AVATAR":
      return {
        ...state,
        avatar: action.avatar
      }
    case "UPDATE_ID":
      return {
        ...state,
        id: action.id
      }
    case "UPDATE_CANDIDATES":
      return {
        ...state,
        candidates: action.candidates
      }
    case "UPDATE_INTERNS":
      return {
        ...state,
        interns: action.interns
      }
    case "UPDATE_CANDIDATE_STATUS":
      let newCandidates = state.candidates.slice();
      newCandidates[action.index].status = action.status;
      return {
        ...state,
        candidates: newCandidates
      }
    default:
      return state;
  }
};

export default companyInfoReducer;
