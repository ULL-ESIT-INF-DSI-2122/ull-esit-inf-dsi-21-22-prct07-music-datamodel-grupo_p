import {BasicData} from '../Basics/BasicData';

/**
 * Clase abstracta génerica para las clases mánager.
 */
export abstract class Manager<T extends BasicData> {
  /**
   * Colección de elementos T.
   */
  protected collection: Set<T> = new Set<T>();
  /**
   * Getter para la propiedad `collection`.
   * @returns Devuelve el valor de`collection`.
   */
  getCollection(): Set<T> {
    return this.collection;
  }
  /**
   * Devuelve los nombres de los objetos de la colección.
   * @returns Devuelve un array con los nombres de los objetos de la colección.
   */
  getList(): string[] {
    let options: string[] = [];
    this.collection.forEach((element) => {
      options.push(element.getName());
    });
    return options;
  }
  /**
   * Comprueba si existe otro objeto en la colección con el mismo nombre.
   * @param name Nombre del elemento a buscar.
   * @param element Elemento del que es el nombre.
   * @returns Devuelve true si existe otro objeto en la colección con el mismo nombre.
   */
  anotherOneWithThatName(name: string, element?: T): boolean {
    let exists: boolean = false;
    this.collection.forEach((c) => {
      if (name === c.getName() && c !== element) {
        exists = true;
      }
    });
    return exists;
  }
  /**
   * Busca un elemento de la colección por su nombre.
   * @param name Nombre del elemento a buscar.
   * @returns Devuelve el elemento al que pertenece el nombre.
   */
  searchByName(name:string): T {
    return [...this.collection.values()].find((g) =>
      g.getName() === name) as T;
  }
  /**
   * Agrega un nuevo elemento a la colección.
   * @param element Elemento a agregar.
   */
  add(element: T): void {
    this.collection.add(element);
    this.store();
  }
  /**
   * Elimina un elemento de la collección.
   * @param element Elemento a eliminar.
   */
  remove(element: T): void {
    this.collection.forEach((x) => {
      if (x.getName() === element.getName()) {
        this.collection.delete(element);
      }
    });
    this.store();
  }
  /**
   * Guarda los datos en la base de datos.
   */
  abstract store(): void;
}
