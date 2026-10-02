import { useState } from "react";
import StudentForm from "../components/StudentForm/StudentForm";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="mb-6 text-3xl font-bold text-[#25324B]">
        Student Management System
      </h1>

      <button
        type="button"
        onClick={() => {
          console.log("ADD NOW CLICKED");
          setShowForm(true);
        }}
        className="relative z-[9999] cursor-pointer rounded-lg bg-[#5331BB] px-6 py-3 text-white"
      >
        + Add Now
      </button>

      {showForm && <StudentForm onCancel={() => setShowForm(false)} />}
    </div>
  );
}

export default Dashboard;
