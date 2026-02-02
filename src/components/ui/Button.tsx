'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  // Primary - solid blue (main actions)
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
  // CTA - deeper blue with emphasis (call-to-action)
  cta: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg',
  // Secondary - white with border (clean, professional)
  secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm',
  // Ghost - minimal, text only
  ghost: 'text-neutral-900 hover:bg-neutral-100',
  // Outline - inset ring style, deeper blue
  outline: 'ring-2 ring-inset ring-primary-700 text-primary-700 hover:bg-primary-50 hover:ring-primary-800 hover:text-primary-800',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200',
      variants[variant],
      sizes[size],
      className
    );

    if ('href' in props && props.href) {
      const { href, children, ...linkProps } = props as ButtonAsLink & { children?: React.ReactNode };
      const isExternal = href.startsWith('http');

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={baseStyles}
            target="_blank"
            rel="noopener noreferrer"
            {...linkProps}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseStyles}
          {...linkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseStyles}
        {...(props as ButtonAsButton)}
      />
    );
  }
);

Button.displayName = 'Button';
