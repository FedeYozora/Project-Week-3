export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}
