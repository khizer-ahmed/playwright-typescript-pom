export class Helper {
    static rgbToHex(rgb: string): string {
      const [r, g, b] = rgb.match(/\d+/g) || [];
      const hexR = parseInt(r).toString(16).padStart(2, '0');
      const hexG = parseInt(g).toString(16).padStart(2, '0');
      const hexB = parseInt(b).toString(16).padStart(2, '0');
      const colorCode = `#${hexR}${hexG}${hexB}`;
      return colorCode;
    }

    static convertDateFormat(date: string): string {
        const updated_date = new Date(date);
        const formattedDate = updated_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        return formattedDate;
      }
}    