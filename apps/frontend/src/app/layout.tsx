import type { Metadata, Viewport } from "next";

import { AppProviders, ReduxProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "StrideStep",
  description:
    "StrideStep is your go-to online destination for stylish, comfortable, and affordable footwear. From casual sneakers to formal shoes, we bring the latest trends and timeless designs right to your doorstep. Walk your journey with confidence — one step at a time.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppProviders>{children}</AppProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
