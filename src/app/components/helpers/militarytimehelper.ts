import { format, parse } from "date-fns";

export function militaryToRegularTime(dateTime: string) {
  const justTime = dateTime.split("T")[1].split(".")[0]; // turns out milliseconds breaks everything past this
  const parsedDate = parse(justTime, "HH:mm:ss", new Date());
  return format(parsedDate, "h:mm a");
}
