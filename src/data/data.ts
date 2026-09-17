import type { IProduct } from "../types/product";
import type { ICategoria } from "../types/categoria";

// Catálogo "fijo" del proyecto. El enunciado no pide conectar con un backend,
// así que estos datos viven acá en memoria (un array tipado), en vez de
// venir de una API como hicimos en el TP de fetch a la Simpsons API.
export const PRODUCTS: IProduct[] = [
  {
    id: 1,
    nombre: "Pizza Muzzarella",
    precio: 8500,
    categoria: "Pizzas",
    imagen: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=400",
  },
  {
    id: 2,
    nombre: "Pizza Napolitana",
    precio: 9200,
    categoria: "Pizzas",
    imagen: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400",
  },
  {
    id: 3,
    nombre: "Hamburguesa Clásica",
    precio: 7200,
    categoria: "Hamburguesas",
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 4,
    nombre: "Hamburguesa Doble Cheddar",
    precio: 8900,
    categoria: "Hamburguesas",
    imagen: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
  },
  {
    id: 5,
    nombre: "Ensalada César",
    precio: 6100,
    categoria: "Ensaladas",
    imagen: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
  },
  {
    id: 6,
    nombre: "Ensalada Caprese",
    precio: 5800,
    categoria: "Ensaladas",
    imagen: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400",
  },
  {
    id: 7,
    nombre: "Papas Fritas",
    precio: 3200,
    categoria: "Acompañamientos",
    imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
  },
  {
    id: 8,
    nombre: "Aros de Cebolla",
    precio: 3500,
    categoria: "Acompañamientos",
    imagen: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400",
  },
  {
    id: 9,
    nombre: "Gaseosa Cola 500ml",
    precio: 1800,
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
  },
  {
    id: 10,
    nombre: "Agua Mineral 500ml",
    precio: 1200,
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=400",
  },
  {
    id: 11,
    nombre: "Brownie con Helado",
    precio: 4600,
    categoria: "Postres",
    imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
  },
  {
    id: 12,
    nombre: "Flan Casero",
    precio: 3900,
    categoria: "Postres",
    imagen: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
  },
];

// Devuelve la lista de categorías ÚNICAS presentes en PRODUCTS, ya tipadas
// como ICategoria, para pintar el menú lateral del catálogo.
//
// Usamos un Set para sacar duplicados (si dos productos son "Pizzas", solo
// queremos "Pizzas" una vez en el menú) y después lo convertimos a array
// con el operador spread [...set].
export const getCategories = (): ICategoria[] => {
  const nombresUnicos = [...new Set(PRODUCTS.map((p) => p.categoria))];

  return nombresUnicos.map((nombre) => ({
    id: nombre.toLowerCase(),
    nombre,
  }));
};
