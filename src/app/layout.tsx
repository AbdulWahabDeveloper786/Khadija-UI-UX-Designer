import '../index.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khadija Portfolio',
  description: 'Portfolio showing creative work, services, and testimonials.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
