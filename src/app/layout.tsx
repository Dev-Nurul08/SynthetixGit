import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getAppUrl } from "@/lib/app-url";
import { Providers } from "@/components/Providers";
import { PostHogProvider } from "@/app/providers/PostHogProvider";
import Footer from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

function resolveMetadataBase(): URL {
  try {
    return new URL(getAppUrl());
  } catch {
    return new URL("https://synthetixgit.vercel.app");
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: "SynthetixGit — GitHub Profile & README Studio",
    template: "%s · SynthetixGit",
  },
  description:
    "Craft GitHub profile READMEs, contribution artwork, dynamic SVG widgets, project documentation, and playable commit games from one modern studio.",
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
    "GitHub widgets",
    "SVG generator",
    "Next.js",
    "github contribution graph",
    "github pixel art",
    "github activity generator",
    "customize github profile",
    "git art",
  ],
  authors: [{ name: "SynthetixGit Studio", url: getAppUrl() }],
  creator: "SynthetixGit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getAppUrl(),
    siteName: "SynthetixGit",
    title: "SynthetixGit — GitHub Profile & README Studio",
    description:
      "Craft GitHub profile READMEs, contribution artwork, dynamic SVG widgets, and project docs from one modern studio.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SynthetixGit Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynthetixGit — GitHub Profile & README Studio",
    description:
      "Profile READMEs, contribution art, widgets, arcade games, and deploy — all in one.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "Developer Tools",
  verification: {
    google: "FpMq1620MPw97ShOx5JxKpvxsk0ON2uvsx7jUCBk_Ks",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
    { media: "(prefers-color-scheme: light)", color: "#0a0d12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SynthetixGit Studio",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Craft GitHub profile READMEs, contribution artwork, dynamic SVG widgets, project documentation, and playable commit games from one modern studio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col relative"
      >
        <PostHogProvider>
          <Providers>
            <div id="page-root" className="flex min-h-screen flex-col flex-1">
              {children}
            </div>
            <Footer />
          </Providers>
        </PostHogProvider>

        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2800,
            style: {
              background: "rgba(21, 28, 39, 0.92)",
              color: "#f1f5f9",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "0.8rem",
              fontSize: "13px",
              fontWeight: 500,
              backdropFilter: "blur(12px)",
              padding: "0.85rem 1rem",
              boxShadow:
                "0 8px 40px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.03)",
            },
            success: {
              iconTheme: {
                primary: "#34d399",
                secondary: "#052e1b",
              },
            },
            error: {
              iconTheme: {
                primary: "#fb7185",
                secondary: "#3b0b13",
              },
            },
          }}
        />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
