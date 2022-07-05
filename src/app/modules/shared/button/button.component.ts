import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() name = '';
  @Input() icon?: string;
  @Input() css?: string;
  @Input() width: number = 8;
  @Input() disabled?: boolean;
}
