/**
 * Clase abstracta de la que heredan las clases básicas.
 */
export abstract class BasicData {
  /**
   * Constructor
   * @param name Nombre
   */
  constructor(protected name: string) {
  }
  /**
   * Getter para la propiedad `name`.
   * @returns Devuelve el valor de la propiedad `name`.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Setter para la propiedad `name`.
   * @param newName Nuevo valor de la propiedad `name`.
   */
  public setName(newName: string): void {
    this.name = newName;
  }
}