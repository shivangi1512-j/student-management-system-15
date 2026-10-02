import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchStudents,
  updateStudent,
  deleteStudent,
} from "../../redux/thunks/studentThunks";

function StudentDetails() {
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const dispatch = useDispatch();

  const { students, loading, error } = useSelector((state) => state.students);

  // FETCH STUDENTS
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // SEARCH + FILTER
  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      student.name?.toLowerCase().includes(searchText) ||
      String(student.id).includes(searchText);

    const examMatch = examFilter === "All" || student.exam === examFilter;

    return searchMatch && examMatch;
  });

  // VIEW
  const handleView = (student) => {
    setViewStudent(student);
  };

  // EDIT
  const handleEdit = (student) => {
    setEditStudent({
      ...student,
      marks: String(student.marks || "").replace(" / 100", ""),
    });
  };

  // EDIT CHANGE
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SAVE EDIT
  const handleSaveEdit = () => {
    if (!editStudent.name?.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!editStudent.subject?.trim()) {
      alert("Please select subject.");
      return;
    }

    if (!String(editStudent.marks).trim()) {
      alert("Please enter marks.");
      return;
    }

    const marks = Number(
      String(editStudent.marks).replace(" / 100", "").trim(),
    );

    if (marks < 0 || marks > 100) {
      alert("Marks must be between 0 and 100.");
      return;
    }

    const updatedStudent = {
      ...editStudent,
      name: editStudent.name.trim(),
      marks: `${marks} / 100`,
    };

    dispatch(updateStudent(updatedStudent));

    setEditStudent(null);
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    dispatch(deleteStudent(id));

    if (viewStudent?.id === id) {
      setViewStudent(null);
    }

    if (editStudent?.id === id) {
      setEditStudent(null);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#5331BB]" />

          <p className="text-[18px] font-medium text-[#5331BB]">
            Loading students...
          </p>
        </div>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-4 text-[17px] text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => dispatch(fetchStudents())}
            className="rounded-lg bg-[#5331BB] px-5 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* ================================================= */}
      {/* VIEW POPUP */}
      {/* ================================================= */}

      {viewStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[450px] rounded-2xl bg-white p-7 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#25324B]">
                Student Details
              </h2>

              <button
                type="button"
                onClick={() => setViewStudent(null)}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* PHOTO */}
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-[#F3F0FF]">
                <img
                  src={viewStudent.image}
                  alt={viewStudent.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span>Name</span>

                <span className="font-semibold">{viewStudent.name}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Grade</span>

                <span className="font-semibold">{viewStudent.grade}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Subject</span>

                <span className="font-semibold">{viewStudent.subject}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span>Marks</span>

                <span className="font-semibold">{viewStudent.marks}</span>
              </div>

              <div className="flex justify-between">
                <span>Exam</span>

                <span
                  className={
                    viewStudent.exam === "Missed Exam"
                      ? "font-semibold text-red-500"
                      : "font-semibold text-[#25324B]"
                  }
                >
                  {viewStudent.exam}
                </span>
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => setViewStudent(null)}
                className="rounded-lg bg-[#5331BB] px-6 py-2.5 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* EDIT POPUP */}
      {/* ================================================= */}

      {editStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-7 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#25324B]">
                Edit Student
              </h2>

              <button
                type="button"
                onClick={() => setEditStudent(null)}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            {/* NAME */}
            <div className="mb-4">
              <label className="mb-2 block">Name</label>

              <input
                type="text"
                name="name"
                value={editStudent.name || ""}
                onChange={handleEditChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
              />
            </div>

            {/* SUBJECT */}
            <div className="mb-4">
              <label className="mb-2 block">Subject</label>

              <select
                name="subject"
                value={editStudent.subject || ""}
                onChange={handleEditChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#5331BB]"
              >
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Hindi">Hindi</option>
                <option value="Computer">Computer</option>
              </select>
            </div>

            {/* MARKS */}
            <div className="mb-4">
              <label className="mb-2 block">Marks</label>

              <input
                type="number"
                name="marks"
                value={editStudent.marks || ""}
                onChange={handleEditChange}
                min="0"
                max="100"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
              />
            </div>

            {/* EXAM */}
            <div className="mb-6">
              <label className="mb-2 block">Type of Exam</label>

              <select
                name="exam"
                value={editStudent.exam || ""}
                onChange={handleEditChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#5331BB]"
              >
                <option value="Class Exam">Class Exam</option>

                <option value="Online Exam">Online Exam</option>

                <option value="Missed Exam">Missed Exam</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditStudent(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-lg bg-[#5331BB] px-5 py-2.5 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* FILTER + SEARCH */}
      {/* ================================================= */}

      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-14 py-5">
        <div className="flex items-center gap-11">
          {["All", "Class Exam", "Online Exam", "Missed Exam"].map((exam) => (
            <button
              type="button"
              key={exam}
              onClick={() => setExamFilter(exam)}
              className={`pb-4 text-[18px] font-medium ${
                examFilter === exam
                  ? "border-b-[3px] border-[#5331BB] text-[#5331BB]"
                  : "text-[#7A8395]"
              }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="flex h-[48px] w-[270px] items-center rounded-full border border-[#D1D5DB] px-5">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-[16px] outline-none"
          />

          <span>🔍</span>
        </div>
      </div>

      {/* ================================================= */}
      {/* TABLE HEADER */}
      {/* ================================================= */}

      <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_180px] items-center border-b border-[#E5E7EB] px-14 py-4 text-[16px] font-medium text-[#7A8395]">
        <div className="pl-[82px]">Name</div>

        <div>Subject</div>

        <div>Marks Scored</div>

        <div>Type of Exam</div>

        <div>Actions</div>
      </div>

      {/* ================================================= */}
      {/* STUDENTS */}
      {/* ================================================= */}

      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_180px] items-center border-b border-[#E5E7EB] px-14 py-4"
        >
          {/* NAME + PHOTO */}
          <div className="flex items-center gap-5">
            <div className="h-[62px] w-[62px] overflow-hidden rounded-full bg-[#F3F0FF]">
              <img
                src={student.image}
                alt={student.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-[19px] font-bold text-[#25324B]">
                {student.name}
              </h3>

              <p className="mt-1 text-[15px] text-[#5E687A]">{student.grade}</p>
            </div>
          </div>

          {/* SUBJECT */}
          <div>{student.subject}</div>

          {/* MARKS */}
          <div>{student.marks}</div>

          {/* EXAM */}
          <div
            className={
              student.exam === "Missed Exam"
                ? "font-medium text-red-500"
                : "text-[#25324B]"
            }
          >
            {student.exam}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleView(student)}
              className="font-medium text-[#2FA6A6]"
            >
              View
            </button>

            <button
              type="button"
              onClick={() => handleEdit(student)}
              className="font-medium text-[#5331BB]"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(student.id)}
              className="font-medium text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* NO STUDENTS */}
      {filteredStudents.length === 0 && (
        <div className="py-10 text-center text-gray-500">No students found</div>
      )}
    </div>
  );
}

export default StudentDetails;
