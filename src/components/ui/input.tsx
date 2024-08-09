import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  iconLeft?: any;
  iconRight?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, iconLeft, iconRight, type, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        <div className="flex items-center relative ">
          {iconLeft && <div className="absolute left-5 top-1/2 transform -translate-y-1/2">{iconLeft}</div>}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-[9px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
              {
                'pl-[65px]': iconLeft,
                'pr-[65px]': iconRight,
              }
            )}
            ref={ref}
            {...props}
          />
          {iconRight && <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{iconRight}</div>}
        </div>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
