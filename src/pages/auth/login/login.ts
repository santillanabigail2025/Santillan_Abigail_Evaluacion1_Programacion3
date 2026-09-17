import type { IUser } from "../../../types/IUser";
import {
  buscarUsuarioPorCredenciales,
  saveUser,
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

  const usuarioEncontrado = buscarUsuarioPorCredenciales(email, password);

  if (!usuarioEncontrado) {
    mensaje.textContent = "Email o contraseña incorrectos.";
    return;
  }

  const sesion: IUser = { ...usuarioEncontrado, loggedIn: true };
  saveUser(sesion);

  if (sesion.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});
