import {
  ItemInterface,
  ServicesTypes,
} from "src/core/models/services.interface";

export interface ServicesState {
  services: ServicesTypes | null;
  status: string;
}
