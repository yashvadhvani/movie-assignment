export function formatDateToDDMMYYYY(date: Date) {
  if (!(date instanceof Date)) {
    // Check if the input is a valid Date object
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
