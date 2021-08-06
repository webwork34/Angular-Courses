import { ICourse, IDelete, ICourseResponse } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoursesResponse } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICoursesResponse> {
    return this.http.get<ICoursesResponse>('/courses/all');
  }

  createCourse(course: ICourse): Observable<ICourseResponse> {
    return this.http.post<ICourseResponse>('/courses/add', course);
  }

  getCourse(id: string): Observable<ICourseResponse> {
    return this.http.get<ICourseResponse>(`/courses/${id}`);
  }

  editCourse(course: ICourse, id: string): Observable<ICourseResponse> {
    return this.http.put<ICourseResponse>(`/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<IDelete> {
    return this.http.delete<IDelete>(`/courses/${id}`);
  }
}
