import { ItemInterface, ServicesTypes } from '@core/models/services.interface';

export interface ServicesState {
  services: ServicesTypes | null;
  status: string;
}
