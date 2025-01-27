import { UserDetails } from "./user.model"

export type LoginResponse = {
    message: string;
    status: string;
    data: {
      content: UserDetails[]; // The 'content' field now holds the array of users
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };

export type LoggedResponse = {
    message:string,
    status:string,
    data: any
}

export type content = {
    UserDetails: UserDetails[]
}