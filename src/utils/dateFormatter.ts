type DateKey = "YYYY" | "MM" | "DD" | "hh" | "mm" | "ss";
type TranslationMap = Record<DateKey, string>;

export class DateFormatter {
  static toString(toFormat: Date, format = "YYYY-MM-DD hh:mm:ss") {
    const translations: TranslationMap = {
      YYYY: toFormat.getFullYear().toString(),
      MM: (toFormat.getMonth() + 1).toString().padStart(2, "0"),
      DD: toFormat.getDate().toString().padStart(2, "0"),
      hh: toFormat.getHours().toString().padStart(2, "0"),
      mm: toFormat.getMinutes().toString().padStart(2, "0"),
      ss: toFormat.getSeconds().toString().padStart(2, "0"),
    };

    const keys = format.replaceAll(/[\-\s\:]/g, "_").split("_") as DateKey[];

    let result = format;
    for (const key of keys) {
      result = result.replace(key, translations[key]);
    }

    return result;
  }
}
