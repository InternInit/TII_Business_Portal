let initialState = {
    currentInterns: []
};
function internsReducer(state = initialState, action) {
    let interns = state.currentInterns.slice();
    switch (action.type) {
        case "UPDATE_INTERNS":
            return {
                ...state,
                currentInterns: action.interns
            }
        case "SUBMIT_GRADE":
            return {
                ...state,
                currentInterns: state.currentInterns.map((intern, index) => {
                    if(index !== action.internIndex) {
                        return intern
                    }

                    return {
                        ...intern,
                        grades: {
                            ...intern.grades,
                            [action.gradeObj.Id]: {
                                ...intern.grades[action.gradeObj.Id],
                                ...action.gradeObj
                            }
                        }
                    }
                })
            }
        default:
            return state;
    }
}

export default internsReducer;