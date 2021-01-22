import _ from "underscore";

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
    interns: [],
    users: [],
  },
  action
) => {
  let students = state.interns.slice();
  let candidates = state.candidates.slice();

  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.description,
      };
    case "UPDATE_WEBSITE":
      return {
        ...state,
        website: action.website,
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.email,
      };
    case "UPDATE_PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
    case "UPDATE_AVATAR":
      return {
        ...state,
        avatar: action.avatar,
      };
    case "UPDATE_ID":
      return {
        ...state,
        id: action.id,
      };
    case "UPDATE_CANDIDATES":
      return {
        ...state,
        candidates: action.candidates,
      };
    case "UPDATE_INTERNS":
      return {
        ...state,
        interns: action.interns,
      };
    case "UPDATE_COMPANY_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "UPDATE_CANDIDATE_STATUS":
      let newCandidates = state.candidates.slice();
      newCandidates[action.index].status = action.status;
      return {
        ...state,
        candidates: newCandidates,
      };
    case "APPROVE_HOURS":
      let studentIndex = _.findIndex(students, { Id: action.internId });
      let hoursIndex = _.findIndex(students[studentIndex].hours, {
        Id: action.hourId,
      });
      students[studentIndex].hours[hoursIndex].isApproved = true;
      return {
        ...state,
        interns: students,
      };
    case "REJECT_HOURS":
      let rejectStudentIndex = _.findIndex(students, { Id: action.internId });
      let rejectHoursIndex = _.findIndex(students[rejectStudentIndex].hours, {
        Id: action.hourId,
      });
      students[rejectStudentIndex].hours.splice(rejectHoursIndex, 1);
      return {
        ...state,
        interns: students,
      };
    case "SUBMIT_GRADE":
      students[action.gradeStudentIndex].grades[action.gradeIndex] = action.gradeObject[action.gradeIndex];
      console.log(students[action.gradeStudentIndex].grades[action.gradeIndex]);
      console.log(action.gradeObject[action.gradeIndex]);

      return {
        ...state,
        interns: students,
      };
    case "MARK_FEEDBACK_READ":
      let markFeedbackStudentIndex = _.findIndex(students, {
        Id: action.internId,
      });
      let markFeedbackIndex = _.findIndex(
        students[markFeedbackStudentIndex].feedback,
        { Id: action.feedbackId }
      );
      students[markFeedbackStudentIndex].feedback[
        markFeedbackIndex
      ].isRead = true;
      return {
        ...state,
        interns: students,
      };
    default:
      return state;
  }
};

export default companyInfoReducer;
