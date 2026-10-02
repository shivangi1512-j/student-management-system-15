import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../redux/thunks/studentThunks";

function StudentList() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    marks: "",
    exam: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;
    if (!formData.subject) return;
    if (!formData.marks.trim()) return;
    if (!formData.exam) return;

    const newStudent = {
      name: formData.name.trim(),
      subject: formData.subject,
      marks: `${formData.marks} / 100`,
      exam: formData.exam,
      grade: "Grade 1",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=200&q=80",
    };

    dispatch(addStudent(newStudent));

    setFormData({
      name: "",
      subject: "",
      marks: "",
      exam: "",
    });
  };

  return (
    <div className="relative w-full border-b border-gray-200 bg-white px-14 py-8">
      <form
        onSubmit={handleAddStudent}
        className="flex items-end justify-between gap-8"
      >
        {/* STUDENT NAME */}
        <div className="flex items-end gap-6">
          <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#D1D1D1]">
            <svg
              className="h-[48px] w-[48px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" fill="#FFFFFF" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="#FFFFFF" />
            </svg>

            <div className="absolute -right-1 -top-1 flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-white bg-[#2FA6A6] text-[22px] font-bold leading-none text-white">
              +
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[15px] font-medium text-[#4B5563]">
              Student's Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name or roll no."
              className="h-[48px] w-[255px] rounded-full border border-[#D1D5DB] px-6 text-[16px] text-gray-700 outline-none placeholder:text-[#8B93A1] focus:border-[#5331BB]"
            />
          </div>
        </div>

        {/* SUBJECT */}
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#4B5563]">
            Subject
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="h-[48px] w-[235px] rounded-full border border-[#D1D5DB] bg-white px-6 text-[16px] text-[#4B5563] outline-none focus:border-[#5331BB]"
          >
            <option value="">Select from list</option>
            <option value="Science">Science</option>
            <option value="Maths">Maths</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* MARKS */}
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#4B5563]">
            Marks Scored
          </label>

          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            min="0"
            max="100"
            placeholder="00 / 100"
            className="h-[48px] w-[165px] rounded-full border border-[#D1D5DB] px-6 text-[16px] text-[#4B5563] outline-none placeholder:text-[#8B93A1] focus:border-[#5331BB]"
          />
        </div>

        {/* EXAM */}
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#4B5563]">
            Type of Exam
          </label>

          <select
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            className="h-[48px] w-[225px] rounded-full border border-[#D1D5DB] bg-white px-6 text-[16px] text-[#4B5563] outline-none focus:border-[#5331BB]"
          >
            <option value="">Select from list</option>
            <option value="Class Exam">Class Exam</option>
            <option value="Online Exam">Online Exam</option>
            <option value="Missed Exam">Missed Exam</option>
          </select>
        </div>

        {/* ADD BUTTON */}
        <button
          type="submit"
          className="h-[52px] min-w-[190px] rounded-full bg-[#5331BB] px-8 text-[16px] font-bold text-white transition hover:bg-[#43269d]"
        >
          ADD NOW
        </button>
      </form>
    </div>
  );
}

export default StudentList;
