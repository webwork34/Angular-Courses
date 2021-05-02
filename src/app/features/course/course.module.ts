import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { MinTransformPipe } from './../../shared/pipes/min-transform.pipe';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [CourseComponent, MinTransformPipe],
  imports: [CommonModule, SharedModule],
  exports: [CourseComponent],
})
export class CourseModule {}
