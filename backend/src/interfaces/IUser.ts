export interface IUser {
  name: string;
  email: string;
  hash: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  cep: string;
  bairro: string;
}