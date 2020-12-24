export const updateName = (name) => {
  return {
    type: "UPDATE_NAME",
    name,
  };
};

export const updateDescription = (description) => {
  return {
    type: "UPDATE_DESCRIPTION",
    description,
  };
};

export const updateWebsite = (website) => {
  return {
    type: "UPDATE_WEBSITE",
    website,
  };
};

export const updateEmail = (email) => {
  return {
    type: "UPDATE_EMAIL",
    email,
  };
};

export const updatePhoneNumber = (phoneNumber) => {
  return {
    type: "UPDATE_PHONE_NUMBER",
    phoneNumber,
  };
};

export const updateAvatar = (avatar) => {
  return {
    type: "UPDATE_AVATAR",
    avatar,
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

export const updateReduxCandidateStatus = (index, status) => {
  return {
    type: "UPDATE_CANDIDATE_STATUS",
    index,
    status,
  };
};

export const batchUpdateListings = (listings) => {
  return {
    type: "BATCH_UPDATE_LISTINGS",
    listings,
  };
};

export const addListing = (newListing) => {
  return {
    type: "ADD_LISTING",
    newListing,
  };
};

export const updateListing = (id, listing) => {
  return {
    type: "UPDATE_LISTING",
    id,
    listing,
  };
};

export const startLoading = () => {
  return {
    type: "START_LOADING",
  };
};

export const finishLoading = () => {
  return {
    type: "FINISH_LOADING",
  };
};