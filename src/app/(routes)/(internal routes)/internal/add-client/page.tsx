'use client';

import { createUserAndClientProfile } from '@/app/(actions)/laravel/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useSliderTransition from '@/lib/hooks/use-slider-transition';
import { INTERNAL_ROUTES } from '@/lib/routes';
import { UserSchema } from '@/lib/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const fields = {
  address: ['address_1', 'address_2', 'city', 'country', 'state', 'postcode'],
  personalDetails: [
    'first_name',
    'last_name',
    'middle_name',
    'preferred_name',
    'home_phone',
    'work_phone',
    'mobile_phone',
  ],
  userDetails: ['email', 'password', 'yodlee_username'],
};

export default function AddClientPage() {
  const { direction, getFrame, page, paginate, paginateToFieldErrored } = useSliderTransition({
    fieldsPerPage: [fields.personalDetails, fields.address, fields.userDetails],
  });
  const [createdClient, setCreatedClient] = useState<any>();
  const {
    formState: { errors },
    getValues,
    setError,
    reset,
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const handleSave = async (data: z.infer<typeof UserSchema>) => {
    paginate(4, 1);
    const res = await createUserAndClientProfile(data);
    if (res.id) {
      setCreatedClient(res);
      reset();
      paginate(5, 1);
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
      <form
        onSubmit={handleSubmit(
          (values) => handleSave(values as z.infer<typeof UserSchema>),
          (e) => {
            paginateToFieldErrored(Object.keys(e));
          }
        )}
      >
        <h1 className="font-bold text-2xl my-4 mb-7">Add New Client</h1>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
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
                  className="text-lg py-6 h-14 bg-white px-5 capitalize"
                  placeholder="Client's first name"
                  full
                />
                <Input
                  {...register('middle_name')}
                  error={errors.middle_name?.message}
                  label="Middle Name"
                  className="text-lg py-6 h-14 bg-white px-5 capitalize"
                  placeholder="Client's middle name"
                  full
                />
              </div>

              <Input
                {...register('last_name')}
                error={errors.last_name?.message}
                label="Last Name"
                className="text-lg py-6 h-14 bg-white px-5 capitalize"
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
                {...register('mobile_phone')}
                error={errors.mobile_phone?.message}
                label="Mobile Phone"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="Mobile phone number"
                full
              />
              <div className="flex items-start gap-4">
                <Input
                  {...register('home_phone')}
                  error={errors.home_phone?.message}
                  label="Home Phone"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Home phone number"
                  full
                />
                <Input
                  {...register('work_phone')}
                  error={errors.work_phone?.message}
                  label="Work Phone"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Work phone number"
                  full
                />
              </div>

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
          {page === 2 && (
            <motion.div key="client-address" className="max-w-[700px] grid gap-4" {...getFrame()}>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Address</h1>
                <h2 className="text-lg">Please enter the address info</h2>
              </div>
              <label className="text-xl mt-2">Physical Address</label>
              <Input
                {...register('address_1')}
                error={errors.address_1?.message}
                label="Address 1"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="Address"
                full
              />
              <Input
                {...register('address_2')}
                error={errors.address_2?.message}
                label="Address 2"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="Address"
                full
              />
              <div className="flex items-start gap-4">
                <Input
                  {...register('postcode')}
                  error={errors.postcode?.message}
                  label="Postcode"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Postcode"
                  full
                />

                <Input
                  {...register('city')}
                  error={errors.city?.message}
                  label="City"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="City"
                  full
                />
              </div>

              <Input
                {...register('country')}
                error={errors.country?.message}
                label="Country"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="Country"
                full
              />

              <Input
                {...register('state')}
                error={errors.state?.message}
                label="State"
                className="text-lg py-6 h-14 bg-white px-5"
                placeholder="State"
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
                <Button
                  className="w-full"
                  onClick={() => {
                    paginate(3, 1);
                  }}
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
          {page === 3 && (
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
                  autoComplete="new-password"
                  className="text-lg py-6 h-14 bg-white px-5"
                  placeholder="Enter login email"
                  type="email"
                  full
                />
                <Input
                  {...register('password')}
                  error={errors.password?.message}
                  autoComplete="new-password"
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
                  Send email notification?
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
          {page === 4 && (
            <motion.div key="saving-client" {...getFrame()}>
              <div className="w-full min-h-[300px] py-12 flex items-center justify-center flex-col gap-9">
                <div className="text-center space-y-3">
                  <h1 className="font-semibold text-3xl">Creating Client Profile...</h1>
                  <h2 className="text-md max-w-[500px]">
                    {"We're creating the client's profile and login in the background. Please don't close the window."}
                  </h2>
                </div>
                <Skeleton className="h-[40px] w-[500px] mt-6 mb-[-15px]" />
                <Skeleton className="h-[30px] w-[300px]" />
              </div>
            </motion.div>
          )}
          {page === 5 && createdClient && (
            <motion.div key="client-created" {...getFrame()}>
              <div className="w-full min-h-[300px] py-12 flex items-center justify-center flex-col gap-9">
                <div className="text-center space-y-3 mb-4">
                  <h1 className="font-semibold text-3xl">New Client Profile Created</h1>
                  <h2 className="text-md max-w-[500px]">
                    User login for the client was also created and instructions how to setup their account was emailed
                    to them.
                  </h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-[60px] w-[60px] uppercase">
                    <AvatarFallback>
                      {createdClient.first_name[0]}
                      {createdClient.last_name[0]}{' '}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-medium capitalize">
                      {createdClient.first_name} {createdClient.last_name}
                    </h2>
                    <h3 className="text-xl">{createdClient.email}</h3>
                  </div>
                </div>
                <div className="w-[500px] mt-6 flex space-x-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => {
                      setCreatedClient(null);
                      paginate(1, -1);
                    }}
                  >
                    Add More Client
                  </Button>
                  <Button className="w-full" type="button" asChild>
                    <Link href={INTERNAL_ROUTES['My Clients'].path + '/' + createdClient.user_id}>View Client</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </form>
    </AnimatePresence>
  );
}
