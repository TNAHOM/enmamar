import React, { ReactNode } from "react";
import ProfileSidebar from "./ProfileSidebar";

interface ProfileLayoutProps {
  children: ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="h-full bg-white flex flex-col">
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-[3fr_17fr]">
          <div className="p-4 h-full">
            <ProfileSidebar />
          </div>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
