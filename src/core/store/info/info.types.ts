import { IMainScreen } from "src/core/models/mainscreen.interface";

export interface MainscreenState {
  status: string;
  fio: FioInterface | null;
  mainscreen: IMainScreen | null;
}

export interface FioInterface {
  email: string;
  name: string;
  phone: string;
}
