//   form?: Array<{ id?: number; form: string; percentage: number }>;
//   page?: Array<{ id?: number; page: string; percentage: number }>;
//   button?: Array<{ id?: number; page: string; button: string }>;

export interface formData {
  id?: number;
  time?: string;
  form: string;
  percentage: number;
}

export interface pageData {
  id?: number;
  time?: string;
  page: string;
  percentage: number;
}

export interface buttonData {
  id?: number;
  time?: string;
  page: string;
  button: string;
}
