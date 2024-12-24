import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Reaction Speed Test",
  description: "You can test your reaction speed.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
