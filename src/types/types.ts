export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

export type UserForm = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File | null;
};
