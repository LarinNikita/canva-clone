'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const SignInCard = () => {
    const onProviderSignIn = (provider: 'github' | 'google') => {
        signIn(provider, { redirectTo: '/' });
    };

    return (
        <Card className="size-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        onClick={() => onProviderSignIn('google')}
                        variant="outline"
                        size="lg"
                        className="relative w-full"
                    >
                        <FcGoogle className="absolute left-2.5 top-2.5 mr-2 size-5" />
                        Continue with Google
                    </Button>
                    <Button
                        onClick={() => onProviderSignIn('github')}
                        variant="outline"
                        size="lg"
                        className="relative w-full"
                    >
                        <FaGithub className="absolute left-2.5 top-2.5 mr-2 size-5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    Don&apos;t have an account yet?{' '}
                    <Link href="/sign-up">
                        <span className="text-sky-700 hover:underline">
                            Sign up
                        </span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};
