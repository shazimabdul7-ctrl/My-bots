import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { TabNav } from "@/components/TabNav";
import { Footer } from "@/components/Footer";
import { AIButton } from "@/components/AIButton";
import { TradeModal } from "@/components/TradeModal";

export const metadata: Metadata = {
  title: "ICT/SMC — Professional Trading Bot Builder & Copy Trading Platform",
  description:
    "Create profitable trading bots without coding. Professional ICT/SMC trading bot builder with copy trading and advanced strategies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface text-ink">
        <ThemeProvider>
          <Header />
          <TabNav />
          <main className="flex flex-1 bg-surface">
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
          <AIButton />
          <TradeModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
