// utils/parseDateTime.ts
export type DateFormat = "EU" | "US" | "ISO";
export type TimeFormat = "12H" | "24H";

/**
 * Parse a date-time string safely for multiple formats
 */
export default function parseDateTime(
  str: string,
  dateFormat: DateFormat = "EU",
  timeFormat: TimeFormat = "24H"
): Date {
  if (!str) return new Date(NaN);

  // Replace space with 'T' for ISO compliance if missing timezone
  let normalized = str.trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(normalized)) {
    normalized = normalized.replace(" ", "T"); // "2025-10-10 11:30" → "2025-10-10T11:30"
  }

  // Try native Date parse first
  const parsed = new Date(normalized);
  if (!isNaN(parsed.getTime())) return parsed;

  // Fallback parsing by user format
  const [datePart, timePart] = normalized.split(" ");

  let day = 1, month = 1, year = 1970;
  if (datePart) {
    if (dateFormat === "EU") {
      [day, month, year] = datePart.split("/").map(Number);
    } else if (dateFormat === "US") {
      [month, day, year] = datePart.split("/").map(Number);
    } else if (dateFormat === "ISO") {
      [year, month, day] = datePart.split("-").map(Number);
    }
  }

  let hour = 0, minute = 0;
  if (timePart) {
    const [h, m] = timePart.split(":").map(Number);
    hour = h;
    minute = m;
  }

  return new Date(year, month - 1, day, hour, minute);
}
