
# Bastibus Web

Este proyecto es una aplicación web desarrollada con [Next.js](https://nextjs.org/) y [TypeScript](https://www.typescriptlang.org/), utilizando [Tailwind CSS](https://tailwindcss.com/) para el diseño.

## Requisitos Previos

Asegurate tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/), dependiendo de tu preferencia y del gestor de paquetes utilizado en este proyecto

## Configuración Inicial

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/bastibus-web.git
   cd bastibus-web
   ```

2. **Instala las dependencias**

   Con `npm`:

   ```bash
   npm install
   ```

   o con `yarn`:

   ```bash
   yarn install
   ```

3. **Configura las variables de entorno**

   El proyecto contiene un archivo `.env.example` (o `.env` si ya está configurado) con las variables de entorno necesarias. Duplica este archivo como `.env` y completa las variables según las necesidades:

   ```bash
   cp .env.example .env
   ```

   Modifica el archivo `.env` con las credenciales y configuraciones necesarias.

4. **Compilación Tailwind CSS**

   Asegúrate de que `postcss.config.mjs` y `tailwind.config.ts` estén configurados correctamente para que Tailwind funcione bien con Next.js.

## Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm run start`**: Inicia la aplicación en modo de producción.
- **`npm run lint`**: Ejecuta el linter para analizar el código en busca de errores y mantener la calidad del código.

## Estructura del Proyecto

- **`src/`**: Contiene el código fuente principal de la aplicación.
- **`public/`**: Archivos públicos, incluyendo imágenes y otros recursos estáticos.
- **`components.json`**: Configuración de componentes.
- **`next.config.mjs`**: Configuración específica de Next.js.
- **`tailwind.config.ts`**: Configuración para Tailwind CSS.
- **`.eslintrc.json`**: Configuración para ESLint.

## Guía para Desarrolladores

### 1. Inicia el Servidor de Desarrollo

Para comenzar a desarrollar, inicia el servidor de desarrollo de Next.js:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`. 

### 2. Realiza Cambios en Tiempo Real

Next.js permite la recarga en caliente, por lo que puedes ver los cambios en tiempo real al guardar tus archivos.

### 3. Buenas Prácticas de Código

- Sigue las reglas de ESLint configuradas en `.eslintrc.json`.
- Usa componentes y estilos de Tailwind conforme a las directrices en `tailwind.config.ts`.

## Despliegue

Para preparar el proyecto para producción:

```bash
npm run build
```

Este comando genera la versión optimizada de la aplicación en la carpeta `.next/`, lista para desplegar en cualquier servidor compatible con Node.js.
