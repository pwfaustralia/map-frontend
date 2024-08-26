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
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginPage() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(EmailPasswordSchema),
  });
  const [otherError, setOtherError] = useState('');
  const router = useRouter();
  const submitRef = useRef();

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
        <div className="flex items-center gap-3">
          <Button ref={submitRef as any} type="submit" className="hidden"></Button>
          <Button
            className="w-full text-2xl py-6"
            disabled={isSubmitting}
            onClick={() => {
              setValue('email', 'hello@pwf.com.au');
              setValue('password', 'LK^3gxs8!!8&hu');
              (submitRef.current as any).click();
            }}
          >
            Sign in as Admin
          </Button>
          <Button
            variant="outline"
            className="w-full text-2xl py-6"
            disabled={isSubmitting}
            onClick={() => {
              setValue('email', 'mark@pwf.com.au');
              setValue('password', 'Pwf@2024');
              (submitRef.current as any).click();
            }}
          >
            Sign in as Client
          </Button>
        </div>
      </div>
    </form>
  );
}
