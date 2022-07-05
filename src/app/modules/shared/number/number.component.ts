import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
})
export class NumberComponent {
  @Input() name = '';
  @Input() value = 0;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Output() valueChanged = new EventEmitter<number>();
}
