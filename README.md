#  Sistema de Inventario Hospitalario

##  Descripción
Aplicación web para controlar y gestionar el inventario de medicamentos, equipos e insumos médicos de un hospital. Permite registrar productos, controlar stock, realizar movimientos de entrada/salida y generar alertas automáticas.

##  Funcionalidades

### Autenticación
- Registro de usuarios
- Inicio de sesión con email y contraseña
- Cierre de sesión
- Protección de rutas (solo usuarios autenticados)

### Gestión de Productos
- Ver lista completa de productos
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos
- Búsqueda en tiempo real
- Ordenamiento por nombre, cantidad o fecha de vencimiento
- Alertas visuales de stock bajo
- Indicador de días hasta vencimiento

### Gestión de Movimientos
- Registrar entradas de productos (compras/recepciones)
- Registrar salidas de productos (uso/ventas)
- Historial completo de movimientos
- Actualización automática del stock

### Dashboard
- Estadísticas generales
- Total de productos en inventario
- Alertas de productos con stock bajo
- Total de movimientos registrados
- Acceso rápido a secciones principales

##  Tecnologías Utilizadas

- **Angular 17+** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Firebase Authentication** - Sistema de autenticación
- **Firebase Firestore** - Base de datos en la nube (NoSQL)
- **Firebase Hosting** - Despliegue de la aplicación
- **HTML5 & CSS3** - Estructura y estilos
- **RxJS** - Programación reactiva con Observables

##  Entidades Principales

### Producto
```typescript
{
  id: string,
  nombre: string,
  tipo: 'medicamento' | 'equipo' | 'insumo',
  cantidad: number,
  cantidadMinima: number,
  fechaCaducidad: Date,
  proveedor: string,
  fechaRegistro: Date
}
```

### Movimiento
```typescript
{
  id: string,
  productoId: string,
  productoNombre: string,
  tipo: 'entrada' | 'salida',
  cantidad: number,
  fecha: Date,
  usuario: string,
  motivo: string
}
```

##  Requisitos para Instalar y Ejecutar

### Prerequisitos
- Node.js (versión 18 o superior)
- npm (gestor de paquetes de Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU-USUARIO/inventario-hospital.git
cd inventario-hospital
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication (Email/Password)
   - Crear base de datos Firestore
   - Copiar la configuración de Firebase
   - Crear el archivo `src/environments/environment.ts` con:
```typescript
export const environment = {
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-auth-domain",
    projectId: "tu-project-id",
    storageBucket: "tu-storage-bucket",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id"
  }
};
```

4. **Ejecutar en modo desarrollo**
```bash
ng serve
```

5. **Abrir en el navegador**
```
http://localhost:4200
```

##  Arquitectura del Proyecto

### Estructura de Carpetas
```
src/app/
├── pages/                    # Componentes de páginas
│   ├── login/               # Página de autenticación
│   ├── inicio/              # Dashboard principal
│   ├── productos/           # Gestión de productos
│   ├── movimientos/         # Historial de movimientos
│   └── not-found/           # Página 404
│
├── services/                # Lógica de negocio
│   ├── auth.service.ts      # Autenticación con Firebase
│   ├── productos.service.ts # CRUD de productos
│   └── movimientos.service.ts # Gestión de movimientos
│
├── guards/                  # Protección de rutas
│   └── auth.guard.ts        # Verificar autenticación
│
├── models/                  # Interfaces y tipos
│   └── producto.model.ts    # Modelos de datos
│
└── pipes/                   # Pipes personalizados
    └── dias-vencimiento.pipe.ts # Calcular días hasta vencer
```

### Componentes Principales

**AuthService**: Maneja registro, login y logout de usuarios usando Firebase Authentication.

**ProductosService**: Gestiona todas las operaciones CRUD sobre productos en Firestore (crear, leer, actualizar, eliminar).

**MovimientosService**: Registra y consulta movimientos de entrada/salida del inventario.

**AuthGuard**: Protege las rutas para que solo usuarios autenticados puedan acceder a ciertas páginas.

##  Roles de Usuario

- **Usuario estándar**: Puede gestionar productos y registrar movimientos

##  Reglas de Seguridad

- Solo usuarios autenticados pueden acceder a las páginas principales
- El login y registro son públicos
- Todas las operaciones requieren autenticación válida

##  Características de la Interfaz

- Diseño responsivo (se adapta a móviles y tablets)
- Navegación intuitiva con menú superior
- Mensajes de confirmación para operaciones importantes
- Alertas visuales para productos con stock bajo
- Indicadores de estado de productos (vencidos, próximos a vencer)
- Búsqueda en tiempo real sin necesidad de botones

##  Enlaces

- **Repositorio GitHub**: https://github.com/arnoldpeceros/inventario-hospital
- **Aplicación Desplegada**: [URL de Firebase Hosting - Pendiente]
- **Video Demostración**: [URL del video - Pendiente]

##  Manual de Usuario

### 1. Registro e Inicio de Sesión
1. Acceder a la aplicación
2. Ingresar email y contraseña
3. Hacer clic en "Registrarse" (primera vez) o "Iniciar Sesión"

### 2. Agregar un Producto
1. Ir a la sección "Productos"
2. Hacer clic en "+ Agregar Producto"
3. Llenar todos los campos del formulario
4. Hacer clic en "Guardar"

### 3. Editar un Producto
1. En la lista de productos, buscar el producto deseado
2. Hacer clic en " Editar"
3. Modificar los campos necesarios
4. Hacer clic en "Actualizar"

### 4. Buscar y Ordenar Productos
1. Usar la barra de búsqueda para filtrar productos
2. Usar los botones de ordenamiento (A-Z, Cantidad, Vencimiento)

### 5. Registrar Movimientos
1. Ir a la sección "Movimientos"
2. Hacer clic en "+ Registrar Movimiento"
3. Seleccionar el producto
4. Elegir tipo (Entrada o Salida)
5. Indicar cantidad y motivo
6. Hacer clic en "Registrar"

### 6. Ver Estadísticas
1. Ir a la página "Inicio"
2. Visualizar las tarjetas con estadísticas generales

##  Desarrollador

**Nombre**: [TU NOMBRE COMPLETO]  
**Curso**: Programación Web con Angular  
**Institución**: [Tu institución]  
**Profesor**: Ivan Soria Solis  
**Fecha**: Diciembre 2025

##  Contacto

Email: [tu-email@ejemplo.com]  
GitHub: [TU-USUARIO]

---

