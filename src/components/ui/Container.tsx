import { type ReactNode } from 'react';
import { spacing } from '@/lib/constants';
import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
};

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={cn(spacing.container, className)}>
      {children}
    </Component>
  );
}
