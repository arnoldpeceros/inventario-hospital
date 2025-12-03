import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos';
import { ProductosService } from '../../services/productos';
import { AuthService } from '../../services/auth';
import { Movimiento, Producto } from '../../models/producto.model';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css'
})
export class Movimientos implements OnInit {
  
  movimientos: Movimiento[] = [];
  productos: Producto[] = [];
  cargando: boolean = true;
  mostrarFormulario: boolean = false;
  
  // Formulario
  nuevoMovimiento: Movimiento = {
    productoId: '',
    productoNombre: '',
    tipo: 'entrada',
    cantidad: 0,
    fecha: new Date(),
    usuario: '',
    motivo: ''
  };

  constructor(
    private movimientosService: MovimientosService,
    private productosService: ProductosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Cargar productos para el select
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });

    // Cargar movimientos
    this.movimientosService.obtenerMovimientos().subscribe({
      next: (data) => {
        this.movimientos = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.cargando = false;
      }
    });
  }

  // Abrir/cerrar formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.nuevoMovimiento = {
      productoId: '',
      productoNombre: '',
      tipo: 'entrada',
      cantidad: 0,
      fecha: new Date(),
      usuario: this.authService.obtenerEmail(),
      motivo: ''
    };
  }

  // Cuando seleccionan un producto, guardar su nombre
  onProductoSeleccionado() {
    const producto = this.productos.find(p => p.id === this.nuevoMovimiento.productoId);
    if (producto) {
      this.nuevoMovimiento.productoNombre = producto.nombre;
    }
  }

  // Registrar movimiento
  registrarMovimiento() {
    if (!this.nuevoMovimiento.productoId || !this.nuevoMovimiento.motivo || this.nuevoMovimiento.cantidad <= 0) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Actualizar la cantidad del producto
    const producto = this.productos.find(p => p.id === this.nuevoMovimiento.productoId);
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    let nuevaCantidad = producto.cantidad;
    
    if (this.nuevoMovimiento.tipo === 'entrada') {
      nuevaCantidad += this.nuevoMovimiento.cantidad;
    } else {
      nuevaCantidad -= this.nuevoMovimiento.cantidad;
      if (nuevaCantidad < 0) {
        alert('No hay suficiente stock para esta salida');
        return;
      }
    }

    // Guardar usuario
    this.nuevoMovimiento.usuario = this.authService.obtenerEmail();
    this.nuevoMovimiento.fecha = new Date();

    // Primero actualizar el producto
    this.productosService.actualizarProducto(this.nuevoMovimiento.productoId, { cantidad: nuevaCantidad })
      .then(() => {
        // Luego guardar el movimiento
        return this.movimientosService.agregarMovimiento(this.nuevoMovimiento);
      })
      .then(() => {
        console.log('Movimiento registrado');
        this.toggleFormulario();
        alert('Movimiento registrado exitosamente');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error al registrar el movimiento');
      });
  }
}