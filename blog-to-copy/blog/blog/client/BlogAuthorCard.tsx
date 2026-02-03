'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';
import { blogPaths } from '../shared';
import type { PublicAuthor, PublicAuthorWithCount, SocialLinks } from '@/lib/blog';

type BlogAuthorCardProps = {
  author: PublicAuthor | PublicAuthorWithCount;
  variant?: 'inline' | 'card' | 'full';
  showSocial?: boolean;
  linkToProfile?: boolean;
  light?: boolean;
};

function hasSocialLinks(author: PublicAuthor | PublicAuthorWithCount): author is PublicAuthorWithCount {
  return 'socialLinks' in author;
}

function hasPostCount(author: PublicAuthor | PublicAuthorWithCount): author is PublicAuthorWithCount {
  return 'postCount' in author;
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-400 hover:text-blue-600 transition-colors"
      aria-label={label}
    >
      <Icon name={icon as 'twitter' | 'linkedin' | 'github' | 'globe'} size={18} />
    </a>
  );
}

function getAvatarSize(variant: 'inline' | 'card' | 'full'): number {
  const sizes = { inline: 40, card: 48, full: 64 };
  return sizes[variant];
}

function AuthorSocialLinks({ socialLinks }: { socialLinks: SocialLinks }) {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.twitter && (
        <SocialLink href={socialLinks.twitter} icon="twitter" label="Twitter" />
      )}
      {socialLinks.linkedin && (
        <SocialLink href={socialLinks.linkedin} icon="linkedin" label="LinkedIn" />
      )}
      {socialLinks.github && (
        <SocialLink href={socialLinks.github} icon="github" label="GitHub" />
      )}
      {socialLinks.website && (
        <SocialLink href={socialLinks.website} icon="globe" label="Website" />
      )}
    </div>
  );
}

export function BlogAuthorCard({
  author,
  variant = 'inline',
  showSocial = false,
  linkToProfile = true,
  light = false,
}: BlogAuthorCardProps) {
  const content = (
    <>
      {/* Avatar */}
      {author.avatarUrl && (
        <Image
          src={author.avatarUrl}
          alt={author.displayName}
          width={getAvatarSize(variant)}
          height={getAvatarSize(variant)}
          className={`rounded-full flex-shrink-0 ${light ? 'ring-2 ring-white/30' : ''}`}
        />
      )}

      {/* Info */}
      <div className={variant === 'full' ? 'flex-1' : ''}>
        <span
          className={`font-medium ${light ? 'text-white' : 'text-neutral-900'} ${
            linkToProfile && !light ? 'group-hover:text-blue-600 transition-colors' : ''
          } ${linkToProfile && light ? 'group-hover:text-white/80 transition-colors' : ''} ${variant === 'full' ? 'text-lg' : ''}`}
        >
          {author.displayName}
        </span>

        {(author.jobTitle || author.company) && (
          <p className={`text-sm ${light ? 'text-white/60' : 'text-neutral-500'}`}>
            {author.jobTitle}
            {author.jobTitle && author.company && ' at '}
            {author.company}
          </p>
        )}

        {variant === 'full' && author.bio && (
          <p className={`mt-2 ${light ? 'text-white/70' : 'text-neutral-600'}`}>{author.bio}</p>
        )}

        {hasPostCount(author) && variant !== 'inline' && (
          <p className={`text-sm mt-1 ${light ? 'text-white/60' : 'text-neutral-500'}`}>
            {author.postCount} {author.postCount === 1 ? 'article' : 'articles'}
          </p>
        )}
      </div>

      {/* Social Links */}
      {showSocial && hasSocialLinks(author) && (
        <div className={variant === 'full' ? 'mt-4' : ''}>
          <AuthorSocialLinks socialLinks={author.socialLinks} />
        </div>
      )}
    </>
  );

  const className = `group flex items-center gap-3 ${
    variant === 'card' ? `p-4 rounded-xl ${light ? 'bg-white/10' : 'bg-neutral-50'}` : ''
  } ${variant === 'full' ? 'flex-col sm:flex-row sm:items-start gap-4' : ''}`;

  if (linkToProfile) {
    return (
      <Link href={blogPaths.author(author.slug)} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
