'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginPage() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    defaultValues: {
      email: 'hello@pwf.com.au',
      password: 'LK^3gxs8!!8&hu',
    },
    resolver: zodResolver(EmailPasswordSchema),
  });
  const [otherError, setOtherError] = useState('');
  const router = useRouter();

  const handleSignIn = async (credentials: z.infer<typeof EmailPasswordSchema>) => {
    setOtherError('');
    const signinReq = await signIn('email-password', {
      ...credentials,
      redirect: false,
    });
    if (signinReq?.error) {
      try {
        const errors = JSON.parse(signinReq.error);
        errors?.forEach((err: any) => {
          setError(err.path[0], err);
        });
      } catch (e) {
        if (signinReq.error) {
          setOtherError(signinReq.error);
        }
      }
    } else {
      if (!signinReq?.error && signinReq?.url) {
        router.replace(NEXT_APP_ROUTES.dashboard);
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-[512px,1fr] xl:min-h-[800px]">
      <div className="hidden bg-primary lg:flex flex-col">
        <div className="w-full h-full flex items-center justify-center">
          <img src="/images/cc-logo.png" alt="Credit Connection" width="365" height="140" />
        </div>
        <div className="w-full flex justify-center">
          <img src="/images/girl-on-the-bike.png" width="278" height="267" />
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl">Welcome to your</h1>
            <h1 className="text-3xl font-bold text-accent">Mortgage Action Plan</h1>
          </div>
          <form onSubmit={handleSubmit((d) => handleSignIn(d as z.infer<typeof EmailPasswordSchema>))}>
            <div className="grid gap-4">
              {otherError && (
                <Alert variant="destructive">
                  <InfoCircledIcon />
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{otherError}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} disabled={isSubmitting} error={errors.email?.message} type="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...register('password')}
                  disabled={isSubmitting}
                  error={errors.password?.message}
                  type="password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login
              </Button>
              <Button variant="outline" className="w-full" disabled={isSubmitting}>
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
