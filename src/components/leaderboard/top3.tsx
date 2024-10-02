'use client';

import { Card, CardContent, CardDescription } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function Top3() {
  const profiles = [
    { name: 'Isabelle Crowe', position: '2nd', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Zoey Wheaton', position: '1st', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Zac Thomson', position: '3rd', image: '/placeholder.svg?height=200&width=200' },
  ];

  return (
    <div className="flex w-full h-3/4 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center justify-center min-h-[30vh] w-full ">
        {profiles.map((profile, index) => (
          <div
            key={profile.name}
            className={`flex justify-center ${index === 1 ? 'sm:-mt-6 order-first sm:order-none' : ''}`}
          >
            <Card className="w-full max-w-[20rem] sm:max-w-[20rem] relative border-gray-200 shadow-md shadow-gray-300">
              <CardContent className="flex flex-col items-center p-4 sm:p-6">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-base font-bold px-2 py-1 rounded-bl-lg">
                  {profile.position}
                </div>
                <Avatar className="w-20 h-20 my-6">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Isabelle Crowe" />
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <h3 className="text-base sm:text-lg font-semibold text-center">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">Lorem ipsum</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
