import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';

import './globals.css';

import { Modals } from '@/components/modals';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/providers';
import { SubscriptionAlert } from '@/features/subscriptions/components/subscription-alert';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Canva clone',
    description: 'Canva clone',
    icons: {
        icon: 'logo.svg',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <Providers>
                        <Toaster />
                        <Modals />
                        <SubscriptionAlert />
                        {children}
                    </Providers>
                </body>
            </html>
        </SessionProvider>
    );
}
