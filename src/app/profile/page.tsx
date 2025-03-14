"use client";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import { Label } from "@radix-ui/react-label";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const Profile = () => {
  const { user, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
  });
  console.log(user, "user");
  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch("/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      useAuthStore.setState({ user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }
  return (
    <ProfileLayout>
      <div className="max-w-5xl mx-auto mt-14 text-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Profile</h1>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={isEditing ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {isEditing ? (
              "Save Changes"
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">
                First Name
              </Label>
              <Input
                id="name"
                value={profileData.first_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, first_name: e.target.value })
                }
                disabled={!isEditing}
                className="text-lg"
              />
              {/* /> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="name"
                value={profileData.last_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, last_name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profileData.phone_number}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone_number: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label>Account Created</Label>
              <p className="text-sm text-gray-500">
                {new Date(user?.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
