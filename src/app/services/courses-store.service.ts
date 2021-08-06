import { CoursesService } from 'src/app/services/courses.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  constructor(private coursesService: CoursesService) {}

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private courses$$: BehaviorSubject<any> = new BehaviorSubject(null);

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  get courses$() {
    return this.courses$$.asObservable();
  }

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe((data: any) => {
      this.courses$$.next(data);
      this.isLoading$$.next(false);
    });
  }

  createCourse(course: any) {
    this.coursesService.createCourse(course).subscribe();
  }
}
