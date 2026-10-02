import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../redux/thunks/studentThunks";

function StudentForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    marks: "",
    grade: "Grade 1",
    exam: "Class Exam",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;
    if (!formData.subject.trim()) return;
    if (!formData.marks) return;

    const newStudent = {
      name: formData.name.trim(),
      subject: formData.subject.trim(),
      marks: `${formData.marks} / 100`,
      grade: formData.grade,
      exam: formData.exam,
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=200&q=80",
    };

    dispatch(addStudent(newStudent));

    setFormData({
      name: "",
      subject: "",
      marks: "",
      grade: "Grade 1",
      exam: "Class Exam",
    });
  };

  return (
    <div className="min-h-screen w-full bg-white p-10">
      <div className="mx-auto w-full max-w-[550px]">
        <h2 className="mb-6 text-2xl font-bold text-[#25324B]">Add Student</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324B]">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324B]">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324B]">
              Marks
            </label>

            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              placeholder="Enter marks"
              min="0"
              max="100"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324B]">
              Grade
            </label>

            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#25324B]">
              Type of Exam
            </label>

            <select
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5331BB]"
            >
              <option value="Class Exam">Class Exam</option>
              <option value="Online Exam">Online Exam</option>
              <option value="Missed Exam">Missed Exam</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-lg bg-[#5331BB] px-6 py-2.5 font-medium text-white hover:bg-[#43269d]"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
