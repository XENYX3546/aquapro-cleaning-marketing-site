'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui';
import { siteConfig } from '@/lib/constants';

type ShareProfileButtonProps = {
  authorSlug: string;
  authorName: string;
};

export function ShareProfileButton({ authorSlug, authorName }: ShareProfileButtonProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}/blog/author/${authorSlug}`;

  const handleShare = async () => {
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${authorName} - Author`,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to copy
      }
    }

    // Fall back to clipboard copy
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-white shadow-sm'
      }`}
      aria-label={copied ? 'Profile link copied' : 'Share profile'}
    >
      <Icon name={copied ? 'check' : 'share'} size={14} />
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
}
