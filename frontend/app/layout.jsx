import "./globals.css";

export const metadata = {
  title: "EcoMindAI - Community Environmental Action Planner",
  description: "AI-powered tool that helps communities create personalized plans to protect the environment",
  keywords: ["sustainability", "environment", "AI", "community planning", "eco-friendly"],
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
