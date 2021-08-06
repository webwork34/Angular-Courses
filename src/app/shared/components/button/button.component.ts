import { Component, Input, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() btnName? = '';
  @Input() iconName?: string;
  @Input() btnType? = 'button';
  @Input() btnDisabled = false;

  faPen = faPen;
  faTrash = faTrash;

  constructor() {}

  ngOnInit(): void {}
}
