'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TriangleAlert } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const SignInCard = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const params = useSearchParams();
    const error = params.get('error');

    const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn('credentials', {
            email: email,
            password: password,
            redirectTo: '/',
        });
    };

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
            {!!error && (
                <div className="bg-destructive/15 text-destructive mb-6 flex items-center gap-x-2 rounded-md p-3 text-sm">
                    <TriangleAlert className="size-4" />
                    <p>Invalid email or password</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onCredentialSignIn} className="space-y-2.5">
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                    <Button type="submit" className="w-full" size="lg">
                        Continue
                    </Button>
                </form>
                <Separator />
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
