import type { IProduct } from "../types/product";
import type { ICartItem } from "../types/product";

// Misma idea que "users" y "userData" en localStorage.ts: centralizamos
// el nombre de la clave en una constante para no repetir el string
// "cart" a mano en cada función (y evitar errores de tipeo).
const CART_KEY = "cart";

// ============================================
// Lectura y escritura cruda del carrito en localStorage
// ============================================

// Lee el carrito guardado. Si todavía no hay nada, devuelve un array
// vacío en vez de null: así el resto del código (home.ts, cart.ts) no
// tiene que estar preguntando "¿existe o no existe?" todo el tiempo.
export const getCartItems = (): ICartItem[] => {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? (JSON.parse(raw) as ICartItem[]) : [];
};

// Guarda el array completo de vuelta en localStorage, ya convertido a texto.
const saveCartItems = (items: ICartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// ============================================
// Operaciones sobre el carrito
// ============================================

// Agrega un producto al carrito.
// Criterio de aceptación HU-P1-03: si el producto YA está en el carrito,
// no lo duplica como ítem separado, solo le suma 1 a la cantidad.
export const agregarAlCarrito = (producto: IProduct): void => {
  const items = getCartItems();

  const itemExistente = items.find((item) => item.id === producto.id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    const nuevoItem: ICartItem = { ...producto, cantidad: 1 };
    items.push(nuevoItem);
  }

  saveCartItems(items);
};

// Actualiza la cantidad de un ítem puntual del carrito.
// Si la nueva cantidad es 0 o menos, directamente lo saca del carrito
// (no tiene sentido dejar un ítem con cantidad 0 o negativa dando vueltas).
export const actualizarCantidad = (id: number, nuevaCantidad: number): void => {
  let items = getCartItems();

  if (nuevaCantidad <= 0) {
    items = items.filter((item) => item.id !== id);
  } else {
    items = items.map((item) =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
  }

  saveCartItems(items);
};

// Elimina un ítem del carrito por completo, sin importar su cantidad.
export const eliminarDelCarrito = (id: number): void => {
  const items = getCartItems().filter((item) => item.id !== id);
  saveCartItems(items);
};

// Calcula el total de la compra: la suma de (precio * cantidad) de cada ítem.
// Criterio de aceptación HU-P1-05: el total es la suma de los subtotales.
export const calcularTotal = (items: ICartItem[]): number => {
  return items.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
};

// Vacía el carrito completo. No la pide el enunciado explícitamente, pero
// es una operación lógica de tener junto al resto (por ejemplo, para un
// futuro botón "Vaciar carrito").
export const vaciarCarrito = (): void => {
  localStorage.removeItem(CART_KEY);
};
