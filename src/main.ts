import { checkAuhtUser } from "./utils/auth";
import type { Rol } from "./types/Rol";

const RUTAS_PROTEGIDAS: { prefijo: string; rol: Rol; zonaPropia: string }[] = [
  {
    prefijo: "/src/pages/admin/",
    rol: "admin",
    zonaPropia: "/src/pages/client/home/home.html",
  },
  {
    prefijo: "/src/pages/client/",
    rol: "client",
    zonaPropia: "/src/pages/admin/home/home.html",
  },
];

const protegerRutaActual = (): void => {
  const rutaActual = window.location.pathname;

  const rutaProtegida = RUTAS_PROTEGIDAS.find((ruta) =>
    rutaActual.includes(ruta.prefijo)
  );

  if (!rutaProtegida) return;

  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    rutaProtegida.zonaPropia,
    rutaProtegida.rol
  );
};

protegerRutaActual();
