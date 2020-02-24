export class FormatText {
  public Capitalize = (s: string) => {
    return s.slice(0, 1).toUpperCase() + s.slice(1);
  };
}
