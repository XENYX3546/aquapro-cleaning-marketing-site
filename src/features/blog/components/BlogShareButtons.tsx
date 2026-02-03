'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

type BlogShareButtonsProps = {
  title: string;
  slug: string;
  variant?: 'horizontal' | 'vertical';
  light?: boolean;
};

export function BlogShareButtons({ title, slug, variant = 'horizontal', light = false }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
    },
  ];

  const handleCopyLink = async () => {
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

  const baseButtonStyles = light
    ? 'border-white/30 text-white/70 hover:bg-white/20 hover:text-white hover:border-white/50'
    : 'border-neutral-200 text-neutral-500';

  return (
    <div
      className={`flex items-center gap-2 ${
        variant === 'vertical' ? 'flex-col' : 'flex-row'
      }`}
    >
      <span className={`text-sm mr-1 ${light ? 'text-white/70' : 'text-neutral-500'}`}>Share:</span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${baseButtonStyles} ${!light ? link.color : ''}`}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="w-4 h-4" />
        </a>
      ))}

      <button
        onClick={handleCopyLink}
        className={
          copied
            ? 'w-9 h-9 flex items-center justify-center rounded-lg border transition-all bg-green-500 border-green-500 text-white'
            : light
              ? 'w-9 h-9 flex items-center justify-center rounded-lg border transition-all border-white/30 text-white/70 hover:bg-white/20 hover:text-white hover:border-white/50'
              : 'w-9 h-9 flex items-center justify-center rounded-lg border transition-all border-neutral-200 text-neutral-500 hover:bg-[#262626] hover:text-white hover:border-[#262626]'
        }
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
