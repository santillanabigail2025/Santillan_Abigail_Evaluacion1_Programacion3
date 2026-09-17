import { logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import { agregarAlCarrito } from "../../../utils/cart";
import type { IProduct } from "../../../types/product";

// ============================================
// Referencias al DOM
// ============================================

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;

const inputBuscador = document.getElementById("buscador") as HTMLInputElement;
const listaCategorias = document.getElementById(
  "listaCategorias"
) as HTMLUListElement;
const grillaProductos = document.getElementById(
  "grillaProductos"
) as HTMLDivElement;
const mensajeSinResultados = document.getElementById(
  "sinResultados"
) as HTMLParagraphElement;

// ============================================
// Estado local de la vista
// ============================================

// Guardamos acá qué categoría está activa ahora mismo.
// null = "sin filtro", se muestran todos los productos.
// Esto es "estado en memoria": no se persiste en localStorage porque el
// enunciado solo pide persistir el CARRITO, no el filtro seleccionado.
let categoriaActiva: string | null = null;

// ============================================
// Render de productos (HU-P1-01 y HU-P1-02)
// ============================================

// Recibe la lista de productos YA filtrada (por búsqueda y/o categoría)
// y la dibuja en el DOM. Esta función no decide qué filtrar: solo pinta
// lo que le pasan. Separar "filtrar" de "pintar" es lo que nos permite
// reusar esta misma función para los dos casos (búsqueda y categoría).
const renderizarProductos = (productos: IProduct[]): void => {
  grillaProductos.innerHTML = "";

  const hayProductos = productos.length > 0;
  mensajeSinResultados.style.display = hayProductos ? "none" : "block";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-producto");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <span class="categoria">${producto.categoria}</span>
        <strong>${producto.nombre}</strong>
        <span class="precio">$${producto.precio.toLocaleString("es-AR")}</span>
        <button type="button" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;

    grillaProductos.appendChild(tarjeta);
  });
};

// Aplica AMBOS filtros a la vez (texto de búsqueda + categoría activa)
// sobre el array PRODUCTS que vive en memoria, y renderiza el resultado.
// Esto cumple "el filtrado debe aplicarse sobre los datos ya cargados
// en memoria" (HU-P1-02) y "la búsqueda debe realizarse sobre los
// productos cargados dinámicamente" (HU-P1-01).
const aplicarFiltros = (): void => {
  const textoBusqueda = inputBuscador.value.trim().toLowerCase();

  const productosFiltrados = PRODUCTS.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(textoBusqueda);

    const coincideCategoria =
      categoriaActiva === null || producto.categoria === categoriaActiva;

    return coincideNombre && coincideCategoria;
  });

  renderizarProductos(productosFiltrados);
};

// ============================================
// Render de categorías (menú lateral)
// ============================================

const renderizarCategorias = (): void => {
  const categorias = getCategories();

  // Empezamos siempre con la opción "Todas" para poder volver a ver
  // el catálogo completo (criterio de aceptación de HU-P1-02).
  listaCategorias.innerHTML = `
    <li><button type="button" class="activa" data-categoria="">Todas</button></li>
  `;

  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" data-categoria="${categoria.nombre}">${categoria.nombre}</button>`;
    listaCategorias.appendChild(li);
  });
};

// ============================================
// Eventos
// ============================================

// Búsqueda: se dispara en cada tecla que el usuario escribe ("input"
// se ejecuta con cada cambio, a diferencia de "change" que espera a que
// el campo pierda el foco).
inputBuscador.addEventListener("input", aplicarFiltros);

// Delegación de eventos en el menú de categorías: en vez de poner un
// listener en cada <button> (que además no existen todavía cuando se
// carga la página, se crean dinámicamente), ponemos UN SOLO listener en
// el <ul> contenedor y miramos qué botón fue el que se clickeó.
listaCategorias.addEventListener("click", (e: MouseEvent) => {
  const boton = e.target as HTMLElement;
  if (boton.tagName !== "BUTTON") return;

  const categoriaSeleccionada = boton.dataset.categoria ?? "";
  categoriaActiva = categoriaSeleccionada === "" ? null : categoriaSeleccionada;

  // Marcamos visualmente cuál es la categoría activa.
  listaCategorias
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("activa"));
  boton.classList.add("activa");

  aplicarFiltros();
});

// Delegación de eventos también en la grilla de productos, por la misma
// razón: los botones "Agregar al carrito" se crean dinámicamente en
// renderizarProductos(), así que no podemos "engancharles" un evento
// antes de que existan en el DOM.
grillaProductos.addEventListener("click", (e: MouseEvent) => {
  const boton = e.target as HTMLElement;
  if (boton.tagName !== "BUTTON") return;

  const id = Number(boton.dataset.id);
  const producto = PRODUCTS.find((p) => p.id === id);
  if (!producto) return;

  agregarAlCarrito(producto);

  // Indicador visual de que la acción se realizó (HU-P1-03), simple pero
  // efectivo: cambiamos el texto del botón un instante.
  const textoOriginal = boton.textContent;
  boton.textContent = "✔ Agregado";
  boton.setAttribute("disabled", "true");
  setTimeout(() => {
    boton.textContent = textoOriginal;
    boton.removeAttribute("disabled");
  }, 700);
});

buttonLogout?.addEventListener("click", () => {
  logout();
});

// ============================================
// Inicialización
// ============================================

renderizarCategorias();
aplicarFiltros();
