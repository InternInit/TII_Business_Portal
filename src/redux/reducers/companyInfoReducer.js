const companyInfoReducer = (
  state = {
    companyName: "Microsoft",
    email: "",
    id: "e149eb67-8016-4d09-aa73-6bab85bdea1d",
    candidates: [],
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_COMPANY_NAME":
      return Object.assign({}, state, {
        companyName: action.companyName,
      });
    case "UPDATE_EMAIL":
      return Object.assign({}, state, {
        email: action.email,
      });
    case "UPDATE_ID":
      return Object.assign({}, state, {
        id: action.id,
      });
    case "UPDATE_CANDIDATES":
      return Object.assign({}, state, {
        candidates: action.candidates,
      });
    default:
      return state;
  }
};

export default companyInfoReducer;
