import randomColor from 'randomcolor';

export default class Category {
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
