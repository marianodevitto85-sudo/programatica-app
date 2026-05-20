import { notFound } from "next/navigation";
import ClassShell from "@/components/ClassShell";
import { course, getClass, getClassNums } from "@/lib/data";

export function generateStaticParams() {
  return getClassNums().map((n) => ({ num: String(n) }));
}

export default function ClassPage({ params }: { params: { num: string } }) {
  const num = parseInt(params.num, 10);
  if (!Number.isFinite(num)) notFound();
  const c = getClass(num);
  if (!c) notFound();

  const nums = getClassNums();
  const idx = nums.indexOf(num);
  const prevNum = idx > 0 ? nums[idx - 1] : null;
  const nextNum = idx < nums.length - 1 ? nums[idx + 1] : null;

  return <ClassShell c={c} prevNum={prevNum} nextNum={nextNum} />;
}

export function generateMetadata({ params }: { params: { num: string } }) {
  const c = getClass(parseInt(params.num, 10));
  if (!c) return { title: "Clase no encontrada" };
  return {
    title: `Clase ${c.num} · ${c.title} — ${course.meta.title}`,
  };
}
