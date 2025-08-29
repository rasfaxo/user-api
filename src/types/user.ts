export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  department: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  isActive?: boolean;
  department?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
  department?: string | null;
}

export interface UserAuth {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
