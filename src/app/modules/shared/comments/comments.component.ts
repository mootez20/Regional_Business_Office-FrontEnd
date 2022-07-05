import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from 'src/app/core/models';
import { CommentService } from 'src/app/core/service/comment.service';
import { DateUtils } from '../date-utils';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() eventId?: number;
  @Input() subjectId?: number;
  @Input() userId?: number;
  @Input() set comments(comments: Comment[]) {
    this._comments = comments;
    this._comments.forEach((comment) => {
      comment.duration = DateUtils.duration(comment.createdAt);
      comment.subComments.forEach(
        (subComment) =>
          (subComment.duration = DateUtils.duration(subComment.createdAt))
      );
    });
  }
  @Output() refresh = new EventEmitter<number>();

  public _comments: Comment[] = [];
  public newContent = '';
  public lastOpenedCommentId = -1;

  constructor(private commentService: CommentService) {}

  public reply(content?: string, commentId?: number) {
    if (!content) return;
    const request = {
      eventId: this.eventId,
      subjectId: this.subjectId,
      userId: this.userId,
      commentId,
      content,
    };
    this.commentService.save(request).subscribe((_) => this.refresh.emit(this.lastOpenedCommentId));
  }
}
