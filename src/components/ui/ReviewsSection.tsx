'use client';

import { useState, useEffect } from 'react';
import { Star, X, ZoomIn, Check, MapPin } from 'lucide-react';
import { getAllReviews, reviewStatsDisplay, getRelativeTime, getLocationFromPostcode, type Review } from '@/lib/constants';

const GOOGLE_G_LOGO = (
  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export type ReviewsSectionProps = {
  /**
   * Initial reviews for SSR (service-specific for SEO).
   * These are rendered server-side and indexed by Google.
   */
  reviews?: Review[];
  /**
   * Additional reviews for "Load More" (related + general).
   * Loaded client-side only, not indexed by Google.
   * If not provided, falls back to getAllReviews().
   */
  moreReviews?: Review[];
  /** Background variant */
  variant?: 'white' | 'slate';
  /** Custom tagline above the title */
  tagline?: string;
  /** Custom title - supports React nodes for styling */
  title?: React.ReactNode;
  /** Custom subtitle */
  subtitle?: string;
  /** Additional className for the section */
  className?: string;
  /** Initial number of reviews to show (default 9) */
  initialLimit?: number;
  /** Number of reviews to load per batch (default 9) */
  batchSize?: number;
  /** Whether to show load more button (default true) */
  showLoadMore?: boolean;
  /** Current location slug for highlighting local reviews */
  locationSlug?: string;
};

// Default configuration
const DEFAULT_INITIAL_LIMIT = 9;
const DEFAULT_BATCH_SIZE = 9;

export function ReviewsSection({
  reviews,
  moreReviews,
  variant = 'white',
  tagline = 'Our Reviews',
  title,
  subtitle = `Based on ${reviewStatsDisplay.totalReviews} verified reviews from homeowners in Essex.`,
  className = '',
  initialLimit = DEFAULT_INITIAL_LIMIT,
  batchSize = DEFAULT_BATCH_SIZE,
  showLoadMore = true,
  locationSlug: _locationSlug,
}: ReviewsSectionProps) {
  // Initial reviews for SSR (service-specific, SEO-friendly)
  const ssrReviews = reviews ?? getAllReviews().slice(0, initialLimit);

  // All reviews for "load more" (includes related/general)
  const allReviews = moreReviews ?? getAllReviews();

  // Combine: SSR reviews first, then additional from allReviews (deduped)
  const ssrIds = new Set(ssrReviews.map((r) => r.id));
  const additionalReviews = allReviews.filter((r) => !ssrIds.has(r.id));
  const combinedReviews = [...ssrReviews, ...additionalReviews];

  // State for pagination - starts showing only SSR reviews
  const [visibleCount, setVisibleCount] = useState(ssrReviews.length);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset visible count when reviews change (page navigation)
  const reviewsKey = ssrReviews[0]?.id ?? 0;
  useEffect(() => {
    setVisibleCount(ssrReviews.length);
  }, [reviewsKey, ssrReviews.length]);

  // Current visible reviews
  const displayReviews = combinedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < combinedReviews.length;

  // Load more handler - instant, no network request
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, combinedReviews.length));
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const bgClass = variant === 'slate' ? 'bg-slate-50' : 'bg-white';

  const defaultTitle = (
    <>
      Rated Excellent on <span className="text-brand-500">Google</span>
    </>
  );

  return (
    <>
      <section
        className={`pt-12 pb-12 md:pt-20 md:pb-20 ${bgClass} font-sans relative ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
              {tagline}
            </span>
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {title || defaultTitle}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5">{GOOGLE_G_LOGO}</div>
                <span className="font-bold text-slate-900 text-lg">{reviewStatsDisplay.averageRating}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#FBBC05] fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-base max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Masonry Grid Container */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="break-inside-avoid mb-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Review Header: Avatar & Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white ${review.bg}`}
                    >
                      {review.initial}
                    </div>
                    {/* Google G Badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-[3px] shadow-sm border border-slate-100 z-10">
                      {GOOGLE_G_LOGO}
                    </div>
                  </div>

                  <div className="pt-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-[15px] truncate">
                        {review.name}
                      </h3>
                      {/* Verified Badge - Green with white tick */}
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-slate-400 font-medium">
                        {getRelativeTime(review.timestamp)}
                      </p>
                      {review.reviewer.reviewCount > 1 && (
                        <span className="text-xs text-slate-400">
                          · {review.reviewer.reviewCount} reviews
                        </span>
                      )}
                    </div>
                    {/* Local Guide Badge */}
                    {review.reviewer.isLocalGuide && (
                      <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-blue-50 rounded-full">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4285F4" />
                        </svg>
                        <span className="text-[10px] font-semibold text-blue-700">Local Guide</span>
                      </div>
                    )}
                    {/* Location Pill - shows when review has location data */}
                    {review.location && (() => {
                      const locationName = getLocationFromPostcode(review.location.postcodeArea);
                      if (!locationName) {return null;}
                      return (
                        <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-emerald-50 rounded-full">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span className="text-[10px] font-semibold text-emerald-700">{locationName}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#FBBC05] fill-current"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <div>
                  <p className="text-slate-600 text-[15px] leading-relaxed">
                    {review.text}
                  </p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {review.images.map((imgSrc, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden border border-slate-100 aspect-[4/3] group cursor-zoom-in"
                          onClick={() => setSelectedImage(imgSrc)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgSrc}
                            alt={`Review photo ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Load More Button */}
          {showLoadMore && hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Load More Reviews
                <span className="text-slate-400 text-sm font-normal">
                  ({allReviews.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 touch-none"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt="Enlarged review"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
