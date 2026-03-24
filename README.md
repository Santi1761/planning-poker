# Planning Poker - Santiago Arboleda Velasco

Bienvenido al repositorio de **Planning Poker**. 

Esta aplicación web permite a equipos ágiles realizar estimaciones de historias de usuario en tiempo real mediante un sistema de votación por cartas, manejando distintos roles tanto propietario como Jugador y modos de visualización jugador y Espectador).

---

## 🛠 Tecnologías y Herramientas

* **Framework:** Angular 
* **Estilos:** SASS (SCSS) p
* **Testing:** Jest (>=80% de cobertura)
* **Calidad de Código:** SonarLint
* **Persistencia (Mock)

---

## 📐 Arquitectura y Patrones de Diseño

El proyecto fue construido priorizando la escalabilidad, la mantenibilidad y la separación de responsabilidades, aplicando dos enfoques principales:

### 1. Atomic Design
La interfaz de usuario está dividida siguiendo el principio de Diseño Atómico, garantizando la reutilización de componentes UI:
* **[Átomos](src/app/components/atoms):** Componentes base indivisibles (`button`, `input`, `player-card`, `radio`, `score-card`, `spectator-badge`).
* **[Moléculas](src/app/components/molecules):** Combinación de átomos con una responsabilidad simple (`form-field`, `player-slot`).
* **[Organismos](src/app/components/organisms):** Secciones complejas de la interfaz (`card-deck`, `create-game-form`, `create-user-form`, `invite-modal`, `poker-table`, `vote-summary`).
* **[Páginas](src/app/pages):** Vistas enrutables que orquestan los organismos (`splash`, `create-game`, `create-user`, `game-board`, `join-game`).

### 2. Arquitectura Hexagonal (Puertos y Adaptadores)
Para desacoplar la lógica de negocio de la infraestructura externa (persistencia de datos), se implementó un patrón de puertos y adaptadores:
* **[Puertos (Core)](src/app/core/ports):** Interfaces abstractas que definen contratos (`storage.port.ts`, `card.port.ts`).
* **[Adaptadores (Infrastructure)](src/app/infrastructure/adapters):** Implementaciones concretas de los puertos (`session-storage.adapter.ts`, `mock-card.adapter.ts`).
* **[Servicios](src/app/services):** Casos de uso de la aplicación (`game.service.ts`, `user.service.ts`, `card.service.ts`).

---

## 📁 Estructura del Proyecto y Archivos Clave

A continuación, se detalla la estructura de directorios y los archivos de configuración más importantes del repositorio, los cuales sostienen la arquitectura del proyecto:

* **[public](https://github.com/Santi1761/planning-poker/tree/dev/public):** Esta carpeta contiene todos los recursos estáticos y públicos de la aplicación. Aquí se alojan las imágenes y logos. Estos archivos son servidos directamente al navegador sin pasar por el proceso de compilación de Vite.

* **[src](https://github.com/Santi1761/planning-poker/tree/dev/src):** Es el directorio raíz del código fuente. Contiene absolutamente toda la lógica, estilos globales y el punto de entrada de la aplicación de Angular (`main.ts` e `index.html`).

* **[src/app](https://github.com/Santi1761/planning-poker/tree/dev/src/app):** Es el corazón de la aplicación Angular. Aquí residen todos los módulos, la configuración de rutas principales (`app.routes.ts`) y la configuración global de la app (`app.config.ts`).

* **[src/app/components](http://github.com/Santi1761/planning-poker/tree/dev/src/app/components):** Directorio dedicado a la UI. Está estructurado estrictamente bajo la metodología de **Atomic Design**, separando los componentes visuales según su nivel de complejidad para fomentar su máxima reutilización en diferentes vistas.

* **[src/app/components/atoms](https://github.com/Santi1761/planning-poker/tree/dev/src/app/components/atoms):** Contiene los bloques de construcción más básicos de la interfaz (Átomos). Estos componentes (`button`, `input`, `radio`, `player-card`) no tienen lógica de negocio, son altamente personalizables mediante `@Input()` y son la base visual de todo el sistema.

* **[src/app/components/molecules](https://github.com/Santi1761/planning-poker/tree/dev/src/app/components/molecules):** Aquí se encuentran las Moléculas, que son agrupaciones de dos o más átomos diseñadas para realizar una tarea específica en la UI. Por ejemplo, `form-field` une un input con sus etiquetas de validación, y `player-slot` combina una carta con el nombre y el badge del jugador.

* **[src/app/components/organisms](https://github.com/Santi1761/planning-poker/tree/dev/src/app/components/organisms):** Los Organismos son componentes complejos formados por moléculas y átomos. En esta carpeta se encuentran los bloques pesados de la aplicación, como la mesa de poker (`poker-table`), el modal de invitaciones (`invite-modal`) o los formularios completos (`create-game-form`). Empiezan a emitir eventos (`@Output()`) hacia las páginas superiores.

* **[src/app/core/ports](https://github.com/Santi1761/planning-poker/tree/dev/src/app/core/ports):** Es la capa central de la **Arquitectura Hexagonal**. Contiene clases abstractas e interfaces que definen "qué" debe hacer el sistema sin importar el "cómo". Ejemplos de esto son `storage.port.ts` y `card.port.ts`, asegurando que la lógica de negocio no dependa de librerías externas.

* **[src/app/infrastructure/adapters](https://github.com/Santi1761/planning-poker/tree/dev/src/app/infrastructure/adapters):** Es la capa externa de la arquitectura. Contiene la implementación real de los puertos definidos en el core. Aquí, `session-storage.adapter.ts` se encarga de interactuar directamente con la API del navegador para guardar el estado, permitiendo que a futuro pueda ser reemplazado por una base de datos real sin afectar el resto del sistema.

* **[src/app/pages](https://github.com/Santi1761/planning-poker/tree/dev/src/app/pages):** Aloja los componentes enrutables o Smart Components. A diferencia de los componentes UI puros, las páginas (`game-board`, `create-user`, `join-game`) se encargan de inyectar servicios, manejar el estado global de la vista, leer parámetros de la URL y orquestar a los organismos.

* **[src/app/services](https://github.com/Santi1761/planning-poker/tree/dev/src/app/services):** Contiene los servicios inyectables de Angular que manejan la lógica de negocio y los casos de uso (`game.service`, `user.service`). Estos servicios consumen los puertos para realizar operaciones como la creación de la partida o el ingreso de un jugador mediante un link.

* **[src/app/utils/validators](https://github.com/Santi1761/planning-poker/tree/dev/src/app/utils/validators):** Directorio de utilidades donde se almacenan validadores personalizados síncronos para los Reactive Forms. Por ejemplo, `game-name.validator.ts` se encarga de aislar la compleja lógica que valida los caracteres especiales y la cantidad máxima de números permitidos en los nombres.

* **[jest.config.js](https://github.com/Santi1761/planning-poker/blob/dev/jest.config.js):** Archivo de configuración principal del framework de pruebas **Jest**. Define el entorno de ejecución, los mapeos de las rutas, la cobertura de código requerida y la configuración para que Jest pueda entender los archivos TypeScript y Angular.

* **[setup-jest.ts](https://github.com/Santi1761/planning-poker/blob/dev/setup-jest.ts):** Script de inicialización que se ejecuta antes de correr las pruebas. Configura el entorno global simulado del DOM y carga los presets necesarios de `jest-preset-angular` para que los componentes se rendericen correctamente en la terminal.

* **[tsconfig.app.json](https://github.com/Santi1761/planning-poker/blob/dev/tsconfig.app.json):** Configuración específica del compilador de TypeScript para el código de producción de la aplicación. Excluye explícitamente los archivos de prueba (`*.spec.ts`) para asegurar que el bundle final que va al cliente sea ligero y no contenga código de desarrollo.

* **[tsconfig.json](https://github.com/Santi1761/planning-poker/blob/dev/tsconfig.json):** Es el archivo base de TypeScript para todo el Workspace. Establece las reglas estrictas de tipado (`strict: true`), la versión de ECMAScript a compilar y los paths base para facilitar las importaciones absolutas dentro del proyecto.

* **[tsconfig.spec.json](https://github.com/Santi1761/planning-poker/blob/dev/tsconfig.spec.json):** Configuración del compilador de TypeScript exclusiva para el entorno de pruebas. A diferencia del `app.json`, este archivo sí incluye los archivos `.spec.ts` y agrega los tipados (`types`) necesarios para las aserciones de Jest y la manipulación del DOM simulado.

* **[package.json](https://github.com/Santi1761/planning-poker/blob/dev/package.json):** Archivo manifiesto de Node.js. Define la metadata del proyecto, declara los comandos y scripts ejecutables (como `npm start` o `npm run test`), y lista todas las dependencias principales (Angular, RxJS) y las de desarrollo (Jest, SonarLint, Typescript).

* **[angular.json](https://github.com/Santi1761/planning-poker/blob/dev/angular.json):** Es el cerebro del Angular CLI. Este archivo configura todos los aspectos del espacio de trabajo: cómo se debe empaquetar la aplicación, qué archivos de estilos usar (SCSS global), dónde encontrar los assets públicos y la configuración de los servidores de desarrollo y producción.

---

## 🚀 Funcionalidades Implementadas (Historias de Usuario)

| HU | Descripción | Estado |
| :--- | :--- | :--- |
| **HU1** | Crear Partida con validación de nombre personalizado. | Completado |
| **HU2** | Crear usuario administrador y seleccionar modo de visualización. | Completado |
| **HU3** | Visualizar la mesa de votación multijugador. | Completado |
| **HU4/10** | Elegir una carta con puntaje dinámico y actualizar estado. (admin/jugador) | Completado |
| **HU5** | Revelar cartas y calcular puntaje promedio. | Completado |
| **HU6** | Reiniciar la partida y limpiar la mesa. | Completado |
| **HU7/11** | Generar y copiar link de invitación dinámico (admin/jugador) (`/join/:id`). | Completado |
| **HU8** | Crear usuario invitado a través de link de invitación. | Completado |
| **HU9** | Visualizar mesa desde la perspectiva de un jugador invitado. | Completado |
| **HU12** | Alternar modo de visualización (Espectador ↔ Jugador) en tiempo real. | Completado |
| **HU13** | Dar rol de administrador a otros usuarios en la mesa. | Completado |

> **Nota sobre flujos simulados:** Dado que el proyecto no cuenta con un backend real ni WebSockets, la sincronización entre pestañas se ha simulado guardando el estado en el `sessionStorage` independiente de cada sesión/pestaña, cumpliendo con los Criterios de Aceptación visuales de las HUs.

---

## 📱 Buenas Prácticas Aplicadas

* **Mobile First:** Diseño responsivo adaptado desde dispositivos móviles hasta pantallas de escritorio.
* **Microinteracciones y Animaciones:** Transiciones suaves para mejorar la experiencia de usuario.
* **Validaciones Robustas:** Uso de validadores síncronos personalizados (ej. `game-name.validator.ts`) para reglas de negocio complejas.

---

## ⚙️ Instalación y Ejecución

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
3. Levanta el servidor de desarrollo:

   ```Bash
    ng serve -o

4. Navega a http://localhost:4200/.


## 🧪 Pruebas Unitarias
El proyecto cuenta con un entorno de pruebas configurado con Jest. 

Para ejecutar las pruebas y generar el reporte de cobertura:

  ```Bash
    npm run test -- --coverage
