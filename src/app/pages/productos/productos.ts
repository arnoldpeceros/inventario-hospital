import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  
  productos: Producto[] = [];
  cargando: boolean = true;
  
  // Variables para el formulario
  mostrarFormulario: boolean = false;
  nuevoProducto: Producto = {
    nombre: '',
    tipo: 'medicamento',
    cantidad: 0,
    cantidadMinima: 0,
    fechaCaducidad: new Date(),
    proveedor: '',
    fechaRegistro: new Date()
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    // Cargar productos al iniciar
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        console.log('Productos cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.cargando = false;
      }
    });
  }

  // Abrir/cerrar formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // Guardar producto
  guardarProducto() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.proveedor) {
      this.productosService.agregarProducto(this.nuevoProducto)
        .then(() => {
          console.log('Producto agregado');
          this.mostrarFormulario = false;
          // Limpiar formulario
          this.nuevoProducto = {
            nombre: '',
            tipo: 'medicamento',
            cantidad: 0,
            cantidadMinima: 0,
            fechaCaducidad: new Date(),
            proveedor: '',
            fechaRegistro: new Date()
          };
        })
        .catch((error) => {
          console.error('Error al agregar:', error);
        });
    }
  }

  // Eliminar producto
  eliminar(id: string | undefined) {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      this.productosService.eliminarProducto(id)
        .then(() => {
          console.log('Producto eliminado');
        })
        .catch((error) => {
          console.error('Error al eliminar:', error);
        });
    }
  }
}