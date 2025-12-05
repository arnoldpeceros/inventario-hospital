import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { MovimientosService } from '../../services/movimientos';
import { AuthService } from '../../services/auth';
import { Producto, Movimiento } from '../../models/producto.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  
  productos: Producto[] = [];
  movimientos: Movimiento[] = [];
  totalProductos: number = 0;
  productosBajoStock: number = 0;
  totalMovimientos: number = 0;
  
  constructor(
    private productosService: ProductosService,
    private movimientosService: MovimientosService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Cargar productos
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.totalProductos = productos.length;
      
      this.productosBajoStock = productos.filter(p => 
        p.cantidad <= p.cantidadMinima
      ).length;
    });

    // Cargar movimientos
    this.movimientosService.obtenerMovimientos().subscribe(movimientos => {
      this.movimientos = movimientos;
      this.totalMovimientos = movimientos.length;
    });
  }
}