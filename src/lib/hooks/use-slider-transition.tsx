import { HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';

export default function useSliderTransition(config: { fieldsPerPage?: Array<string[]> } = {}) {
  const { fieldsPerPage } = config;
  const [[page, direction], setActive] = useState<any>([1, 1]);
  const paginate = (index: number, newDirection: number = 1) => {
    setActive([index, newDirection]);
  };

  const paginateToFieldErrored = (errors: string[]) => {
    if (!fieldsPerPage) {
      paginate(1, -1);
      return;
    }
    fieldsPerPage.forEach((fields, index) => {
      let p = index + 1;
      if (fields.filter((q) => errors.includes(q)).length) {
        paginate(p, -1);
      }
    });
  };
  const getFrame = (config: HTMLMotionProps<'div'> = {}) => {
    const { transition = {}, ...additionalConfig } = config;
    const variants: any = {
      initial: (direction: number) => ({ position: 'absolute', x: direction > 0 ? 300 : -300, opacity: 0 }),
      enter: { position: 'relative', x: 0, opacity: 1 },
      exit: (direction: number) => ({ position: 'absolute', x: direction < 0 ? 300 : -300, opacity: 0 }),
    };
    const params: HTMLMotionProps<'div'> = {
      variants,
      custom: direction,
      animate: 'enter',
      initial: 'initial',
      exit: 'exit',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        ...transition,
      },
      ...additionalConfig,
    };
    return params;
  };

  return { getFrame, paginate, page, direction, paginateToFieldErrored };
}
