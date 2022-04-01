export class Duracion {
  constructor(readonly horas: number, readonly minutos: number,
      readonly segundos: number) {
  }
  print(): string {
    return (`${this.horas}:${this.minutos}:${this.segundos}`);
  }
}
