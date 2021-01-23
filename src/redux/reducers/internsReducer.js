let initialState = {
    currentInterns: []
};
function internsReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_INTERNS":
            return {
                ...state,
                currentInterns: action.interns
            }
        case "SUBMIT_GRADE":
            return state;
        default:
            return state;
    }
}

export default internsReducer;