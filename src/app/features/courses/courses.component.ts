import { Component, OnInit } from '@angular/core';
import { mockedCourseList } from './../../shared/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  name: string = 'Test name';
  courses = [];
  logOut = 'Logout';

  infoTitle = 'Your list is empty';
  infoText =
    'Please use the <b>"Add new course"</b> button to add your first course';
  addCourse = 'Add new course';

  constructor() {}

  ngOnInit(): void {
    this.courses = mockedCourseList;
  }
}
