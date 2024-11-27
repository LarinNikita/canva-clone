'use client';

import { signOut, useSession } from 'next-auth/react';
import { CreditCard, Crown, Loader, LogOut } from 'lucide-react';

import { usePaywall } from '@/features/subscriptions/hooks/use-paywall';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBilling } from '@/features/subscriptions/api/use-billing';

export const UserButton = () => {
    const session = useSession();
    const mutation = useBilling();
    const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

    const onClick = () => {
        if (shouldBlock) {
            triggerPaywall();
            return;
        }
        mutation.mutate();
    };

    if (session.status === 'loading') {
        return <Loader className="text-muted-foreground size-4 animate-spin" />;
    }

    if (session.status === 'unauthenticated' || !session.data) {
        return null;
    }

    const name = session.data?.user?.name!;
    const imageUrl = session.data?.user?.image;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="relative outline-none">
                {!shouldBlock && !isLoading && (
                    <div className="absolute -left-1 -top-1 z-10 flex items-center justify-center">
                        <div className="jc flex items-center rounded-full bg-white p-1 drop-shadow-sm">
                            <Crown className="size-3 fill-yellow-500 text-yellow-500" />
                        </div>
                    </div>
                )}
                <Avatar className="size-10 transition hover:opacity-75">
                    <AvatarImage src={imageUrl || ''} alt={name} />
                    <AvatarFallback className="bg-blue-500 font-medium text-white">
                        {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem
                    className="h-10"
                    disabled={mutation.isPending}
                    onClick={onClick}
                >
                    <CreditCard className="mr-2 size-4" />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="h-10"
                    disabled={false}
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-2 size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
