import { Gender, Role } from "./models.model";
  
export type UserDetails = {
    userId: string;
    name: string; // Name of the user
    age: number; // Age of the user
    role: string; // Role of the user (e.g., "Student")
    gender: string; // Gender of the user ("M" or "F")
    username: string; // Username for the account
    address: string; // Address of the user
    email: string;
    mentorOf: number;
    standard: number;
  };
  
  export type formInput = {
    name: string; // Name of the user
    age: number; // Age of the user
    role: string; // Role of the user (e.g., "Admin", "Student", etc.)
    gender: string; // Gender of the user ("male" or "female")
    username: string; // Username for the user
    password: string; // User's password (assuming it's part of the form data)
    address: string; // Address of the user
    dob: string; // Date of birth of the user
    email: string; // User's email address
    rollNo: string; // Roll number of the user (e.g., for students)
    standard: number; // Standard/Grade of the user (e.g., 1, 2, etc.)
    contactNumber: string; // Contact number of the user
    mentorOf: number; // ID or count of users the user is a mentor to (if applicable)
};

export type UserResponse = {
  message:string;
  status: string;
  data: any;
}


export type UpdateUser = {
  name: string;
  age: number;
  address: string;
  password?: string;
  email: string;
}