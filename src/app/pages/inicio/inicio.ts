import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { AuthService } from '../../services/auth';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  
  productos: Producto[] = [];
  totalProductos: number = 0;
  productosBajoStock: number = 0;
  
  constructor(
    private productosService: ProductosService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.totalProductos = productos.length;
      
      // Contar productos con stock bajo
      this.productosBajoStock = productos.filter(p => 
        p.cantidad <= p.cantidadMinima
      ).length;
    });
  }
}