import {
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "../actions/studentActions";

const API_URL = "https://dummyjson.com/users";

// SCHOOL SUBJECTS
const subjects = ["Maths", "English", "Science", "Hindi", "Computer"];

// GET STUDENTS
export const fetchStudents = () => async (dispatch) => {
  dispatch({
    type: FETCH_STUDENTS_REQUEST,
  });

  try {
    const response = await fetch(`${API_URL}?limit=20`);

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const data = await response.json();

    // SAME PHOTOS
    const images = [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=200&q=80",
    ];

    const students = data.users.map((user, index) => ({
      id: user.id,

      name: `${user.firstName} ${user.lastName}`,

      // PHOTO SAME
      image: images[index % images.length],

      grade: `Grade ${(index % 5) + 1}`,

      // ONLY SUBJECT CHANGED
      subject: subjects[index % subjects.length],

      marks: `${70 + ((index * 7) % 25)} / 100`,

      exam:
        index % 3 === 0
          ? "Online Exam"
          : index % 3 === 1
            ? "Class Exam"
            : "Missed Exam",
    }));

    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: students,
    });
  } catch (error) {
    console.error("Fetch students error:", error);

    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error.message,
    });
  }
};

// ADD STUDENT
export const addStudent = (student) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: student.name,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add student");
    }

    const data = await response.json();

    const newStudent = {
      ...student,
      id: data.id || Date.now(),
    };

    dispatch({
      type: ADD_STUDENT,
      payload: newStudent,
    });
  } catch (error) {
    console.error("Add student error:", error);

    dispatch({
      type: ADD_STUDENT,
      payload: {
        ...student,
        id: Date.now(),
      },
    });
  }
};

// UPDATE STUDENT
export const updateStudent = (student) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: student.name,
      }),
    });

    dispatch({
      type: UPDATE_STUDENT,
      payload: student,
    });
  } catch (error) {
    console.error("Update student error:", error);

    dispatch({
      type: UPDATE_STUDENT,
      payload: student,
    });
  }
};

// DELETE STUDENT
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_STUDENT,
      payload: id,
    });
  } catch (error) {
    console.error("Delete student error:", error);

    dispatch({
      type: DELETE_STUDENT,
      payload: id,
    });
  }
};
