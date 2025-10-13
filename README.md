# 💰 Digital Money House

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

**Digital Money House** es una aplicación web de billetera virtual desarrollada como parte del desafío profesional de la especialización en Front-End de Digital House. Este proyecto representa la integración de todos los conceptos aprendidos durante la formación, enfocándose en el desarrollo de una interfaz moderna, intuitiva y completamente funcional.

## 🌐 Demo en Vivo

🚀 **[Ver aplicación desplegada en Vercel](https://digital-money-house-mocha.vercel.app)**

> **Nota**: La aplicación está completamente funcional y conectada al backend. Puedes crear una cuenta de prueba para explorar todas las funcionalidades.

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Docker](#-docker)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Autor](#-autor)

## 🎯 Sobre el Proyecto

Este proyecto fue desarrollado a lo largo de **4 sprints** como parte del desafío profesional de Digital House. El objetivo principal es crear el front-end de un sitio web de billetera virtual que permita a los usuarios gestionar sus finanzas digitales de manera segura y eficiente.

El desafío consiste en la realización de un conjunto de actividades interrelacionadas que abarcan desde la autenticación de usuarios hasta la gestión completa de transacciones, tarjetas y pagos de servicios.

## ✨ Características

- 🔐 **Autenticación Segura**: Sistema de registro e inicio de sesión con Auth.js
- 💳 **Gestión de Tarjetas**: Agregar, visualizar y administrar tarjetas de crédito.
- 💸 **Depósitos**: Realizar depósitos mediante transferencia bancaria o tarjeta
- 🧾 **Pagos de Servicios**: Pagar servicios con tarjetas vinculadas
- 📊 **Historial de Actividad**: Visualización detallada de todas las transacciones con filtros de fecha relativos (hoy, ayer, esta semana, últimos 15 días, etc.) y búsqueda
- 👤 **Perfil de Usuario**: Gestión de datos personales y configuración de cuenta
- 📱 **Diseño Responsive**: Interfaz adaptable a diferentes dispositivos (mobile, tablet, desktop)
- 🎨 **UI/UX Moderna**: Interfaz intuitiva con Tailwind CSS

## 🛠 Tecnologías

### Core

- **[Next.js](https://nextjs.org/)** - Framework React con App Router
- **[React](https://react.dev/)** - Biblioteca para construir interfaces de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript

### Autenticación

- **[Auth.js v5](https://next-auth.js.org/)** - Autenticación con estrategia JWT

### Formularios y Validación

- **[React Hook Form](https://react-hook-form.com/)** - Manejo eficiente de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first

### Estilos

- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Iconos modernos

### Testing

- **[Playwright](https://playwright.dev/)** - Testing E2E para aplicaciones web

### Herramientas Adicionales

- **[date-fns](https://date-fns.org/)** - Utilidades para manejo de fechas
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificaciones toast elegantes
- **[react-credit-cards-2](https://www.npmjs.com/package/react-credit-cards-2)** - Visualización de tarjeta de crédito mientras se completa el formulario.

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 20.x o superior
- **npm** o **yarn** o **pnpm**
- **Git**

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/jvier93/digital-money-house.git
cd digital-money-house
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Backend
NEXT_PUBLIC_API_URL=https://digitalmoney.digitalhouse.com/api

# Auth.js (Genera tu secreto con: npx auth secret)
AUTH_SECRET=your-generated-secret-here

# Docker (Opcional, solo para builds con Docker)
DOCKER_BUILD=false
```

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 💻 Uso

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint

# Testing
npm run test:e2e     # Ejecuta tests E2E con Playwright
npm run test:e2e:ui  # Ejecuta tests E2E con interfaz gráfica
```

## 🐳 Docker

El proyecto incluye configuración completa para Docker, facilitando el despliegue en diferentes entornos.

### Dockerfile

El proyecto utiliza un **Dockerfile multi-stage** optimizado para producción que incluye:

- Etapa de dependencias
- Etapa de construcción
- Etapa de producción con imagen Alpine ligera

### Docker Compose

También está disponible un archivo `docker-compose.yml` para facilitar la orquestación de contenedores.

### Ejecutar con Docker

```bash
# Construir la imagen
docker build -t digital-money-house .

# Ejecutar el contenedor
docker run -p 3000:3000 digital-money-house
```

### Ejecutar con Docker Compose

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down
```

## 🧪 Testing

El proyecto utiliza **Playwright** para testing End-to-End (E2E), garantizando la calidad y funcionalidad de la aplicación en diferentes escenarios.

### Estructura de Tests

Los tests se encuentran en el directorio `tests/e2e/` y cubren las siguientes áreas:

- **`auth.spec.ts`** - Tests de autenticación (login, registro, logout)
- **`activity.spec.ts`** - Tests del historial de actividad y transacciones
- **`cards.spec.ts`** - Tests de gestión de tarjetas
- **`deposit-card.spec.ts`** - Tests de depósitos con tarjeta
- **`payments.spec.ts`** - Tests de pagos de servicios
- **`home.spec.ts`** - Tests de la página principal

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test:e2e

# Ejecutar tests con interfaz gráfica
npm run test:e2e:ui

# Ejecutar un test específico
npx playwright test tests/e2e/auth.spec.ts
```

### Reportes de Tests

Los reportes de ejecución de tests se generan automáticamente en el directorio `playwright-report/`. Puedes visualizar el reporte HTML abriendo el archivo:

```
playwright-report/index.html
```

**Nota**: El último reporte de ejecución de tests está incluido en el repositorio para que puedas revisar los resultados sin necesidad de ejecutar los tests localmente.

### Configuración de Testing

La configuración de Playwright se encuentra en `playwright.config.ts` e incluye:

- Tests en múltiples navegadores (Chrome, Firefox, Safari)
- Soporte para viewports desktop y mobile
- Capturas de pantalla en fallos
- Trazas para debugging

## 📁 Estructura del Proyecto

```
digital-money-house/
├── app/                      # Páginas y rutas de Next.js (App Router)
│   ├── api/                 # API Routes
│   │   └── auth/           # Endpoints de autenticación
│   ├── dashboard/          # Páginas del dashboard
│   │   ├── activity/       # Historial de actividad
│   │   ├── cards/          # Gestión de tarjetas
│   │   ├── deposit/        # Depósitos
│   │   ├── payments/       # Pagos de servicios
│   │   └── profile/        # Perfil de usuario
│   ├── signin/             # Inicio de sesión
│   └── signup/             # Registro
├── components/              # Componentes React reutilizables
│   ├── auth/               # Componentes de autenticación
│   ├── dashboard/          # Componentes del dashboard
│   ├── layout/             # Componentes de layout
│   └── ui/                 # Componentes UI base
├── contexts/                # Context Providers de React
├── services/                # Servicios y llamadas a API
├── actions/                 # Server Actions de Next.js
├── hooks/                   # Custom React Hooks
├── utils/                   # Utilidades y helpers
├── tests/                   # Tests E2E con Playwright
│   └── e2e/                # Tests End-to-End
├── playwright-report/       # Reportes de tests
├── public/                  # Archivos estáticos
├── auth.ts                  # Configuración de NextAuth
├── middleware.ts            # Middleware de Next.js
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Configuración Docker Compose
└── playwright.config.ts    # Configuración de Playwright
```
