import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) {}

  // OBTENER todos los productos (en tiempo real)
  obtenerProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, 'productos');
    return collectionData(productosRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  // AGREGAR un producto nuevo
  agregarProducto(producto: Producto) {
    const productosRef = collection(this.firestore, 'productos');
    return addDoc(productosRef, producto);
  }

  // ELIMINAR un producto
  eliminarProducto(id: string) {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return deleteDoc(productoDoc);
  }

  // ACTUALIZAR un producto
  actualizarProducto(id: string, producto: Partial<Producto>) {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return updateDoc(productoDoc, producto);
  }
}