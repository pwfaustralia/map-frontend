'use client';

import { updateClient } from '@/app/(actions)/laravel/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useSliderTransition from '@/lib/hooks/use-slider-transition';
import { INTERNAL_ROUTES } from '@/lib/routes';
import { EditUserSchema } from '@/lib/schema/user';
import Client, { IUser } from '@/lib/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditClientPage(props: {
  user: IUser;
  isEditing: boolean;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onEdit?: (data: Client) => void;
}) {
  const { user, setIsEditing, setUser, onEdit = () => {} } = props;
  const { direction, getFrame, page, paginate, paginateToFieldErrored } = useSliderTransition({
    fieldsPerPage: [
      ['first_name', 'last_name', 'middle_name', 'preferred_name', 'home_phone', 'work_phone', 'mobile_phone'],
      ['email', 'password', 'yodlee_username'],
    ],
  });
  const [updatedClient, setUpdatedClient] = useState<any>();
  const {
    formState: { errors },
    setError,
    reset,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: user.clients[0],
    resolver: zodResolver(EditUserSchema),
  });

  const handleSave = async (data: Client) => {
    paginate(3, 1);
    const res = await updateClient(data);
    if (res.id) {
      setUpdatedClient(res);
      setUser({
        ...user,
        clients: [res],
      });
      reset();
      paginate(4, 1);
      onEdit(res);
    } else {
      Object.keys(res).forEach((key: any) => {
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
    <AnimatePresence initial={true} custom={direction}>
      <form onSubmit={handleSubmit((values) => handleSave(values))}>
        <div className="flex items-center space-x-3 my-4 mb-7">
          <Button variant="ghost-2" onClick={() => setIsEditing(false)}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="font-bold text-2xl">
            {user.clients?.[0]?.first_name} {user.clients?.[0]?.last_name}
          </h1>
        </div>
        <div className="rounded-3xl w-full bg-white py-10 px-12 overflow-hidden">
          {page === 1 && (
            <motion.div key="personal-details" className="max-w-[700px] mx-auto my-0 grid gap-4" {...getFrame()}>
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
          {page === 2 && (
            <motion.div key="user-details" className="max-w-[700px] mx-auto my-0 grid gap-4" {...getFrame()}>
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
          {page === 3 && (
            <motion.div key="saving-client" {...getFrame()}>
              <div className="w-full min-h-[300px] py-12 flex items-center justify-center flex-col gap-9">
                <div className="text-center space-y-3">
                  <h1 className="font-semibold text-3xl">Updating Client Profile...</h1>
                  <h2 className="text-md max-w-[500px]">
                    {"We're updating the client's profile in the background. Please don't close the window."}
                  </h2>
                </div>
                <Skeleton className="h-[40px] w-[500px] mt-6 mb-[-15px]" />
                <Skeleton className="h-[30px] w-[300px]" />
              </div>
            </motion.div>
          )}
          {page === 4 && updatedClient?.id && (
            <motion.div key="client-created" {...getFrame()}>
              <div className="w-full min-h-[300px] py-12 flex items-center justify-center flex-col gap-9">
                <div className="text-center space-y-3 mb-4">
                  <h1 className="font-semibold text-3xl">Client Profile Updated</h1>
                  <h2 className="text-md max-w-[500px]">The client profile was updated successfully.</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-[60px] w-[60px] uppercase">
                    <AvatarFallback>
                      {updatedClient.first_name[0]}
                      {updatedClient.last_name[0]}{' '}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-medium capitalize">
                      {updatedClient.first_name} {updatedClient.last_name}
                    </h2>
                    <h3 className="text-xl">{updatedClient.email}</h3>
                  </div>
                </div>
                <div className="w-[500px] mt-6 flex space-x-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => {
                      setUpdatedClient(null);
                      paginate(1, -1);
                    }}
                  >
                    Continue Editing
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    onClick={() => {
                      setUpdatedClient(null);
                      paginate(1, -1);
                      setIsEditing(false);
                    }}
                  >
                    View Client
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
