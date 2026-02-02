// Services Configuration - Aquapro Cleaning service offerings
// Following Single Responsibility Principle - this file only handles service data

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  selfBookable: boolean;
  description: string;
  longDescription: string;
  icon: string;
  image?: string;
  benefits: string[];
  features: string[];
  idealFor: string[];
  process: ProcessStep[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  // Optional custom hero content
  hero?: {
    headline: string;
    subheadline?: string;
    description: string;
    checkpoints: string[];
    formTitle: string;
    trustBadges?: string[];
  };
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export const services: Service[] = [
  {
    id: 'carpet-cleaning',
    slug: 'carpet-cleaning',
    name: 'Carpet & Rug Cleaning',
    shortName: 'Carpets & Rugs',
    tagline: 'Professional Deep Clean with Stain Protection Included',
    selfBookable: true,
    description: 'Professional carpet cleaning and rug cleaning service for domestic and commercial properties. Hot water extraction removes stubborn stains, pet odours, and allergens. Family-run, fully insured, with 100% satisfaction guarantee.',
    longDescription: '<strong>Professional carpet cleaning</strong> that restores your carpets to like new condition. Our <strong>truck-mounted hot water extraction</strong> delivers the most thorough deep clean—far more powerful than portable cleaners. We remove <strong>stubborn stains, pet odours, and allergens</strong> with residue-free, eco-friendly solutions. <strong>Free stain protection treatment</strong> and deodoriser included. Family-run business with transparent pricing and no hidden fees.',
    icon: 'sparkles',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes stubborn stains & deep-seated dirt',
      'Eliminates pet stains, odours & allergens',
      'Rapid drying—resume daily activities fast',
      'Free stain protection treatment included',
      'Prolongs carpet & rug lifespan',
      'Child-safe & pet-safe cleaning solutions',
    ],
    features: [
      'Truck-mounted hot water extraction system',
      'High-powered suction & pressure extraction',
      'Thorough pre-treatment & stain targeting',
      'Residue-free eco-friendly solutions',
      'Free deodoriser & stain protector application',
      'Persian, Oriental & specialist rug cleaning',
    ],
    idealFor: [
      'Domestic & residential carpet cleaning',
      'Commercial offices & carpet tiles',
      'End of tenancy deep cleaning',
      'Pet owners with stains & odours',
      'Allergy sufferers & families with children',
      'Landlords & property managers',
    ],
    process: [
      { step: 1, title: 'Inspection & Quote', description: 'We assess your carpets, identify stubborn stains and problem areas, and provide transparent pricing with no hidden fees.' },
      { step: 2, title: 'Thorough Vacuuming & Pre-Treatment', description: 'Deep vacuuming followed by specialist pre-spray on high-traffic areas and tough stains including pet accidents.' },
      { step: 3, title: 'Hot Water Extraction Deep Clean', description: 'Our truck-mounted system delivers high-temperature cleaning with powerful suction—removes dirt, allergens, and residue from deep within carpet fibres.' },
      { step: 4, title: 'Grooming & Protection', description: 'Carpet pile is groomed for a fresh finish. Free stain protector application to protect your investment and prolong carpet longevity.' },
    ],
    faqs: [
      { question: 'What carpet cleaning method do you use?', answer: 'We use professional hot water extraction (HWE) with a truck-mounted cleaning system. This delivers high-temperature cleaning with powerful pressure and suction—far more effective than portable electric plug-in cleaners. The result is the most thorough deep clean that removes dirt from deep within carpet fibres.' },
      { question: 'Can you remove stubborn stains?', answer: 'Yes, we specialise in stubborn stain removal and specialist stain treatment. We tackle tough stains including food, drink, makeup, pet accidents, and more. Our pre-treatment solutions break down even the most stubborn marks. Some stains like bleach or dye are actually carpet damage—we\'ll always be honest about what to expect.' },
      { question: 'Do you remove pet stains and odours?', answer: 'Absolutely. Pet stain and odour removal is one of our specialities. We use enzyme treatments to neutralise pet urine odours at the source—not just mask unpleasant smells. Whether it\'s dog or cat accidents, we eliminate odours and restore carpets to fresh and spotless condition.' },
      { question: 'How long does carpet cleaning take to dry?', answer: 'Thanks to our high-powered extraction, carpets typically dry in 2-4 hours—much faster than typical drying times. Our rapid drying process means you can resume daily activities quickly. We use low-moisture techniques on delicate fibres for even faster results.' },
      { question: 'Is your carpet cleaning safe for children and pets?', answer: 'Yes, we use child-safe and pet-safe cleaning products. Our eco-friendly cleaning solutions are residue-free, non-toxic, and biodegradable. Safe and effective methods that are gentle on your family but tough on dirt and stains.' },
      { question: 'Do you clean rugs as well as carpets?', answer: 'Yes, we offer specialist rug cleaning for all types including Persian rugs, Oriental rugs, wool rugs, and delicate antique pieces. We also provide rug pickup and delivery service for convenient cleaning at our facility.' },
      { question: 'What about commercial carpet cleaning?', answer: 'We provide commercial carpet cleaning for offices, retail spaces, and businesses. This includes carpet tiles, large floor areas, and regular maintenance programs. Our truck-mounted system handles high-traffic commercial environments with ease.' },
      { question: 'Do you offer stain protection?', answer: 'Yes, free stain protection treatment is included with every clean. This stain protector application helps protect your investment, repels future spills, and prolongs carpet longevity. We call it our "clean and protect" package.' },
      { question: 'What\'s included in the price?', answer: 'Our transparent pricing includes everything: thorough vacuuming, pre-treatment of stains, hot water extraction deep clean, free deodoriser, free stain protector, and grooming. Fixed price with no hidden fees and no upsells—just honest, reliable service.' },
      { question: 'What if I\'m not happy with the results?', answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely happy, we\'ll return and re-clean for free. We\'re a family-run business built on customer satisfaction and genuine 5-star Google reviews—your trust matters to us.' },
      { question: 'Do you also clean hard floors?', answer: 'Yes, we offer floor cleaning services including Amtico cleaning, Karndean cleaning, tile and grout cleaning, and travertine tile cleaning. Ask us about our hard floor restoration services.' },
      { question: 'Why choose Aquapro over other carpet cleaners?', answer: 'We\'re a family-run, owner-operated business—not a franchise. You get personal service from trained and insured professionals. Our truck-mounted system delivers dramatically better results than portable machines. Plus transparent pricing, no sales gimmicks, and a genuine money-back guarantee. We\'re rated and recommended with hundreds of 5-star reviews.' },
    ],
    seo: {
      title: 'Professional Carpet Cleaning Essex | Deep Clean & Stain Removal | Aquapro',
      description: 'Professional carpet cleaning in Essex. Hot water extraction, stubborn stain removal, pet odour elimination. Free stain protection included. Family-run, 100% satisfaction guarantee. Free quotes.',
      keywords: ['carpet cleaning Essex', 'professional carpet cleaners', 'rug cleaning Essex', 'carpet stain removal', 'pet stain removal', 'carpet cleaning near me', 'deep carpet cleaning', 'commercial carpet cleaning', 'domestic carpet cleaning', 'hot water extraction'],
    },
  },
  {
    id: 'upholstery-cleaning',
    slug: 'upholstery-cleaning',
    name: 'Sofa & Upholstery Cleaning',
    shortName: 'Sofas & Upholstery',
    tagline: 'Professional Sofa, Couch & Furniture Cleaning',
    selfBookable: true,
    description: 'Professional sofa cleaning, couch cleaning, and upholstery cleaning for all fabric furniture. We clean sofas, settees, armchairs, recliners, and leather furniture.',
    longDescription: '<strong>Expert sofa and couch cleaning</strong> that removes embedded dirt, stains, and odours your vacuum can\'t reach. Whether you need a <strong>3-seater sofa cleaned</strong>, <strong>leather sofa restoration</strong>, or <strong>fabric armchair refresh</strong>—we handle all types. Safe for velvet, linen, cotton, microfibre, and leather.',
    icon: 'sofa',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Deep cleans sofas, couches & settees',
      'Removes stains from fabric furniture',
      'Eliminates pet odours from sofas',
      'Safe for leather & fabric upholstery',
      'Extends sofa and furniture lifespan',
      'Restores armchairs and recliners',
    ],
    features: [
      'Sofa & couch deep cleaning',
      'Leather sofa cleaning & conditioning',
      'Fabric armchair restoration',
      'Settee and loveseat cleaning',
      'Recliner and ottoman cleaning',
      'Cushion and throw pillow cleaning',
    ],
    idealFor: [
      '2-seater & 3-seater sofas',
      'Corner sofas & sectionals',
      'Leather & fabric armchairs',
      'Recliners & footstools',
      'Dining chairs & office chairs',
      'Mattresses & headboards',
    ],
    process: [
      { step: 1, title: 'Sofa Inspection', description: 'We assess your sofa or couch fabric type and test cleaning solutions in a hidden area.' },
      { step: 2, title: 'Pre-Treatment', description: 'Stains on your settee or armchair are pre-treated for maximum removal.' },
      { step: 3, title: 'Deep Clean', description: 'Your sofa, couch or upholstered furniture is thoroughly cleaned using fabric-appropriate methods.' },
      { step: 4, title: 'Drying & Finish', description: 'Fast-drying techniques ensure your furniture is ready to use quickly.' },
    ],
    faqs: [
      { question: 'How much does sofa cleaning cost?', answer: 'Sofa cleaning prices vary by size—2-seater sofas, 3-seater couches, and corner sofas are priced differently. Contact us for a free quote.' },
      { question: 'Can you clean leather sofas?', answer: 'Yes, we specialise in leather sofa cleaning and conditioning. We clean all leather furniture including sofas, armchairs, and recliners.' },
      { question: 'Do you clean fabric couches and settees?', answer: 'Yes, we clean all fabric types including velvet sofas, linen couches, cotton settees, and microfibre furniture.' },
      { question: 'How long does sofa cleaning take to dry?', answer: 'Most sofas and couches dry within 2-4 hours. We use low-moisture techniques to speed up drying time.' },
      { question: 'Can you remove pet stains from my couch?', answer: 'Yes, we specialise in pet stain and odour removal from sofas, couches, and all upholstered furniture.' },
      { question: 'Do you clean armchairs and recliners?', answer: 'Yes, we clean all upholstered furniture including armchairs, recliners, ottomans, footstools, and dining chairs.' },
    ],
    seo: {
      title: 'Sofa Cleaning & Upholstery Cleaning Essex | Couch Cleaners | Aquapro',
      description: 'Professional sofa cleaning in Essex. Couch cleaning, settee cleaning, leather sofa cleaning, armchair cleaning. All fabric furniture cleaned. Free quotes.',
      keywords: ['sofa cleaning Essex', 'couch cleaning', 'upholstery cleaning', 'settee cleaning', 'leather sofa cleaning', 'armchair cleaning', 'furniture cleaning near me', 'sofa cleaners Essex', 'fabric sofa cleaning'],
    },
  },
  {
    id: 'pressure-washing',
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortName: 'Pressure Washing',
    tagline: 'Powerful Results, No Surface Damage',
    selfBookable: false,
    description: 'Powerful pressure washing for driveways, patios, decking, and external surfaces. Remove years of grime in hours.',
    longDescription: '<strong>Removes moss, algae, oil stains, and years of grime</strong> from driveways, patios, and decking. <strong>Adjustable pressure won\'t damage surfaces</strong>. See the transformation in a single visit.',
    icon: 'droplets',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes moss, algae, and lichen',
      'Eliminates oil and grease stains',
      'Restores original surface appearance',
      'Improves property kerb appeal',
      'Prevents slip hazards',
      'Extends surface lifespan',
    ],
    features: [
      'Commercial-grade equipment',
      'Adjustable pressure settings',
      'Surface-appropriate techniques',
      'Eco-friendly detergents',
      'Re-sanding for block paving',
      'Sealing service available',
    ],
    idealFor: [
      'Block paving driveways',
      'Concrete driveways and paths',
      'Patios and courtyards',
      'Wooden decking',
      'Garden walls and fencing',
      'Commercial forecourts',
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'We inspect the surface type and condition to determine the best approach.' },
      { step: 2, title: 'Pre-treatment', description: 'Moss and algae are treated with biocide to kill growth at the root.' },
      { step: 3, title: 'Pressure Washing', description: 'Surfaces are thoroughly cleaned using appropriate pressure and techniques.' },
      { step: 4, title: 'Finishing', description: 'Block paving is re-sanded if needed, and optional sealing is applied.' },
    ],
    faqs: [
      { question: 'Will pressure washing damage my paving?', answer: 'No, we adjust pressure levels for each surface type to ensure safe, effective cleaning.' },
      { question: 'How long does a driveway take?', answer: 'An average driveway takes 2-4 hours depending on size and condition.' },
      { question: 'Do you offer sealing after washing?', answer: 'Yes, we offer sealing services to protect surfaces and keep them cleaner for longer.' },
      { question: 'Can you remove oil stains?', answer: 'Yes, we use specialist degreasers to treat and remove oil stains from driveways.' },
    ],
    seo: {
      title: 'Pressure Washing in Essex | Driveway & Patio Cleaning | Aquapro',
      description: 'Professional pressure washing in Essex. Driveways, patios, decking, and paths restored to new. Commercial equipment, great results. Free quotes.',
      keywords: ['pressure washing Essex', 'driveway cleaning', 'patio cleaning', 'jet washing', 'pressure washing near me'],
    },
  },
  {
    id: 'roof-cleaning',
    slug: 'roof-cleaning',
    name: 'Roof Cleaning & Moss Removal',
    shortName: 'Roof Cleaning',
    tagline: 'Professional Roof Moss Removal with 3-Year Guarantee',
    selfBookable: false,
    description: 'Professional roof cleaning and moss removal service. We remove moss, lichen, algae and organic growth from tiled rooftops using safe soft washing, manual scraping, and biocide treatment.',
    longDescription: '<strong>Professional roof moss removal</strong> that eradicates moss, lichen, and algae from your roof tiles. Choose from <strong>manual moss scraping</strong>, <strong>biocide treatment</strong>, or <strong>roof steam cleaning</strong>. Our low pressure roof cleaning methods prevent damage to old clay tiles, concrete tiles, and slate roofs. <strong>3-year moss-free guarantee</strong> included. Licensed waste removal—we hoover and bag all the moss.',
    icon: 'home',
    image: '/images/roof-cleaning-after.jpg',
    benefits: [
      'Eradicates moss, lichen & algae buildup',
      '3-year moss-free guarantee included',
      'Dramatic transformation of mossy roofs',
      'Prevents regrowth with biocide treatment',
      'Long-lasting preservation of roof tiles',
      'Licensed waste carriers remove all debris',
    ],
    features: [
      'Manual moss removal & scraping',
      'Biocide treatment application',
      'Low pressure soft washing for roofs',
      'Roof steam cleaning (hot pressure at low pressure)',
      'Safe access: MEWP, cherry picker, mobile tower',
      'PASMA & IPAF certified operatives',
    ],
    idealFor: [
      'Concrete tiles & clay roof tiles',
      'Slate roofs & man-made slates',
      'Old fragile clay tiles (listed buildings)',
      'Commercial & industrial rooftops',
      'Metal commercial rooftops',
      'Residential properties with conservatories',
    ],
    process: [
      { step: 1, title: 'Roof Survey & Fixed Quote', description: 'We assess moss buildup, roof tile type, access requirements, and provide a fixed-price written quote with no hidden costs.' },
      { step: 2, title: 'Safe Access Setup', description: 'Using mobile access towers, cherry pickers, or MEWP platforms as needed. Full insurance for working at height. PASMA & IPAF qualified.' },
      { step: 3, title: 'Moss Removal & Treatment', description: 'Moss scraped off roof tiles manually, then biocide treatment applied. Biocide starts working within 48 hours and continues over 6-12 months.' },
      { step: 4, title: 'Waste Removal & Aftercare', description: 'All moss hoovered, bagged and removed by licensed waste carriers. Site left clean and tidy. Aftercare plan available including 3-yearly gutter cleaning.' },
    ],
    faqs: [
      { question: 'What methods do you use for roof cleaning?', answer: 'We offer manual moss removal (moss scraped off tiles by hand), biocide treatment application, and roof steam cleaning (hot pressure washing at low pressure). The best method depends on your roof tile type and condition.' },
      { question: 'Is soft washing safe for old clay tiles?', answer: 'Yes, low pressure roof cleaning and soft washing for roofs is completely safe for old fragile clay tiles, including those on listed buildings from the 1700s. We never use high pressure that could damage tiles.' },
      { question: 'What do you remove from roofs?', answer: 'We remove moss, moss buildup, lichen, algae, biofilm, organic growth, atmospheric dirt, debris, and pollution staining from all roof types.' },
      { question: 'How long does biocide treatment take to work?', answer: 'Biocide treatment starts working within 48 hours, eliminating moss spores and preventing regrowth. The cleaning effect continues over the next 6-12 months as rain washes away dead growth.' },
      { question: 'Do you offer a moss-free guarantee?', answer: 'Yes, we provide a 3-year moss-free guarantee with our professional roof moss removal service, plus 100% satisfaction guarantee backed by our 5-star Google reviews.' },
      { question: 'How do you access the roof safely?', answer: 'We use safe methods of access including mobile access towers (PASMA qualified), cherry pickers, and MEWP platforms (IPAF certified). For short tasks, roof ladders with safety harnesses. Full insurance for operating at height.' },
      { question: 'What affects the cost of roof cleaning?', answer: 'Factors affecting cost include: cleaning method (steam vs manual scraping + biocide), access options (cherry picker vs mobile tower vs ladders), roof tile type (old clay is more time consuming), roof size, condition, steep roof pitch, and access complexity like conservatories underneath.' },
      { question: 'What happens to the moss waste?', answer: 'We are licensed waste carriers. All moss is hoovered and bagged, then removed from your property. The site is left clean and tidy with no mess.' },
      { question: 'Do you offer aftercare for roofs?', answer: 'Yes, we offer aftercare plans including 3-yearly gutter cleaning and repeat biocide treatment to keep your roof moss-free permanently. Regular maintenance prevents regrowth.' },
    ],
    seo: {
      title: 'Roof Cleaning & Moss Removal Essex | 3-Year Guarantee | Aquapro',
      description: 'Professional roof cleaning & moss removal in Essex. Manual scraping, biocide treatment, soft washing. Safe for clay, slate & concrete tiles. 3-year moss-free guarantee. Fixed-price quotes.',
      keywords: ['roof cleaning Essex', 'roof moss removal', 'roof cleaners', 'mossy roof cleaning', 'biocide treatment roof', 'soft washing roofs', 'roof cleaning service', 'roof cleaning near me', 'cost of roof cleaning', 'professional roof moss removal'],
    },
    hero: {
      headline: 'Make Your Roof Look Brand New Again',
      subheadline: 'Roof Cleaning Specialists',
      description: 'Our professional roof cleaning service removes moss, algae and black streaks, prevents costly repairs and brings your home back to life - backed by our 5 year moss-free guarantee.',
      checkpoints: [
        'Removes 100% of moss, algae & black streaks',
        'Stops moss falling onto your driveway, patio, and conservatory',
        'Moss-free roof backed by our 5-year guarantee',
        'All waste removed, no mess left behind',
      ],
      formTitle: 'Get a Free Roof Cleaning Quote',
      trustBadges: [
        'Insured for £5,000,000',
        'Roof tile replacement guarantee',
      ],
    },
  },
  {
    id: 'window-cleaning',
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    shortName: 'Windows',
    tagline: 'Streak-Free, Every Time',
    selfBookable: true,
    description: 'Crystal-clear window cleaning for homes and businesses using pure water technology.',
    longDescription: '<strong>Streak-free finish, no residue</strong>—windows stay cleaner longer. <strong>Reaches up to 4 storeys safely</strong> from the ground. <strong>Frames and sills included</strong> at no extra cost.',
    icon: 'square',
    image: '/images/blake-window-cleaning.jpg',
    benefits: [
      'Streak-free, sparkling finish',
      'Frames and sills included',
      'Reaches high windows safely',
      'Pure water leaves no residue',
      'Windows stay cleaner longer',
      'Regular service available',
    ],
    features: [
      'Pure water fed pole system',
      'Reaches up to 4 storeys',
      'Window frames cleaned',
      'Sills wiped down',
      'Conservatory cleaning',
      'Regular service plans',
    ],
    idealFor: [
      'Residential homes',
      'Flats and apartments',
      'Commercial premises',
      'Shop fronts',
      'Conservatories',
      'Office buildings',
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'We assess access, window types, and any specific requirements.' },
      { step: 2, title: 'Frame Cleaning', description: 'Window frames and sills are cleaned first to prevent dirty water running onto glass.' },
      { step: 3, title: 'Glass Cleaning', description: 'Pure water is applied via water-fed poles, agitating and rinsing the glass.' },
      { step: 4, title: 'Final Rinse', description: 'Windows are given a final rinse and left to dry streak-free naturally.' },
    ],
    faqs: [
      { question: 'What is pure water cleaning?', answer: 'Pure water has minerals removed, so it dries without leaving spots or streaks.' },
      { question: 'Do you clean inside windows?', answer: 'Yes, we offer inside window cleaning as an additional service.' },
      { question: 'How often should windows be cleaned?', answer: 'We recommend every 4-8 weeks for best results, but we offer one-off cleans too.' },
      { question: 'Can you reach high windows?', answer: 'Yes, our water-fed poles safely reach windows up to 4 storeys high.' },
    ],
    seo: {
      title: 'Window Cleaning in Essex | Pure Water Technology | Aquapro',
      description: 'Professional window cleaning in Essex. Streak-free results with pure water technology. Homes and businesses. Regular or one-off service. Free quotes.',
      keywords: ['window cleaning Essex', 'window cleaners', 'pure water window cleaning', 'commercial window cleaning', 'window cleaning near me'],
    },
  },
  {
    id: 'gutter-cleaning',
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    shortName: 'Gutters',
    tagline: 'Prevent Damage, Protect Your Home',
    selfBookable: false,
    description: 'High-reach gutter clearing to prevent blockages, leaks, and water damage.',
    longDescription: 'Professional gutter clearing using our high-reach vacuum system. No ladders on your property, wireless camera inspection included.',
    icon: 'droplets',
    image: '/images/blake-window-cleaning.jpg',
    benefits: [
      'Prevents water damage',
      'Extends gutter lifespan',
      'No ladders required',
      'Camera inspection included',
      'All debris removed',
      'Downpipes cleared',
    ],
    features: [
      'Wireless camera survey',
      'High-reach vacuum system',
      'No ladders required',
      'Downpipes unblocked',
      'Debris removed',
      'Before/after photos',
    ],
    idealFor: [
      'Residential homes',
      'Bungalows',
      'Multi-storey buildings',
      'Commercial premises',
      'Schools and offices',
      'Property management',
    ],
    process: [
      { step: 1, title: 'Camera Inspection', description: 'We survey your gutters with a wireless camera to assess blockage levels.' },
      { step: 2, title: 'Vacuum Clearing', description: 'High-reach vacuum removes leaves, moss, and debris without ladders.' },
      { step: 3, title: 'Downpipe Check', description: 'All downpipes are checked and cleared to ensure proper drainage.' },
      { step: 4, title: 'Final Inspection', description: 'Camera footage confirms gutters are clear, with before/after photos provided.' },
    ],
    faqs: [
      { question: 'Do you need to use ladders?', answer: 'No, we use high-reach vacuum systems that clean from ground level safely.' },
      { question: 'How often should gutters be cleaned?', answer: 'We recommend at least once a year, or twice if you have overhanging trees.' },
      { question: 'Can you clean conservatory gutters?', answer: 'Yes, our equipment reaches all types of guttering including conservatories.' },
      { question: 'Do you provide photos of the work?', answer: 'Yes, we provide before and after camera footage of your gutters.' },
    ],
    seo: {
      title: 'Gutter Cleaning in Essex | No Ladders Required | Aquapro',
      description: 'Professional gutter cleaning in Essex. High-reach vacuum system, no ladders needed. Camera inspection included. Free quotes available.',
      keywords: ['gutter cleaning Essex', 'gutter clearance', 'blocked gutters', 'gutter cleaning near me'],
    },
  },
  {
    id: 'stain-removal',
    slug: 'stain-removal',
    name: 'Stain Removal',
    shortName: 'Stain Removal',
    tagline: 'Stubborn Stains Eliminated',
    selfBookable: true,
    description: 'Targeted treatment for stubborn stains on carpets, upholstery, and hard surfaces.',
    longDescription: 'Expert stain removal for red wine, coffee, pet accidents, and more. Emergency service available for fresh spills.',
    icon: 'sparkles',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes stubborn stains',
      'Emergency service available',
      'Safe for fabrics',
      'Eco-friendly products',
      'No residue left behind',
      'Results guaranteed',
    ],
    features: [
      'Red wine removal',
      'Coffee and tea stains',
      'Pet stain treatment',
      'Emergency callout',
      'Enzyme treatments',
      'Odour elimination',
    ],
    idealFor: [
      'Red wine spills',
      'Coffee and tea stains',
      'Pet accidents',
      'Ink stains',
      'Food stains',
      'Unknown stains',
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'We identify the stain type and test the best removal approach.' },
      { step: 2, title: 'Pre-treatment', description: 'Specialist products are applied to break down the stain.' },
      { step: 3, title: 'Treatment', description: 'Using appropriate techniques, we work to remove the stain completely.' },
      { step: 4, title: 'Neutralising', description: 'Area is neutralised and dried to prevent any residue or resoiling.' },
    ],
    faqs: [
      { question: 'Can you remove all stains?', answer: 'Most stains can be removed or significantly reduced. Some permanent stains like bleach damage cannot be reversed.' },
      { question: 'Do you offer emergency service?', answer: 'Yes, we offer same-day callouts for fresh spills when possible.' },
      { question: 'Is it safe for my carpet?', answer: 'Yes, we test all products in a hidden area first and use appropriate methods for each fibre type.' },
      { question: 'What if the stain doesn\'t come out?', answer: 'We\'ll be honest about what\'s achievable. If a stain is permanent, we\'ll let you know before starting.' },
    ],
    seo: {
      title: 'Stain Removal in Essex | Emergency Service | Aquapro',
      description: 'Professional stain removal in Essex. Red wine, coffee, pet stains, and more. Emergency service available. Free quotes.',
      keywords: ['stain removal Essex', 'carpet stain removal', 'pet stain removal', 'stain cleaning near me'],
    },
  },
  {
    id: 'driveway-cleaning',
    slug: 'driveway-cleaning',
    name: 'Driveway Cleaning',
    shortName: 'Driveways',
    tagline: 'Restore Your Driveway to Like-New Condition',
    selfBookable: false,
    description: 'Professional driveway cleaning for block paving, concrete, tarmac, and resin driveways. Remove moss, oil stains, and years of grime. Re-sanding and sealing available.',
    longDescription: '<strong>Transform your driveway</strong> with our professional driveway cleaning service. We remove <strong>moss, algae, weeds, oil stains, and years of built-up grime</strong> from all driveway types including <strong>block paving, concrete, tarmac, resin, and gravel</strong>. Our <strong>commercial-grade pressure washing</strong> equipment delivers stunning results. <strong>Re-sanding and sealing services</strong> available to protect your investment and keep your driveway looking great for longer.',
    icon: 'car',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes moss, algae, and weeds',
      'Eliminates oil and tyre marks',
      'Restores original colour and appearance',
      'Dramatically improves kerb appeal',
      'Prevents slip hazards',
      'Extends driveway lifespan',
    ],
    features: [
      'Block paving deep cleaning',
      'Concrete driveway restoration',
      'Tarmac and asphalt cleaning',
      'Resin driveway specialist',
      'Re-sanding service for block paving',
      'Protective sealing available',
    ],
    idealFor: [
      'Block paving driveways',
      'Concrete driveways',
      'Tarmac and asphalt driveways',
      'Resin bound driveways',
      'Gravel driveways (weed removal)',
      'Shared driveways and forecourts',
    ],
    process: [
      { step: 1, title: 'Assessment & Quote', description: 'We inspect your driveway, identify problem areas like oil stains or heavy moss, and provide a fixed-price quote.' },
      { step: 2, title: 'Weed & Moss Treatment', description: 'Weeds are removed and moss is treated with biocide to kill growth at the root and prevent regrowth.' },
      { step: 3, title: 'Pressure Washing', description: 'Commercial-grade pressure washing removes dirt, stains, and organic growth. Pressure adjusted for your surface type.' },
      { step: 4, title: 'Finishing Touches', description: 'Block paving is re-sanded to stabilise joints. Optional sealing applied to protect and enhance appearance.' },
    ],
    faqs: [
      { question: 'How much does driveway cleaning cost?', answer: 'Prices depend on size, condition, and driveway type. A typical 2-car driveway costs £150-£300. We provide free quotes with no obligation.' },
      { question: 'Will pressure washing damage my block paving?', answer: 'No, we use appropriate pressure settings for each surface. Block paving is cleaned safely, and we re-sand the joints afterwards to restore stability.' },
      { question: 'Can you remove oil stains from my driveway?', answer: 'Yes, we use specialist degreasers to treat and remove oil stains. Fresh stains remove completely; old stains are significantly reduced.' },
      { question: 'How long does driveway cleaning take?', answer: 'Most driveways take 2-4 hours depending on size and condition. Larger or heavily soiled driveways may take longer.' },
      { question: 'Do you clean tarmac driveways?', answer: 'Yes, we clean tarmac and asphalt driveways using lower pressure settings to avoid surface damage while still removing moss and grime.' },
      { question: 'What is re-sanding and do I need it?', answer: 'Re-sanding fills the joints between block paving with kiln-dried sand. This stabilises blocks, prevents weed growth, and is included for block paving cleans.' },
      { question: 'Do you offer driveway sealing?', answer: 'Yes, we offer sealing as an optional extra. Sealing protects your driveway from stains, enhances colour, and makes future cleaning easier.' },
      { question: 'How often should I have my driveway cleaned?', answer: 'We recommend every 1-2 years depending on tree coverage, shade, and traffic. North-facing driveways may need annual cleaning.' },
    ],
    seo: {
      title: 'Driveway Cleaning Essex | Block Paving & Concrete | Aquapro',
      description: 'Professional driveway cleaning in Essex. Block paving, concrete, tarmac, resin driveways restored. Moss removal, oil stain treatment, re-sanding & sealing. Free quotes.',
      keywords: ['driveway cleaning Essex', 'block paving cleaning', 'driveway pressure washing', 'driveway cleaning near me', 'driveway jet washing', 'paving cleaning', 'oil stain removal driveway'],
    },
  },
  {
    id: 'patio-cleaning',
    slug: 'patio-cleaning',
    name: 'Patio Cleaning',
    shortName: 'Patios',
    tagline: 'Revive Your Patio for Summer',
    selfBookable: false,
    description: 'Professional patio cleaning for slabs, natural stone, porcelain, and decking. Remove green algae, black spots, and weathered grime. Restore your outdoor space.',
    longDescription: '<strong>Bring your patio back to life</strong> with our professional patio cleaning service. We restore <strong>concrete slabs, Indian sandstone, porcelain tiles, limestone, slate, and natural stone</strong> to their original beauty. Our specialist treatments remove <strong>green algae, black spot, lichen, and years of weathering</strong>. <strong>Safe cleaning methods</strong> for all patio types—no damage to pointing or delicate stone. <strong>Sealing available</strong> to protect your patio and enhance colour.',
    icon: 'sun',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes green algae and black spot',
      'Restores natural stone colour',
      'Eliminates slip hazards',
      'Transforms outdoor living space',
      'Extends patio lifespan',
      'Ready for entertaining',
    ],
    features: [
      'Concrete slab patio cleaning',
      'Indian sandstone restoration',
      'Porcelain tile cleaning',
      'Natural stone specialist',
      'Black spot treatment',
      'Patio sealing available',
    ],
    idealFor: [
      'Concrete paving slabs',
      'Indian sandstone patios',
      'Porcelain patio tiles',
      'Limestone and travertine',
      'Slate patios',
      'York stone and flagstones',
    ],
    process: [
      { step: 1, title: 'Patio Assessment', description: 'We identify your patio material, assess condition, and note any delicate areas like loose pointing or soft stone.' },
      { step: 2, title: 'Pre-Treatment', description: 'Algae and black spot are pre-treated with specialist cleaning solutions to break down organic growth.' },
      { step: 3, title: 'Surface Cleaning', description: 'Pressure washing with surface cleaners for even results. Pressure adjusted for stone type—gentle on sandstone, thorough on concrete.' },
      { step: 4, title: 'Finishing & Protection', description: 'Edges detailed, furniture areas cleaned. Optional sealing enhances colour and protects against future staining.' },
    ],
    faqs: [
      { question: 'How much does patio cleaning cost?', answer: 'Patio cleaning typically costs £3-£6 per square metre depending on size and condition. We provide free quotes based on your specific patio.' },
      { question: 'Can you clean Indian sandstone safely?', answer: 'Yes, we specialise in Indian sandstone patio cleaning. We use appropriate pressure and techniques to avoid damaging the soft stone or disturbing pointing.' },
      { question: 'What causes black spots on my patio?', answer: 'Black spots are typically lichen—a stubborn organism that bonds to stone. We use specialist treatments to remove black spot without damaging your patio.' },
      { question: 'Will pressure washing damage my pointing?', answer: 'We take care around pointing and use appropriate pressure. If pointing is already loose, we\'ll let you know before starting.' },
      { question: 'How long does patio cleaning take?', answer: 'Most patios take 2-4 hours. Larger patios or those with heavy black spot may take longer due to treatment time.' },
      { question: 'Do you clean porcelain patios?', answer: 'Yes, porcelain tiles clean beautifully and are very durable. We restore porcelain patios to showroom condition.' },
      { question: 'Should I seal my patio after cleaning?', answer: 'Sealing is optional but recommended for natural stone like sandstone and limestone. It protects against staining and makes future cleaning easier.' },
      { question: 'Can you clean around garden furniture?', answer: 'Yes, we clean around furniture or you can move it beforehand. We take care around plants and garden features.' },
    ],
    seo: {
      title: 'Patio Cleaning Essex | Slabs, Sandstone & Stone | Aquapro',
      description: 'Professional patio cleaning in Essex. Concrete slabs, Indian sandstone, porcelain, natural stone restored. Black spot removal, algae treatment. Free quotes.',
      keywords: ['patio cleaning Essex', 'patio pressure washing', 'Indian sandstone cleaning', 'patio cleaning near me', 'black spot removal patio', 'stone patio cleaning', 'patio jet washing'],
    },
  },
  {
    id: 'solar-panel-cleaning',
    slug: 'solar-panel-cleaning',
    name: 'Solar Panel Cleaning',
    shortName: 'Solar Panels',
    tagline: 'Maximise Your Solar Energy Output',
    selfBookable: false,
    description: 'Professional solar panel cleaning to restore efficiency and maximise energy output. Safe pure water cleaning for all panel types. Improve performance by up to 30%.',
    longDescription: '<strong>Boost your solar panel efficiency</strong> with professional cleaning. Dirty panels can lose <strong>up to 30% of their energy output</strong> due to bird droppings, dust, pollen, and general grime. Our <strong>pure water cleaning system</strong> safely removes all contamination without scratching or damaging panels. <strong>No chemicals, no residue</strong>—just pure deionised water that dries spot-free. We clean <strong>roof-mounted and ground-mounted systems</strong> for homes and businesses.',
    icon: 'sun',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Restores up to 30% lost efficiency',
      'Maximises energy generation',
      'Extends panel lifespan',
      'No chemicals or scratching',
      'Removes bird droppings safely',
      'Protects your investment',
    ],
    features: [
      'Pure water cleaning system',
      'Soft brush technology',
      'No chemicals used',
      'Safe for all panel types',
      'Roof and ground mount systems',
      'Before/after output comparison',
    ],
    idealFor: [
      'Residential solar installations',
      'Commercial solar arrays',
      'Solar farms',
      'Panels under trees (pollen/sap)',
      'Coastal properties (salt buildup)',
      'Properties near busy roads',
    ],
    process: [
      { step: 1, title: 'System Assessment', description: 'We assess your solar installation, check panel condition, and identify contamination types like bird droppings or lichen.' },
      { step: 2, title: 'Safe Access', description: 'Using water-fed poles from the ground where possible, or safe roof access for larger installations.' },
      { step: 3, title: 'Pure Water Cleaning', description: 'Panels are gently cleaned with pure deionised water and soft brushes. No chemicals, no pressure washing, no risk of damage.' },
      { step: 4, title: 'Final Rinse & Check', description: 'Panels are rinsed and left to dry spot-free. We check for any damage and provide maintenance recommendations.' },
    ],
    faqs: [
      { question: 'How much efficiency do dirty solar panels lose?', answer: 'Studies show dirty panels can lose 15-30% efficiency. Bird droppings are particularly harmful as they block cells completely, creating "hot spots" that reduce output.' },
      { question: 'How often should solar panels be cleaned?', answer: 'We recommend cleaning every 6-12 months. Panels near trees, busy roads, or the coast may need more frequent cleaning due to pollen, dust, or salt buildup.' },
      { question: 'Is it safe to pressure wash solar panels?', answer: 'No—we never use pressure washers on solar panels. High pressure can crack glass or damage seals. We use gentle pure water cleaning with soft brushes only.' },
      { question: 'What is pure water cleaning?', answer: 'Pure water (deionised water) has minerals removed, so it dries without leaving spots or residue. It\'s the safest and most effective method for solar panels.' },
      { question: 'Can you clean panels on my roof?', answer: 'Yes, we clean roof-mounted panels using telescopic water-fed poles from the ground where possible, keeping our team safe and avoiding roof damage.' },
      { question: 'Do you clean commercial solar installations?', answer: 'Yes, we clean commercial solar arrays of all sizes, from office rooftops to large solar farms. Regular cleaning contracts available.' },
      { question: 'Will cleaning void my panel warranty?', answer: 'No—pure water cleaning is the manufacturer-recommended method. Using chemicals or pressure washers could void warranties, but our method is completely safe.' },
      { question: 'How much does solar panel cleaning cost?', answer: 'Residential systems typically cost £5-£10 per panel depending on access and quantity. We provide free quotes based on your installation.' },
    ],
    seo: {
      title: 'Solar Panel Cleaning Essex | Restore Efficiency | Aquapro',
      description: 'Professional solar panel cleaning in Essex. Pure water cleaning, no chemicals. Restore up to 30% lost efficiency. Safe for all panels. Free quotes.',
      keywords: ['solar panel cleaning Essex', 'solar panel cleaners', 'clean solar panels', 'solar panel cleaning near me', 'solar panel washing', 'photovoltaic cleaning', 'PV panel cleaning'],
    },
  },
  {
    id: 'conservatory-cleaning',
    slug: 'conservatory-cleaning',
    name: 'Conservatory Cleaning',
    shortName: 'Conservatories',
    tagline: 'Crystal Clear Roof & Sparkling Glass',
    selfBookable: false,
    description: 'Professional conservatory cleaning for roofs, glass panels, frames, and gutters. Remove green algae, bird droppings, and years of grime. Restore your conservatory to like-new condition.',
    longDescription: '<strong>Transform your conservatory</strong> with our complete cleaning service. We clean <strong>polycarbonate roofs, glass roofs, UPVC frames, and all glass panels</strong>. Remove <strong>green algae, moss, bird droppings, and built-up grime</strong> that blocks light and makes your conservatory look tired. Our <strong>pure water system</strong> leaves glass streak-free and frames sparkling. We also clean <strong>conservatory gutters</strong> to prevent overflow and damp issues.',
    icon: 'home',
    image: '/images/blake-window-cleaning.jpg',
    benefits: [
      'Restores natural light',
      'Removes green algae and moss',
      'Cleans roof, glass, and frames',
      'Streak-free finish',
      'Prevents gutter overflow',
      'Extends conservatory lifespan',
    ],
    features: [
      'Polycarbonate roof cleaning',
      'Glass roof restoration',
      'UPVC frame cleaning',
      'All glass panels cleaned',
      'Conservatory gutter clearing',
      'Pure water system',
    ],
    idealFor: [
      'Polycarbonate roof conservatories',
      'Glass roof conservatories',
      'Lean-to conservatories',
      'Victorian conservatories',
      'Edwardian conservatories',
      'Orangeries and garden rooms',
    ],
    process: [
      { step: 1, title: 'Assessment', description: 'We inspect your conservatory roof type, glass condition, and identify problem areas like algae buildup or blocked gutters.' },
      { step: 2, title: 'Gutter Clearing', description: 'Conservatory gutters are cleared of leaves and debris to prevent overflow and water damage.' },
      { step: 3, title: 'Roof Cleaning', description: 'Polycarbonate or glass roof is cleaned using soft brushes and pure water. Algae and moss gently removed without damage.' },
      { step: 4, title: 'Glass & Frames', description: 'All glass panels and UPVC frames are cleaned inside and out (exterior standard, interior optional). Streak-free finish guaranteed.' },
    ],
    faqs: [
      { question: 'How much does conservatory cleaning cost?', answer: 'Prices depend on size and condition. A typical conservatory costs £100-£200 for exterior roof, glass, and frames. We provide free quotes.' },
      { question: 'Can you clean polycarbonate roofs?', answer: 'Yes, we specialise in polycarbonate roof cleaning. We use soft brushes and pure water to remove algae without scratching the surface.' },
      { question: 'Do you clean glass conservatory roofs?', answer: 'Yes, glass roofs are cleaned using our pure water system for a streak-free finish. We take care around seals and framework.' },
      { question: 'Will you clean inside the conservatory too?', answer: 'Exterior cleaning is included as standard. Interior glass cleaning is available as an optional extra—just let us know when booking.' },
      { question: 'How do you reach the roof safely?', answer: 'We use telescopic water-fed poles to clean conservatory roofs safely from the ground. No ladders on your conservatory roof.' },
      { question: 'Can you remove green algae from my conservatory?', answer: 'Yes, green algae is one of the most common issues. Our cleaning removes algae completely and restores light transmission through the roof.' },
      { question: 'Do you clean conservatory gutters?', answer: 'Yes, we include conservatory gutter clearing as part of our service. Blocked gutters cause overflow and can lead to damp problems.' },
      { question: 'How often should I have my conservatory cleaned?', answer: 'We recommend every 6-12 months depending on tree coverage and location. North-facing conservatories may need more frequent cleaning.' },
    ],
    seo: {
      title: 'Conservatory Cleaning Essex | Roof & Glass Specialists | Aquapro',
      description: 'Professional conservatory cleaning in Essex. Polycarbonate roofs, glass panels, UPVC frames. Algae removal, gutter clearing included. Free quotes.',
      keywords: ['conservatory cleaning Essex', 'conservatory roof cleaning', 'polycarbonate roof cleaning', 'conservatory cleaners near me', 'glass conservatory cleaning', 'UPVC conservatory cleaning'],
    },
  },
  {
    id: 'mattress-cleaning',
    slug: 'mattress-cleaning',
    name: 'Mattress Cleaning',
    shortName: 'Mattresses',
    tagline: 'Deep Clean for a Healthier Sleep',
    selfBookable: true,
    description: 'Professional mattress cleaning to remove dust mites, allergens, stains, and odours. Deep sanitisation for a healthier night\'s sleep. All mattress sizes and types cleaned.',
    longDescription: '<strong>Sleep healthier with a professionally cleaned mattress</strong>. Your mattress harbours <strong>dust mites, dead skin, sweat, and allergens</strong> that vacuuming alone can\'t remove. Our <strong>deep extraction cleaning</strong> removes embedded dirt, <strong>sanitises against bacteria</strong>, and eliminates odours. We treat <strong>urine stains, sweat marks, and blood stains</strong> with specialist solutions. Safe for <strong>memory foam, spring, hybrid, and all mattress types</strong>. Wake up fresher.',
    icon: 'bed',
    image: '/images/blake-van-image.jpg',
    benefits: [
      'Removes dust mites and allergens',
      'Eliminates sweat and odour',
      'Treats urine and stain marks',
      'Sanitises and freshens',
      'Improves sleep quality',
      'Extends mattress lifespan',
    ],
    features: [
      'Deep extraction cleaning',
      'Dust mite treatment',
      'Stain removal specialists',
      'Anti-bacterial sanitisation',
      'Odour elimination',
      'All mattress types and sizes',
    ],
    idealFor: [
      'Allergy and asthma sufferers',
      'Families with young children',
      'Pet owners',
      'Guest bedrooms and Airbnb',
      'Landlords between tenants',
      'Anyone wanting a fresher sleep',
    ],
    process: [
      { step: 1, title: 'Inspection', description: 'We inspect your mattress for stains, odours, and problem areas. Identify mattress type to select appropriate cleaning method.' },
      { step: 2, title: 'Vacuuming', description: 'Thorough vacuuming with HEPA filtration removes surface dust, dead skin cells, and loose debris.' },
      { step: 3, title: 'Stain Treatment', description: 'Stains from sweat, urine, blood, or spills are pre-treated with specialist enzyme solutions.' },
      { step: 4, title: 'Deep Clean & Sanitise', description: 'Deep extraction cleaning removes embedded dirt. Anti-bacterial treatment sanitises the mattress. Left fresh and ready to use.' },
    ],
    faqs: [
      { question: 'How much does mattress cleaning cost?', answer: 'Single mattress from £40, double from £50, king size from £60. We offer discounts for multiple mattresses. Contact us for a quote.' },
      { question: 'Can you remove urine stains from a mattress?', answer: 'Yes, we specialise in urine stain and odour removal using enzyme treatments that break down uric acid. Fresh stains remove completely; older stains are significantly reduced.' },
      { question: 'Is mattress cleaning safe for memory foam?', answer: 'Yes, we use low-moisture techniques safe for memory foam, latex, hybrid, and traditional spring mattresses. No saturation that could damage foam.' },
      { question: 'How long does a mattress take to dry?', answer: 'Mattresses are typically dry within 2-4 hours. We use extraction methods that remove most moisture, so you can sleep on it the same day.' },
      { question: 'Can mattress cleaning help with allergies?', answer: 'Yes, professional cleaning removes dust mites, their droppings, and allergens that trigger allergies and asthma. Many customers report improved sleep and reduced symptoms.' },
      { question: 'How often should mattresses be cleaned?', answer: 'We recommend professional cleaning every 6-12 months. More frequently if you have allergies, pets on the bed, or young children.' },
      { question: 'Do you clean pillows and duvets too?', answer: 'We focus on mattress cleaning, but can clean upholstered headboards. For pillows and duvets, we recommend professional laundering.' },
      { question: 'Can you remove blood stains from a mattress?', answer: 'Yes, we treat blood stains with specialist solutions. Fresh stains usually remove completely; set-in stains are significantly lightened.' },
    ],
    seo: {
      title: 'Mattress Cleaning Essex | Dust Mite & Stain Removal | Aquapro',
      description: 'Professional mattress cleaning in Essex. Remove dust mites, allergens, urine stains, and odours. All sizes cleaned. Healthier sleep guaranteed. Free quotes.',
      keywords: ['mattress cleaning Essex', 'mattress cleaners', 'mattress stain removal', 'dust mite removal', 'mattress cleaning near me', 'urine stain mattress', 'clean mattress service'],
    },
  },
];

// Service Clusters for Internal Linking Strategy
export type ServiceCluster = 'interior' | 'exterior';

export const serviceClusters: Record<ServiceCluster, string[]> = {
  interior: ['carpet-cleaning', 'upholstery-cleaning', 'mattress-cleaning', 'stain-removal'],
  exterior: ['roof-cleaning', 'pressure-washing', 'driveway-cleaning', 'patio-cleaning', 'gutter-cleaning', 'window-cleaning', 'solar-panel-cleaning', 'conservatory-cleaning'],
};

export const clusterNames: Record<ServiceCluster, string> = {
  interior: 'Interior Cleaning',
  exterior: 'Exterior Cleaning',
};

// Helper functions following Interface Segregation Principle
export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map(service => service.slug);
};

export const getServiceNavItems = () => {
  return services.map(service => ({
    label: service.name,
    href: `/services/${service.slug}`,
  }));
};

// Get the cluster a service belongs to
export const getServiceCluster = (serviceId: string): ServiceCluster | undefined => {
  if (serviceClusters.interior.includes(serviceId)) {
    return 'interior';
  }
  if (serviceClusters.exterior.includes(serviceId)) {
    return 'exterior';
  }
  return undefined;
};

// Get related services from the same cluster
export const getRelatedServices = (serviceId: string, limit?: number): Service[] => {
  const cluster = getServiceCluster(serviceId);
  if (!cluster) {
    return [];
  }

  const relatedIds = serviceClusters[cluster].filter(id => id !== serviceId);
  const related = relatedIds.map(id => getServiceById(id)).filter((s): s is Service => !!s);

  return limit ? related.slice(0, limit) : related;
};

// Get services from other clusters (for cross-cluster linking)
export const getCrossClusterServices = (serviceId: string, limit?: number): Service[] => {
  const cluster = getServiceCluster(serviceId);
  if (!cluster) {
    return [];
  }

  const otherCluster: ServiceCluster = cluster === 'interior' ? 'exterior' : 'interior';
  const crossIds = serviceClusters[otherCluster];
  const cross = crossIds.map(id => getServiceById(id)).filter((s): s is Service => !!s);

  return limit ? cross.slice(0, limit) : cross;
};

// Get other services (excluding current) - for location pages
export const getOtherServices = (serviceId: string): Service[] => {
  return services.filter(s => s.id !== serviceId);
};

// Get services by cluster
export const getServicesByCluster = (cluster: ServiceCluster): Service[] => {
  return serviceClusters[cluster]
    .map(id => getServiceById(id))
    .filter((s): s is Service => !!s);
};
