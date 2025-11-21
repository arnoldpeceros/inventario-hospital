// Interface = plantilla de cómo debe ser un objeto

// Modelo de Producto
export interface Producto {
  id?: string;                     
  nombre: string;                 
  tipo: string;                    
  cantidad: number;               
  cantidadMinima: number;          
  fechaCaducidad: Date;            
  proveedor: string;               
  fechaRegistro: Date;             
}

// Modelo de Movimiento (entrada/salida de productos)
export interface Movimiento {
  id?: string;
  productoId: string;              
  productoNombre: string;          
  tipo: string;                    
  cantidad: number;                
  fecha: Date;                     
  usuario: string;                
  motivo: string;                
}