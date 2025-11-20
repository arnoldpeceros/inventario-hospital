// Interface = plantilla de cómo debe ser un objeto

// Modelo de Producto
export interface Producto {
  id?: string;                     // El id de Firebase (opcional porque Firebase lo crea)
  nombre: string;                  // Ej: "Paracetamol"
  tipo: string;                    // Ej: "medicamento", "equipo", "insumo"
  cantidad: number;                // Ej: 50 unidades
  cantidadMinima: number;          // Ej: 10 (cuando llegue a esto, alerta)
  fechaCaducidad: Date;            // Cuándo se vence
  proveedor: string;               // Ej: "Farmacia ABC"
  fechaRegistro: Date;             // Cuándo se agregó al sistema
}

// Modelo de Movimiento (entrada/salida de productos)
export interface Movimiento {
  id?: string;
  productoId: string;              // ¿De qué producto es este movimiento?
  productoNombre: string;          // Guardamos el nombre para no buscarlo cada vez
  tipo: string;                    // "entrada" o "salida"
  cantidad: number;                // Cuántas unidades
  fecha: Date;                     // Cuándo pasó
  usuario: string;                 // Quién lo hizo
  motivo: string;                  // Por qué: "compra", "uso en cirugía", etc.
}