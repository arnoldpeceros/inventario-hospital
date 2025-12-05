import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto.model';
import { DiasVencimientoPipe } from '../../pipes/dias-vencimiento-pipe';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, DiasVencimientoPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  
  productos: Producto[] = [];
  productosFiltrados: Producto[] = []; // Para el filtro
  cargando: boolean = true;
  
  // Variables para el formulario
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false; // Saber si estamos editando
  productoEditandoId: string = ''; // ID del producto que editamos
  
  nuevoProducto: Producto = this.limpiarFormulario();
  
  // Variable para el filtro
  textoBusqueda: string = '';
  
  // Variable para ordenamiento
  ordenActual: string = 'nombre'; // nombre, cantidad, fecha

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.aplicarFiltroYOrden();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.cargando = false;
      }
    });
  }

  // Limpiar el formulario
  limpiarFormulario(): Producto {
    return {
      nombre: '',
      tipo: 'medicamento',
      cantidad: 0,
      cantidadMinima: 0,
      fechaCaducidad: new Date(),
      proveedor: '',
      fechaRegistro: new Date()
    };
  }

  // Abrir formulario para AGREGAR
  abrirFormularioAgregar() {
    this.modoEdicion = false;
    this.nuevoProducto = this.limpiarFormulario();
    this.mostrarFormulario = true;
  }

  // Abrir formulario para EDITAR
  abrirFormularioEditar(producto: Producto) {
    this.modoEdicion = true;
    this.productoEditandoId = producto.id || '';
    this.nuevoProducto = { ...producto }; // Copiar los datos
    this.mostrarFormulario = true;
  }

  // Cancelar formulario
  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.nuevoProducto = this.limpiarFormulario();
  }

  // Guardar (agregar o editar)
  guardarProducto() {
    if (this.nuevoProducto.nombre && this.nuevoProducto.proveedor) {
      
      if (this.modoEdicion) {
        // EDITAR
        this.productosService.actualizarProducto(this.productoEditandoId, this.nuevoProducto)
          .then(() => {
            console.log('Producto actualizado');
            this.cancelarFormulario();
          })
          .catch((error) => {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el producto');
          });
      } else {
        // AGREGAR
        this.productosService.agregarProducto(this.nuevoProducto)
          .then(() => {
            console.log('Producto agregado');
            this.cancelarFormulario();
          })
          .catch((error) => {
            console.error('Error al agregar:', error);
            alert('Error al agregar el producto');
          });
      }
    } else {
      alert('Por favor completa todos los campos obligatorios');
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
          alert('Error al eliminar el producto');
        });
    }
  }

  // FILTRO: se ejecuta cada vez que escribes
  filtrarProductos() {
    this.aplicarFiltroYOrden();
  }

  // ORDENAMIENTO
  ordenarPor(criterio: string) {
    this.ordenActual = criterio;
    this.aplicarFiltroYOrden();
  }

  // Aplicar filtro Y ordenamiento juntos
  aplicarFiltroYOrden() {
    // 1. Primero filtrar
    if (this.textoBusqueda.trim() === '') {
      this.productosFiltrados = [...this.productos];
    } else {
      const busqueda = this.textoBusqueda.toLowerCase();
      this.productosFiltrados = this.productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda) ||
        p.tipo.toLowerCase().includes(busqueda) ||
        p.proveedor.toLowerCase().includes(busqueda)
      );
    }

    // 2. Luego ordenar
    this.productosFiltrados.sort((a, b) => {
      if (this.ordenActual === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      } else if (this.ordenActual === 'cantidad') {
        return a.cantidad - b.cantidad;
      } else if (this.ordenActual === 'fecha') {
        return new Date(a.fechaCaducidad).getTime() - new Date(b.fechaCaducidad).getTime();
      }
      return 0;
    });
  }

  // Saber si un producto tiene stock bajo
  tieneStockBajo(producto: Producto): boolean {
    return producto.cantidad <= producto.cantidadMinima;
  }
}