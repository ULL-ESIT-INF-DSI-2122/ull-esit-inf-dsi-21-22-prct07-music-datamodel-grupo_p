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
  exists(value: string): boolean {
    let exists: boolean = false;
    this.collection.forEach((element) => {
      if (value === element.getName()) {
        exists = true;
      }
    });
    return exists;
  }
  anotherOneWithThatName(value: string, element?: T): boolean {
    let exists: boolean = false;
    this.collection.forEach((c) => {
      if (value === c.getName() && c !== element) {
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
}
