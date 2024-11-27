'use client';

import { usePathname } from 'next/navigation';
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';

import { useBilling } from '@/features/subscriptions/api/use-billing';
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';
import { useCheckout } from '@/features/subscriptions/api/use-checkout';

import { SidebarItem } from './sidebar-item';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const mutation = useCheckout();
    const billingMutation = useBilling();
    const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

    const onClick = () => {
        if (shouldBlock) {
            triggerPaywall();
            return;
        }
        billingMutation.mutate();
    };

    return (
        <div className="flex flex-1 flex-col gap-y-4">
            {shouldBlock && !isLoading && (
                <>
                    <div className="px-3">
                        <Button
                            disabled={mutation.isPending}
                            onClick={() => mutation.mutate()}
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
                </>
            )}
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
                    onClick={onClick}
                />
                <SidebarItem
                    href="maillto:support@canva.com"
                    icon={MessageCircleQuestion}
                    label="Get help"
                />
            </ul>
        </div>
    );
};
