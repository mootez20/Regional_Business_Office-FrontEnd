import { Photo } from './photo.model';

export interface Album {
  id?: number;
  title: string;
  description?: string;
  photos?: Photo[];
  createdAt?: Date;
}
