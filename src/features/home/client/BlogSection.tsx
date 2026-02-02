'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/constants';

export function BlogSection() {
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
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors leading-tight">
                  {post.title}
                </h4>

                <p className="text-slate-500 text-sm leading-relaxed flex-grow mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors group/link"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
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
