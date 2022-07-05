import { Comment } from './comment.model';

export interface Subject {
  id?: number;
  title: string;
  createdAt?: Date;
  comments?: Comment[];
}
