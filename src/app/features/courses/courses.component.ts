import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { IAuthor, ICourse } from 'src/app/shared/interfaces';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: any;
  isLoading = true;

  infoTitle = 'Your list is empty';
  infoText =
    'Please use the <b>"Add new course"</b> button to add your first course';

  addCourse = 'Add new course';

  searchStr?: string;

  gSub: Subscription;
  lSub: Subscription;
  dSub: Subscription;
  aSub: Subscription;

  authors: IAuthor[] = [];

  constructor(
    private router: Router,
    private authorsStoreservice: AuthorsStoreService,
    private coursesStoreService: CoursesStoreService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // this.authorsStoreservice.isLoading$.subscribe((loading) => {
    //   console.log('loading: ', loading);
    // });

    this.authorsStoreservice.getAll();

    this.aSub = this.authorsStoreservice.authors$.subscribe((authors: any) => {
      if (authors && authors.result) {
        this.authors = authors.result;
      }
    });

    this.lSub = this.coursesStoreService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.gSub = this.coursesStoreService.courses$.subscribe((courses) => {
      if (courses) {
        this.courses = courses.result;

        this.courses.forEach((course) => {
          course.authors = course.authors.map((authorCourse) => {
            const foundAuthor = this.authors.find(
              (author) => authorCourse === author.id
            );

            if (foundAuthor) {
              return (authorCourse = foundAuthor.name);
            }
          });
        });
      }
    });

    this.coursesStoreService.getAll();
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.lSub) {
      this.lSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }

    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  search(str: string) {
    this.searchStr = str;
  }

  goToCreatePage() {
    this.router.navigate(['/courses/add']);
  }

  editHandler(id: string) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  deleteHandler(id: string) {
    this.dSub = this.coursesService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter((course: ICourse) => course.id !== id);
    });
  }
}
