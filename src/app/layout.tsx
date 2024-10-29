import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import keys from '../../public/keys.png'

const inter = Inter({
  subsets: ['latin'],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('py-6 px-5 antialiased bg-gradient-to-b from-pink-50 to-gray-0 to-20%', inter.className)}
      >
        <Image
          src={keys}
          alt="keys"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "min(50%, 400px)",
            zIndex: "-1"
          }}
        />

        <header className="flex items-center">
          <Swords />
          <span
            className="bg-gradient-to-r from-violet-900 to-violet-600 font-bold text-lg bg-clip-text text-transparent leading-normal"
          >
            Gaming Haven Z
          </span>
        </header>
        {children}
      </body>
    </html>
  );
}
