# Next Clothing Store

Proyecto base de e commerce en Next.js (App Router) para vender ropa.

## Pantallas incluidas

1. Inicio
2. Catálogo y búsqueda con filtros
3. Página de producto
4. Carrito con datos del cliente y envío del pedido por WhatsApp

## Requisitos

Node 18 o 20.

## Cómo correr en local

1. Instalar dependencias

   npm install

2. Levantar el server

   npm run dev

3. Abrir

   http://localhost:3000

## Estructura de carpetas

app
  page.tsx                 Inicio
  catalog/page.tsx         Catálogo y búsqueda con filtros por querystring
  product/[slug]/page.tsx  Página de producto dinámica
  cart/page.tsx            Carrito con formulario y link a WhatsApp

components
  Header.tsx               Navbar con buscador y contador del carrito
  HeroCollage.tsx          Hero colorido con collage
  ProductCard.tsx          Tarjeta reutilizable de producto
  ProductGrid.tsx          Grilla de productos
  ProductGallery.tsx       Galería de imágenes para el detalle del producto
  CatalogFilters.tsx       Filtros que escriben en la URL
  AddToCart.tsx            Botón y selector de talla para agregar al carrito
  Footer.tsx               Footer simple

data
  products.json            Datos mock para empezar a desarrollar

lib
  types.ts                 Tipos del dominio
  products.ts              Búsqueda y filtros sobre products.json
  cart.tsx                 Contexto del carrito con persistencia en localStorage
  format.ts                Formateo de dinero
  whatsapp.ts              Construcción del mensaje para WhatsApp

## Cómo funciona el catálogo

El catálogo usa query params:
q, category, size, minPrice, maxPrice

Ejemplos
/catalog?q=remera
/catalog?category=Remeras
/catalog?category=Remeras&size=M

## Producción

1. npm run build
2. npm run start