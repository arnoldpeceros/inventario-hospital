import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasVencimiento',
  standalone: true
})
export class DiasVencimientoPipe implements PipeTransform {

  transform(fechaCaducidad: Date): string {
    const hoy = new Date();
    const fecha = new Date(fechaCaducidad);
    
    // Calcular diferencia en días
    const diferencia = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diferencia < 0) {
      return ' VENCIDO';
    } else if (diferencia === 0) {
      return ' Vence HOY';
    } else if (diferencia <= 30) {
      return ` ${diferencia} días`;
    } else if (diferencia <= 90) {
      return ` ${diferencia} días`;
    } else {
      return ` ${diferencia} días`;
    }
  }
}