"use client";

import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PasswordGate from "@/components/PasswordGate";
import { useEffect, useState } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if already authed by hitting a lightweight endpoint
    fetch("/api/auth/check").then((res) => {
      setAuthed(res.ok);
    });
  }, []);

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {authed ? children : <PasswordGate onSuccess={() => setAuthed(true)} />}
      </body>
    </html>
  );
}
