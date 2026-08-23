import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cut2Edge Platform | Precision Cabinetry & Door Manufacturing",
  description:
    "Agentic Manufacturing Platform for Cut2Edge (#7 Fatai Atere Way, Matori, Lagos) - High-yield HDF/MDF panel saw cutting, automatic edge banding, door membrane pressing, and turnkey contract management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
