import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GHOST — AI-Powered Ransomware Defense",
  description: "GHOST uses behavioral analysis, deception technology, and AI investigations to detect, contain, and eliminate ransomware threats before encryption begins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
