import type { Metadata } from 'next';
import { DM_Sans, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import EditorialShell from '@/components/EditorialShell';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brook He — Scale & Substance',
  description:
    'Personal portfolio and visual-analytical editorial blog pairing minimalist photography, interactive charts, and concise research briefs.',
  openGraph: {
    title: 'Brook He — Scale & Substance',
    description:
      'Personal portfolio and visual-analytical editorial blog pairing minimalist photography, interactive charts, and concise research briefs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brook He — Scale & Substance',
    description:
      'Personal portfolio and visual-analytical editorial blog pairing minimalist photography, interactive charts, and concise research briefs.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#F3EFE6] font-sans text-[#141414] antialiased"
      >
        <EditorialShell>{children}</EditorialShell>
      </body>
    </html>
  );
}
