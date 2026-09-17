# Proyecto: Food Store — Evaluación 1 (Programación III)

## Descripción

Este proyecto extiende el Trabajo Práctico Integrador de TypeScript (registro, login y protección de rutas por rol) incorporando la lógica de un e-commerce simple de comidas ("Food Store"), desarrollado para la Evaluación 1 de Programación III.

Funcionalidades agregadas en este parcial:

- **Catálogo de productos** (`src/pages/client/home/`): lista de productos cargados desde `src/data/data.ts`, con **búsqueda por nombre** y **filtrado por categoría** desde el menú lateral.
- **Carrito de compras con persistencia** (`src/pages/client/cart/` + `src/utils/cart.ts`): permite agregar productos desde el catálogo, ver cantidad y precio de cada ítem, sumar/restar cantidades, quitar productos y ver el total, todo persistido en `localStorage` bajo la clave `"cart"`.

El desarrollo completo es HTML5, CSS3, JavaScript y TypeScript, sin frameworks. No incluye checkout ni conexión con backend (fuera del alcance de esta evaluación).

Esta base también conserva, sin modificaciones, el mecanismo de protección de rutas del TP integrador (ver sección "¿Cómo funciona la protección de rutas?" más abajo), aunque **no forma parte de lo evaluado en este parcial**.

---

#**Enlances**
- **Video de presentación**: https://www.youtube.com/watch?v=RepKPBNhNWw
- **Repositorio en GitHub**: PENDIENTE — pegar acá el link del repo

##Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## ¿Cómo Funciona la Protección de Rutas?

El mecanismo es simple y se gestiona desde el código TypeScript en la carpeta `src/utils`:

1.  **Inicio de Sesión**: Cuando un usuario se "loguea", su información (incluido su rol) se guarda como un string JSON en `localStorage`.
2.  **Carga de Página Protegida**: Cada vez que se intenta cargar una página protegida (ej. la página de Administrador), se ejecuta un script de verificación (`checkAuhtUser` en `src/utils/auth.ts`).
3.  **Verificación**: El script comprueba:
    - Si existe un usuario en `localStorage`. Si no, redirige al login.
    - Si el rol del usuario guardado coincide con el rol requerido para acceder a esa página. Si no coincide, lo redirige a una página de acceso denegado o a su "home" correspondiente.
4.  **Cierre de Sesión (Logout)**: Al cerrar sesión, la información del usuario se elimina de `localStorage`.

---

##  Estructura del Proyecto

```
/
├── src/
│   ├── pages/
│   │   ├── admin/            # Páginas solo para administradores (TP integrador)
│   │   ├── auth/              # Login y registro (TP integrador)
│   │   └── client/
│   │       ├── home/          # Catálogo: búsqueda + filtro por categoría (Evaluación 1)
│   │       └── cart/          # Vista del carrito y total (Evaluación 1)
│   ├── types/
│   │   ├── IUser.ts / Rol.ts       # Tipos del TP integrador
│   │   ├── product.ts              # IProduct, ICartItem (Evaluación 1)
│   │   └── categoria.ts            # ICategoria (Evaluación 1)
│   ├── data/
│   │   └── data.ts            # PRODUCTS y getCategories() (Evaluación 1)
│   └── utils/
│       ├── auth.ts            # Verificación de rol y sesión (TP integrador)
│       ├── localStorage.ts    # Lectura/escritura de usuarios en localStorage (TP integrador)
│       ├── navigate.ts        # Redirección entre páginas (TP integrador)
│       └── cart.ts            # Lógica del carrito sobre localStorage (Evaluación 1)
├── vite.config.ts             # Registro de TODAS las páginas .html del proyecto
├── package.json               # Dependencias y scripts (usa pnpm)
└── README.md                  # Este archivo
```
