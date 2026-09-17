import type { IUser } from "../types/IUser";

const USERS_KEY = "users";
const SESSION_KEY = "userData";

// ============================================
// Sesión activa (el usuario logueado en este momento)
// ============================================

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem(SESSION_KEY, parseUser);
};

export const getUSer = () => {
  return localStorage.getItem(SESSION_KEY);
};

export const removeUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

// ============================================
// Base de usuarios registrados (simula una tabla "users")
// ============================================

export const getUsers = (): IUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as IUser[]) : [];
};

export const saveUsers = (users: IUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const existeEmailRegistrado = (email: string): boolean => {
  return getUsers().some((user) => user.email === email);
};

export const buscarUsuarioPorCredenciales = (
  email: string,
  password: string
): IUser | undefined => {
  return getUsers().find(
    (user) => user.email === email && user.password === password
  );
};
