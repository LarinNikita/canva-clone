'use client';

import { signOut, useSession } from 'next-auth/react';
import { CreditCard, Loader, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserButton = () => {
    const session = useSession();

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
            <DropdownMenuTrigger>
                {/* TODO Add crown is user is premium */}
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
                    disabled={false}
                    onClick={() => {}}
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
