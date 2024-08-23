'use client';

import { createUserAndClientProfile } from '@/app/(actions)/(laravel)/actions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useSliderTransition from '@/lib/hooks/use-slider-transition';
import { UserSchema } from '@/lib/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AddClientPage() {
  const { direction, getFrame, page, paginate, paginateToFieldErrored } = useSliderTransition({
    fieldsPerPage: [
      ['first_name', 'last_name', 'middle_name', 'preferred_name'],
      ['email', 'password', 'yodlee_username'],
    ],
  });
  const {
    formState: { errors, isSubmitting },
    setError,
    reset,
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const handleSave = async (data: z.infer<typeof UserSchema>) => {
    paginate(3, 1);
    const res = await createUserAndClientProfile(data);
    if (res.id) {
      reset();
      paginate(1, -1);
    } else {
      Object.keys(res).forEach((key) => {
        setError(key, {
          message: res[key][0],
        });
      });
      paginateToFieldErrored(Object.keys(res));
    }
  };

  useEffect(() => {
    if (errors) {
      paginateToFieldErrored(Object.keys(errors));
    }
  }, [errors]);
  return (
    <AnimatePresence initial={false} custom={direction}>
      <form onSubmit={handleSubmit((values) => handleSave(values as z.infer<typeof UserSchema>))}>
        <h1 className="font-bold text-2xl my-4">Add New Client</h1>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          <div>
            {page === 1 && (
              <motion.div key="personal-details" className="max-w-[700px] grid gap-4" {...getFrame()}>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold">Personal Details</h1>
                  <h2 className="text-lg">Please enter the details below</h2>
                </div>
                <div className="flex items-start gap-4">
                  <Input
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    label="First Name"
                    className="text-lg py-6 h-14 bg-white px-5"
                    placeholder="Client's first name"
                    full
                  />
                  <Input
                    {...register('middle_name')}
                    error={errors.middle_name?.message}
                    label="Middle Name"
                    className="text-lg py-6 h-14 bg-white px-5"
                    placeholder="Client's middle name"
                    full
                  />
                </div>

                <Input
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  label="Last Name"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Client's last name"
                  full
                />
                <Input
                  {...register('preferred_name')}
                  error={errors.preferred_name?.message}
                  label="Preferred Name"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Client's preferred name"
                  full
                />
                <Input
                  label="Mobile Phone"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Mobile phone number"
                  full
                />
                <div className="flex items-start gap-4">
                  <Input
                    label="Home Phone"
                    className="text-lg py-6 h-14 bg-white px-5"
                    placeholder="Home phone number"
                    full
                  />
                  <Input
                    label="Work Phone"
                    className="text-lg py-6 h-14 bg-white px-5"
                    placeholder="Work phone number"
                    full
                  />
                </div>
                <label className="text-xl mt-2">Physical Address</label>
                <Input label="Address" className="text-lg py-6 h-14 bg-white px-5" placeholder="Street name" full />
                <div className="flex items-start gap-4">
                  <Input label="Country" className="text-lg py-6 h-14 bg-white px-5" placeholder="Country" full />
                  <Input label="City" className="text-lg py-6 h-14 bg-white px-5" placeholder="City" full />
                </div>
                <Input label="Postcode" className="text-lg py-6 h-14 bg-white px-5" placeholder="Postcode" full />
                <label className="text-xl mt-2">Postal Address</label>
                <Input label="Address" className="text-lg py-6 h-14 bg-white px-5" placeholder="Street name" full />
                <div className="flex items-start gap-4">
                  <Input label="Country" className="text-lg py-6 h-14 bg-white px-5" placeholder="Country" full />
                  <Input label="City" className="text-lg py-6 h-14 bg-white px-5" placeholder="City" full />
                </div>
                <Input label="Postcode" className="text-lg py-6 h-14 bg-white px-5" placeholder="Postcode" full />
                <div className="flex items-center gap-4 mt-7">
                  <Button
                    className="w-full"
                    onClick={() => {
                      paginate(2);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          {page === 2 && (
            <motion.div key="user-details" className="max-w-[700px] grid gap-4" {...getFrame()}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">User Details</h1>
                <h2 className="text-lg">Please enter the details below</h2>
              </div>
              <div className="flex items-start gap-4">
                <Input
                  {...register('email')}
                  error={errors.email?.message}
                  label="Email"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Enter login email"
                  type="email"
                  full
                />
                <Input
                  {...register('password')}
                  error={errors.password?.message}
                  label="Password"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Enter password"
                  type="password"
                  full
                />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox id="create-user-checkbox" />
                <label
                  htmlFor="create-user-checkbox"
                  className="text-md font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Create User?
                </label>
              </div>
              <Input
                {...register('yodlee_username')}
                error={errors.yodlee_username?.message}
                label="Yodlee Username"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="Enter Yodlee username"
                full
              />
              <div className="flex items-center gap-4 mt-7">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    paginate(page - 1, -1);
                  }}
                >
                  Back
                </Button>
                <Button className="w-full" type="submit">
                  Save
                </Button>
              </div>
            </motion.div>
          )}
          {page === 3 && (
            <motion.div key="saving-client" {...getFrame()}>
              <div className="w-full min-h-[300px] py-12 flex items-center justify-center flex-col gap-3">
                <div className="text-center">
                  <h1 className="font-semibold text-3xl">Creating Client Profile...</h1>
                  <h2 className="text-md max-w-[500px]">
                    We're creating the client's profile and login in the background. Please don't close the window.
                  </h2>
                </div>
                <Skeleton className="h-[40px] w-[500px] mt-6" />
                <Skeleton className="h-[30px] w-[300px]" />
              </div>
            </motion.div>
          )}
        </div>
      </form>
    </AnimatePresence>
  );
}
