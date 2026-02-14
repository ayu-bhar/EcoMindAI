import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext"; // Import the Auth Context
import "./globals.css";
import { Ephesis } from 'next/font/google';

const ephesis = Ephesis({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cursive',
});

// Configure the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoMindAI - Community Environmental Action Planner",
  description: "AI-powered tool that helps communities create personalized plans to protect the environment",
  keywords: ["sustainability", "environment", "AI", "community planning", "eco-friendly"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the app in AuthProvider so user state is available everywhere */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}