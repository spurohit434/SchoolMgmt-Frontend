export type CourseMarks = {
    courseId: string;
    courseName: string;
    marks: number;
}

export type Marksheet =  {
    courseMarks: CourseMarks[];
    userId: string;
    totalMarks: number;
    percentage: number;
    result: string;
}