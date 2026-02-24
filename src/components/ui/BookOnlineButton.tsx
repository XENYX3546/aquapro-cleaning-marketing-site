'use client';

import Link from 'next/link';

interface BookOnlineButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function BookOnlineButton({ className, children }: BookOnlineButtonProps) {
  return (
    <Link href="/contact" className={className}>
      {children}
    </Link>
  );
}

export default BookOnlineButton;
