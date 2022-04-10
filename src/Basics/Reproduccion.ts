export class Reproduccion {
  constructor(private fecha: Date) {
  }
  setReproduction(newDate: Date): void {
    this.fecha = newDate;
  }
  getReproduction(): Date {
    return this.fecha;
  }
}
