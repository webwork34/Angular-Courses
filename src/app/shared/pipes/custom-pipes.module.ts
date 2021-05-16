import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinTransformPipe } from './min-transform.pipe';
import { StringJoinerPipe } from './string-joiner.pipe';

@NgModule({
  declarations: [MinTransformPipe, StringJoinerPipe],
  imports: [CommonModule],
  exports: [MinTransformPipe],
})
export class CustomPipesModule {}
