import { logout } from "../../../utils/auth";
import {
  getCartItems,
  actualizarCantidad,
  eliminarDelCarrito,
  calcularTotal,
} from "../../../utils/cart";
import type { ICartItem } from "../../../types/product";

// ============================================
// Referencias al DOM
// ============================================

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;

const tabla = document.getElementById("tablaCarrito") as HTMLTableElement;
const cuerpoTabla = document.getElementById(
  "cuerpoTablaCarrito"
) as HTMLTableSectionElement;
const mensajeCarritoVacio = document.getElementById(
  "carritoVacio"
) as HTMLParagraphElement;
const totalCarritoEl = document.getElementById(
  "totalCarrito"
) as HTMLParagraphElement;

// ============================================
// Render del carrito (HU-P1-04 y HU-P1-05)
// ============================================

// Vuelve a leer el carrito desde localStorage y redibuja toda la vista.
// La llamamos después de CUALQUIER cambio (sumar, restar, eliminar) para
// que la tabla y el total siempre reflejen lo que hay realmente guardado.
const renderizarCarrito = (): void => {
  const items = getCartItems();
  const hayItems = items.length > 0;

  // Si el carrito está vacío, ocultamos la tabla y mostramos el mensaje
  // (criterio de aceptación de HU-P1-04).
  tabla.style.display = hayItems ? "table" : "none";
  mensajeCarritoVacio.style.display = hayItems ? "none" : "block";

  cuerpoTabla.innerHTML = "";

  items.forEach((item: ICartItem) => {
    const subtotal = item.precio * item.cantidad;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio.toLocaleString("es-AR")}</td>
      <td class="cantidad-control">
        <button type="button" data-accion="restar" data-id="${item.id}">-</button>
        <span>${item.cantidad}</span>
        <button type="button" data-accion="sumar" data-id="${item.id}">+</button>
      </td>
      <td>$${subtotal.toLocaleString("es-AR")}</td>
      <td>
        <button type="button" class="btn-eliminar" data-accion="eliminar" data-id="${item.id}">
          Quitar
        </button>
      </td>
    `;

    cuerpoTabla.appendChild(fila);
  });

  const total = calcularTotal(items);
  totalCarritoEl.textContent = hayItems
    ? `Total: $${total.toLocaleString("es-AR")}`
    : "";
};

// ============================================
// Eventos
// ============================================

// Delegación de eventos otra vez: un solo listener en <tbody> para los
// botones de sumar, restar y eliminar de TODAS las filas, sean cuantas
// sean (las filas se generan dinámicamente en cada render).
cuerpoTabla.addEventListener("click", (e: MouseEvent) => {
  const boton = e.target as HTMLElement;
  if (boton.tagName !== "BUTTON") return;

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.accion;

  const items = getCartItems();
  const itemActual = items.find((item) => item.id === id);
  if (!itemActual) return;

  if (accion === "sumar") {
    actualizarCantidad(id, itemActual.cantidad + 1);
  } else if (accion === "restar") {
    actualizarCantidad(id, itemActual.cantidad - 1);
  } else if (accion === "eliminar") {
    eliminarDelCarrito(id);
  }

  // Después de cualquier cambio, volvemos a pintar todo desde localStorage
  // para asegurarnos de que la vista y los datos guardados nunca queden
  // desincronizados.
  renderizarCarrito();
});

buttonLogout?.addEventListener("click", () => {
  logout();
});

// ============================================
// Inicialización
// ============================================

renderizarCarrito();
