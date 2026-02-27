// Reviews data for Aquapro Cleaning
// This file contains ONLY verified Google reviews
// Last updated: 2026-02-02

// =============================================================================
// TYPES
// =============================================================================

export type ServiceId =
  | 'carpet-cleaning'
  | 'upholstery-cleaning'
  | 'stain-removal'
  | 'roof-cleaning'
  | 'pressure-washing'
  | 'driveway-cleaning'
  | 'patio-cleaning'
  | 'gutter-cleaning'
  | 'window-cleaning'
  | 'general';

export type ReviewerMeta = {
  reviewCount: number;
  photoCount: number;
  isLocalGuide: boolean;
};

export type OwnerReply = {
  text: string;
  timestamp: string; // ISO date (YYYY-MM-DD)
};

export type ReviewLocation = {
  /** Postcode area prefix (e.g., "CM1", "SS0", "RM16") */
  postcodeArea: string;
};

export type ReviewSource = 'google' | 'facebook';

export type Review = {
  id: number;
  name: string;
  initial: string;
  bg: string;
  rating: number;
  text: string;
  timestamp: string; // ISO date (YYYY-MM-DD)
  reviewer: ReviewerMeta;
  services: ServiceId[];
  images?: string[];
  ownerReply?: OwnerReply;
  /** Flag for manually curated high-quality, CRO-boosting reviews */
  priority?: boolean;
  /** Location data for SEO personalization - shows location pill on review */
  location?: ReviewLocation;
  /** Profile image path for reviewer (optional) */
  profileImage?: string;
  /** Review source platform (defaults to 'google') */
  source?: ReviewSource;
};

export type ServiceReviewsMap = {
  [serviceId: string]: Review[];
};

// =============================================================================
// DATE HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate relative time string from a timestamp
 * @param timestamp - ISO date string (YYYY-MM-DD)
 * @param referenceDate - Optional reference date (defaults to now)
 * @returns Relative time string (e.g., "3 days ago", "2 weeks ago")
 */
export function getRelativeTime(timestamp: string, referenceDate?: Date): string {
  const date = new Date(timestamp);
  const now = referenceDate || new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  if (diffDays < 14) {
    return '1 week ago';
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} weeks ago`;
  }
  if (diffDays < 60) {
    return '1 month ago';
  }
  const months = Math.floor(diffDays / 30);
  return `${months} months ago`;
}

/**
 * Check if a review is "new" (within last 2 weeks)
 * @param timestamp - ISO date string
 * @param referenceDate - Optional reference date (defaults to now)
 */
export function isNewReview(timestamp: string, referenceDate?: Date): boolean {
  const date = new Date(timestamp);
  const now = referenceDate || new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
}

// =============================================================================
// ALL VERIFIED GOOGLE REVIEWS
// IDs are chronological (oldest = 1, newest = highest ID)
// Array is ordered by most recent first for display
// Each review is explicitly tagged with relevant services
// =============================================================================
export const reviews: Review[] = [
  {
    id: 150,
    name: 'Molly Young',
    initial: 'M',
    bg: 'bg-pink-600',
    rating: 5,
    text: "Had Aquapro over to clean my filthy carpets, having 2 small children and 2 dogs cream carpet wasn't going to last long! But it came up lovely, friendly bunch and 100% recommend. Thank you!",
    timestamp: '2025-06-01',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    source: 'facebook',
    profileImage: '/review-profile-images/molly-young.webp',
  },
  {
    id: 149,
    name: 'Katherine Carroll',
    initial: 'K',
    bg: 'bg-indigo-600',
    rating: 5,
    text: '100% recommend. Looks like a new roof. Very pleased',
    timestamp: '2025-06-01',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning'],
    source: 'facebook',
    profileImage: '/review-profile-images/katherine-carroll.webp',
  },
  {
    id: 145,
    name: 'Ian',
    initial: 'I',
    bg: 'bg-blue-600',
    rating: 5,
    text: 'Arrived early, had phoned to confirm, did an excellent job, cleared up as necessary, all good!',
    timestamp: '2026-01-30',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    location: { postcodeArea: 'CM12' },
    ownerReply: {
      text: "Thanks Ian, really appreciate you taking the time to leave a review. Glad everything went smoothly and that you were happy with the service.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 144,
    name: 'Simon Sharp',
    initial: 'S',
    bg: 'bg-green-600',
    rating: 5,
    text: "We had a great experience with Aquapro. Our gutters, fascia, and conservatory roof were cleaned, and Dan did a fabulous job. Blake was also very knowledgeable, professional, and prompt. Would highly recommend Aquapro to anyone.",
    timestamp: '2026-01-29',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['gutter-cleaning', 'pressure-washing'],
    ownerReply: {
      text: "Thanks Simon, we really appreciate the recommendation. Glad you were happy with the gutter, fascia and conservatory roof clean. Dan & Blake will be pleased to hear your feedback.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 143,
    name: 'Björn Eidehall',
    initial: 'B',
    bg: 'bg-purple-600',
    rating: 5,
    text: 'Top notch performance by Andy.\nCarpets, sofa and rugs looks like new 😊',
    timestamp: '2026-01-19',
    reviewer: { reviewCount: 5, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    location: { postcodeArea: 'CM8' },
    profileImage: '/review-profile-images/jorn-eidehall.webp',
    ownerReply: {
      text: "Thanks Björn, really pleased you're happy with the results. Andy will be glad to hear everything is looking like new again 😊",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 142,
    name: 'Angelina Sarmiento',
    initial: 'A',
    bg: 'bg-pink-600',
    rating: 5,
    text: 'Very satisfied and very clean looks like new again',
    timestamp: '2026-01-19',
    reviewer: { reviewCount: 2, photoCount: 2, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    location: { postcodeArea: 'RM16' },
    ownerReply: {
      text: "Thank you Angelina, we're really glad you're happy with the clean and the final result.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 146,
    name: 'Matt Capener',
    initial: 'M',
    bg: 'bg-cyan-600',
    rating: 5,
    text: 'Used AquaPro carpet cleaning for first time. Heavily stained carpet but the results were excellent. Highly recommended',
    timestamp: '2026-01-13',
    reviewer: { reviewCount: 7, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    profileImage: '/review-profile-images/matt-carpener.webp',
  },
  {
    id: 141,
    name: 'Daniel Browne',
    initial: 'D',
    bg: 'bg-red-600',
    rating: 5,
    text: "Two bookings cancelled. One at 9:30am when they were due at 9:00am. The next rescheduled appointment cancelled at 8:27am when they were due at 9:00am. Somewhat apologetic but just not good enough when we twice cleared rooms of heavy and awkward furniture so that carpets could be cleaned. Unmoved when I said we would look elsewhere for the work to be done.",
    timestamp: '2025-12-29',
    reviewer: { reviewCount: 5, photoCount: 0, isLocalGuide: false },
    location: { postcodeArea: 'SS5' },
    services: ['carpet-cleaning'],
  },
  {
    id: 140,
    name: 'Irfan',
    initial: 'I',
    bg: 'bg-amber-600',
    rating: 5,
    text: 'Andy done the good job, 👏 👍\nCarpet was very dirty and stain everywhere,\nAfter wash looks like new,\nI am very happy,',
    timestamp: '2025-12-22',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    location: { postcodeArea: 'SS0' },
    ownerReply: {
      text: "Thank you Irfan, glad you're happy with the results. Andy will be pleased to hear the carpets came up so well.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 139,
    name: 'Stanimira Dukova',
    initial: 'S',
    bg: 'bg-teal-600',
    rating: 5,
    text: 'Fast and processional. Pleasure to work with Blake and his team. Thank you',
    timestamp: '2025-12-22',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing', 'general'],
    location: { postcodeArea: 'RM15' },
    ownerReply: {
      text: "Thanks Stanimira, really appreciate your kind words. It was a pleasure working with you.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 138,
    name: 'Donna Ketley',
    initial: 'D',
    bg: 'bg-slate-600',
    rating: 5,
    text: '',
    timestamp: '2025-12-15',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    location: { postcodeArea: 'CM3' },
    ownerReply: {
      text: "Thank you Donna for taking the time to leave a review. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 137,
    name: 'Danny Bayes-Clarke',
    initial: 'D',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Great service. Would definitely recommend',
    timestamp: '2025-12-15',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    location: { postcodeArea: 'SS0' },
    ownerReply: {
      text: "Thanks Danny, really appreciate the recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 136,
    name: 'peter edwards',
    initial: 'P',
    bg: 'bg-orange-600',
    rating: 5,
    text: 'Andy was very professional and pleasant. He did a great job.\nI am very pleased with the results',
    timestamp: '2025-12-15',
    reviewer: { reviewCount: 57, photoCount: 160, isLocalGuide: true },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    location: { postcodeArea: 'CO15' },
    profileImage: '/review-profile-images/peter-edwards.webp',
    ownerReply: {
      text: "Thank you Peter, really pleased you're happy with the results. Andy will appreciate the feedback.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 135,
    name: 'Charné Banger',
    initial: 'C',
    bg: 'bg-rose-600',
    rating: 5,
    text: "Andy came to clean our upstairs carpets, and I couldn't be more delighted with the results. Before arriving, he gave me a quick courtesy call to let me know he was on his way, and he carried out the job with a warm smile and a thoroughly professional manner.\n\nThe carpets had their fair share of dust and stubborn stains left by previous tenants, yet he restored them so well that you'd never know they'd been there. From the initial quote to the booking process and finally the cleaning itself, everything was seamless and exceptionally well handled.\n\nI can confidently and wholeheartedly recommend AquaPro Cleaning.",
    timestamp: '2025-12-08',
    reviewer: { reviewCount: 14, photoCount: 5, isLocalGuide: true },
    services: ['carpet-cleaning', 'stain-removal'],
    location: { postcodeArea: 'CM1' },
    priority: true,
    profileImage: '/review-profile-images/charne-banger.webp',
    ownerReply: {
      text: "Thanks Charné, we're delighted you're happy with the carpets. Andy always aims to keep things clear and comfortable throughout the job.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 134,
    name: 'Stefanie Topping',
    initial: 'S',
    bg: 'bg-cyan-600',
    rating: 5,
    text: "Andy came to clean my dining room carpet where a tin of navy paint had been split all over the floor and chairs. After trying to clean it ourselves we couldn't rid the stain totally so called in Aquapro, and thank goodness we did, the whole carpet looks like new! Andy was efficient, knowledgeable and a throughly nice man. We will be definitely be using him again!",
    timestamp: '2025-12-01',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    priority: true,
    ownerReply: {
      text: "Thank you Stefanie, we're so glad we could help with such a tricky stain. Really appreciate you trusting us with it.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 133,
    name: 'Jonathan Francis',
    initial: 'J',
    bg: 'bg-violet-600',
    rating: 5,
    text: 'Andy did a great job. All three rugs look brand new!',
    timestamp: '2025-12-01',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    location: { postcodeArea: 'CM16' },
    ownerReply: {
      text: "Thanks Jonathan, great to hear all three rugs are looking brand new again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 132,
    name: 'peter bosdet',
    initial: 'P',
    bg: 'bg-blue-700',
    rating: 5,
    text: 'Arrived on time and friendly and professional.\nCleaned our 3 piece suite and it looked like new.\nVery happy with the service and work completed.\nI would give my recommendation to anyone.',
    timestamp: '2025-11-24',
    reviewer: { reviewCount: 145, photoCount: 3, isLocalGuide: true },
    services: ['upholstery-cleaning', 'carpet-cleaning'],
    location: { postcodeArea: 'RM5' },
    images: [
      '/review-images/upholstery-cleaning/peter-bodset-upholstery-1.jpg',
      '/review-images/upholstery-cleaning/peter-bodset-upholstery-2.jpg',
      '/review-images/upholstery-cleaning/peter-bodset-upholstery-3.jpg',
    ],
    priority: true,
    profileImage: '/review-profile-images/peter-bodset-profile.webp',
    ownerReply: {
      text: "Thank you Peter, really pleased you're happy with the service and results. Your recommendation means a lot to us.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 131,
    name: 'Nigel Belbeck',
    initial: 'N',
    bg: 'bg-emerald-600',
    rating: 5,
    text: 'Very good would use again',
    timestamp: '2025-11-10',
    reviewer: { reviewCount: 57, photoCount: 18, isLocalGuide: true },
    services: ['carpet-cleaning'],
    location: { postcodeArea: 'RM16' },
    profileImage: '/review-profile-images/nigel-belbeck.webp',
    ownerReply: {
      text: "Thanks Nigel, much appreciated. We'd be happy to help again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 130,
    name: 'Linda & Jim Matthews',
    initial: 'L',
    bg: 'bg-sky-600',
    rating: 5,
    text: "We needed to get our front drive sorted out. The original seal was disintegrating and cracks needed to be repaired. Aqua-Pro was recommended to us and after contacting them, Blake arranged a home visit to inspect the damage and advise us on the best course of action. This was followed up by a written quote, which we accepted and gave our authority to proceed. Blake and company turned up as advised and pressure washed the area to remove all the old sealer. After a few days, he returned to repair the cracks and put down the first layer of new sealer. A few days later, the finishing layer of sealer was applied and the job finished.\nWe were very pleased with the quality of the products used, the workmanship and the final result achieved. We would highly recommend Aqua-Pro for their excellent performance and customer satisfaction.",
    timestamp: '2025-11-03',
    reviewer: { reviewCount: 3, photoCount: 3, isLocalGuide: false },
    services: ['pressure-washing'],
    location: { postcodeArea: 'SS15' },
    images: [
      '/review-images/pressure-washing/linda-jim-matthews-1.jpg',
      '/review-images/pressure-washing/linda-jim-matthews-2.jpg',
      '/review-images/pressure-washing/linda-jim-matthews-3.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thank you both for the detailed review. We're really pleased you're happy with the advice, work carried out and the final result.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 129,
    name: 'Regency Plumbing',
    initial: 'R',
    bg: 'bg-red-700',
    rating: 5,
    text: 'I WAS VERY SATISFIED WITH THE JOB ANDY DID FOR ME,\nI WOULD HIGHLY RECOMMEND THIS COMPANY',
    timestamp: '2025-11-03',
    reviewer: { reviewCount: 7, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    ownerReply: {
      text: "Thanks very much for the recommendation, we really appreciate it.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 128,
    name: 'Sandra Griffiths',
    initial: 'S',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: 'A good job well done. Nice guys and very conscientious. Thanks',
    timestamp: '2025-10-20',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you Sandra, glad you were happy with the work and the team.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 127,
    name: 'Andrew Elliott',
    initial: 'A',
    bg: 'bg-lime-600',
    rating: 5,
    text: 'Great job very friendly and helpful also very professional all at a very reasonable price. I will definitely using your services again in the future. Thank you\nAndy Elliott.',
    timestamp: '2025-10-20',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    location: { postcodeArea: 'SS8' },
    ownerReply: {
      text: "Thanks Andrew, really appreciate the kind words. Glad you found the service professional and good value.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 126,
    name: 'MAF AYODELE',
    initial: 'M',
    bg: 'bg-amber-700',
    rating: 5,
    text: 'Great service, delivered by a friendly and great guy, Carpet looked new after cleaning, Payment after service is another level of confident that you will be satisfy after their service.',
    timestamp: '2025-10-13',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    location: { postcodeArea: 'SS2' },
    profileImage: '/review-profile-images/maf-ayodele.webp',
    ownerReply: {
      text: "Thank you for the great feedback. We're glad you were happy with both the service and the results.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 125,
    name: 'Natalie Belson',
    initial: 'N',
    bg: 'bg-stone-600',
    rating: 5,
    text: '',
    timestamp: '2025-10-13',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    location: { postcodeArea: 'SS9' },
    ownerReply: {
      text: "Thank you Natalie for leaving a review. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 124,
    name: 'Anna Millington',
    initial: 'A',
    bg: 'bg-pink-700',
    rating: 5,
    text: 'Brilliant service. Very good results and reasonable priced',
    timestamp: '2025-10-06',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    location: { postcodeArea: 'CM15' },
    ownerReply: {
      text: "Thanks Anna, really pleased you were happy with the results and pricing.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 123,
    name: 'Max Smith',
    initial: 'M',
    bg: 'bg-indigo-700',
    rating: 5,
    text: 'Very pleased with the service. Carpets look great now. Easy to book, questions answered promptly via email, reminders sent, arrived on time for the job. Andy was very friendly and polite and he did a great job. Was a lot easier than I was expecting.',
    timestamp: '2025-10-06',
    reviewer: { reviewCount: 1, photoCount: 1, isLocalGuide: false },
    services: ['carpet-cleaning'],
    images: [
      '/review-images/carpet-cleaning/max-smith-carpet-1.jpg',
    ],
    ownerReply: {
      text: "Thank you Max, great to hear everything went smoothly from booking through to completion. Andy will be pleased with your feedback.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 122,
    name: 'William Haynes',
    initial: 'W',
    bg: 'bg-blue-800',
    rating: 5,
    text: 'Would strongly recommend.\nSwift with good work quality and kept the surrounding areas tidy. Looks like a new roof! Would 100% recommend.',
    timestamp: '2025-09-29',
    reviewer: { reviewCount: 6, photoCount: 12, isLocalGuide: false },
    services: ['roof-cleaning'],
    images: [
      '/review-images/roof-cleaning/william-haynes.jpg',
    ],
    ownerReply: {
      text: "Thanks William, really pleased you're happy with the roof clean. Your recommendation means a lot.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 121,
    name: 'Hotspur Hovis Thorpe',
    initial: 'H',
    bg: 'bg-gray-600',
    rating: 5,
    text: '',
    timestamp: '2025-09-29',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you for leaving a review. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 120,
    name: 'Andrea Crease',
    initial: 'A',
    bg: 'bg-teal-700',
    rating: 5,
    text: 'Excellent friendly service, really pleased with the results',
    timestamp: '2025-09-29',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    location: { postcodeArea: 'SS1' },
    ownerReply: {
      text: "Thanks Andrea, really glad you were happy with the results.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 119,
    name: 'andrew cohen',
    initial: 'A',
    bg: 'bg-slate-700',
    rating: 5,
    text: "Excellent service. Easy to book online and a reasonable price. Good communication and Andy was very polite friendly and efficient. Around 2 hours to complete the job - around 55 sq metres (3 rooms) and a stairs hallway and landing. £178.50. Carpets are old but they came up really well. Definitely worth it rather than trying rug doctor.",
    timestamp: '2025-09-22',
    reviewer: { reviewCount: 30, photoCount: 65, isLocalGuide: true },
    services: ['carpet-cleaning'],
    priority: true,
    profileImage: '/review-profile-images/andrew-cohen.webp',
    ownerReply: {
      text: "Appreciate the review, Andrew! We're delighted with the results and would be more than happy to help with any other cleaning services in the future",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 118,
    name: 'Dm',
    initial: 'D',
    bg: 'bg-orange-700',
    rating: 5,
    text: "We had been left with a nightmare of a job by a so called concrete specialist and we called Aquapro to help solve our problem. Both Blake and Dan went above and beyond to help get our patio looking like it should. Our main issue was the colour mismatch and the guys spent a solid 2 days fixing all the issues we had and we had many!. Highly recommend these guys we can't thank them enough",
    timestamp: '2025-09-15',
    reviewer: { reviewCount: 2, photoCount: 5, isLocalGuide: false },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/dm-1.png',
      '/review-images/pressure-washing/dm-2.png',
      '/review-images/pressure-washing/dm-3.jpg',
      '/review-images/pressure-washing/dm-4.jpg',
    ],
    priority: true,
    profileImage: '/review-profile-images/dm-profile.webp',
    ownerReply: {
      text: "Thanks so much for your review. We're really pleased with the results of this job and look forward to working with you again!",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 117,
    name: 'Neresa Donovan',
    initial: 'N',
    bg: 'bg-purple-700',
    rating: 5,
    text: "Awesome job!!!!! I had my roof & driveway cleaned September 2025. The staff is very pleasant, Blake was very informative explain step by step, l felt apart of the process seeing the job done via a bird's view, we got pictures of the before & after. I was very happy, pleased & would recommend them. Continue the excellence service.",
    timestamp: '2025-09-08',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning', 'pressure-washing'],
    location: { postcodeArea: 'RM3' },
    priority: true,
    ownerReply: {
      text: "Thank you so much for your wonderful review, Neresa! We're thrilled to hear you're happy with your roof and driveway cleaning. Blake and the team will be delighted with your kind words, we always aim to keep our customers informed and involved throughout the process. We're glad you enjoyed the before-and-after photos, and we truly appreciate your recommendation",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 116,
    name: 'James Bryan',
    initial: 'J',
    bg: 'bg-green-700',
    rating: 5,
    text: 'Aquapro did an amazing job cleaning my tiled roof. Not only was the roof visually transformed, they ensured any mess on the ground was removed swiftly. Highly recommend.',
    timestamp: '2025-09-08',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning'],
    location: { postcodeArea: 'SS7' },
    profileImage: '/review-profile-images/james-bryan.webp',
    ownerReply: {
      text: "Thank you for your review, James! We're so pleased to hear you're happy with the roof cleaning results. Our team always makes sure to leave everything spotless, so it's great that you noticed. We truly appreciate your recommendation and look forward to helping again in the future!",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 115,
    name: 'Gary Davies',
    initial: 'G',
    bg: 'bg-cyan-700',
    rating: 5,
    text: "Fantastic job by the guys from Aquapro! Not only a great end result but Blake and Dan were friendly and polite, respected our property - cleaning walls and surrounding ground throughout the process and on completion.\nHighly recommended 👌",
    timestamp: '2025-09-08',
    reviewer: { reviewCount: 3, photoCount: 1, isLocalGuide: false },
    services: ['pressure-washing', 'roof-cleaning'],
    images: [
      '/review-images/pressure-washing/gary-davies.jpg',
    ],
    ownerReply: {
      text: "Thank you for the amazing feedback, Gary! Blake and Dan will be so pleased to hear your kind words. We always aim to deliver not just great results but also a smooth, respectful service, so it's great to know you noticed",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 114,
    name: 'Paul Moore',
    initial: 'P',
    bg: 'bg-blue-600',
    rating: 5,
    text: 'Great guys. Amazing job on the drive and always answers the phone. Recommend 100%',
    timestamp: '2025-09-08',
    reviewer: { reviewCount: 6, photoCount: 2, isLocalGuide: false },
    location: { postcodeArea: 'RM12' },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/paul-moore.jpg',
    ],
    ownerReply: {
      text: "Thanks so much for your kind words, Paul! We're delighted you're happy with the driveway clean. Being available and easy to reach is really important to us, so we're glad you noticed!",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 113,
    name: 'Frank Butler',
    initial: 'F',
    bg: 'bg-emerald-600',
    rating: 5,
    text: 'Highly professional job. Very satisfied with the result.',
    timestamp: '2025-09-01',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    location: { postcodeArea: 'CO3' },
    services: ['general'],
    ownerReply: {
      text: "Thank you for your review, Frank! We're so glad you're happy with the results and really appreciate your feedback",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 112,
    name: 'Steve Cramer',
    initial: 'S',
    bg: 'bg-violet-600',
    rating: 5,
    text: '',
    timestamp: '2025-09-01',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you for your review Steve! We're glad you're happy with the results and really appreciate your feedback",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 111,
    name: 'nicola quinn',
    initial: 'N',
    bg: 'bg-rose-600',
    rating: 5,
    text: '',
    timestamp: '2025-08-18',
    reviewer: { reviewCount: 10, photoCount: 1, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you for the 5 stars, Nicola! We really appreciate your support",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 110,
    name: "Saifan's world",
    initial: 'S',
    bg: 'bg-amber-600',
    rating: 5,
    text: "I am so pleased with the work has been done by Blake and Dan on my roof .. it has really happy with the outcome !!\nAnd they also cleaned my guts and as well as the area where it was all messy with moulds thumps up !!!!",
    timestamp: '2025-08-18',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning', 'gutter-cleaning'],
    profileImage: '/review-profile-images/saifans-world.webp',
    ownerReply: {
      text: "Thanks so much for your feedback! We're thrilled you're happy with the roof and gutter clean. Blake and Dan always do their best to leave everything looking spotless",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 109,
    name: 'Mike Hennan',
    initial: 'M',
    bg: 'bg-sky-600',
    rating: 5,
    text: "Blake and Dan did a great job cleaning our roof and driveway. We're really happy with the outcome and would highly recommend Aquapro Cleaning to friends and family.",
    timestamp: '2025-08-18',
    reviewer: { reviewCount: 3, photoCount: 1, isLocalGuide: false },
    services: ['roof-cleaning', 'pressure-washing'],
    images: [
      '/review-images/roof-cleaning/mike-hennan.jpg',
    ],
    ownerReply: {
      text: "Really appreciate your feedback, Mike! Fantastic to know you're happy with the roof and driveway clean. Blake and Dan take care to leave everything looking fresh, and your recommendation to friends and family is the best compliment we could receive",
      timestamp: '2025-09-22',
    },
  },
  {
    id: 108,
    name: 'russell pullen',
    initial: 'R',
    bg: 'bg-orange-600',
    rating: 5,
    text: 'Had our drive re sealed and repaired amazing job by Blake and Dan thanks very much for your hard work it looks amazing highly recommended company',
    timestamp: '2025-08-11',
    reviewer: { reviewCount: 8, photoCount: 38, isLocalGuide: true },
    location: { postcodeArea: 'CM3' },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/russell-pullen.png',
      '/review-images/pressure-washing/russell-pullen-2.jpg',
    ],
    profileImage: '/review-profile-images/russell-pullen-profile.webp',
    ownerReply: {
      text: "Thank you Andrew, we really appreciate the detailed feedback and are glad everything went smoothly.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 107,
    name: 'neil chapman',
    initial: 'N',
    bg: 'bg-teal-600',
    rating: 5,
    text: 'They were timely and efficient at all times working around unpredictable weather.The finished job was perfect and we will use them again.',
    timestamp: '2025-08-11',
    reviewer: { reviewCount: 5, photoCount: 0, isLocalGuide: false },
    location: { postcodeArea: 'SS6' },
    services: ['pressure-washing', 'general'],
    ownerReply: {
      text: "Thank you Neil, pleased everything went smoothly despite the weather. We'd be happy to help again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 106,
    name: 'David Tyler',
    initial: 'D',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Before & after good job done.',
    timestamp: '2025-08-04',
    reviewer: { reviewCount: 9, photoCount: 2, isLocalGuide: true },
    services: ['general'],
    images: [
      '/review-images/general/david-tyler-1.jpg',
      '/review-images/general/david-tyler-2.jpg',
    ],
    ownerReply: {
      text: "Thanks David, appreciate you taking the time to leave a review.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 105,
    name: 'Ann Cleverdon',
    initial: 'A',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: "Blake and Daniel cleaned my patio and path at the front and did a great job. They were friendly and professional and explained well what they were going to do. I also had a bad dark patch which came up really well which others had failed to remove. I would definitely recommend them if like me you have a patio or driveway that badly needs a thorough clean",
    timestamp: '2025-07-28',
    reviewer: { reviewCount: 5, photoCount: 2, isLocalGuide: false },
    location: { postcodeArea: 'RM3' },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/ana-cleverdon-1.jpg',
      '/review-images/pressure-washing/ana-cleverdon-2.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thank you Ann, we're really pleased you're happy with the results and explanation throughout the job.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 104,
    name: 'Robert Outten',
    initial: 'R',
    bg: 'bg-blue-700',
    rating: 5,
    text: "Thank you so much.\nReally pleased with the outcome!\nHighly recommend & will definitely be calling on you again 😁",
    timestamp: '2025-07-28',
    reviewer: { reviewCount: 8, photoCount: 5, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Robert, glad you're happy with the outcome. We'd be happy to help again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 103,
    name: 'Natasha Allison',
    initial: 'N',
    bg: 'bg-emerald-700',
    rating: 5,
    text: "We had excellent service from start to finish. The guys were very professional, discussed everything over the phone initially then a visit with the drone to allow accurate quarter and expectation management. On the day they were considerate with the neighbours, did a wonderful job with the roof and gutters and cleared up so well that everything looked far better than when they started. Cannot recommend more highly.",
    timestamp: '2025-07-28',
    reviewer: { reviewCount: 7, photoCount: 4, isLocalGuide: false },
    location: { postcodeArea: 'CM3' },
    services: ['roof-cleaning', 'gutter-cleaning'],
    images: [
      '/review-images/roof-cleaning/natasha-allison-1.jpg',
      '/review-images/roof-cleaning/natasha-allison-2.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thank you Natasha, really pleased you were happy with the service from start to finish.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 102,
    name: 'Barrie Strong',
    initial: 'B',
    bg: 'bg-violet-700',
    rating: 5,
    text: 'Arrived on time and very effective cleaning. Friendly service so most impressed. Company sent reminders to re-remind date and time which was most helpful. I would highly recommend this company',
    timestamp: '2025-07-21',
    reviewer: { reviewCount: 7, photoCount: 0, isLocalGuide: false },
    location: { postcodeArea: 'SS4' },
    services: ['general'],
    ownerReply: {
      text: "Thanks Barrie, we really appreciate the recommendation and kind words.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 101,
    name: 'melanie guest',
    initial: 'M',
    bg: 'bg-pink-700',
    rating: 5,
    text: "Brilliant job done. Guys very professional, thoughtful to us and our neighbours. Very hard working, and did a great clean up at the end as well! Would be happy to recommend to friends and family.",
    timestamp: '2025-07-21',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you Melanie, glad you were happy with the results and the clean-up.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 100,
    name: 'Nicola Comper',
    initial: 'N',
    bg: 'bg-rose-700',
    rating: 5,
    text: "What can I say other than WOW !!\nMassive thank you to Blake and Dan for all of your hard work, so professional and such an amazing job!\nLeft everything spotless so pleased, highly recommend to everyone. Extremely happy",
    timestamp: '2025-07-21',
    reviewer: { reviewCount: 1, photoCount: 2, isLocalGuide: false },
    location: { postcodeArea: 'CM3' },
    services: ['pressure-washing', 'roof-cleaning'],
    images: [
      '/review-images/pressure-washing/nicola-comper-1.jpg',
      '/review-images/pressure-washing/nicola-comper-2.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thanks Nicola, Blake and Dan will be delighted with your feedback.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 99,
    name: 'Katherine Carroll',
    initial: 'K',
    bg: 'bg-amber-700',
    rating: 5,
    text: "100% recommend this team . From start to finish was kept informed.On the morning a text to say what time they will be there and arrived on time . Worked from 9:30 till 7:30pm on the roof and jet washing all the area after. Very professional and had all the kit even a drone to show you the results of the whole area . The difference is amazing and looks like a new roof . Really happy with the results and so many comments from neighbours too saying how good it looks . You will not be disappointed .",
    timestamp: '2025-07-21',
    reviewer: { reviewCount: 3, photoCount: 3, isLocalGuide: false },
    services: ['roof-cleaning', 'pressure-washing'],
    images: [
      '/review-images/roof-cleaning/katherine-carroll-1.jpg',
      '/review-images/roof-cleaning/katherine-carroll-2.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thank you Katherine, we really appreciate the detailed review and are glad you're happy with the result.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 98,
    name: 'Globe Europe',
    initial: 'G',
    bg: 'bg-cyan-600',
    rating: 5,
    text: "These people are just angels, performing miracles. I have been struggling to clean my gutters for years and have never done a proper job. After contacting them and witnessing their work, I was astonished. Thank you for your service.\nI have added your phone number to my favourites.",
    timestamp: '2025-07-14',
    reviewer: { reviewCount: 22, photoCount: 3, isLocalGuide: true },
    services: ['gutter-cleaning'],
    priority: true,
    ownerReply: {
      text: "Thank you so much for the kind words, we're really glad we could help.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 97,
    name: 'Brad Curnick',
    initial: 'B',
    bg: 'bg-slate-600',
    rating: 5,
    text: "Really impressed with Aquapro Roof cleaning. Very professional guys that done such a good job, that it looks like I've had a new roof installed, (after 40yrs of dirt and moss). Blake talked me through everything in detail, and answered any questions I had. Showed me the end result with his drone footage and left house clean and tidy. Highly recommended.",
    timestamp: '2025-06-30',
    reviewer: { reviewCount: 4, photoCount: 1, isLocalGuide: false },
    location: { postcodeArea: 'SS15' },
    services: ['roof-cleaning'],
    images: [
      '/review-images/roof-cleaning/brad-curnick.jpg',
    ],
    priority: true,
    ownerReply: {
      text: "Thanks Brad, really pleased you're happy with the roof clean and explanation throughout.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 96,
    name: 'Nikki Gill',
    initial: 'N',
    bg: 'bg-pink-600',
    rating: 5,
    text: 'Cleaned my single massage mattress perfectly. Really happy will use again for sure and let other people know thankyou 👏',
    timestamp: '2025-06-30',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    location: { postcodeArea: 'CM1' },
    services: ['upholstery-cleaning'],
    ownerReply: {
      text: "Thanks Nikki, really appreciate the review. Glad you were happy with the mattress clean. Thanks as well for recommending us, it means a lot 👏",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 95,
    name: 'Alice Hutchinson',
    initial: 'A',
    bg: 'bg-indigo-700',
    rating: 5,
    text: "Brilliant service from Andy at Aqua Pro! I had a stubborn coffee stain on the carpet that I thought was there for good, but he got it looking like new again. He was friendly, professional, quick, and thorough. Clearly knows his stuff. Would definitely recommend to anyone looking for a reliable carpet cleaning service.",
    timestamp: '2025-06-23',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    ownerReply: {
      text: "Thank you Alice, really appreciate the detailed feedback. Andy will be chuffed to hear he managed to get the coffee stain out and leave it looking like new again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 94,
    name: 'Jim Broadhurst',
    initial: 'J',
    bg: 'bg-green-600',
    rating: 5,
    text: 'Your guy came to our home and gave our solar panels a great clean very happy with service and will use you again next year.',
    timestamp: '2025-06-16',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['window-cleaning'],
    ownerReply: {
      text: "Thanks Jim, really pleased you were happy with the solar panel clean. Appreciate the review and we'll be happy to help again next year.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 93,
    name: 'Andrew V',
    initial: 'A',
    bg: 'bg-teal-700',
    rating: 5,
    text: 'Absolutely amazing results, would highly recommend. Carpets were left clean and stain free and smelling fresh. Thank you',
    timestamp: '2025-06-16',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    profileImage: '/review-profile-images/andrew-v.webp',
    ownerReply: {
      text: "Thanks Andrew, really glad you're happy with the results. Great to hear the carpets came up clean and fresh. Appreciate the recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 92,
    name: 'Hana Bailey',
    initial: 'H',
    bg: 'bg-orange-600',
    rating: 5,
    text: 'Amazing job! Would recommend to friends and family. Will definitely be a returning customer.',
    timestamp: '2025-06-16',
    reviewer: { reviewCount: 1, photoCount: 1, isLocalGuide: false },
    services: ['upholstery-cleaning'],
    images: [
      '/review-images/upholstery-cleaning/hana-bailey-upholstery-1.jpg',
    ],
    profileImage: '/review-profile-images/hana-bailey.webp',
    ownerReply: {
      text: "Thank you Hana, really appreciate it. Glad you're happy with the job and thanks for recommending us to friends and family.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 91,
    name: 'Neil Richard Isaac',
    initial: 'N',
    bg: 'bg-blue-600',
    rating: 5,
    text: '',
    timestamp: '2025-06-16',
    reviewer: { reviewCount: 11, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Neil for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 90,
    name: 'Debbie Rabett',
    initial: 'D',
    bg: 'bg-purple-600',
    rating: 5,
    text: 'The young man arrived on time. He was friendly & efficient. Overall a very good service',
    timestamp: '2025-06-09',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you Debbie, really pleased you were happy with the service. Appreciate you taking the time to leave a review.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 89,
    name: 'Mayura Joshi',
    initial: 'M',
    bg: 'bg-emerald-600',
    rating: 5,
    text: 'Blake and team did a great job of cleaning and resealing our roof. They worked hard and communicated well by proactively keeping us updated at every stage. We are happy with the end result and the transformation was epic!',
    timestamp: '2025-06-09',
    reviewer: { reviewCount: 4, photoCount: 2, isLocalGuide: false },
    services: ['roof-cleaning'],
    images: [
      '/review-images/roof-cleaning/mayura-joshi-1.jpg',
      '/review-images/roof-cleaning/mayura-joshi-2.jpg',
    ],
    ownerReply: {
      text: "Thank you Mayura, really pleased you're happy with the transformation and communication.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 88,
    name: 'Keith Buller',
    initial: 'K',
    bg: 'bg-slate-600',
    rating: 5,
    text: 'Had very heavily stained carpet. Found Aquapro cleaning ltd. on line. Taking a risk when you contact company you have not dealt with before but have to say did great job on the carpet at very reasonable price and would strongly recommend them.',
    timestamp: '2025-06-02',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    priority: true,
    ownerReply: {
      text: "Thank you so much for your glowing review Keith. We're very glad you're happy with your clean.",
      timestamp: '2025-06-02',
    },
  },
  {
    id: 87,
    name: 'Graham Farmer',
    initial: 'G',
    bg: 'bg-cyan-600',
    rating: 5,
    text: 'Very good',
    timestamp: '2025-06-02',
    reviewer: { reviewCount: 57, photoCount: 2, isLocalGuide: true },
    services: ['general'],
    ownerReply: {
      text: "Thanks Graham. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 86,
    name: 'Paul Alderson',
    initial: 'P',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'Great service 👍🙏',
    timestamp: '2025-06-02',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    profileImage: '/review-profile-images/paul-alderson.webp',
    ownerReply: {
      text: "Thanks Paul 👍 really appreciate the review 🙏",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 85,
    name: 'Denise latchford',
    initial: 'D',
    bg: 'bg-amber-600',
    rating: 5,
    text: 'Fantastic job int conservatory roof looks so clean thanks',
    timestamp: '2025-06-02',
    reviewer: { reviewCount: 4, photoCount: 1, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Thank you Denise, glad you're happy with the conservatory roof clean. Appreciate the review.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 84,
    name: 'Lewis Taylor',
    initial: 'L',
    bg: 'bg-teal-600',
    rating: 5,
    text: 'Wow… the difference is crazy! Please, save yourself time and get it done once and properly by these guys. Wonderful people, great work and reliable. Thanks so much!',
    timestamp: '2025-05-26',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    priority: true,
    profileImage: '/review-profile-images/lewis-taylor.webp',
    ownerReply: {
      text: "Thanks Lewis, really appreciate that. Glad you're happy with the results and the reliability. Means a lot.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 83,
    name: 'Sharon Frances',
    initial: 'S',
    bg: 'bg-pink-600',
    rating: 5,
    text: "I had our carpets cleaned today by Andy who arrived on time+is very polite,friendly+professional.he provided an excellent service+is a credit to Aquapro.im really happy with the results+will definitely recommend 😊",
    timestamp: '2025-05-19',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Thank you Sharon, Andy will be really pleased to hear your feedback. Glad you're happy with the carpet clean and the service overall 😊",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 82,
    name: 'Mike Olat',
    initial: 'M',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Arrived on time , very helpful and professional. Amazing job 🏆🏆🏆',
    timestamp: '2025-05-19',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Mike, really appreciate it. Glad everything was on time and you were happy with the results 🏆",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 81,
    name: 'Martin Franks',
    initial: 'M',
    bg: 'bg-gray-600',
    rating: 5,
    text: '',
    timestamp: '2025-05-12',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Martin for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 80,
    name: 'Matthew Wyatt',
    initial: 'M',
    bg: 'bg-blue-700',
    rating: 5,
    text: 'Absolutely INCREDIBLE service from Blake and his team. Cannot recommend them enough. Communication was impeccable. An absolute 1st class service from AquaPro!',
    timestamp: '2025-05-12',
    reviewer: { reviewCount: 2, photoCount: 1, isLocalGuide: false },
    services: ['general'],
    images: [
      '/review-images/general/matthew-wyatt.jpg',
    ],
    ownerReply: {
      text: "Thank you so much Matthew, we really appreciate the kind words. We're glad the communication stood out and that you were happy with the service from start to finish. Thanks again for the recommendation, it means a lot to us.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 79,
    name: 'Olakunle Olaitan',
    initial: 'O',
    bg: 'bg-green-600',
    rating: 5,
    text: 'They did a great job, very friendly and professional, kept to time. I will definitely recommend',
    timestamp: '2025-05-12',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    profileImage: '/review-profile-images/olakunle-olaitan.webp',
    ownerReply: {
      text: "Thank you Olakunle, glad everything went smoothly and on time. Appreciate the recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 78,
    name: 'Abbie Akers',
    initial: 'A',
    bg: 'bg-violet-600',
    rating: 5,
    text: 'Excellent service..',
    timestamp: '2025-05-05',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Abbie, really appreciate the review.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 77,
    name: 'bob mclconstruction',
    initial: 'B',
    bg: 'bg-stone-600',
    rating: 5,
    text: '',
    timestamp: '2025-05-05',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 76,
    name: 'Bonnie Thompson',
    initial: 'B',
    bg: 'bg-red-600',
    rating: 1,
    text: "You didn't show up! I waited in and no one contacted me despite calling and messaging -shocking experience. DO NOT USE!",
    timestamp: '2025-05-05',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Hello, I apologise about this. I spoke to our team member who was assigned to this job - I have seen the call log and vehicle tracking, he did attempt to call you and was at your property knocking - but was unable to contact you, therefore we cancelled the job due to no answer. I also spoke to our office staff, we don't have any records of you calling us either. Please can you email us at bookings@aquapro.co.uk to confirm the contact number and address in case this was incorrect and we can reschedule for you. Thank you",
      timestamp: '2025-05-05',
    },
  },
  {
    id: 75,
    name: 'Marilyn Tissington',
    initial: 'M',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: 'Excellent service exactly what we wanted on time and an excellent job.',
    timestamp: '2025-05-05',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thank you Marilyn, really pleased you were happy with the timing and the end result.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 148,
    name: 'Janice Tyrrell',
    initial: 'J',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'Over the moon with the results of my drive. Work was by professionally done and Blake and his partner went over and above what I expected - thank you 5*',
    timestamp: '2025-05-03',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    profileImage: '/review-profile-images/janice-tyrrell.webp',
  },
  {
    id: 74,
    name: 'WJET',
    initial: 'W',
    bg: 'bg-sky-600',
    rating: 5,
    text: "Superb service and a really cool guy too. Incredible job. I'd recommend you guys to anyone - thank you",
    timestamp: '2025-04-28',
    reviewer: { reviewCount: 62, photoCount: 3, isLocalGuide: true },
    services: ['general'],
    ownerReply: {
      text: "Thanks very much, really appreciate the kind words and recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 73,
    name: 'Tanveer Mahtab-Ahmed',
    initial: 'T',
    bg: 'bg-lime-600',
    rating: 5,
    text: 'Really friendly guys! Did an amazing job of high pressure cleaning the driveway with sealant - such magic! Thank you! Highly recommend!',
    timestamp: '2025-04-28',
    reviewer: { reviewCount: 2, photoCount: 2, isLocalGuide: false },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/tanveer-mahtab-ahmed.jpg',
      '/review-images/pressure-washing/tanveer-mahtab-ahmed-2.jpg',
    ],
    ownerReply: {
      text: "Thank you Tanveer, glad you're happy with the driveway clean and seal. Appreciate the recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 72,
    name: 'Ruth Oven',
    initial: 'R',
    bg: 'bg-orange-600',
    rating: 5,
    text: "I had Andy over to the clean the carpets before I moved into my property. He was extremely polite, respectful of my property, very knowledgable and managed to get some very bad stains out of the carpet. The carpets smelt and looked lovely when he'd finished. The office customer service for booking was also excellent. I highly recommend Aquapro Cleaning Ltd and would definitely use them again.",
    timestamp: '2025-04-28',
    reviewer: { reviewCount: 12, photoCount: 2, isLocalGuide: false },
    services: ['carpet-cleaning', 'stain-removal'],
    priority: true,
    profileImage: '/review-profile-images/ruth-oven.webp',
    ownerReply: {
      text: "Thanks Ruth, really appreciate the feedback. Andy will be pleased to hear everything was handled respectfully and the results were a big improvement.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 71,
    name: 'KathrynMarie88',
    initial: 'K',
    bg: 'bg-emerald-600',
    rating: 5,
    text: "Great company! Can't rate Blake and his team high enough. They did a wonderful job of jet washing our patio and then the front drive along with re-sanding and sealing it with resin and both now look great! They're extra friendly too and got the work done quickly to a high standard.",
    timestamp: '2025-04-28',
    reviewer: { reviewCount: 14, photoCount: 18, isLocalGuide: true },
    services: ['pressure-washing'],
    profileImage: '/review-profile-images/kathrynmarie88.webp',
    ownerReply: {
      text: "Thank you so much for the review. Really glad you're happy with the patio and drive work. We appreciate the support.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 70,
    name: 'Ken Teasell',
    initial: 'K',
    bg: 'bg-blue-600',
    rating: 5,
    text: 'Excellent service and polite workman\nWill definitely use again',
    timestamp: '2025-04-21',
    reviewer: { reviewCount: 7, photoCount: 5, isLocalGuide: false },
    services: ['general'],
    profileImage: '/review-profile-images/ken-teasell.webp',
    ownerReply: {
      text: "Thanks Ken, really appreciate it. Glad you were happy with the service and we'd be happy to help again.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 69,
    name: 'David Sage',
    initial: 'D',
    bg: 'bg-purple-600',
    rating: 5,
    text: 'they turned up on time that was stated , was very polite and asked exactly what i wanted them to do. they done a great job',
    timestamp: '2025-04-21',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks David, really appreciate the review. Glad you were happy with the service and results.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 68,
    name: 'Peter Greenslade',
    initial: 'P',
    bg: 'bg-slate-600',
    rating: 5,
    text: "Blake and his team cleaned the roof of my house using a soft wash technique and applied a biocide treatment after - they also cleaned my guttering, fascia's and soffits. I am very happy with the job especially as they cleaned and tidied up after, including bringing in a specialist window cleaner - the price was very reasonable and all staff were polite and courteous at all times - they were also very knowledgeable and explained every aspect of the job in hand as it progressed - Aquapro turned up promptly and worked very hard all day to get the job done to my satisfaction, not leaving until I was entirely happy. These guys are professional and I would have no hesitation in recommending them to others. Blake will also be back to sort out my driveway once I have laid the new patio - thank you Aquapro you're now my first choice for anything cleaning inside or out!",
    timestamp: '2025-04-14',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning', 'gutter-cleaning', 'window-cleaning'],
    priority: true,
    ownerReply: {
      text: "Thank you Peter, really appreciate the detailed feedback. Glad you're happy with the roof clean and treatment, and that everything was left tidy afterwards.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 67,
    name: 'Mike Garrard',
    initial: 'M',
    bg: 'bg-cyan-600',
    rating: 5,
    text: "Very professional service. Turned up on time, cleaned my panels well. 1.3kW when they arrived, over 3kW after they finished cleaning. 15 panels either side of a roof on a 2-storey terraced house on a main road. I was expecting they would use ladders or light scaffolding but their expanding brushes were long enough to complete the job from the ground. Fine job, they ensured I was happy before they left. Very good value and highly recommended.",
    timestamp: '2025-04-14',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Mike, really appreciate the review. Great to hear the panel clean made a noticeable difference. Glad you were happy with the service.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 66,
    name: 'Linda Ryder',
    initial: 'L',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'Andy cleaned my mums carpets.\nHe was efficient, Patient and polite.\nA good job.\nThank you',
    timestamp: '2025-04-07',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Thank you Linda, really appreciate it. Andy will be pleased to hear your mum was happy with the clean and the service.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 65,
    name: 'Sarah P',
    initial: 'S',
    bg: 'bg-amber-600',
    rating: 5,
    text: 'Fab service, friendly efficient and carpet looks great. Highly recommend!',
    timestamp: '2025-04-07',
    reviewer: { reviewCount: 5, photoCount: 3, isLocalGuide: false },
    services: ['carpet-cleaning'],
    profileImage: '/review-profile-images/sarah-p.webp',
    ownerReply: {
      text: "Thanks Sarah, really pleased you're happy with the results. Appreciate the recommendation.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 64,
    name: 'Deon Eckhart',
    initial: 'D',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Excellent service from Blake, Dan and team. The explanation on the entire process for cleaning the roof, showed the state and condition of the roof via the drone before the process started. The amount of dirt which was removed was truly surprising and now have red terracotta roof again, Fantastic job highly recommended.',
    timestamp: '2025-04-07',
    reviewer: { reviewCount: 9, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning'],
    ownerReply: {
      text: "Thank you Deon, really appreciate the detailed review. Glad the explanation and full process stood out and you're happy with the end result.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 63,
    name: 'Sophy Barton-Wright',
    initial: 'S',
    bg: 'bg-pink-600',
    rating: 5,
    text: 'Great service, lovely & friendly team. So happy with the patio.',
    timestamp: '2025-04-07',
    reviewer: { reviewCount: 2, photoCount: 2, isLocalGuide: false },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/sophy-barton-wright.jpg',
      '/review-images/pressure-washing/sophy-barton-wright-2.jpg',
    ],
    ownerReply: {
      text: "Thank you Sophy, really glad you're happy with the patio and the service.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 147,
    name: 'Storm Auro',
    initial: 'S',
    bg: 'bg-violet-600',
    rating: 5,
    text: 'Blake and Dan were incredibly helpful from the scope of services to the works completed on the patio clean and gutter cleaning.',
    timestamp: '2025-04-03',
    reviewer: { reviewCount: 11, photoCount: 8, isLocalGuide: false },
    services: ['pressure-washing', 'gutter-cleaning'],
    profileImage: '/review-profile-images/storm-auro.webp',
  },
  {
    id: 62,
    name: 'Mark Stammers',
    initial: 'M',
    bg: 'bg-teal-600',
    rating: 5,
    text: "Where to start! Really pleased with Blake, Dan & the team from start to end. Communication was great - from establishing what services we wanted to meet our needs, providing the quotation and delivery of services. Fantastic value for money. You won't be disappointed!!",
    timestamp: '2025-03-31',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Mark, really appreciate the detailed review. Glad you felt looked after from start to finish, and thank you for the support.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 61,
    name: 'Scott Lyle',
    initial: 'S',
    bg: 'bg-violet-600',
    rating: 5,
    text: 'Great service amazing results thank you.',
    timestamp: '2025-03-31',
    reviewer: { reviewCount: 35, photoCount: 45, isLocalGuide: true },
    services: ['general'],
    images: [
      '/review-images/general/scott-lyle.jpg',
    ],
    ownerReply: {
      text: "Thanks Scott, really appreciate it. Glad you're happy with the results.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 60,
    name: 'Chris Economou',
    initial: 'C',
    bg: 'bg-orange-600',
    rating: 5,
    text: '',
    timestamp: '2025-03-31',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Chris for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 59,
    name: 'Marco Fratila',
    initial: 'M',
    bg: 'bg-emerald-600',
    rating: 5,
    text: 'Very punctual, great service, will definitely use again.',
    timestamp: '2025-03-31',
    reviewer: { reviewCount: 7, photoCount: 3, isLocalGuide: false },
    services: ['general'],
    profileImage: '/review-profile-images/marco-fratila.webp',
    ownerReply: {
      text: "Thank you Marco, really appreciate the feedback. Glad everything was punctual and you were happy with the service.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 58,
    name: 'Deborah Carini',
    initial: 'D',
    bg: 'bg-blue-600',
    rating: 5,
    text: 'Had my sofa cleaned. Took two goes as it was a white fabric and a while to dry which we was informed of. Now looks like new. Very pleased with the service. Quick to respond and very polite and efficient.',
    timestamp: '2025-03-24',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning'],
    profileImage: '/review-profile-images/deborah-carini.webp',
    ownerReply: {
      text: "Thanks Deborah, really appreciate the review. Glad you were kept informed, and even with the extra pass on the white fabric, we're pleased it came up like new in the end.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 57,
    name: 'Mary Healy',
    initial: 'M',
    bg: 'bg-purple-600',
    rating: 5,
    text: 'A truly excellent cleaning of carpet and chair pads',
    timestamp: '2025-03-24',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning', 'upholstery-cleaning'],
    ownerReply: {
      text: "Thank you Mary, really appreciate it. Glad you were happy with the clean.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 56,
    name: 'Dan Sharpe',
    initial: 'D',
    bg: 'bg-slate-600',
    rating: 5,
    text: 'They did a fantastic job on cleaning my roof, really polite and left my property spotless afterwards, especially considering how dirty it got during the clean!',
    timestamp: '2025-03-17',
    reviewer: { reviewCount: 3, photoCount: 1, isLocalGuide: false },
    services: ['roof-cleaning'],
    profileImage: '/review-profile-images/dan-sharpe.webp',
    ownerReply: {
      text: "Thanks Dan, really pleased you're happy with the roof clean and that everything was left spotless afterwards.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 55,
    name: 'Kay Stone',
    initial: 'K',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'Great friendly service, did a good job getting the dog stains off the sofa cushions. Cushions took forever to dry, lot longer than initially expected.',
    timestamp: '2025-03-17',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning', 'stain-removal'],
    ownerReply: {
      text: "Thank you Kay, really appreciate the honest feedback. Glad you were happy with the results, and thanks for mentioning the drying time as well.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 54,
    name: 'Jeff Franklin',
    initial: 'J',
    bg: 'bg-cyan-600',
    rating: 5,
    text: '',
    timestamp: '2025-03-17',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Jeff for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 53,
    name: 'Daniel Childs',
    initial: 'D',
    bg: 'bg-lime-600',
    rating: 5,
    text: "I couldn't fault the service from start for finished. Very impressed with how my carpets came out! Looks like brand new carpet and smells lovely!",
    timestamp: '2025-03-10',
    reviewer: { reviewCount: 16, photoCount: 2, isLocalGuide: true },
    services: ['carpet-cleaning'],
    profileImage: '/review-profile-images/daniel-childs.webp',
    ownerReply: {
      text: "Thank you Daniel, really appreciate the feedback. Great to hear the carpets came up like new and smelling fresh.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 52,
    name: 'Carol Hardy',
    initial: 'C',
    bg: 'bg-amber-600',
    rating: 5,
    text: "My mattress was left so wet that I couldn't sleep in my own bed tonight. 12 hours later & still too wet. Difficult as I am disabled.",
    timestamp: '2025-03-03',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Carol, I'm really sorry to hear this, especially given your circumstances. That's not the experience we want anyone to have. Please email us at bookings@aquapro.co.uk with the date of the job and your address, and I'll look into this with the team and come back to you directly.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 51,
    name: 'Ahmet Deveci',
    initial: 'A',
    bg: 'bg-sky-600',
    rating: 5,
    text: "Arrived on time and delivered on time.\n\nOur 10 year old cuddle chair now looks as good as it did the day we bought it and the carpet has had a well needed refresh to bring it back to life.\n\nThank you and will use again!",
    timestamp: '2025-03-03',
    reviewer: { reviewCount: 38, photoCount: 23, isLocalGuide: true },
    services: ['upholstery-cleaning', 'carpet-cleaning'],
    images: [
      '/review-images/upholstery-cleaning/ahmet-deveci-1.jpg',
      '/review-images/upholstery-cleaning/ahmet-deveci-3.jpg',
    ],
    priority: true,
    profileImage: '/review-profile-images/ahmet-deveci.webp',
    ownerReply: {
      text: "Thank you so much for your review Ahmet. We're glad you're happy with your clean.",
      timestamp: '2025-06-02',
    },
  },
  {
    id: 50,
    name: 'Megan Kirk',
    initial: 'M',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: '',
    timestamp: '2025-02-24',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Thanks Megan for the 5 stars. Much appreciated.",
      timestamp: '2026-02-01',
    },
  },
  {
    id: 49,
    name: 'richard knowles',
    initial: 'R',
    bg: 'bg-blue-600',
    rating: 5,
    text: 'Aquapro made an excellent job of cleaning moss from our roof. Very professional and excellent service from quotation to completion. I would not hesitate to recommend!',
    timestamp: '2025-02-17',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning'],
  },
  {
    id: 48,
    name: 'Glenn Barlow',
    initial: 'G',
    bg: 'bg-green-600',
    rating: 5,
    text: 'Dan was very good cleaning our gutters. Would not hesitate to recommend them. Many thanks.',
    timestamp: '2025-02-17',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['gutter-cleaning'],
  },
  {
    id: 47,
    name: 'Mary Arnold',
    initial: 'M',
    bg: 'bg-purple-600',
    rating: 5,
    text: '',
    timestamp: '2025-02-10',
    reviewer: { reviewCount: 0, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 46,
    name: 'John Foster',
    initial: 'J',
    bg: 'bg-slate-600',
    rating: 5,
    text: 'Arrived on Time, great communication, professional and friendly service with great results',
    timestamp: '2025-02-10',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 45,
    name: 'Luke Mulholland',
    initial: 'L',
    bg: 'bg-orange-600',
    rating: 5,
    text: "Fantastic roof cleaning service from Dan and Blake. Not only was their quotation very reasonable but they did a great job - and they were both friendly and very hard working. I went for their power wash option and the roof looks brand new. And the whole exterior of the house was left in a clean condition, they even cleaned next door's windows where they had been splashed.",
    timestamp: '2025-02-03',
    reviewer: { reviewCount: 7, photoCount: 0, isLocalGuide: false },
    services: ['roof-cleaning'],
    priority: true,
    profileImage: '/review-profile-images/luke-mulholland.webp',
  },
  {
    id: 44,
    name: 'Penny Shiret',
    initial: 'P',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'I highly recommend this company - their response to my enquiry was extremely prompt, they sent a quote immediately and upon my approval the date set for cleaning my carpets. On the day a very pleasant lady arrived and duly carried out the job wonderfully and efficiently. I am really pleased with the work. I would 100% use them again and tell me friends too!',
    timestamp: '2025-01-16',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
  },
  {
    id: 43,
    name: 'Lorraine P',
    initial: 'L',
    bg: 'bg-teal-600',
    rating: 5,
    text: 'The Guys from Aquapro were prompt and professional. Really happy with the service and will book again for my settee and chairs!\n\nThank you!',
    timestamp: '2025-01-16',
    reviewer: { reviewCount: 36, photoCount: 33, isLocalGuide: true },
    services: ['carpet-cleaning'],
  },
  {
    id: 42,
    name: 'Phil Lion',
    initial: 'P',
    bg: 'bg-cyan-600',
    rating: 5,
    text: 'Did a wonderful and professional job. Carpets looks new\nI will highly recommend',
    timestamp: '2025-01-06',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
  },
  {
    id: 41,
    name: 'Antoinette clement',
    initial: 'A',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Was on time and very polite. No complaints here would highly recommend',
    timestamp: '2025-01-04',
    reviewer: { reviewCount: 7, photoCount: 1, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 40,
    name: 'Tony Whiteside',
    initial: 'T',
    bg: 'bg-emerald-600',
    rating: 5,
    text: 'Really pleased with the service Charlie was very polite and windows look great many thanks 👍',
    timestamp: '2025-01-04',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['window-cleaning'],
  },
  {
    id: 39,
    name: 'Patricia Moule',
    initial: 'P',
    bg: 'bg-pink-600',
    rating: 5,
    text: 'Very good',
    timestamp: '2025-01-03',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 38,
    name: 'Stephanie Peer',
    initial: 'S',
    bg: 'bg-violet-600',
    rating: 5,
    text: 'We had our very dirty & old carpets cleaned and it made a significant difference! Really happy with the results. We also had a mattress cleaned and it restored it back to new!',
    timestamp: '2024-12-29',
    reviewer: { reviewCount: 6, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
  },
  {
    id: 37,
    name: 'charlotte jones',
    initial: 'C',
    bg: 'bg-amber-600',
    rating: 5,
    text: 'very friendly and conscientious highly recommend',
    timestamp: '2024-12-28',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 36,
    name: 'Lauren S',
    initial: 'L',
    bg: 'bg-sky-600',
    rating: 5,
    text: 'Excellent service from start to finish! Would definitely recommend',
    timestamp: '2024-12-24',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 35,
    name: 'Wilma Frederico Caldeira',
    initial: 'W',
    bg: 'bg-lime-600',
    rating: 5,
    text: 'Very good work. The result was excellent.',
    timestamp: '2024-12-20',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 34,
    name: 'Bisola yoozooph',
    initial: 'B',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: 'They did a wonderful job. Carpets and rug look like new and dried very quickly',
    timestamp: '2024-12-19',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
  },
  {
    id: 33,
    name: 'Beatrice Amponsah',
    initial: 'B',
    bg: 'bg-blue-700',
    rating: 5,
    text: '',
    timestamp: '2024-12-17',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 32,
    name: 'Kev Gooderham',
    initial: 'K',
    bg: 'bg-stone-600',
    rating: 5,
    text: 'No problems at all workmen were great everything was fine',
    timestamp: '2024-12-17',
    reviewer: { reviewCount: 17, photoCount: 0, isLocalGuide: true },
    services: ['general'],
  },
  {
    id: 31,
    name: 'clifford joyner',
    initial: 'C',
    bg: 'bg-red-600',
    rating: 5,
    text: 'Great job done at my mums house..The Carpet looked amazing ..Staff were very helpfull and considerate..my mother whos 91 years old was over the moon with the results afterwards..Cheap Price as well..Thank you so much..I highly recommend this company..!!',
    timestamp: '2024-12-17',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    priority: true,
  },
  {
    id: 30,
    name: 'D B',
    initial: 'D',
    bg: 'bg-gray-600',
    rating: 5,
    text: 'Prompt response and job was done quickly and efficiently',
    timestamp: '2024-12-14',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 29,
    name: 'Shell Brown',
    initial: 'S',
    bg: 'bg-orange-500',
    rating: 5,
    text: 'Very grateful to the team, managed to squeeze us in within a few days, punctual and very friendly pair. Completed my chairs in allocated time and they look fab compared to what they were. Very impressed and would highly recommend.',
    timestamp: '2024-12-12',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning'],
  },
  {
    id: 28,
    name: 'Stacey rosendale',
    initial: 'S',
    bg: 'bg-purple-500',
    rating: 5,
    text: 'Fantastic from start to finish very helpful from first phonecall to cleaning rugs had 2x rugs booked in and absolutely over the moon with the results honestly look brand new totally recommend these guys',
    timestamp: '2024-12-11',
    reviewer: { reviewCount: 6, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    priority: true,
    ownerReply: {
      text: "Hi Stacey, thank you for the review! We're glad you're happy with our carpet and rug cleaning service. We hope to work with you again in the future!",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 27,
    name: 'Cheryl Taylor',
    initial: 'C',
    bg: 'bg-teal-500',
    rating: 5,
    text: 'My carpet looks so different now. It was a mess. Thank you and I really appreciate you squeezing me in at short notice too 😀👍🏻',
    timestamp: '2024-12-04',
    reviewer: { reviewCount: 6, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi Cheryl, thank you for the review! We're glad you're happy with our carpet and rug cleaning service. We hope to work with you again in the future :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 26,
    name: 'Tony Bowers',
    initial: 'T',
    bg: 'bg-blue-600',
    rating: 5,
    text: "Called 5 companies on a Friday afternoon for a quote to clean 2 sofa's. Only one replied. Agreed a price. Turned up although an hour late they called to let me know of the delay. Very nice to deal with communication brilliant. Will use again.\n\nTony",
    timestamp: '2024-12-02',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning'],
    ownerReply: {
      text: "Hi Tony, thank you for the review! We're glad you're happy with our service. We hope to work with you again in the future :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 25,
    name: 'Mike Bowyer',
    initial: 'M',
    bg: 'bg-green-600',
    rating: 5,
    text: "They did a great job of cleaning my sofas that were really dirty due to my dog jumping on them as soon as we leave him long enough. They were polite and efficient. I'd definitely use them again",
    timestamp: '2024-11-28',
    reviewer: { reviewCount: 11, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning'],
    ownerReply: {
      text: "Hi Mike, thank you for the review! We're glad you're happy with our sofa and upholstery cleaning service. We hope to work with you again in the future :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 24,
    name: 'Jo-Anne Proctor',
    initial: 'J',
    bg: 'bg-purple-600',
    rating: 5,
    text: "Good service, arrived promptly & happy with the results. Was told carpet would be dry in an hour, in reality room needed to be left overnight to dry properly. Wasn't an issue for us.",
    timestamp: '2024-11-27',
    reviewer: { reviewCount: 5, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi Jo-Anne, thank you for the review! We're glad you're happy with our carpet and rug cleaning service - apologies for the longer than usual drying time, some materials can take longer to dry such as wool carpet. We hope to work with you again in the future :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 23,
    name: 'Emma Casson',
    initial: 'E',
    bg: 'bg-slate-600',
    rating: 5,
    text: '',
    timestamp: '2024-11-23',
    reviewer: { reviewCount: 7, photoCount: 4, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 22,
    name: 'CJC Photography The British Backpacker',
    initial: 'C',
    bg: 'bg-orange-600',
    rating: 5,
    text: '',
    timestamp: '2024-11-23',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
  },
  {
    id: 21,
    name: 'Roberta Cootes',
    initial: 'R',
    bg: 'bg-rose-600',
    rating: 5,
    text: 'Billy and his assistant wasted no time. Worked very efficiently and our rugs looked like new. Thank you.',
    timestamp: '2024-11-22',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi Roberta, thank you for the review! We're glad you're happy with our carpet and rug cleaning service. We hope to work with you again in the future :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 20,
    name: 'cmgardier',
    initial: 'C',
    bg: 'bg-teal-600',
    rating: 5,
    text: 'they were very helpful and professional, even worked around people',
    timestamp: '2024-11-19',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi, thank you for the review! We're glad you're happy with our carpet cleaning service. We hope to work with you again in the future!",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 19,
    name: 'Milena Nedialkova',
    initial: 'M',
    bg: 'bg-cyan-600',
    rating: 5,
    text: "Amazing work and amazing service.\nI still can't believe what a wonderful job you have done.\nThank you so much for your hard work",
    timestamp: '2024-11-01',
    reviewer: { reviewCount: 1, photoCount: 1, isLocalGuide: false },
    services: ['carpet-cleaning'],
    images: [
      '/review-images/carpet-cleaning/milena-nedialkova.jpg',
    ],
    ownerReply: {
      text: "Hi Milena, thank you for the review! We're glad you're happy with our carpet cleaning service. We hope to work with you again in the future!",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 18,
    name: 'Natasha Byfield',
    initial: 'N',
    bg: 'bg-indigo-600',
    rating: 5,
    text: 'Excellent service and lovely friendly staff! Highly recommend and would use again in the future.',
    timestamp: '2024-11-01',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Hi Natasha, thank you for the review! We're glad you're happy with our service!",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 17,
    name: 'Mark Eldridge',
    initial: 'M',
    bg: 'bg-emerald-600',
    rating: 5,
    text: "Excellent service. Very thorough and the sofa came up lovely after it's clean. Highly recommended.",
    timestamp: '2024-10-26',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['upholstery-cleaning'],
    ownerReply: {
      text: "Hi Mark, thank you for the review! We're glad you're happy with our sofa and upholstery cleaning service :)",
      timestamp: '2025-04-07',
    },
  },
  {
    id: 16,
    name: 'Filipe Henriques',
    initial: 'F',
    bg: 'bg-pink-600',
    rating: 5,
    text: 'Great price, quick and efficient!',
    timestamp: '2024-10-14',
    reviewer: { reviewCount: 5, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Filipe thank you so much for the 5 star review",
      timestamp: '2024-10-14',
    },
  },
  {
    id: 15,
    name: 'Stuart Simpson',
    initial: 'S',
    bg: 'bg-violet-600',
    rating: 5,
    text: "Recommend by a family member. Billy came to clean our living room carpet, a fantastic job, very polite, helpful and friendly. I've already booked them to come back to clean my stairs and landing carpets.",
    timestamp: '2024-09-15',
    reviewer: { reviewCount: 28, photoCount: 0, isLocalGuide: true },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi Stuart, thank you for choosing Aquapro Cleaning for your carpet cleaning needs. We was very pleased with the results! We look forward to cleaning your stairs and landing carpets!",
      timestamp: '2024-09-18',
    },
  },
  {
    id: 14,
    name: 'Luke Fisher',
    initial: 'L',
    bg: 'bg-amber-600',
    rating: 5,
    text: 'Cleaned my gutter, friendly and fast service. Had me booked in the same week I called.',
    timestamp: '2024-09-14',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['gutter-cleaning'],
    ownerReply: {
      text: "Hi Luke, thank you for choosing Aquapro Cleaning for your gutter cleaning needs. We look forward to working with you again!",
      timestamp: '2024-09-18',
    },
  },
  {
    id: 13,
    name: 'Amy simpson',
    initial: 'A',
    bg: 'bg-sky-600',
    rating: 5,
    text: "Lovely guys, they did a brilliant job of my driveway, I'm very impressed, definitely would recommend and use again",
    timestamp: '2024-09-12',
    reviewer: { reviewCount: 5, photoCount: 1, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Hi Amy, thank you for choosing Aquapro Cleaning for your driveway cleaning. We was very pleased with the results! We look forward to working with you again :)",
      timestamp: '2024-09-18',
    },
  },
  {
    id: 12,
    name: 'Cheryl Edward',
    initial: 'C',
    bg: 'bg-lime-600',
    rating: 5,
    text: 'Great service, and the results were amazing, I will definitely use them again and would highly recommend them yo anyone',
    timestamp: '2024-09-12',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['carpet-cleaning'],
    ownerReply: {
      text: "Hi Cheryl, thank you for your review and for choosing Aquapro Cleaning for your carpet cleaning. We was very pleased with the outcome! We look forward to working with you again!",
      timestamp: '2024-09-13',
    },
  },
  {
    id: 11,
    name: 'Dom Foakes',
    initial: 'D',
    bg: 'bg-fuchsia-600',
    rating: 5,
    text: "Not long started up and I must say how they handle themselves is very professional! I had my driveway cleaned, Great workmanship! And the price is more than reasonable, I'll be using AquaPro from now on for my cleaning jobs",
    timestamp: '2024-09-12',
    reviewer: { reviewCount: 4, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "We appreciate your review and for choosing Aquapro Cleaning for your driveway cleaning. We're pleased you're happy with the service. Let us know if you need any more cleaning jobs, we'll be happy to help!",
      timestamp: '2024-09-12',
    },
  },
  {
    id: 10,
    name: 'Liam Midson',
    initial: 'L',
    bg: 'bg-blue-700',
    rating: 5,
    text: 'Very good service, would highly recommend!',
    timestamp: '2024-09-11',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Hi Liam, thank you for your review and for choosing Aquapro Cleaning. We look forward to working with you again!",
      timestamp: '2024-09-13',
    },
  },
  {
    id: 9,
    name: 'Isabelle Johnson',
    initial: 'I',
    bg: 'bg-stone-600',
    rating: 5,
    text: "Had my patio cleaned by AquaPro yesterday evening, safe to say I would use them again and definitely recommend. The efficiency and attention to detail was incredible. The team were upmost polite and diligent. Wouldn't hesitate to use again in the future. Thankyou!",
    timestamp: '2024-09-11',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Hi Isabelle, thank you for your review and for choosing Aquapro Cleaning for your patio cleaning. We was very pleased with the outcome! We look forward to working with you again :)",
      timestamp: '2024-09-13',
    },
  },
  {
    id: 8,
    name: 'Amy Whatson',
    initial: 'A',
    bg: 'bg-red-600',
    rating: 5,
    text: 'Excellent service and great communication! Highly recommended!! 🤩',
    timestamp: '2024-09-11',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Hi Amy, thank you for your review and for choosing Aquapro Cleaning. We was very pleased with the outcome! We look forward to working with you again :)",
      timestamp: '2024-09-13',
    },
  },
  {
    id: 7,
    name: 'Oliver French',
    initial: 'O',
    bg: 'bg-gray-600',
    rating: 5,
    text: 'Excellent service they were quick and tidy couldn\'t be happier with my pathway looks better than new definitely would recommend if you need any pathway looking better than you could imagine',
    timestamp: '2024-09-11',
    reviewer: { reviewCount: 2, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Thank you for your review and for choosing Aquapro Cleaning for your pathway cleaning. We're very pleased you're happy with the results. Let us know if you need any more exterior cleaning services, we'll be happy to help!",
      timestamp: '2024-09-12',
    },
  },
  {
    id: 6,
    name: 'Michael Edward',
    initial: 'M',
    bg: 'bg-orange-500',
    rating: 5,
    text: 'Amazing service from booking the appointment to finishing the job! The price was fair and my carpets are now looking brand new again. Highly recommend',
    timestamp: '2024-09-10',
    reviewer: { reviewCount: 15, photoCount: 1, isLocalGuide: true },
    services: ['carpet-cleaning', 'stain-removal'],
    ownerReply: {
      text: "We appreciate your review and thanks again for choosing Aquapro for your carpet cleaning. Let us know if you need any more carpet cleaning and stain removal services, we'll be happy to help :)",
      timestamp: '2024-09-11',
    },
  },
  {
    id: 5,
    name: 'Joe Farrant',
    initial: 'J',
    bg: 'bg-purple-500',
    rating: 5,
    text: "Wouldn't recommend anyone else!",
    timestamp: '2024-09-08',
    reviewer: { reviewCount: 7, photoCount: 9, isLocalGuide: false },
    services: ['general'],
    ownerReply: {
      text: "Hi Joe, thank you for your review and for choosing Aquapro Cleaning. We look forward to working with you again in the future!",
      timestamp: '2024-09-13',
    },
  },
  {
    id: 4,
    name: 'Robyn Annis',
    initial: 'R',
    bg: 'bg-teal-500',
    rating: 5,
    text: 'Highly recommend, lovely lads, very hardworking. Incredibly happy with my lovely clean driveway :)',
    timestamp: '2024-09-07',
    reviewer: { reviewCount: 1, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Thank you for your review and for choosing Aquapro Cleaning for your driveway pressure washing. We're pleased you're happy with the outcome. Give us a call if you need any more exterior cleaning services :)",
      timestamp: '2024-09-12',
    },
  },
  {
    id: 3,
    name: 'Gary Brand',
    initial: 'G',
    bg: 'bg-cyan-500',
    rating: 5,
    text: 'Great service! Highly recommend Aquapro!\nBefore and after photos',
    timestamp: '2024-09-06',
    reviewer: { reviewCount: 6, photoCount: 2, isLocalGuide: false },
    services: ['pressure-washing'],
    images: [
      '/review-images/pressure-washing/gary-brand.png',
      '/review-images/pressure-washing/gary-brand-2.png',
    ],
    ownerReply: {
      text: "Thank you for your review and for choosing Aquapro Cleaning for your patio cleaning needs. We was very pleased with the outcome on this job, let us know if you need any more pressure washing services in the future!",
      timestamp: '2024-09-11',
    },
  },
  {
    id: 2,
    name: 'Callum Sheppard',
    initial: 'C',
    bg: 'bg-indigo-500',
    rating: 5,
    text: 'Came round very quickly to give me a quote for my driveway\nBooked in and done within the following week!\nLovely lads, very professional, and done an amazing job! Cannot recommend enough',
    timestamp: '2024-09-03',
    reviewer: { reviewCount: 10, photoCount: 6, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "Thank you for the review and for choosing Aquapro Cleaning for your driveway cleaning! We really enjoyed working with you on this job :)",
      timestamp: '2024-09-11',
    },
  },
  {
    id: 1,
    name: 'Coran Purser',
    initial: 'C',
    bg: 'bg-emerald-500',
    rating: 5,
    text: 'Very reliable and very fair priced would recommend this company 100%. Team is hard working and always meet the needs off the customer requirements.',
    timestamp: '2024-09-03',
    reviewer: { reviewCount: 3, photoCount: 0, isLocalGuide: false },
    services: ['pressure-washing'],
    ownerReply: {
      text: "We appreciate your review and for choosing Aquapro Cleaning for your exterior cleaning work. If you need any more pressure washing services in the future, let us know and we'll be happy to help :)",
      timestamp: '2024-09-11',
    },
  },
];

// =============================================================================
// OPTIMIZED REVIEW SORTING SYSTEM
// All computations happen at module load time for O(1) runtime access
// =============================================================================

/** Related services for fallback when primary service reviews run out */
const RELATED_SERVICES: Record<ServiceId, ServiceId[]> = {
  'carpet-cleaning': ['upholstery-cleaning', 'stain-removal'],
  'upholstery-cleaning': ['carpet-cleaning', 'stain-removal'],
  'stain-removal': ['carpet-cleaning', 'upholstery-cleaning'],
  'roof-cleaning': ['gutter-cleaning', 'pressure-washing'],
  'gutter-cleaning': ['roof-cleaning'],
  'pressure-washing': ['driveway-cleaning', 'patio-cleaning', 'roof-cleaning'],
  'driveway-cleaning': ['pressure-washing', 'patio-cleaning'],
  'patio-cleaning': ['pressure-washing', 'driveway-cleaning'],
  'window-cleaning': [],
  'general': [],
};

/**
 * Compute review quality score (higher = better for CRO)
 * Scoring weights:
 * - priority flag: +10000 (manual quality override)
 * - has images: +1000 (visual proof)
 * - local guide: +100 (credibility)
 * - has profile picture: +75 (face builds trust, but doesn't override stronger signals)
 * - reviewer count: +min(count, 50) (established reviewer)
 * - recency: tiny bonus for tiebreaking
 */
function computeReviewScore(r: Review): number {
  return (
    (r.priority ? 10000 : 0) +
    (r.images?.length ? 1000 : 0) +
    (r.reviewer.isLocalGuide ? 100 : 0) +
    (r.profileImage ? 75 : 0) +
    Math.min(r.reviewer.reviewCount, 50) +
    (new Date(r.timestamp).getTime() / 1e15) // tiny recency tiebreaker
  );
}

// =============================================================================
// PRE-COMPUTED DATA (runs once at module load)
// =============================================================================

/** Displayable reviews: has text, rating >= 4 */
const displayableReviews = reviews.filter(
  (r) => r.text.length > 0 && r.rating >= 4
);

/** Pre-computed scores for each displayable review (avoids recomputation) */
const reviewScores = new Map<number, number>();
for (let i = 0; i < displayableReviews.length; i++) {
  reviewScores.set(displayableReviews[i].id, computeReviewScore(displayableReviews[i]));
}

/** Sort comparator using pre-computed scores */
const scoreComparator = (a: Review, b: Review): number =>
  (reviewScores.get(b.id) || 0) - (reviewScores.get(a.id) || 0);

/**
 * Ensure the most recent review appears in top 3 (position 2) for recency signal.
 * This handles the "are they still active?" objection.
 * Position 1 stays as highest quality, position 2 becomes most recent if not already in top 3.
 */
function ensureRecentInTop(sortedReviews: Review[]): Review[] {
  if (sortedReviews.length <= 3) {
    return sortedReviews;
  }

  // Find the most recent review by timestamp
  let mostRecentIdx = 0;
  let mostRecentTime = new Date(sortedReviews[0].timestamp).getTime();
  for (let i = 1; i < sortedReviews.length; i++) {
    const time = new Date(sortedReviews[i].timestamp).getTime();
    if (time > mostRecentTime) {
      mostRecentTime = time;
      mostRecentIdx = i;
    }
  }

  // If already in top 3, no change needed
  if (mostRecentIdx < 3) {
    return sortedReviews;
  }

  // Move most recent to position 2 (index 1), keeping #1 as best quality
  const result = [...sortedReviews];
  const [mostRecent] = result.splice(mostRecentIdx, 1);
  result.splice(1, 0, mostRecent);
  return result;
}

/** All displayable reviews sorted by score (for general/fallback) */
const allSortedReviews = ensureRecentInTop([...displayableReviews].sort(scoreComparator));

/**
 * Build optimized review list for a service:
 * 1. Primary service matches (sorted by score)
 * 2. Related service matches (sorted by score)
 * 3. Remaining reviews (sorted by score)
 */
function buildServiceReviewList(serviceId: ServiceId): Review[] {
  const seen = new Set<number>();
  const result: Review[] = [];

  // 1. Primary matches (with most recent in top 3 for recency signal)
  const primary: Review[] = [];
  for (let i = 0; i < displayableReviews.length; i++) {
    const r = displayableReviews[i];
    if (r.services.includes(serviceId)) {
      primary.push(r);
      seen.add(r.id);
    }
  }
  primary.sort(scoreComparator);
  const primaryWithRecent = ensureRecentInTop(primary);
  for (let i = 0; i < primaryWithRecent.length; i++) {
    result.push(primaryWithRecent[i]);
  }

  // 2. Related service matches
  const related = RELATED_SERVICES[serviceId];
  if (related.length > 0) {
    const relatedMatches: Review[] = [];
    for (let i = 0; i < displayableReviews.length; i++) {
      const r = displayableReviews[i];
      if (seen.has(r.id)) {
        continue;
      }
      for (let j = 0; j < related.length; j++) {
        if (r.services.includes(related[j])) {
          relatedMatches.push(r);
          seen.add(r.id);
          break;
        }
      }
    }
    relatedMatches.sort(scoreComparator);
    for (let i = 0; i < relatedMatches.length; i++) {
      result.push(relatedMatches[i]);
    }
  }

  // 3. Remaining reviews (general fallback)
  for (let i = 0; i < allSortedReviews.length; i++) {
    if (!seen.has(allSortedReviews[i].id)) {
      result.push(allSortedReviews[i]);
    }
  }

  return result;
}

/** Pre-computed sorted review lists per service - O(1) access at runtime */
const sortedServiceReviews: Record<ServiceId, Review[]> = {
  'carpet-cleaning': buildServiceReviewList('carpet-cleaning'),
  'upholstery-cleaning': buildServiceReviewList('upholstery-cleaning'),
  'stain-removal': buildServiceReviewList('stain-removal'),
  'roof-cleaning': buildServiceReviewList('roof-cleaning'),
  'pressure-washing': buildServiceReviewList('pressure-washing'),
  'driveway-cleaning': buildServiceReviewList('driveway-cleaning'),
  'patio-cleaning': buildServiceReviewList('patio-cleaning'),
  'gutter-cleaning': buildServiceReviewList('gutter-cleaning'),
  'window-cleaning': buildServiceReviewList('window-cleaning'),
  'general': allSortedReviews,
};

// =============================================================================
// PUBLIC API (all O(1) or O(limit) operations)
// =============================================================================

const DEFAULT_LIMIT = 9;

/**
 * Get optimized reviews for a service page.
 * Returns pre-sorted reviews: service-specific → related → general fallback.
 * Runtime: O(limit) - just a slice of pre-computed array.
 *
 * @param serviceId - Service to get reviews for (defaults to 'general')
 * @param limit - Max reviews to return (default 9, use Infinity for all)
 */
export function getReviewsForService(serviceId?: ServiceId | string, limit = DEFAULT_LIMIT): Review[] {
  const key = (serviceId && serviceId in sortedServiceReviews ? serviceId : 'general') as ServiceId;
  const arr = sortedServiceReviews[key];
  return limit >= arr.length ? arr : arr.slice(0, limit);
}

/**
 * Get ALL optimized reviews for a service (no limit).
 * Use this when you need pagination/load-more functionality.
 * Runtime: O(1) - returns pre-computed array reference.
 */
export function getAllReviewsForService(serviceId?: ServiceId | string): Review[] {
  const key = (serviceId && serviceId in sortedServiceReviews ? serviceId : 'general') as ServiceId;
  return sortedServiceReviews[key];
}

/**
 * Get service-specific reviews ONLY (no fallback to related/general).
 * Use for SSR to ensure Google only indexes topically-relevant reviews.
 * Returns reviews sorted by quality score.
 */
export function getServiceSpecificReviews(serviceId: ServiceId | string): Review[] {
  if (serviceId === 'general' || !(serviceId in RELATED_SERVICES)) {
    return allSortedReviews;
  }
  // Filter to only reviews tagged with this specific service
  // Apply ensureRecentInTop to mix in the most recent for recency signal
  const filtered = displayableReviews
    .filter((r) => r.services.includes(serviceId as ServiceId))
    .sort(scoreComparator);
  return ensureRecentInTop(filtered);
}

/**
 * Get reviews filtered by service tag only (no fallback).
 * Runtime: O(n) but uses pre-filtered displayable reviews.
 */
export function getReviewsByServiceId(serviceId: ServiceId): Review[] {
  if (serviceId === 'general') {
    return displayableReviews;
  }
  return displayableReviews.filter((r) => r.services.includes(serviceId));
}

/** Get all displayable reviews sorted by quality score */
export function getAllReviews(): Review[] {
  return allSortedReviews;
}

/** Get total review count */
export function getReviewCount(): number {
  return reviews.length;
}

/** Get displayable review count by service */
export function getReviewCountByService(serviceId: ServiceId): number {
  return getReviewsByServiceId(serviceId).length;
}

// Legacy exports for backwards compatibility
export const serviceReviews: ServiceReviewsMap = {
  'carpet-cleaning': getReviewsByServiceId('carpet-cleaning'),
  'upholstery-cleaning': getReviewsByServiceId('upholstery-cleaning'),
  'stain-removal': getReviewsByServiceId('stain-removal'),
  'roof-cleaning': getReviewsByServiceId('roof-cleaning'),
  'pressure-washing': getReviewsByServiceId('pressure-washing'),
  'driveway-cleaning': getReviewsByServiceId('driveway-cleaning'),
  'patio-cleaning': getReviewsByServiceId('patio-cleaning'),
  'gutter-cleaning': getReviewsByServiceId('gutter-cleaning'),
  'window-cleaning': displayableReviews,
};
export const upholsteryReviews = serviceReviews['upholstery-cleaning'];

// =============================================================================
// REVIEW STATISTICS
// =============================================================================
export const reviewCountsByService = {
  'carpet-cleaning': getReviewsByServiceId('carpet-cleaning').length,
  'upholstery-cleaning': getReviewsByServiceId('upholstery-cleaning').length,
  'stain-removal': getReviewsByServiceId('stain-removal').length,
  'roof-cleaning': getReviewsByServiceId('roof-cleaning').length,
  'pressure-washing': getReviewsByServiceId('pressure-washing').length,
  'driveway-cleaning': getReviewsByServiceId('driveway-cleaning').length,
  'patio-cleaning': getReviewsByServiceId('patio-cleaning').length,
  'gutter-cleaning': getReviewsByServiceId('gutter-cleaning').length,
  'window-cleaning': displayableReviews.length,
  'general': reviews.filter((r) => r.services.includes('general')).length,
  total: reviews.length,
};

// =============================================================================
// LOCATION-BASED REVIEW FILTERING (for SEO pages)
// =============================================================================

/**
 * Maps postcode area prefixes to location names for display pills
 * Normalized to uppercase for matching
 */
const postcodeToLocation: Record<string, string> = {
  // Chelmsford area
  'CM1': 'Chelmsford', 'CM2': 'Chelmsford', 'CM3': 'Chelmsford',
  // Maldon area
  'CM9': 'Maldon',
  // Witham area
  'CM8': 'Witham',
  // Braintree area
  'CM7': 'Braintree',
  // Brentwood area
  'CM13': 'Brentwood', 'CM14': 'Brentwood', 'CM15': 'Brentwood',
  // Billericay area
  'CM11': 'Billericay', 'CM12': 'Billericay',
  // Harlow area
  'CM17': 'Harlow', 'CM18': 'Harlow', 'CM19': 'Harlow', 'CM20': 'Harlow',
  // Epping area
  'CM16': 'Epping',
  // Dunmow area
  'CM6': 'Dunmow',
  // Ingatestone area
  'CM4': 'Ingatestone',
  // Burnham-on-Crouch
  'CM0': 'Burnham-on-Crouch',
  // Southend area
  'SS0': 'Southend-on-Sea', 'SS1': 'Southend-on-Sea', 'SS2': 'Southend-on-Sea', 'SS3': 'Southend-on-Sea', 'SS9': 'Southend-on-Sea',
  // Rochford area
  'SS4': 'Rochford',
  // Hockley area
  'SS5': 'Hockley',
  // Rayleigh area
  'SS6': 'Rayleigh',
  // Benfleet area
  'SS7': 'Benfleet',
  // Canvey Island area
  'SS8': 'Canvey Island',
  // Wickford area
  'SS11': 'Wickford', 'SS12': 'Wickford',
  // Basildon area
  'SS13': 'Basildon', 'SS14': 'Basildon', 'SS15': 'Basildon', 'SS16': 'Basildon',
  // Stanford-le-Hope area
  'SS17': 'Stanford-le-Hope',
  // Romford area
  'RM1': 'Romford', 'RM2': 'Romford', 'RM3': 'Romford', 'RM7': 'Romford',
  // Hornchurch area
  'RM11': 'Hornchurch', 'RM12': 'Hornchurch',
  // Upminster area
  'RM14': 'Upminster',
  // South Ockendon area
  'RM15': 'South Ockendon',
  // Grays area
  'RM16': 'Grays', 'RM17': 'Grays', 'RM20': 'Grays',
  // Tilbury area
  'RM18': 'Tilbury',
  // Dagenham area
  'RM5': 'Dagenham', 'RM8': 'Dagenham', 'RM9': 'Dagenham', 'RM10': 'Dagenham',
  // Colchester area
  'CO1': 'Colchester', 'CO2': 'Colchester', 'CO3': 'Colchester', 'CO4': 'Colchester',
  // Clacton area
  'CO15': 'Clacton-on-Sea', 'CO16': 'Clacton-on-Sea',
  // Loughton area
  'IG10': 'Loughton',
  // Chigwell/Woodford area
  'IG7': 'Chigwell', 'IG8': 'Woodford',
};

/**
 * Get location name from postcode area
 */
export function getLocationFromPostcode(postcodeArea: string): string | null {
  const normalized = postcodeArea.toUpperCase().replace(/\s/g, '');
  // Extract just the area prefix (letters + numbers before any space or last letters)
  const match = normalized.match(/^([A-Z]{1,2}\d{1,2})/);
  if (!match) {return null;}
  return postcodeToLocation[match[1]] || null;
}

/**
 * Get reviews for a specific location (by postcode area or location slug)
 * Returns reviews that have location data matching the given criteria
 */
export function getReviewsForLocation(locationSlug: string, serviceId?: ServiceId): Review[] {
  const locationName = locationSlug.replace(/-/g, ' ').toLowerCase();

  return displayableReviews.filter((review) => {
    // Must have location data
    if (!review.location) {return false;}

    // Check if postcode maps to the requested location
    const reviewLocation = getLocationFromPostcode(review.location.postcodeArea);
    if (!reviewLocation) {return false;}

    const matches = reviewLocation.toLowerCase().replace(/-/g, ' ') === locationName;

    // If service specified, also filter by service
    if (serviceId && serviceId !== 'general') {
      return matches && review.services.includes(serviceId);
    }

    return matches;
  }).sort(scoreComparator);
}

/**
 * Get reviews for a service + location combination (for SEO pages)
 * Falls back to service-only reviews if no location-specific ones exist
 */
export function getReviewsForServiceAndLocation(
  serviceId: ServiceId,
  locationSlug: string,
  limit = DEFAULT_LIMIT
): Review[] {
  // First try to get location-specific reviews for this service
  const locationReviews = getReviewsForLocation(locationSlug, serviceId);

  if (locationReviews.length >= limit) {
    return locationReviews.slice(0, limit);
  }

  // Fill with service-specific reviews (excluding already included)
  const serviceReviewsList = getServiceSpecificReviews(serviceId);
  const seen = new Set(locationReviews.map(r => r.id));
  const result = [...locationReviews];

  for (const review of serviceReviewsList) {
    if (result.length >= limit) {break;}
    if (!seen.has(review.id)) {
      result.push(review);
      seen.add(review.id);
    }
  }

  return result;
}

// =============================================================================
// TESTIMONIALS (for homepage/marketing sections)
// =============================================================================
export const testimonials: {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}[] = [
  {
    id: '1',
    name: 'Charné Banger',
    role: 'Verified Customer',
    content: "Andy came to clean our upstairs carpets, and I couldn't be more delighted with the results. From the initial quote to the booking process and finally the cleaning itself, everything was seamless and exceptionally well handled. I can confidently and wholeheartedly recommend AquaPro Cleaning.",
    rating: 5,
  },
  {
    id: '2',
    name: 'Linda & Jim Matthews',
    role: 'Verified Customer',
    content: "We were very pleased with the quality of the products used, the workmanship and the final result achieved. We would highly recommend Aqua-Pro for their excellent performance and customer satisfaction.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Neresa Donovan',
    role: 'Verified Customer',
    content: "Awesome job! I had my roof & driveway cleaned. Blake was very informative, explaining step by step. I was very happy, pleased & would recommend them.",
    rating: 5,
  },
];
