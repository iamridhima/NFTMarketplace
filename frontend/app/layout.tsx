import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Handicraft Marketplace",
  description: "Marketplace for Nepali Digital Handicrafts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Prata&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-serif bg-ivory">{children}</body>
    </html>
  );
}
