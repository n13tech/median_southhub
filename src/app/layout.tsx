import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Southuuub",
  description: "Median southuuub project",
  openGraph: {
    type: "website",
    title: "Southuuub",
    description: "Median southuuub project",
    siteName: "Southuuub",
    images: [{ url: "/site.png" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
