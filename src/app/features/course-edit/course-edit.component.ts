import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './../../shared/validators/custom.validators';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  form: FormGroup;

  @ViewChild('newAuthor') newAuthorRef: ElementRef;

  duration: number;

  createCourse = 'Create course';
  createAuthor = 'Create author';
  deleteAuthor = 'Delete author';
  emptyAuthor = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(0)]],
      newAuthor: ['', [CustomValidators.latinLettersAndNumbers]],
      authors: this.fb.array([]),
    });
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

      this.newAuthorRef.nativeElement.value = '';
      this.emptyAuthor = true;
    }
  }

  removeAuthor(indx: number) {
    (<FormArray>this.form.controls.authors).removeAt(indx);
  }

  onSubmit() {
    const newCourse = {
      title: this.form.value.title,
      description: this.form.value.description,
      authors: this.form.value.authors.length
        ? this.form.value.authors
        : 'No authors',
      duration: this.form.value.duration,
    };

    console.log(newCourse);

    this.form.controls.authors = this.fb.array([]);
    this.form.reset();
  }
}
