/**
 * Contains additional methods for converting texts.
 */
export abstract class TextFormatter {
  /**
   * Converts text in camelCase notation to plain text.
   * @param text In the singular or plural as an array.
   * @returns Formatted string or list of them.
   */
  public static fromCamelCase(text: string): string;
  public static fromCamelCase(text: string[]): string[];
  public static fromCamelCase(text: string | string[]): string | string[] {
    if (typeof(text) === 'string') {
      const sliced = this.sliceText(text);
      return sliced.charAt(0).toUpperCase() + sliced.slice(1);
    } else {
      return text.map((t: string) => {
        const sliced = this.sliceText(t);
        return sliced.charAt(0).toUpperCase() + sliced.slice(1);
      });
    }
  }

  /**
   * Converts passed text to capitalized version.
   * @param text Text to transform.
   * @returns Capitalized text.
   */
  public static capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private static sliceText(str: string): string {
    return str.replace(/([A-Z])/g, ' $1');
  }
}
