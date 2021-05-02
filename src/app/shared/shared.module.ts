import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  SearchComponent,
  HeaderComponent,
  InfoComponent,
  ModalComponent,
  WindowComponent,
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  ButtonComponent,
  HeaderComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  WindowComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: COMPONENTS,
})
export class SharedModule {}
