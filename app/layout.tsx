import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bohemian Chic ",
  description: "Moda Boho-Chic. Diseños unicos y naturales. Ibiza ~ Punta del Este",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main className="container-app py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
