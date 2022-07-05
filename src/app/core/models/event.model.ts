import { Comment } from './comment.model';
import { Form } from './form.model';

export interface Event {
  id?: number;
  title: string;
  description: string;
  nature: EventNatureEnum;
  location?: string;
  image: string;
  createdAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  price?: number;
  hasForm?: boolean;
  form?: Form;
  comments?: Comment[];
  commentsCount?: number;
  rate?: number;
  userId?: number;
  cityId?: number;
}

export enum EventNatureEnum {
  News = 'News',
  CulturalEvent = 'CulturalEvent',
  SportsEvent = 'SportsEvent',
  ScientificEvent = 'ScientificEvent',
  EconomicEvent = 'EconomicEvent',
  ArtEvent = 'ArtEvent',
}

export namespace EventNatureEnum {
  export const values: EventNatureEnum[] = [
    EventNatureEnum.News,
    EventNatureEnum.CulturalEvent,
    EventNatureEnum.SportsEvent,
    EventNatureEnum.ScientificEvent,
    EventNatureEnum.EconomicEvent,
    EventNatureEnum.ArtEvent,
  ];
}
