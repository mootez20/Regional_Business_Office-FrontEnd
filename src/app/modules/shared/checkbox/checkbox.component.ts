import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() optionName = 'thing';
  @Input() name = '';
  @Input() value = false;
  @Input() disabled = false;
  @Output() valueChanged = new EventEmitter<boolean>();
}
