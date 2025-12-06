import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { MovimientosService } from '../../services/movimientos';
import { Producto, Movimiento } from '../../models/producto.model';
import { DiasVencimientoPipe } from '../../pipes/dias-vencimiento-pipe';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, DiasVencimientoPipe],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css'
})
export class ProductoDetalle implements OnInit {
  
  producto: Producto | null = null;
  movimientos: Movimiento[] = [];
  cargando: boolean = true;
  productoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit() {
    // Obtener el ID del producto de la URL
    this.productoId = this.route.snapshot.paramMap.get('id') || '';
    
    if (this.productoId) {
      this.cargarProducto();
      this.cargarMovimientos();
    } else {
      this.router.navigate(['/productos']);
    }
  }

  cargarProducto() {
    this.productosService.obtenerProductoPorId(this.productoId).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar producto:', error);
        this.cargando = false;
        this.router.navigate(['/productos']);
      }
    });
  }

  cargarMovimientos() {
    this.movimientosService.obtenerMovimientosDeProducto(this.productoId).subscribe({
      next: (movimientos) => {
        this.movimientos = movimientos;
      },
      error: (error) => {
        console.error('Error al cargar movimientos:', error);
      }
    });
  }

  tieneStockBajo(): boolean {
    if (!this.producto) return false;
    return this.producto.cantidad <= this.producto.cantidadMinima;
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}