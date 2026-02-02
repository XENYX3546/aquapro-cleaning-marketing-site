'use client';

import { useRef, useEffect, useState, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimatedDivProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
};

export const AnimatedDiv = forwardRef<HTMLDivElement, AnimatedDivProps>(
  ({ className, children, stagger = true }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const element = ref.current;
      if (!element) {return;}

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        },
        { threshold: 0 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, [ref]);

    return (
      <div
        ref={ref}
        className={cn(
          stagger ? 'stagger-children' : 'animate-on-scroll',
          isVisible && 'is-visible',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

AnimatedDiv.displayName = 'AnimatedDiv';
