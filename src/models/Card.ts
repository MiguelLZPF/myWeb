import { CardContent } from './CardContent';

export class Card {
  private title: string;
  private titleIcon: string;
  private content: CardContent;
  private rows: number;
  private cols: number;

  constructor(title: string, titleIcon: string, content: CardContent, rows?: number, cols?: number) {
    this.title = title;
    this.titleIcon = titleIcon;
    this.content = content;
    this.rows = rows;
    this.cols = cols;
  }

  public getTitle(): string {
    return this.title;
  }
  public getTitleIcon(): string {
    return this.titleIcon;
  }
  public getContent(): CardContent {
    return this.content;
  }
  public getRows(): number {
    return this.rows;
  }
  public getCols(): number {
    return this.cols;
  }
}
