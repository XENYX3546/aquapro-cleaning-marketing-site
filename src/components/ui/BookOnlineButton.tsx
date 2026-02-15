'use client';

import { useEffect, useCallback } from 'react';

const WIDGET_ID = '816db1dd-87d7-473f-a7d2-795e2c17245c';
const SCRIPT_SRC = `https://app.zuviaone.com/api/public/widgets/${WIDGET_ID}/embed.js`;

interface BookOnlineButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function BookOnlineButton({ className, children }: BookOnlineButtonProps) {
  useEffect(() => {
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const openBooking = useCallback(() => {
    const w = window as unknown as { ZuviaWidget?: { open(id: string): void } };
    w.ZuviaWidget?.open(WIDGET_ID);
  }, []);

  return (
    <button type="button" onClick={openBooking} className={className}>
      {children}
    </button>
  );
}

export default BookOnlineButton;
