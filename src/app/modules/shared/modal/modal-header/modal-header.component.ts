import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title = '';
  @Input() icon?: string;
  @Output() close = new EventEmitter<void>();
}
