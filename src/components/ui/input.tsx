import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  iconLeft?: any;
  iconRight?: any;
}

const inputVariant = cva(
  'flex h-10 w-full rounded-[9px] border border-input bg-input-bg focus-visible:bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { variant?: 'ghost' | 'default'; full?: any; label?: string }
>(({ className, error, iconLeft, full, iconRight, type, label, variant = 'default', ...props }, ref) => {
  return (
    <div className={clsx('grid gap-2', { 'w-full': full })}>
      {label && (
        <label htmlFor={props.id || props.name} className="text-md font-semibold">
          {label}
        </label>
      )}
      <div className="flex items-center relative ">
        {iconLeft && <div className="absolute left-5 top-1/2 transform -translate-y-1/2">{iconLeft}</div>}
        <input
          type={type}
          className={cn(inputVariant({ variant }), className, {
            'pl-[65px]': iconLeft,
            'pr-[65px]': iconRight,
          })}
          ref={ref}
          {...props}
        />
        {iconRight && <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{iconRight}</div>}
      </div>
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
