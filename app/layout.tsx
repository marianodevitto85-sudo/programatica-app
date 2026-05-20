import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Programática + IA · Curso ejecutivo",
  description:
    "Programática moderna e integración de IA. Curso de 8 clases ejecutivo con glosario y bibliografía.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-bg text-text min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-16 py-8">
          <div className="max-w-container mx-auto px-6 text-xs text-text-dim flex items-center justify-between">
            <span>© 2026 Mariano De Vitto · Programática + IA</span>
            <a
              href="https://marianodevitto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              marianodevitto.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
