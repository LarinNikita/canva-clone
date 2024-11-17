'use client';

import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';

import { SidebarItem } from './sidebar-item';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';

export const SidebarRoutes = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-1 flex-col gap-y-4">
            <div className="px-4">
                <Button
                    onClick={() => {}}
                    className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75"
                    variant="outline"
                    size="lg"
                >
                    <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
                    Upgrade to Canva Pro
                </Button>
            </div>
            <div className="px-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem
                    href="/"
                    icon={Home}
                    label="Home"
                    isActive={pathname === '/'}
                />
            </ul>
            <div className="px-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-3">
                <SidebarItem
                    href={pathname}
                    icon={CreditCard}
                    label="Billing"
                    onClick={() => {}}
                />
                <SidebarItem
                    href="maillto:support@canva.com"
                    icon={MessageCircleQuestion}
                    label="get help"
                />
            </ul>
        </div>
    );
};
