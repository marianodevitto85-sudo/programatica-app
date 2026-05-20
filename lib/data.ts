import raw from "@/data/course_data.json";
import type { CourseData, CourseClass } from "./types";

export const course = raw as unknown as CourseData;

export function getClass(num: number): CourseClass | undefined {
  return course.classes.find((c) => c.num === num);
}

export function getClassNums(): number[] {
  return course.classes.map((c) => c.num).sort((a, b) => a - b);
}

export function getClassDescription(c: CourseClass, maxChars = 220): string {
  const firstP = c.content.find((b) => b.type === "p");
  if (!firstP || firstP.type !== "p") return c.objectives[0] ?? "";
  const text = firstP.text.trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s+\S*$/, "") + "…";
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
