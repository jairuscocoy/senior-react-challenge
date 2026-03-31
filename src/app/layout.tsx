import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Senior React Challenge",
  description: "Lorem Ipsum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
