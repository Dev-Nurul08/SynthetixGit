import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SynthetixGit - GitHub Profile & README Studio",
  description:
    "Craft GitHub profile READMEs, contribution art, dynamic SVG widgets, and project documentation from one modern studio.",
  keywords: [
    "GitHub",
    "README",
    "profile",
    "generator",
    "markdown",
    "developer tools",
    "GitHub stats",
    "contribution art",
    "project documentation",
  ],
  authors: [{ name: "SynthetixGit" }],
  openGraph: {
    title: "SynthetixGit - GitHub Profile & README Studio",
    description: "Craft GitHub profile READMEs, contribution art, widgets, and project documentation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "8px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
