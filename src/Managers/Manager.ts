import {basicData} from '../interfaces/interfaces';

export abstract class Manager<T extends basicData> {
  protected collection: Set<T> = new Set<T>();

  getCollection(): Set<T> {
    return this.collection;
  }
  exists(value: string): boolean {
    let exists: boolean = false;
    this.collection.forEach((element) => {
      if (value === element.getName()) {
        exists = true;
      }
    });
    return exists;
  }
  searchByName(name:string): T {
    return [...this.collection.values()].find((g) =>
      g.getName() === name) as T;
  }
  add(element: T): void {
    this.collection.add(element);
  }
  remove(element: T): void {
    this.collection.delete(element);
  }
  showInOrder(): void {
    const ordenedArray: T[] = Array.from(this.collection).sort((a, b) => a.getName().localeCompare(b.getName()));
    ordenedArray.forEach((element) => {
      console.log(element);
    });
  }
  listNameElementsInOrder(): string[] | void {
    const ordenedArray: T[] = Array.from(this.collection).sort((a, b) => a.getName().localeCompare(b.getName()));
    return ordenedArray.forEach((element) => {
      return element.getName();
    });
  }
}
