import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Canva clone',
    description: 'Canva clone',
    icons: {
        icon: 'logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
