import { type ReactNode } from 'react';
import { spacing } from '@/lib/constants';
import { cn } from '@/lib/utils';

type SectionProps = {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  id?: string;
};

export function Section({ children, className, compact, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? spacing.sectionCompact : spacing.section,
        className
      )}
    >
      {children}
    </section>
  );
}
