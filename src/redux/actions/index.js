export const updateCompanyName = (companyName) => {
  return {
    type: "UPDATE_COMPANY_NAME",
    companyName,
  };
};

export const updateEmail = (email) => {
  return {
    type: "UPDATE_EMAIL",
    email,
  };
};

export const updateId = (id) => {
  return {
    type: "UPDATE_ID",
    id,
  };
};

export const updateCandidates = (candidates) => {
  return {
    type: "UPDATE_CANDIDATES",
    candidates,
  };
};
