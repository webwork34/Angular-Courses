import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from 'src/app/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, DoCheck {
  @Input() courses: ICourse[];

  @Input() searchStr?: string;

  savedCorces: ICourse[];

  showCourse = 'Show Course';

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  ngOnInit(): void {
    this.savedCorces = this.courses;
  }

  ngDoCheck() {
    if (this.searchStr) {
      this.courses = this.courses.filter(
        (course) => course.title.toLowerCase() === this.searchStr.toLowerCase()
      );
    } else if (this.searchStr === '') {
      this.courses = this.savedCorces;
    }
  }
}
