export type AuthState = {
  otp: string;
  token: string;
  status: string;
};

export interface AuthTypes {
  msisdn: string;
  code?: string;
}
