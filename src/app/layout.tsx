import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "我的博客",
  description: "基于 Next.js 构建的现代化博客",
  keywords: ["博客", "技术", "编程", "Next.js", "React"],
  authors: [{ name: "我的博客" }],
  openGraph: {
    title: "我的博客",
    description: "基于 Next.js 构建的现代化博客",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${notoSansSC.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
