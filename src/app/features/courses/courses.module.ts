import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from './../../shared/shared.module';
import { CourseModule } from './../course/course.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule, CourseModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
