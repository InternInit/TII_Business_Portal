const companyInfoReducer = (
  state = { companyName: "Microsoft", email: "" },
  action
) => {
  switch (action.type) {
    case "UPDATE_COMPANY_NAME":
      return Object.assign({}, state, {
        companyName: action.companyName
      });
    case "UPDATE_EMAIL":
      return Object.assign({}, state, {
        email: action.email
      });
    default:
      return state;
  }
};

export default companyInfoReducer;
