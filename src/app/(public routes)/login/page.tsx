'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NEXT_APP_ROUTES } from '@/lib/routes';
import { EmailPasswordSchema } from '@/lib/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeClosedIcon, InfoCircledIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';
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
  );
}
