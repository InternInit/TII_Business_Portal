import { add } from "lodash";

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

export const updateInterns = (interns) => {
  return {
    type: "UPDATE_INTERNS",
    interns,
  }
}

export const updateCompanyUsers = (users) => {
  return {
    type: "UPDATE_COMPANY_USERS",
    users,
  }
}

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

export const startGlobalLoading = () => {
  return {
    type: "START_GLOBAL_LOADING",
  };
};

export const finishGlobalLoading = () => {
  return {
    type: "FINISH_GLOBAL_LOADING",
  };
};

export const startCandidateLoading = () => {
  return {
    type: "START_CANDIDATE_LOADING"
  };
};

export const finishCandidateLoading = () => {
  return {
    type: "FINISH_CANDIDATE_LOADING"
  };
};

export const startInternLoading = () => {
  return {
    type: "START_INTERN_LOADING"
  };
};

export const finishInternLoading = () => {
  return {
    type: "FINISH_INTERN_LOADING"
  };
};

export const startListingLoading = () => {
  return {
    type: "START_LISTING_LOADING"
  };
};

export const finishListingLoading = () => {
  return {
    type: "FINISH_LISTING_LOADING"
  };
};

export const approveHours = (internId, hourId) => {
  return {
    internId: internId,
    hourId: hourId,
    type: "APPROVE_HOURS"
  };
}

export const rejectHours = (internId, hourId) => {
  return {
    internId: internId,
    hourId: hourId,
    type: "REJECT_HOURS"
  };
}

export const submitGrade = (internId, gradeId, assessment, additionalComments) => {
  return {
    internId: internId,
    gradeId: gradeId,
    assessment: assessment,
    additionalComments: additionalComments,
    type: "SUBMIT_GRADE"
  }
}

export const markFeedbackRead = (internId, feedbackId) => {
  return {
    internId: internId,
    feedbackId: feedbackId,
    type: "MARK_FEEDBACK_READ"
  }
}