export type CourseResponse = {
   message: string;
   status: string;
   data: Courses[];
}

export type Courses = {
    courseId: string;
    courseName: string;
    standard: number;
}

export type CourseMarks = {
    courseId: string;
    userId: string;
    marks: number;
    standard: number;
}

export type UpdatedCourseMarks = {
    courseId: string;
    courseName: string;
    userId: string;
    marks: number;
    standard: number;
}