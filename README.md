# Proyecto final integrador de Web 2 (Universidad Nacional de Tierra del Fuego)

Este es el proyecto final integrador para la materia Web 2 de la Universidad Nacional de Tierra del Fuego. Se trata de una aplicación web de comercio electrónico (e-commerce) desarrollada con React y TypeScript, que incluye un panel de administración para la gestión de productos, categorías y etiquetas.
El negocio fantasia elegido es de una curaderia con selección de vinos, fiambres y mas. (Winery).

Alumnos:

- Paniagua, Cristina
- Villanueva Jousset, Agustin

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de JavaScript
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Herramienta de construcción y desarrollo rápido
- **React Router DOM** - Enrutamiento para aplicaciones React

### Estilos

- **Tailwind CSS** - Framework de CSS utility-first
- **Custom CSS** - Estilos personalizados con algunas fuentes de Google Fonts (Lato, Playfair Display)

### Gestión de Estado

- **React Context API** - Manejo de estado global (CartContext) para persistencia de datos
- **React Hooks** - useState, useEffect, useContext, useMemo

### Características Principales

- **Sistema de Carrito de Compras** - Persistencia usando localStorage
- **Filtros Avanzados** - Por precio, etiquetas, búsqueda y ordenamiento
- **Paginación** - Navegación entre páginas de productos
- **Panel de Administración (CRUD)** - Gestión completa de productos, categorías y etiquetas
- **Carga de Imágenes** - Upload de imágenes para productos y categorías mediante file
- **Modales y Toasts** - Notificaciones de éxito y error
- **Responsive Design** - Adaptable a dispositivos móviles y desktop

### API

- **Fetch API** - Peticiones HTTP para operaciones (CRUD)
- **Bearer Token Authentication** - Autenticación mediante token

### Estructura del Proyecto

- components/ # Componentes reutilizables
- admin/ # Componentes del panel de administración
- layout/ # Componentes de layout (Navbar, Footer)
- context/ # Context API (CartContext)
- data/ # Funciones de API y CRUD
- hooks/ # Custom hooks
- pages/ # Páginas de la aplicación
- routes/ # Configuración de rutas
- types/ # Definiciones de TypeScript(Tipos)

### Herramientas de Desarrollo

- **Git** - Control de versiones
