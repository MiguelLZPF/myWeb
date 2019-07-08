export class CardContent {
  private image: string;
  private items: string[];
  private itemsIcons: string[];

  constructor(image: string, items: string[], itemsIcons: string[]) {
    this.image = image;
    this.items = items;
    this.itemsIcons = itemsIcons;
  }

  public getImage(): string {
    return this.image;
  }
  public getItems(): string[] {
    return this.items;
  }
  public getItemsIcons(): string[] {
    return this.itemsIcons;
  }
}
