import React from "react";

const Profile = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-gray-800">Student Admin</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
