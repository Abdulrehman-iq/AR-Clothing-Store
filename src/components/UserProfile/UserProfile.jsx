// components/UserProfile/UserProfile.jsx
import React from 'react';

const UserProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-bold">User Profile</h2>
        <p>Welcome, User!</p>
      </div>
    </div>
  );
};

export default UserProfile;