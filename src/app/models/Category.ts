import randomColor from 'randomcolor';

export default class Category {
  constructor(public name: string, public color: string) {
  }

  public static getAll(): Category[] {
    const result = [];

    const schema = this.getColorsSchema();
    for (const c in schema) {
      if (schema.hasOwnProperty(c)) {
        result.push(new Category(c, schema[c]));
      }
    }

    return result;
  }

  public static getColorForCategory(categoryName: string): string {
    const schema = this.getColorsSchema();
    if (schema.hasOwnProperty(categoryName)) {
      return schema[categoryName];
    }

    const color = randomColor('randomcolor');

    schema[categoryName] = color;
    this.updateColorSchema(schema);

    return color;
  }

  private static getColorsSchema(): object {
    try {
      const json =  JSON.parse(localStorage.getItem('categoryColors'));

      if (!json) {
        return  {};
      }

      return json;
    } catch (e) {
      return {};
    }
  }

  private static updateColorSchema(schema): void {
    localStorage.setItem('categoryColors', JSON.stringify(schema));
  }
}
