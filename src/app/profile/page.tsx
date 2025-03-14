"use client";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuthStore } from "@/lib/store/auth-store";
import React from "react";

const Profile = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <ProfileLayout>
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={`${user.first_name} ${user.last_name}`}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={user.email}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            value={user.phone_number}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Role</label>
          <input
            type="text"
            value={user.role}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
