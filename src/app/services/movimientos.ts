import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(private firestore: Firestore) {}

  // OBTENER todos los movimientos (ordenados por fecha)
  obtenerMovimientos(): Observable<Movimiento[]> {
    const movimientosRef = collection(this.firestore, 'movimientos');
    const q = query(movimientosRef, orderBy('fecha', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Movimiento[]>;
  }

  // OBTENER movimientos de un producto específico
  obtenerMovimientosDeProducto(productoId: string): Observable<Movimiento[]> {
    const movimientosRef = collection(this.firestore, 'movimientos');
    const q = query(
      movimientosRef, 
      where('productoId', '==', productoId),
      orderBy('fecha', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Movimiento[]>;
  }

  // AGREGAR un movimiento
  agregarMovimiento(movimiento: Movimiento) {
    const movimientosRef = collection(this.firestore, 'movimientos');
    return addDoc(movimientosRef, movimiento);
  }
}