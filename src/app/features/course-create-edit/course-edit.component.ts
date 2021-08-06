import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  form: FormGroup;

  @ViewChild('newAuthor') newAuthorRef: ElementRef;

  duration: number;

  submit = 'submit';
  createCourse = 'Create course';
  createAuthor = 'Create author';
  deleteAuthor = 'Delete author';
  goBack = 'Go Back';
  emptyAuthor = true;
  gSub: Subscription;
  cSub: Subscription;
  eSub: Subscription;
  courseId = '';

  authors = [];
  authorsNameId = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorsStoreService: AuthorsStoreService,
    private authorsService: AuthorsService,
    private coursesStoreService: CoursesStoreService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;

    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(0)]],
      newAuthor: ['', [CustomValidators.latinLettersAndNumbers]],
      authors: this.fb.array([]),
    });

    if (this.route.snapshot.url[1].path === 'edit') {
      this.createCourse = 'Edit course';

      this.gSub = this.coursesService
        .getCourse(this.courseId)
        .subscribe(({ result }) => {
          this.authors = result.authors;

          this.authorsNameId = this.authorsNameId.filter((authorNameId) => {
            const foundAuthor = this.authors.find((author) => {
              return authorNameId.id === author;
            });

            if (foundAuthor === authorNameId.id) {
              return authorNameId;
            }
          });

          this.form.patchValue({
            title: result.title,
            description: result.description,
            duration: result.duration,
          });

          if (this.authorsNameId.length) {
            this.authorsNameId.forEach((author) => {
              this.getAuthors.push(this.fb.control(author.name));
            });
          }
        });
    }

    this.authorsStoreService.authors$.subscribe((author: any) => {
      this.authorsNameId = author.result;

      if (author && !author.successful) {
        this.authors.push(author.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.eSub) {
      this.eSub.unsubscribe();
    }
  }

  checkInputValue(item: any) {
    if (item.value.trim()) {
      this.emptyAuthor = false;
    } else {
      this.emptyAuthor = true;
    }
  }

  addAuthor() {
    if (this.newAuthorRef.nativeElement.value.trim()) {
      (<FormArray>this.form.controls.authors).push(
        new FormControl(this.newAuthorRef.nativeElement.value)
      );

      this.authorsStoreService.addAuthor(this.newAuthorRef.nativeElement.value);

      this.newAuthorRef.nativeElement.value = '';
      this.emptyAuthor = true;
    }
  }

  get getAuthors() {
    return this.form.get('authors') as FormArray;
  }

  removeAuthor(indx: number) {
    (<FormArray>this.form.controls.authors).removeAt(indx);

    let authorId: string;

    this.authors = this.authors.filter((author, i) => {
      if (i === indx) {
        authorId = author;
      }

      return author !== authorId;
    });

    this.authorsService.deleteAuthor(authorId).subscribe();
  }

  goToCoursesList() {
    this.form.reset();
    this.router.navigate(['/courses']);
  }

  onSubmit() {
    const course = {
      title: this.form.value.title,
      description: this.form.value.description,
      authors: this.authors,
      duration: this.form.value.duration,
    };

    if (this.route.snapshot.url[1].path === 'add') {
      this.coursesStoreService.createCourse(course);
      this.form.controls.authors = this.fb.array([]);
      this.form.reset();
      this.authors = [];
    } else {
      this.eSub = this.coursesService
        .editCourse(course, this.courseId)
        .subscribe(() => {
          this.router.navigate(['/courses']);
          this.form.controls.authors = this.fb.array([]);
          this.form.reset();
        });
    }
  }
}
