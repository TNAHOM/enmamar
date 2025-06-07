export interface userProfile {
    id: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    role: string,
    created_at: string,
    updated_at: string,
    profile_picture?: string,
}

export interface InstructorProfile extends Record<string, unknown> {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  industry: string;
  created_at: string;
  courses: number;
  views: number;
}

export interface SignupFormData {
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role?: string;
    proffesion?: string; //only for instructors
}