export interface BaseCourse {
    title: string;
    description: string;
  }
  
  export interface Course extends BaseCourse {
    id: number;
  }