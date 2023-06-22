export class Treasure {
  constructor(public amount: number) {}

  decrease(): void {
    this.amount--;
  }
}
