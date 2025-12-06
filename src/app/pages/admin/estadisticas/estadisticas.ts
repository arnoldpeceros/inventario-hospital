import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos';
import { MovimientosService } from '../../../services/movimientos';
import { Producto, Movimiento } from '../../../models/producto.model';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export class Estadisticas implements OnInit {
  
  productos: Producto[] = [];
  movimientos: Movimiento[] = [];
  
  // Estadísticas
  totalProductos: number = 0;
  productosBajoStock: number = 0;
  productosVencidos: number = 0;
  productosProximosVencer: number = 0;
  totalEntradas: number = 0;
  totalSalidas: number = 0;
  valorInventario: number = 0;
  
  // Por tipo
  medicamentos: number = 0;
  equipos: number = 0;
  insumos: number = 0;

  constructor(
    private productosService: ProductosService,
    private movimientosService: MovimientosService
  ) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    // Cargar productos
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.calcularEstadisticasProductos();
    });

    // Cargar movimientos
    this.movimientosService.obtenerMovimientos().subscribe(movimientos => {
      this.movimientos = movimientos;
      this.calcularEstadisticasMovimientos();
    });
  }

  calcularEstadisticasProductos() {
    const hoy = new Date();
    
    this.totalProductos = this.productos.length;
    
    // Stock bajo
    this.productosBajoStock = this.productos.filter(p => 
      p.cantidad <= p.cantidadMinima
    ).length;
    
    // Vencidos
    this.productosVencidos = this.productos.filter(p => {
      const fecha = new Date(p.fechaCaducidad);
      return fecha < hoy;
    }).length;
    
    // Próximos a vencer (30 días)
    this.productosProximosVencer = this.productos.filter(p => {
      const fecha = new Date(p.fechaCaducidad);
      const diferencia = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
      return diferencia > 0 && diferencia <= 30;
    }).length;
    
    // Por tipo
    this.medicamentos = this.productos.filter(p => p.tipo === 'medicamento').length;
    this.equipos = this.productos.filter(p => p.tipo === 'equipo').length;
    this.insumos = this.productos.filter(p => p.tipo === 'insumo').length;
  }

  calcularEstadisticasMovimientos() {
    this.totalEntradas = this.movimientos.filter(m => m.tipo === 'entrada').length;
    this.totalSalidas = this.movimientos.filter(m => m.tipo === 'salida').length;
  }

  obtenerPorcentaje(valor: number): number {
    if (this.totalProductos === 0) return 0;
    return Math.round((valor / this.totalProductos) * 100);
  }
}