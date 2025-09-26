# PaymentManager

PaymentManager es una aplicación web desarrollada con Angular que permite gestionar pagos de manera eficiente y sencilla. El proyecto está diseñado para facilitar el registro, seguimiento y administración de pagos en distintos contextos, como empresas, organizaciones o proyectos personales.

## Características principales

- Registro y edición de pagos.
- Visualización de historial de pagos.
- Filtros y búsqueda avanzada.
- Interfaz intuitiva y responsiva.

## Estructura del proyecto

El proyecto sigue una arquitectura modular de Angular:

- `src/app/core`: servicios globales y configuración.
- `src/app/features`: funcionalidades principales (ej. `payment-requests`).
- `src/app/shared`: componentes, directivas y pipes reutilizables.
- `src/environments`: configuración de entornos (`dev`, `prod`, `secret`).

Esta organización facilita la escalabilidad y el mantenimiento del proyecto.

## Tecnologías utilizadas

- [Angular CLI](https://github.com/angular/angular-cli) v20.3.2
- TypeScript
- HTML5 & CSS3
- RxJS

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/PaymentManager.git
   cd PaymentManager
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración de entorno

**Es necesario crear el archivo `src/environments/environment.secret.ts`** con el siguiente contenido, donde debes colocar la URL de la API y el token de autenticación:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://TU_API_URL',
  apiToken: 'TU_API_TOKEN',
};
```

Este archivo es requerido para que la aplicación pueda conectarse correctamente al backend.

## Servidor de desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar los archivos fuente.

## Generación de código

Angular CLI incluye herramientas para generar código automáticamente. Por ejemplo, para crear un nuevo componente:

```bash
ng generate component nombre-componente
```

Para ver todos los esquemas disponibles:

```bash
ng generate --help
```

## Compilación

Para compilar el proyecto:

```bash
ng build
```

Los archivos compilados se almacenarán en el directorio `dist/`.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Pruebas end-to-end

Para pruebas end-to-end (e2e):

```bash
ng e2e
```

Angular CLI no incluye un framework e2e por defecto, puedes elegir el que prefieras.



## Recursos adicionales

- [Documentación oficial de Angular](https://angular.dev/docs)
- [Referencia de comandos Angular CLI](https://angular.dev/tools/cli)
- [Guía de estilo Angular](https://angular.dev/guide/styleguide)

---
