'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Star, X, ZoomIn, Check, MapPin, ArrowRight, ShieldCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllReviews, reviewStatsDisplay, customerStatsDisplay, getRelativeTime, getLocationFromPostcode, type Review } from '@/lib/constants';

// Type for flattened image gallery
type GalleryImage = {
  src: string;
  review: Review;
  imageIndex: number;
};

// CTA Card that appears in the reviews grid
function ReviewsCTACard() {
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form') || document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="break-inside-avoid mb-6 bg-gradient-to-br from-[#1B9CB6] to-[#157a91] rounded-2xl p-6 shadow-lg border border-[#1B9CB6]/20">
      <div className="text-center">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-7 h-7 text-white fill-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Join {customerStatsDisplay.totalCustomersPlus} Happy Customers
        </h3>
        <p className="text-white/80 text-sm leading-relaxed mb-5">
          See why Essex homeowners trust us with their properties. Get your free, no-obligation quote today.
        </p>

        <button
          onClick={scrollToQuoteForm}
          className="w-full bg-white text-[#1B9CB6] font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-4"
        >
          Get My Free Quote
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-4 text-white/70 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Quick response</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fully insured</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const REVIEW_TRUNCATE_LENGTH = 250;

function ReviewText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > REVIEW_TRUNCATE_LENGTH;

  if (!shouldTruncate) {
    return <p className="text-slate-600 text-sm leading-relaxed">{text}</p>;
  }

  const displayText = isExpanded ? text : text.slice(0, REVIEW_TRUNCATE_LENGTH).trim() + '...';

  return (
    <div>
      <p className="text-slate-600 text-sm leading-relaxed">{displayText}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
}

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

const FACEBOOK_F_LOGO = (
  <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="#1877F2"
    />
  </svg>
);

function ReviewSourceBadge({ source = 'google' }: { source?: 'google' | 'facebook' }) {
  return (
    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-[1px] shadow-sm border border-slate-100 z-10">
      {source === 'facebook' ? FACEBOOK_F_LOGO : GOOGLE_G_LOGO}
    </div>
  );
}

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
const DEFAULT_INITIAL_LIMIT = 8;
const DEFAULT_BATCH_SIZE = 8;

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
  const pathname = usePathname();

  // Initial reviews for SSR (service-specific, SEO-friendly)
  const ssrReviews = (reviews ?? getAllReviews()).slice(0, initialLimit);

  // All reviews for "load more" (includes related/general)
  const allReviews = moreReviews ?? getAllReviews();

  // Combine: SSR reviews first, then additional from allReviews (deduped)
  const combinedReviews = useMemo(() => {
    const ssrIds = new Set(ssrReviews.map((r) => r.id));
    const additionalReviews = allReviews.filter((r) => !ssrIds.has(r.id));
    return [...ssrReviews, ...additionalReviews];
  }, [ssrReviews, allReviews]);

  // State for pagination - starts showing only SSR reviews
  const [visibleCount, setVisibleCount] = useState(ssrReviews.length);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  // Reset visible count when route or reviews change (page navigation)
  useEffect(() => {
    setVisibleCount(ssrReviews.length);
  }, [pathname, ssrReviews.length]);

  // Current visible reviews
  const displayReviews = combinedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < combinedReviews.length;

  // Build flattened gallery of all images from all reviews (for gallery modal)
  const galleryImages = useMemo<GalleryImage[]>(() => {
    const images: GalleryImage[] = [];
    combinedReviews.forEach((review) => {
      if (review.images && review.images.length > 0) {
        review.images.forEach((src, imageIndex) => {
          images.push({ src, review, imageIndex });
        });
      }
    });
    return images;
  }, [combinedReviews]);

  // Find gallery index by image src
  const handleImageClick = useCallback((imgSrc: string) => {
    const index = galleryImages.findIndex((g) => g.src === imgSrc);
    if (index !== -1) {
      setSelectedGalleryIndex(index);
    }
  }, [galleryImages]);

  // Load more handler - instant, no network request
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, combinedReviews.length));
  };

  useEffect(() => {
    if (selectedGalleryIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedGalleryIndex]);

  const bgClass = variant === 'slate' ? 'bg-slate-50' : 'bg-white';

  const defaultTitle = (
    <>
      Rated Excellent on <span className="text-brand-500">Google</span>
    </>
  );

  return (
    <>
      <section
        className={`py-16 lg:py-24 ${bgClass} font-sans relative ${className}`}
      >
        {/* Subtle background texture - organic scattered dots */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none will-change-transform"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header Section */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-slate-500 font-bold tracking-widest uppercase text-xs sm:text-sm block mb-3">
              {tagline}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {title || defaultTitle}
            </h2>

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
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Mobile Layout: Single column with all reviews */}
          <div className="md:hidden flex flex-col gap-6">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} onImageClick={handleImageClick} />
            ))}
            <ReviewsCTACard />
          </div>

          {/* Desktop Layout: Masonry grid with columns */}
          <div className="hidden md:flex md:flex-row gap-6">
            {(() => {
              // Estimate card height based on content to balance columns
              const estimateHeight = (review: Review): number => {
                let h = 120; // base: header + stars + padding
                h += Math.ceil(review.text.length / 40) * 20; // ~20px per line of text
                if (review.images && review.images.length > 0) { h += 180; } // image grid
                if (review.reviewer.isLocalGuide) { h += 28; } // badge
                if (review.location) { h += 28; } // location pill
                return h;
              };

              const columns: (typeof displayReviews)[] = [[], [], []];
              const columnHeights = [0, 0, 0];

              // Balanced distribution across columns
              displayReviews.forEach((review) => {
                const shortestIdx = columnHeights.indexOf(Math.min(...columnHeights));
                columns[shortestIdx].push(review);
                columnHeights[shortestIdx] += estimateHeight(review);
              });

              // CTA goes in shortest column
              const shortestColIndex = columnHeights.indexOf(Math.min(...columnHeights));

              return columns.map((columnReviews, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex-1 flex flex-col gap-6 ${
                    colIndex === 2 ? 'hidden lg:flex' : ''
                  }`}
                >
                  {columnReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} onImageClick={handleImageClick} />
                  ))}
                  {/* CTA card at end of shortest column */}
                  {colIndex === shortestColIndex && <ReviewsCTACard />}
                </div>
              ));
            })()}
          </div>

          {/* Load More Button */}
          {showLoadMore && hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Load More Reviews
                <span className="text-slate-300 text-sm font-normal">
                  ({combinedReviews.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Amazon-inspired Image Gallery Modal */}
      {selectedGalleryIndex !== null && (
        <ImageGalleryModal
          images={galleryImages}
          currentIndex={selectedGalleryIndex}
          onClose={() => setSelectedGalleryIndex(null)}
          onNavigate={setSelectedGalleryIndex}
        />
      )}
    </>
  );
}

// Extracted ReviewCard component for cleaner code
function ReviewCard({ review, onImageClick }: { review: Review; onImageClick: (src: string) => void }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300">
      {/* Review Header: Avatar & Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          {/* Avatar - Profile image or fallback to initial */}
          {review.profileImage ? (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={review.profileImage}
                alt={review.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base text-white ${review.bg}`}
            >
              {review.initial}
            </div>
          )}
          {/* Source Badge (Google/Facebook) */}
          <ReviewSourceBadge source={review.source} />
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
            <p className="text-xs text-slate-500 font-medium">
              {getRelativeTime(review.timestamp)}
            </p>
            {review.reviewer.reviewCount > 1 && (
              <span className="text-xs text-slate-500">
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
        <ReviewText text={review.text} />

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {review.images.map((imgSrc, imgIndex) => (
              <div
                key={imgIndex}
                className="relative rounded-lg overflow-hidden border border-slate-100 aspect-[4/3] group cursor-zoom-in"
                onClick={() => onImageClick(imgSrc)}
              >
                <Image
                  src={imgSrc}
                  alt={`Review photo ${imgIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 45vw, 264px"
                  quality={65}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
  );
}

// Amazon-inspired Image Gallery Modal
function ImageGalleryModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const currentImage = images[currentIndex];
  const review = currentImage.review;

  // Get unique reviews with images and their first image index
  const reviewsWithImages = useMemo(() => {
    const seen = new Set<number>();
    return images.reduce<{ reviewId: number; firstImageIndex: number }[]>((acc, img, idx) => {
      if (!seen.has(img.review.id)) {
        seen.add(img.review.id);
        acc.push({ reviewId: img.review.id, firstImageIndex: idx });
      }
      return acc;
    }, []);
  }, [images]);

  // Find current review's position in the list
  const currentReviewPosition = reviewsWithImages.findIndex(r => r.reviewId === review.id);

  // Navigate to previous/next review (not individual image)
  const goToPrevReview = useCallback(() => {
    const prevPos = currentReviewPosition > 0 ? currentReviewPosition - 1 : reviewsWithImages.length - 1;
    onNavigate(reviewsWithImages[prevPos].firstImageIndex);
  }, [currentReviewPosition, reviewsWithImages, onNavigate]);

  const goToNextReview = useCallback(() => {
    const nextPos = currentReviewPosition < reviewsWithImages.length - 1 ? currentReviewPosition + 1 : 0;
    onNavigate(reviewsWithImages[nextPos].firstImageIndex);
  }, [currentReviewPosition, reviewsWithImages, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevReview();
      } else if (e.key === 'ArrowRight') {
        goToNextReview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevReview, goToNextReview]);

  const imageCount = review.images?.length || 0;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm p-4 md:p-6 lg:p-8 touch-none"
      onClick={onClose}
    >
      {/* Fixed full-page modal with consistent margin */}
      <div
        className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full h-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 will-change-transform"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-slate-500 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevReview}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 hover:bg-white shadow-lg rounded-full transition-all text-slate-600 hover:text-slate-900"
          title="Previous review"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNextReview}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 hover:bg-white shadow-lg rounded-full transition-all text-slate-600 hover:text-slate-900"
          title="Next review"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left: Images area with collage layout */}
          <div className="flex-1 bg-slate-100 p-4 lg:p-6 flex items-center justify-center overflow-hidden">
            {/* Collage layouts based on image count */}
            {imageCount === 1 && (
              <div className="w-full h-full flex items-center justify-center relative">
                <Image
                  src={review.images![0]}
                  alt={`${review.name}'s photo`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  quality={65}
                  className="object-contain rounded-xl"
                />
              </div>
            )}

            {imageCount === 2 && (
              <div className="w-full h-full flex gap-3 items-center justify-center">
                {review.images!.map((imgSrc, idx) => (
                  <div key={idx} className="relative w-[48%] h-full">
                    <Image
                      src={imgSrc}
                      alt={`${review.name}'s photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 400px"
                      quality={65}
                      className="object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}

            {imageCount === 3 && (
              <div className="w-full h-full flex gap-3">
                {/* Large image on left */}
                <div className="flex-1 relative">
                  <Image
                    src={review.images![0]}
                    alt={`${review.name}'s photo 1`}
                    fill
                    sizes="(max-width: 1024px) 60vw, 500px"
                    quality={65}
                    className="object-contain rounded-xl"
                  />
                </div>
                {/* Two stacked images on right */}
                <div className="flex flex-col gap-3 justify-center w-[40%]">
                  {review.images!.slice(1).map((imgSrc, idx) => (
                    <div key={idx} className="relative h-[48%]">
                      <Image
                        src={imgSrc}
                        alt={`${review.name}'s photo ${idx + 2}`}
                        fill
                        sizes="(max-width: 1024px) 40vw, 300px"
                        quality={65}
                        className="object-contain rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {imageCount >= 4 && (
              <div className="w-full h-full grid grid-cols-2 gap-3">
                {review.images!.map((imgSrc, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={imgSrc}
                      alt={`${review.name}'s photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 400px"
                      quality={65}
                      className="object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Review panel */}
          <div className="lg:w-80 xl:w-96 p-5 lg:p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col">
            {/* Reviewer header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="relative flex-shrink-0">
                {review.profileImage ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={review.profileImage}
                      alt={review.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${review.bg}`}
                  >
                    {review.initial}
                  </div>
                )}
                <ReviewSourceBadge source={review.source} />
              </div>

              <div className="pt-0.5 min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm">{review.name}</h3>
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  {getRelativeTime(review.timestamp)}
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-current" />
              ))}
            </div>

            {/* Review text */}
            <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>

            {/* CTA + counter - pushed to bottom */}
            <div className="mt-auto pt-4 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const formElement = document.getElementById('quote-form') || document.getElementById('contact');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 100);
                }}
                className="w-full bg-cta hover:bg-cta-hover text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Get My Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-xs text-slate-500">
                Review {currentReviewPosition + 1} of {reviewsWithImages.length}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Thumbnail strip */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 overflow-x-auto">
          <div className="flex gap-2 justify-start lg:justify-center min-w-max px-2">
            {images.map((img, idx) => {
              // Highlight all images from current review
              const isCurrentReview = img.review.id === review.id;
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(idx)}
                  className={`relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    isCurrentReview
                      ? 'border-brand-500 ring-2 ring-brand-500/30'
                      : 'border-transparent opacity-50 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <Image src={img.src} alt="" fill sizes="64px" quality={65} className="object-cover" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
