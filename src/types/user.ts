export interface userProfile {
    id: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    role: string,
}

export interface SignupFormData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role?: string;
    proffesion?: string; //only for instructors
}