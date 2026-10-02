import {
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} from "../actions/studentActions";

const initialState = {
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
      };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload,
        ),
      };

    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student,
        ),
      };

    default:
      return state;
  }
};

export default studentReducer;
