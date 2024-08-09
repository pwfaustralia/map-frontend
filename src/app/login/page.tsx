'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeClosedIcon, InfoCircledIcon, LockClosedIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
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
      <div className="bg-primary lg:flex flex-col lg:pb-0 pb-[46px]">
        <div className="w-full h-full flex items-center justify-center lg:py-0 py-[46px]">
          <img src="/images/cc-logo.png" alt="Credit Connection" className="lg:w-[365px] w-[80%] max-w-[365px]" />
        </div>
        <div className="hidden w-full flex justify-center lg:block">
          <img src="/images/girl-on-the-bike.png" width="278" height="267" />
        </div>
      </div>
      <div className="flex items-center justify-center py-12 rounded-t-[41px] bg-white lg:mt-0 mt-[-46px] lg:px-0 px-[46px]">
        <div className="mx-auto grid w-[522px] gap-9">
          <div className="grid gap-2">
            <h1 className="lg:text-5xl text-3xl">Welcome to your</h1>
            <h1 className="lg:text-5xl text-3xl font-bold text-accent">Mortgage Action Plan</h1>
          </div>
          <form onSubmit={handleSubmit((d) => handleSignIn(d as z.infer<typeof EmailPasswordSchema>))}>
            <div className="grid gap-8">
              {otherError && (
                <Alert variant="destructive">
                  <InfoCircledIcon width="23" height="23" />
                  <AlertTitle className="text-xl">Login failed</AlertTitle>
                  <AlertDescription className="text-base">{otherError}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-4">
                <Input
                  {...register('email')}
                  className="text-xl py-6 h-14"
                  disabled={isSubmitting}
                  error={errors.email?.message}
                  type="email"
                  placeholder="Enter your email"
                  iconLeft={<EnvelopeClosedIcon className="[&>path]:fill-primary w-8 h-8" />}
                />
                <Input
                  {...register('password')}
                  className="text-xl py-6 h-14"
                  disabled={isSubmitting}
                  error={errors.password?.message}
                  type="password"
                  placeholder="Enter your password"
                  iconLeft={<LockClosedIcon className="[&>path]:fill-primary w-8 h-8" />}
                />
              </div>
              <Button type="submit" className="w-full text-2xl py-6" disabled={isSubmitting}>
                Sign in
              </Button>
            </div>
          </form>
          <div className="mt-12 text-center text-base text-grey font-extralight">
            Forgot your password?&nbsp;
            <Link href="#" className="text-accent font-semibold" prefetch={false}>
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
