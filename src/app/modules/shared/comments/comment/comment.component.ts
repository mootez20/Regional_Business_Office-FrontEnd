import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment = {} as Comment;
  @Input() level = 1;
  @Output() reply = new EventEmitter<number>();

  public STORAGE_URL = environment.storageUrl;
  imageUrl: string = 'assets/images/front-end-img/avatar/1.jpg';

  constructor() {}
}
