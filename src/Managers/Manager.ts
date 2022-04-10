import {BasicData} from '../Interfaces/BasicData';

export abstract class Manager<T extends BasicData> {
  protected collection: Set<T> = new Set<T>();

  getCollection(): Set<T> {
    return this.collection;
  }
  getList(): string[] {
    let options: string[] = [];
    this.collection.forEach((element) => {
      options.push(element.getName());
    });
    return options;
  }
  searchByName(name:string): T {
    let valor: T = [...this.collection.values()].find((g) =>
      g.getName() === name) as T;
    if (valor) {
      return valor;
    } else {
      throw new Error(`Fallo al encontrar el objeto ${name}`);
    }
  }

  protected add(element: T): void {
    this.collection.add(element);
  }
  protected remove(element: T): void {
    this.collection.delete(element);
  }
  /*
  showData(): void {
    this.getCollection().forEach((item) => item.showInfo());
  }
  */
  exists(value: string): boolean {
    let exists: boolean = false;
    this.collection.forEach((element) => {
      if (value === element.getName()) {
        exists = true;
      }
    });
    return exists;
  }

  /*
  showInOrder(): void {
    const ordenedArray: T[] = Array.from(this.collection).sort((a, b) => a.getName().localeCompare(b.getName()));
    ordenedArray.forEach((element) => {
      console.log(element);
    });
  }*/
}
