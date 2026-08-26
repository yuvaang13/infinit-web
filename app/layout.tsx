import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinit — Local AI Tutor for K–8 STEM",
  description:
    "Infinit is a locally-running STEM tutoring platform for K–8 students. Fine-tuned AI, 30,000-entry RAG knowledge base, 100% private and offline. Download for macOS.",
  keywords: ["Infinit", "AI tutor", "STEM", "K-8", "education", "local AI", "RAG", "ChromaDB"],
  authors: [{ name: "Infinit" }],
  openGraph: {
    title: "Infinit — Local AI Tutor for K–8 STEM",
    description: "Infinite learning. Privately powered. Runs entirely on your Mac — no cloud required.",
    type: "website",
  },
  icons: {
    icon: "/infinit-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-infinit-dark text-slate-200 antialiased selection:bg-infinit-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
