
import type { ReactNode } from "react";

export const metadata = {
  title: "EVOLVE AI",
  description: "Your personal growth and self-improvement dashboard",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
