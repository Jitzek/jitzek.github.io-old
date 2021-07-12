class TextColor {
  id = 'e';
  start = '[';
  seperator = ';';
  end = 'm';

  // "code": "html"
  codes = [
    { code: "0", style: 'color: #FFFFFF; font-family: monospace, "Quicksand", sans-serif; font-weight: 400;' }, // Reset / Normal
    { code: "1", style: "font-weight: 800;" }, // Bold
  ];

  getStyle(code: string): string {
    for (let i = 0; i < this.codes.length; i++)
      if (this.codes[i].code == code) return this.codes[i].style;
    return '';
  }
}