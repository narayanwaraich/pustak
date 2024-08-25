import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { cn } from '@/utils/cn';

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={cn('', className)} {...props}>
      {children}
    </RouterLink>
  );
};
