import { City } from './city.model';

export interface User {
  id?: number;
  lastName?: string;
  firstName?: string;
  email?: string;
  password?: string;
  phone?: number;
  image?: string;
  address?: string;
  city?: City;
  cityId?: number;
  isAdmin?: number;
  languageKey?: string;
}
