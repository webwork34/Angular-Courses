export interface IUser {
  id: string;
  name?: string;
  email: string;
  password: string;
  role: string;
}

export interface ICourse {
  id?: string;
  title: string;
  description: string;
  duration: number;
  authors?: string[];
  creationDate?: string;
}

export interface ICourseResponse {
  successful: boolean;
  result?: ICourse;
}

export interface IDelete {
  successful: boolean;
  result: string;
}

export interface ICoursesResponse {
  successful: boolean;
  result?: ICourse[];
}

export interface IAuthResponse {
  result: string;
  successful: boolean;
  user?: IUser;
}

export interface IAuthor {
  name: string;
  id?: string;
}

export interface IAuthorResponse {
  successful: boolean;
  result: IAuthor;
}

export interface IAuthorsResponse {
  successful: boolean;
  result: IAuthor[];
}

export interface ICreateAuthorResponse {
  successful: boolean;
  result: IAuthor;
}
