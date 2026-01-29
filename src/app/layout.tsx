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
  title: "SynthetixGit — GitHub Profile & README Studio",
  description:
    "Craft stunning GitHub profile READMEs in seconds. Scan any username, toggle stats cards, badges, themes, and export — all from a gorgeous glassmorphism dark-mode studio.",
  keywords: [
    "GitHub",
    "README",
    "profile",
    "generator",
    "markdown",
    "developer tools",
    "GitHub stats",
    "contribution snake",
  ],
  authors: [{ name: "SynthetixGit" }],
  openGraph: {
    title: "SynthetixGit — GitHub Profile & README Studio",
    description: "Craft stunning GitHub profile READMEs in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-md)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
