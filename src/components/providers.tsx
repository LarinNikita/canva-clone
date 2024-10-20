'use client';

import { QueryProvider } from '@/components/query-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <QueryProvider>{children}</QueryProvider>;
};
