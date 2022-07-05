import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() textArea = false;
  @Input() type = 'text';
  @Input() name?: string;
  @Input() value?: string;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Output() valueChanged = new EventEmitter<string>();
}
