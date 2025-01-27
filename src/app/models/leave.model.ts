export type LeaveResponse = {
    message: string;
    status: string;
    data: LeaveDetails[];
  };

export type LeaveAppRej = {
    message: string;
    status: string;
    data: any;
}
  
  export type LeaveDetails = {
    name: string;
    username: string;
    leaveId: string;
    userId: string;
    content: string;
    startDate: string;
    endDate: string;
    status: string;
  };

  export type content = {
      UserDetails: LeaveDetails[]
  }

  export type LeaveModel = {
    name: string;
    username: string;
    content: string;
    startDate: string;
    endDate: string;
    status: string;
  }
  