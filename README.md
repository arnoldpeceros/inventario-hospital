#  Sistema de Inventario Hospitalario

##  Descripción
Aplicación web para controlar y gestionar el inventario de medicamentos, equipos e insumos médicos de un hospital.

##  Funcionalidades (planeadas)
-  Login con autenticación
-  Ver, agregar, editar y eliminar productos
-  Registrar entradas y salidas de inventario
-  Alertas de productos con stock bajo
-  Alertas de productos próximos a vencer
-  Panel con estadísticas (para administradores)

##  Tecnologías Utilizadas
- **Angular 17+** - Framework principal
- **Firebase Authentication** - Para login y registro
- **Firebase Firestore** - Base de datos en la nube
- **TypeScript** - Lenguaje de programación
- **HTML/CSS** - Interfaz de usuario

##  Entidades Principales

### Producto
- Nombre, tipo, cantidad, proveedor
- Fecha de caducidad
- Stock mínimo

### Movimiento
- Entrada o salida de productos
- Fecha, cantidad, motivo
- Usuario que lo realizó

##  Roles de Usuario
- **Almacén**: Gestiona productos y movimientos
- **Administrador**: Acceso completo + estadísticas

##  Instalación y Ejecución
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve

# Abrir en el navegador
http://localhost:4200
```

##  Estructura del Proyecto
```
src/app/
├── pages/           # Componentes de páginas
│   ├── login/
│   ├── inicio/
│   ├── productos/
│   └── movimientos/
├── services/        # Servicios para Firebase
├── guards/          # Protección de rutas
└── models/          # Interfaces de datos
```

##  Estado del Proyecto

###  Semana 1 (COMPLETADA)
- Configuración de Angular y Firebase
- Creación de componentes principales
- Sistema de rutas y navegación
- Definición de modelos de datos

###  Semana 2 (Próxima)
- Servicios de Firebase
- Autenticación funcional
- CRUD de productos

##  Enlaces
- **Repositorio**: https://github.com/arnoldpeceros/inventario-hospital
- **Deploy**: [Pendiente]
- **Video Demo**: [Pendiente - Semana 5]

##  Desarrollador
**Nombre**: [Arnold]  
**Curso**: Programación Web


##  Contacto
[arnold@gmail.com]