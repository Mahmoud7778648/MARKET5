"use client";
import { Footer } from "../../components/footer/Footer";
import "../globals.css";
import AuthProvider from "../../providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
