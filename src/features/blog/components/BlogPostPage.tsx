import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BlogPost, BlogCategory, BlogPostSummary } from '@/lib/blog';
import { formatPostDate, formatReadingTime } from '@/lib/blog';
import { BlogPostContent } from './BlogPostContent';
import { BlogAuthorCard } from './BlogAuthorCard';
import { BlogCategoryList } from './BlogCategoryList';
import { BlogTagList } from './BlogTagList';
import { BlogShareButtons } from './BlogShareButtons';
import { BlogRelatedPosts } from './BlogRelatedPosts';
import { BlogSidebarCTA } from './BlogSidebarCTA';
import { ContactSection } from '@/features/home/client';

type BlogPostPageProps = {
  post: BlogPost;
  category: BlogCategory;
  relatedPosts: BlogPostSummary[];
};

export function BlogPostPage({ post, category, relatedPosts }: BlogPostPageProps) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: category.name, href: `/blog/category/${category.slug}` },
    { label: post.title },
  ];

  return (
    <>
      {/* Article Header */}
      {post.featuredImageUrl ? (
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-1 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-white/50" />
                      )}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white/50 truncate max-w-[200px]">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-4">
                  <BlogCategoryList categories={post.categories} variant="light" />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-4 text-xl text-white/80">{post.excerpt}</p>
              )}

              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" light />
                )}
                <span className="text-white/40">|</span>
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-white/40">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-6">
                <BlogShareButtons title={post.title} slug={post.slug} light />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-b from-primary-50/50 to-white pt-6 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-1 text-sm">
                  {breadcrumbs.map((item, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
                      )}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-neutral-900 font-medium truncate max-w-[200px]">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-3">
                  <BlogCategoryList categories={post.categories} />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-3 text-xl text-neutral-600">{post.excerpt}</p>
              )}

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                {post.author && (
                  <BlogAuthorCard author={post.author} variant="inline" />
                )}
                <span className="text-neutral-300">|</span>
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                )}
                {post.readingTimeMinutes && (
                  <>
                    <span className="text-neutral-300">|</span>
                    <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="mt-4">
                <BlogShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">
            <article className="max-w-prose">
              <BlogPostContent content={post.content} />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <BlogTagList tags={post.tags} />
                </div>
              )}

              {post.author && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4">
                    About the Author
                  </h2>
                  <BlogAuthorCard author={post.author} variant="full" showSocial />
                </div>
              )}
            </article>

            <aside className="hidden lg:block">
              <BlogSidebarCTA categories={post.categories} />
            </aside>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16 max-w-prose lg:max-w-none">
              <BlogRelatedPosts posts={relatedPosts} />
            </div>
          )}
        </div>
      </section>

      {/* Full-width CTA */}
      <ContactSection />
    </>
  );
}
