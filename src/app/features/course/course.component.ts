import { Component, Input, OnInit } from '@angular/core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from 'src/app/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() courses: ICourse;

  showCourse = 'Show Course';

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  ngOnInit(): void {}
}
