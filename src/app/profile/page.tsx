"use client";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import { Label } from "@radix-ui/react-label";
import { Pencil, Camera, User, Upload, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface ProfileData {
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture?: string;
}

const Profile = () => {
  const { user, isLoading, initializeAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_picture: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture || "",
      });
      setImagePreview(user.profile_picture || "");
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("/api/me/profilePicture", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to upload image. Please try again.");
        return null;
      }

      const imageUrl = await response.json();

      return imageUrl;
    } catch (error) {
      console.warn("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setProfileData({ ...profileData, profile_picture: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfileData = { ...profileData };

      if (imageFile) {
        const imageUrl = await handleImageUpload();

        if (imageUrl) {
          updatedProfileData.profile_picture = imageUrl;
        }
      }

      const response = await fetch("/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();

      setIsEditing(false);
      setImageFile(null);
      initializeAuth();
      useAuthStore.setState({ user: updatedUser });
    } catch (error) {
      console.warn("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    if (user) {
      setProfileData({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture || "",
      });
      setImagePreview(user.profile_picture || "");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          <div className="flex gap-2">
            {isEditing && (
              <Button
                variant="outline"
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </Button>
            )}
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={isEditing ? "bg-purple-600 hover:bg-purple-700" : ""}
              disabled={isUploadingImage}
            >
              {isEditing ? (
                isUploadingImage ? (
                  "Saving..."
                ) : (
                  "Save Changes"
                )
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <Label className="text-lg">Profile Image</Label>
              <div className="flex items-start gap-6">
                {/* Image Display */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                    {imagePreview || profileData.profile_picture ? (
                      <Image
                        src={imagePreview || profileData.profile_picture || ""}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>

                  {/* Edit overlay when editing */}
                  {isEditing && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera
                        className="w-8 h-8 text-white"
                        onClick={() => fileInputRef.current?.click()}
                      />
                    </div>
                  )}
                </div>

                {/* Image Controls */}
                {isEditing && (
                  <div className="flex flex-col gap-3">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </Button>

                    {(imagePreview || profileData.profile_picture) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}

                    <p className="text-xs text-gray-500 max-w-xs">
                      Recommended: Square image, max 5MB
                      <br />
                      Formats: JPG, PNG, GIF
                    </p>
                  </div>
                )}

                {/* View mode description */}
                {!isEditing &&
                  !(imagePreview || profileData.profile_picture) && (
                    <div className="flex items-center text-gray-500">
                      <p>No profile image set</p>
                    </div>
                  )}
              </div>
            </div>

            {/* Rest of the form fields */}
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-lg">
                First Name
              </Label>
              <Input
                id="first-name"
                value={profileData.first_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, first_name: e.target.value })
                }
                disabled={!isEditing}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={profileData.last_name}
                onChange={(e) =>
                  setProfileData({ ...profileData, last_name: e.target.value })
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
