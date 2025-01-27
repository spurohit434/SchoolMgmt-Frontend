export type FeeModel = {
    name: string;   
    username: string;
    feeAmount: number;
    deadline: string;
    fine: number
}

export type FeeResponse = {
   message: string;
   status: string;
   data: FeeModel1[];
}

export type FeeModel1 = {
    studentId: string;
    name: string;   
    username: string;
    feeAmount: number;
    deadline: string;
    fine: number;
}