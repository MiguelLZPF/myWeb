export class ExperienceItem {
  private date: string;
  private title: string;
  private content: string;
  private company: string;

  constructor(date: string, title: string, content: string, company: string) {
    this.date = date;
    this.title = title;
    this.content = content;
    this.company = company;
  }

  public getDate(): string {
    return this.date;
  }
  public getTitle(): string {
    return this.title;
  }
  public getContent(): string {
    return this.content;
  }
  public getCompany(): string {
    return this.company;
  }
}
