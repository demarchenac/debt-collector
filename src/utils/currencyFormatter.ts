const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const units = ["", "K", "M", "MM", "B"];

export class CurrencyFormatter {
  static format(raw: string) {
    const intlFormat = currencyFormatter.format(+raw).replace(/\s/, "");
    const leading = intlFormat.substring(0, 5);

    const unit = intlFormat.split(".").length - 1;

    const formatted = `${leading}${units[unit] ?? ""}`;

    return { currency: formatted, locale: intlFormat };
  }
}
