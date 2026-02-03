import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { getFeaturedPosts, getPostPath, formatPostDate } from '@/lib/blog';
import { cn } from '@/lib/utils';

// Gradient backgrounds using theme colors for posts without images
const gradients = [
  'from-primary-400 via-primary-500 to-primary-600',
  'from-primary-500 via-primary-600 to-primary-700',
  'from-primary-300 via-primary-400 to-primary-500',
  'from-primary-400 via-primary-500 to-slate-600',
  'from-slate-400 via-primary-500 to-primary-600',
];

function getGradient(id: string): string {
  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export async function BlogSection() {
  // Fetch featured posts from the blog API
  let posts: Awaited<ReturnType<typeof getFeaturedPosts>>['data'] = [];
  try {
    const response = await getFeaturedPosts(3);
    posts = Array.isArray(response?.data) ? response.data : [];
  } catch {
    // If API fails, don't show the section
    return null;
  }

  // Don't render section if no posts
  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-slate-500 font-bold tracking-widest uppercase text-sm block mb-3">
            Our Blog
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
            Expert Tips & <span className="text-brand-500">Advice</span>
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay informed with the latest cleaning tips, maintenance advice, and
            industry insights from our team of experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => {
            const postPath = getPostPath(post);
            const category = post.categories?.[0];
            const gradient = getGradient(post.id);

            return (
              <article
                key={post.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Image */}
                <Link href={postPath} className="relative h-48 overflow-hidden block">
                  {post.featuredImageUrl ? (
                    <Image
                      src={post.featuredImageVariants?.medium ?? post.featuredImageUrl}
                      alt={post.featuredImageAlt || post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                  {category && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      {category.name}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Clock className="w-4 h-4" />
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {formatPostDate(post.publishedAt)}
                      </time>
                    )}
                    {post.readingTimeMinutes && (
                      <span className="ml-2">{post.readingTimeMinutes} min read</span>
                    )}
                  </div>

                  <Link href={postPath}>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>

                  {post.excerpt && (
                    <p className="text-slate-500 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={postPath}
                    className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors group/link mt-auto"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
