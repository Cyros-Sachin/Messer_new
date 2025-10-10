/**
 * Converts any given date-time string or object into a formatted string
 * according to user preferences (EU/ISO/US + 12H/24H).
 */
export default function formatDateTime(
  input: string | Date,
  dateFormat: "EU" | "ISO" | "US" = "EU",
  timeFormat: "12H" | "24H" = "24H"
): string {
  // Convert input into a Date object
  let date: Date;
  if (input instanceof Date) {
    date = input;
  } else {
    // Try parsing flexible formats safely
    // Handles "2025-06-17", "17/06/2025", "06/17/2025", etc.
    const normalized = input
      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, (_, a, b, c) => {
        if (dateFormat === "EU") return `${c}-${b}-${a}`;
        if (dateFormat === "US") return `${c}-${a}-${b}`;
        return `${c}-${b}-${a}`; // fallback
      })
      .trim();
    date = new Date(normalized);
  }

  if (isNaN(date.getTime())) return "Invalid Date";

  const pad = (n: number) => String(n).padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  // 🗓️ Build date part
  let dateStr = "";
  switch (dateFormat) {
    case "EU":
      dateStr = `${day}/${month}/${year}`;
      break;
    case "ISO":
      dateStr = `${year}-${month}-${day}`;
      break;
    case "US":
      dateStr = `${month}/${day}/${year}`;
      break;
  }

  // ⏰ Build time part
  let timeStr = "";
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());

  if (timeFormat === "12H") {
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    timeStr = `${pad(hours)}:${minutes} ${period}`;
  } else {
    timeStr = `${pad(hours)}:${minutes}`;
  }

  return `${dateStr} ${timeStr}`;
}
