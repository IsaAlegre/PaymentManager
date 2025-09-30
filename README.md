# PaymentManager

PaymentManager es una aplicación web desarrollada con Angular para la gestión de solicitudes de pago.
El proyecto implementa arquitectura modular, un enfoque zoneless y patrones de buenas prácticas en Angular, priorizando performance, escalabilidad y mantenibilidad.

## Características principales

- Registro y creación de solicitudes de pago con validaciones avanzadas.
- Visualización de historial de solicitudes.
- Detalle ampliado de cada solicitud.
- Paginación en listado.
- Búsqueda por ID con validación y mensajes de error.
- Cancelación de peticiones duplicadas con switchMap y takeUntil.
- UI responsiva, construida con TailwindCSS.
- Manejo de estados con signals y ChangeDetectionStrategy.OnPush.
- Notificaciones al usuario con SweetAlert2.
- Testing para casos basicos: actualmente para renderizado de lista, formularios de creacion y paginacion correcta. 


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
- RxJS
- TailwindCSS
- SweetAlert2

## Estructura del Proyecto

```
src/
└── app/
    ├── core/                  # Servicios globales y configuración
    ├── features/              # Funcionalidades principales
    │   └── payment-requests/
    │       ├── components/    # Componentes específicos (list, create-modal, detail)
    │       ├── models/        # Interfaces y modelos tipados
    │       ├── pages/         # Páginas (listado principal)
    │       └── services/      # Comunicación con la API
    ├── shared/                # Componentes reutilizables (search-box, pagination, etc.)
└── environments/              # Configuración de entornos
```


## Configuración de entorno

El proyecto utiliza los archivos de entorno estándar de Angular:

- `src/environments/environment.ts` → para desarrollo
- `src/environments/environment.prod.ts` → para producción

En cada archivo deberás configurar la URL de la API y el token de autenticación:

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/IsaAlegre/PaymentManager.git
   cd PaymentManager
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Servidor de desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar los archivos fuente.

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
Actualmente se incluyen pruebas básicas de renderizado de lista, formulario y paginación.

## Flujo de trabajo (Git)

El desarrollo se realizó en la rama dev, con Conventional Commits (feat:, fix:, chore:).
Para la entrega, se integró a main mediante Pull Request siguiendo GitHub Flow.


## Recursos adicionales

- [Documentación oficial de Angular](https://angular.dev/docs)
- [Referencia de comandos Angular CLI](https://angular.dev/tools/cli)
- [Guía de estilo Angular](https://angular.dev/guide/styleguide)

---
