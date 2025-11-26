# Sistema de Inventario Hospitalario

##  Descripción
Aplicación web para controlar y gestionar el inventario de medicamentos, equipos e insumos médicos de un hospital.

##  Funcionalidades Implementadas

###  Semana 1
- Configuración del proyecto
- Estructura de componentes y rutas

###  Semana 2
-  **Autenticación completa**
  - Registro de usuarios
  - Inicio de sesión
  - Cerrar sesión
-  **Gestión de Productos**
  - Ver lista de productos
  - Agregar nuevos productos
  - Eliminar productos
  - Conexión con Firebase Firestore
-  **Protección de rutas**
  - Solo usuarios logueados pueden acceder
-  **Dashboard**
  - Estadísticas de productos
  - Alertas de stock bajo

###  En Progreso (Semana 3)
- Editar productos
- Sistema de movimientos (entradas/salidas)
- Filtros y búsqueda
- Alertas de productos próximos a vencer

##  Tecnologías Utilizadas
- **Angular 17+** - Framework principal
- **Firebase Authentication** - Sistema de login
- **Firebase Firestore** - Base de datos en tiempo real
- **TypeScript** - Lenguaje de programación
- **HTML/CSS** - Interfaz de usuario

##  Entidades

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

### Movimiento (próximamente)
```typescript
{
  id: string,
  productoId: string,
  tipo: 'entrada' | 'salida',
  cantidad: number,
  fecha: Date,
  usuario: string,
  motivo: string
}
```

##  Instalación y Ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/arnoldpeceros/inventario-hospital.git

# 2. Instalar dependencias
npm install

# 3. Configurar Firebase
# - Crear archivo src/environments/environment.ts
# - Agregar credenciales de Firebase

# 4. Ejecutar en desarrollo
ng serve

# 5. Abrir en el navegador
http://localhost:4200
```

## Cómo usar la aplicación

1. **Registrarse:**
   - Entrar a http://localhost:4200
   - Poner email y contraseña
   - Clic en "Registrarse"

2. **Ver Productos:**
   - Ir a la sección "Productos"
   - Ver la lista completa

3. **Agregar Producto:**
   - Clic en "+ Agregar Producto"
   - Llenar el formulario
   - Guardar

4. **Eliminar Producto:**
   - Clic en " Eliminar" en cualquier producto
   - Confirmar

## Estructura del Proyecto
```
src/app/
├── pages/              # Páginas de la aplicación
│   ├── login/          #  Login funcional
│   ├── inicio/         #  Dashboard con estadísticas
│   ├── productos/      #  CRUD de productos
│   └── movimientos/    #  En construcción
├── services/           # Lógica de negocio
│   ├── auth.service.ts       #  Autenticación
│   └── productos.service.ts  #  CRUD productos
├── guards/             # Protección de rutas
│   └── auth.guard.ts   #  Verificar login
└── models/             # Tipos de datos
    └── producto.model.ts  #  Interfaces
```

## Progreso del Proyecto

| Semana | Estado | Descripción |
|--------|--------|-------------|
| Semana 1 |  COMPLETADA | Configuración y estructura |
| Semana 2 |  COMPLETADA | Auth + CRUD Productos |
| Semana 3 |  En proceso | Movimientos y filtros |
| Semana 4 |  Pendiente | Validaciones y guards |
| Semana 5 |  Pendiente | Deploy y documentación |

##  Enlaces
- **Repositorio GitHub**: https://github.com/arnoldpeceros/inventario-hospital
- **Firebase Console**: https://console.firebase.google.com/
- **Deploy**: [Pendiente - Semana 5]
- **Video Demo**: [Pendiente - Semana 5]

## Capturas (Opcional)
_(Aquí puedes agregar capturas de pantalla cuando quieras)_

##  Desarrollador
**Nombre**: [TU NOMBRE AQUÍ]  
**Curso**: Programación Web con Angular  
**Profesor**: Ivan Soria Solis  
**Fecha**: Noviembre 2024

## Notas del Desarrollo

### Aprendizajes Semana 2:
- Cómo conectar Angular con Firebase
- Uso de Observables para datos en tiempo real
- Implementación de Guards para proteger rutas
- CRUD básico con Firestore
- Manejo de formularios con ngModel

### Desafíos superados:
- Configuración inicial de Firebase
- Sincronización de datos en tiempo real
- Protección de rutas según autenticación

---

** IMPORTANTE:** Este es un proyecto educativo en desarrollo.