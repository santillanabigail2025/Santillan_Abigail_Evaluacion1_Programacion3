import type { IUser } from "../../../types/IUser";
import {
  getUsers,
  saveUsers,
  existeEmailRegistrado,
} from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  if (!email || !password) {
    mensaje.textContent = "Completá email y contraseña.";
    return;
  }

  if (existeEmailRegistrado(email)) {
    mensaje.textContent = "Ese email ya está registrado. Iniciá sesión.";
    return;
  }

  const nuevoUsuario: IUser = {
    email,
    password,
    role: "client",
    loggedIn: false,
  };

  const usuarios = getUsers();
  usuarios.push(nuevoUsuario);
  saveUsers(usuarios);

  mensaje.textContent = "¡Registro exitoso! Redirigiendo al login...";

  setTimeout(() => {
    navigate("/src/pages/auth/login/login.html");
  }, 1200);
});
