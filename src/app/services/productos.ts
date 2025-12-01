import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) {}

  // OBTENER todos los productos
  obtenerProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, 'productos');
    return collectionData(productosRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  // OBTENER un producto por ID (NUEVA)
  obtenerProductoPorId(id: string): Observable<Producto> {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return docData(productoDoc, { idField: 'id' }) as Observable<Producto>;
  }

  // AGREGAR un producto
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