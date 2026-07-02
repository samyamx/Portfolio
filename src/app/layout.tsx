import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  title: "Samyam | Portfolio | Software Engineering Student & Frontend Developer",
  description: "Explore the premium dark-themed, space-and-sketch interactive portfolio of Samyam. Showcasing software engineering and frontend development projects.",
  keywords: ["Samyam", "Portfolio", "Frontend Developer", "Software Engineer", "Next.js", "React", "TypeScript", "Space Theme", "Sketch Design"],
  openGraph: {
    title: "Samyam | Portfolio",
    description: "Software Engineering Student & Frontend Developer portfolio combining deep space aesthetics with hand-drawn sketchbook elements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} bg-bg-primary text-fg-primary antialiased selection:bg-accent-purple/30 selection:text-fg-primary`}
      >
        {children}
      </body>
    </html>
  );
}
