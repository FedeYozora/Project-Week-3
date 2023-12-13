export interface User {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
}
