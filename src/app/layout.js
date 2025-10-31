import { Inter } from "next/font/google";
import "./globals.css";
import ProtectedWrapper from "../../components/ProtectedRoutes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata = {
  title: "A.T. INKS",
  description: "Login portal for A.T. INKS",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ProtectedWrapper>{children}</ProtectedWrapper>
      </body>
    </html>
  );
}