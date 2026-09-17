// Producto tal cual vive en el catálogo (src/data/data.ts).
// Es la "forma" de los datos que llegan desde afuera (en este caso, hardcodeados).
export interface IProduct {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
}

// Ítem del carrito: es un producto + la cantidad que el cliente eligió.
// No repetimos todos los campos de IProduct a mano: heredamos con "extends"
// y solo agregamos lo nuevo (cantidad). Si mañana IProduct cambia, ICartItem
// se actualiza solo.
export interface ICartItem extends IProduct {
  cantidad: number;
}
