type ClassValue = string | false | null | undefined;

/** Minimal class name joiner — no dependency needed for this scale of app. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
