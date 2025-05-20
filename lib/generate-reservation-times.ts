import { format } from "date-fns";

export interface TimeSlot {
  start: Date;
  end: Date;
}

/**
 * Generate all non-overlapping time slots between `startTime` and `endTime`,
 * of length `duration` (in minutes), excluding any that collide with `bookedSlots`
 * or are in the past.
 *
 * @param startTime   ISO string or Date for the window’s start
 * @param endTime     ISO string or Date for the window’s end
 * @param duration    slot length in minutes
 * @param bookedSlots array of existing bookings to avoid
 * @returns           array of available TimeSlots
 */
export function generateTimeSlots(
  startTime: string | Date,
  endTime: string | Date,
  duration: number,
  bookedSlots: TimeSlot[]
): TimeSlot[] {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const slots: TimeSlot[] = [];
  let current = new Date(start);

  while (current < end) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + duration);
    const slotEnd = new Date(current);

    const overlaps = bookedSlots.some(
      (b) => slotStart < b.end && slotEnd > b.start
    );
    const inFuture = slotStart > new Date();

    if (!overlaps && inFuture) {
      slots.push({ start: slotStart, end: slotEnd });
    }
  }

  // Ensure the slots are sorted by start time
  slots.sort((a, b) => a.start.getTime() - b.start.getTime());
  return slots;
}

export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Generate a list of string-based time options for a picker,
 * e.g. ["08:00", "08:30", ...], excluding booked slots
 * but always including `defaultFrom` and `defaultTo` if provided.
 *
 * @param startTime   ISO string or Date for the window’s start
 * @param endTime     ISO string or Date for the window’s end
 * @param duration    slot length in minutes
 * @param bookedSlots array of existing bookings to avoid
 * @param defaultFrom Date/string to always include at start
 * @param defaultTo   Date/string to always include at end
 * @returns           array of `{ label, value }` options
 */
export function generateAvailableTime(
  startTime: string | Date,
  endTime: string | Date,
  duration: number,
  bookedSlots: TimeSlot[],
  defaultFrom?: string | Date,
  defaultTo?: string | Date
): SelectOption[] {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const map = new Map<string, string>();
  let current = new Date(start);

  while (current < end) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + duration);
    const slotEnd = new Date(current);

    const overlaps = bookedSlots.some(
      (b) => slotStart < b.end && slotEnd > b.start
    );
    const inFuture = slotStart > new Date();

    if (!overlaps && inFuture) {
      const label = format(slotStart, "HH:mm");
      map.set(label, label);
    }
  }

  // Always include defaults if they’re not already present
  if (defaultFrom) {
    const t = format(new Date(defaultFrom), "HH:mm");
    if (!map.has(t)) map.set(t, t);
  }
  if (defaultTo) {
    const t = format(new Date(defaultTo), "HH:mm");
    if (!map.has(t)) map.set(t, t);
  }

  // Sort and map to options
  return Array.from(map.values())
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .map((time) => ({ label: time, value: time }));
}

const availability = [
  { from: "5:00", to: "20:00" }, // Monday
  { from: "5:00", to: "20:00" }, // Tuesday
  { from: "5:00", to: "20:00" }, // Wednesday
  { from: "5:00", to: "20:00" }, // Thursday
  { from: "5:00", to: "20:00" }, // Friday
  { from: "9:00", to: "19:00" }, // Saturday
  { from: "9:00", to: "19:00" }, // Sunday
];
