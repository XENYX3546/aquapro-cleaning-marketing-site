import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  hover?: boolean;
  className?: string;
};

export function Card({ children, hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 p-6',
        hover && 'transition-shadow duration-200 hover:shadow-lg hover:border-neutral-300',
        className
      )}
    >
      {children}
    </div>
  );
}
