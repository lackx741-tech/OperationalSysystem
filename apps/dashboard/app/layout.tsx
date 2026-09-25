import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operational Builder Dashboard",
  description: "Monorepo scaffold for the multichain DApp project builder dashboard and build services."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
