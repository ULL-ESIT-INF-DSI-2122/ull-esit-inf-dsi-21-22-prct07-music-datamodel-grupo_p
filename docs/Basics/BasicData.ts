export abstract class BasicData {
  constructor(protected name: string) {
  }
  public getName(): string {
    return this.name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }
}