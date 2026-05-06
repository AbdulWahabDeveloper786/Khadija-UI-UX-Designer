import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Khadija — UI/UX Designer & Creative Director',
  description:
    'Portfolio of Khadija, a UI/UX Designer & Creative Director based in London. Specializing in brand identity, design systems, and intuitive digital experiences.',
  keywords: [
    'UI/UX Designer',
    'Creative Director',
    'Brand Identity',
    'Design Systems',
    'Portfolio',
    'London',
  ],
  openGraph: {
    title: 'Khadija — UI/UX Designer & Creative Director',
    description:
      'Crafting intuitive interfaces that users love. Explore selected work, services, and testimonials.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
