import DefaultResponse from "./defaultResponse";

export interface IUser {
  email: string;
  password: string;
  name: string;
  username: string;
  language: "en";
  gender: "male" | "female" | "other";
  birthDate: string;
  deletedAt: string;
}

export interface LoginResponse extends DefaultResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
