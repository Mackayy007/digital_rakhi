import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Caveat } from "next/font/google";
import AudioProvider from "@/components/AudioProvider";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digital-rakhi-a9yv.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital Rakhi — tie one, from anywhere",
    template: "%s · Digital Rakhi",
  },
  description:
    "Make a rakhi for someone far away. Pick a frame, write a memory, send it on WhatsApp — they untie it and can tie one back.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F2994A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-cream">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
