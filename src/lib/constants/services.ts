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
    hero: {
      headline: 'Carpets Stained or Faded?',
      subheadline: "We'll Bring Them Back to Life",
      description: 'Deep extraction cleaning that removes what vacuuming leaves behind. Stains, odours, allergens — gone. Dry in hours, not days.',
      checkpoints: [
        'Stains, dirt & odours removed — or we re-clean free',
        'Dry in hours — use your rooms the same day',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Carpet Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
    benefits: [
      'Removes What Vacuuming Can\'t',
      'Deep extraction pulls out ground-in dirt, stains, and allergens that regular cleaning misses.',
      'Dry in Hours, Not Days',
      'Walk on your carpets the same day. Our system extracts 95% of moisture on the spot.',
      'Safe for Kids, Pets & Allergy Sufferers',
      'Non-toxic solutions that eliminate dust mites, bacteria, and odours at the source.',
    ],
    features: [
      'Deep hot water extraction clean',
      'Free deodoriser treatment included',
      'Pre-treatment of all stains & high-traffic areas',
      'Residue-free eco-friendly solutions',
      'Persian, Oriental & specialist rug cleaning',
      '99.9% sanitisation & allergen removal',
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
      { step: 1, title: 'Free, No-Obligation Quote', description: 'Tell us what needs cleaning and we\'ll give you a personalised, fixed-price quote — no pressure. Just expert advice and fair, transparent pricing with no hidden costs.' },
      { step: 2, title: 'Specialist Carpet Clean + Free Deodoriser', description: 'Our specialist cleaner gets to work using advanced, commercial-grade equipment. We remove deep stubborn dirt, stains, and odours — leaving your carpets fresh and revitalised.' },
      { step: 3, title: 'Fresh Carpets + 100% Satisfaction Guarantee', description: 'Most carpets dry in just a couple of hours. You\'ll be left with soft, fresh, like-new carpets backed by our 100% satisfaction guarantee. If you\'re not happy, we\'ll re-clean for free.' },
    ],
    faqs: [
      { question: 'What areas do you cover?', answer: 'We cover most of Essex including Chelmsford, Southend, Basildon, Colchester, Brentwood, and surrounding areas. Just pop your postcode in the quote form — we\'ll let you know straight away if we can help.' },
      { question: 'Is professional carpet cleaning safe for my carpets?', answer: 'Absolutely. We use advanced, professional-grade machines with low-moisture and hot water extraction methods tailored to your carpet type — safe for wool, synthetic, and delicate blends. We assess every carpet before we start.' },
      { question: 'How long does carpet cleaning take?', answer: 'Most homes are done in 2-3 hours, depending on the number and size of rooms. You\'ll get an exact time estimate before we begin, so you can plan your day.' },
      { question: 'How long do carpets take to dry?', answer: 'You can walk on your carpets in as little as 30-90 minutes. Wool and thicker piles may take a bit longer. Thanks to our high-powered extraction and low-moisture systems, we\'re faster than most.' },
      { question: 'Will carpet cleaning remove stains and odours?', answer: 'Yes — we remove most common stains including food, drink, mud, and pet accidents. We also eliminate deep-set odours with 99.9% sanitisation and free deodorising. Some marks like bleach or chemical damage can\'t be fully removed — we\'ll always be upfront about what\'s possible.' },
      { question: 'Can you remove pet urine and smells?', answer: 'Yes — it\'s one of our specialities. We use targeted enzyme treatments that break down urine at the source, not just mask it. If your dog or cat has had accidents, we can help.' },
      { question: 'What if the stains don\'t come out?', answer: 'Some stains can be permanent, especially older ones — but we\'ll tell you upfront what to expect. If you\'re not happy with the results, we\'ll re-clean the area for free. No questions asked.' },
      { question: 'Do I need to move furniture before you arrive?', answer: 'No need. We\'ll work around large furniture and move smaller pieces ourselves. If you\'d like us to clean under heavier items, just mention it when booking and we\'ll sort it.' },
      { question: 'Do I need to be home during the clean?', answer: 'Not necessarily. As long as we have access, we can get the job done while you\'re out — many customers leave a key or use a lockbox. We\'ll send before and after photos so you can see the results.' },
      { question: 'What\'s included in the price?', answer: 'Everything. A full deep clean, free pre-treatment and stain targeting, free deodoriser, 99.9% sanitisation, and our 100% satisfaction guarantee — one fixed price, no hidden costs, no upsells.' },
      { question: 'Is it safe for children, pets, and allergy sufferers?', answer: 'Yes. We use child and pet-safe solutions that are biodegradable and non-toxic. Great for families, asthmatics, and allergy sufferers — you\'ll notice the difference in air quality.' },
      { question: 'Will my carpets shrink or get damaged?', answer: 'No. We use modern, fibre-safe methods matched to your carpet type. We never over-wet or apply heat that could cause shrinkage. Delicate or natural fibres get low-moisture techniques for extra care.' },
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
    hero: {
      headline: 'Sofa Looking Tired and Stained?',
      subheadline: "We'll Make It Look New Again",
      description: 'Our upholstery cleaners remove deep-set dirt, stubborn stains, and pet odours that DIY methods can\'t touch. Safe for all fabrics — leather, velvet, linen, and more.',
      checkpoints: [
        'Stains and odours removed — or we re-clean free',
        'Safe for all fabrics including leather and velvet',
        'Dry in hours — use your sofa the same day',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Sofa Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Sofa Cleaning Quote', description: 'We assess your sofa, couch, or armchair and provide a fixed-price quote. No obligation, no pressure.' },
      { step: 2, title: 'Deep Clean & Odour Removal', description: 'Our upholstery cleaners remove embedded dirt, stains, and pet odours using fabric-safe methods. Safe for leather, velvet, linen, and all fabric types.' },
      { step: 3, title: 'Fresh Furniture, Guaranteed', description: 'Your sofa is left clean, fresh, and dry within hours. Not happy? We re-clean for free.' },
    ],
    faqs: [
      { question: 'Where do you offer upholstery cleaning?', answer: 'Our upholstery cleaners cover the whole of Essex — including Chelmsford, Basildon, Colchester, Southend, Brentwood, and surrounding areas. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'How much does sofa cleaning cost?', answer: 'Sofa cleaning prices vary by size — 2-seater sofas, 3-seater couches, and corner sofas are priced differently. We provide free, no-obligation quotes based on your specific furniture.' },
      { question: 'Can you clean leather sofas?', answer: 'Yes. Our upholstery cleaners specialise in leather sofa cleaning and conditioning. We clean and restore all leather furniture including sofas, armchairs, and recliners.' },
      { question: 'Do you clean fabric sofas and settees?', answer: 'Yes. We clean all fabric types including velvet sofas, linen couches, cotton settees, microfibre furniture, and delicate fabrics. Our upholstery cleaner assesses each fabric before starting.' },
      { question: 'How long does sofa cleaning take to dry?', answer: 'Most sofas and couches dry within 2-4 hours. We use low-moisture upholstery cleaning techniques to speed up drying time so you can use your furniture the same day.' },
      { question: 'Can you remove pet stains and odours from my sofa?', answer: 'Yes — it\'s one of our specialities. Our upholstery cleaners use enzyme treatments that break down pet urine and odours at the source, not just mask them.' },
      { question: 'Do you clean armchairs and recliners?', answer: 'Yes. We clean all upholstered furniture including armchairs, recliners, ottomans, footstools, dining chairs, and headboards.' },
      { question: 'Is upholstery cleaning safe for my furniture?', answer: 'Absolutely. Our upholstery cleaner tests all products in a hidden area first and uses appropriate methods for each fabric type. No damage, guaranteed.' },
      { question: 'Will upholstery cleaning remove all stains?', answer: 'We remove most stains including food, drink, pet accidents, and general soiling. Some permanent stains like ink or bleach damage can\'t be fully removed — we\'ll always be upfront about what\'s possible.' },
      { question: 'Do I need to be home during sofa cleaning?', answer: 'Not necessarily. As long as we have access to your property, our upholstery cleaners can complete the work while you\'re out.' },
      { question: 'How often should I have my sofa professionally cleaned?', answer: 'We recommend professional upholstery cleaning every 12-18 months, or more frequently if you have pets, children, or allergies.' },
      { question: 'Do you use harsh chemicals?', answer: 'No. We use eco-friendly, non-toxic upholstery cleaning solutions that are safe for your furniture, family, and pets.' },
      { question: 'How do I get an upholstery cleaning quote?', answer: 'Fill out the form on this page with details about your furniture. We\'ll send you a free, no-obligation quote — often the same day.' },
    ],
    seo: {
      title: 'Sofa Cleaning & Upholstery Cleaning Essex | Upholstery Cleaners | Aquapro',
      description: 'Professional sofa cleaning and upholstery cleaning in Essex. Couch cleaning, settee cleaning, leather sofa cleaning, armchair cleaning. Local upholstery cleaners. Free quotes.',
      keywords: ['sofa cleaning Essex', 'upholstery cleaning Essex', 'upholstery cleaners', 'couch cleaning', 'settee cleaning', 'leather sofa cleaning', 'armchair cleaning', 'furniture cleaning near me', 'sofa cleaners Essex', 'upholstery cleaner near me'],
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
    hero: {
      headline: 'Driveway or Patio Looking Tired?',
      subheadline: 'Watch Years of Grime Disappear',
      description: 'Our pressure washing specialists remove moss, algae, oil stains, and years of built-up grime. See your surfaces transformed in just one visit.',
      checkpoints: [
        'Moss, algae, and oil stains removed',
        'No damage to your surfaces — guaranteed',
        'Re-sanding included for block paving',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Pressure Washing Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Pressure Washing Quote', description: 'We inspect your surfaces and provide a fixed-price quote. No hidden fees, no surprises.' },
      { step: 2, title: 'Professional Jet Wash', description: 'Our pressure washing specialists remove moss, algae, oil stains, and years of grime. Safe for block paving, concrete, and natural stone.' },
      { step: 3, title: 'Surfaces Restored, Guaranteed', description: 'Re-sanding included for block paving. Your surfaces look like new — 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'Where do you offer pressure washing?', answer: 'Our pressure washing team covers the whole of Essex — including Chelmsford, Basildon, Colchester, Southend, Brentwood, and surrounding areas. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'Will pressure washing damage my paving?', answer: 'No. We adjust pressure levels for each surface type — block paving, concrete, natural stone, wood decking. Our pressure washing specialists ensure safe, effective cleaning with no damage.' },
      { question: 'What surfaces can you pressure wash?', answer: 'We pressure wash driveways, patios, decking, paths, walls, fencing, and more. Block paving, concrete, tarmac, natural stone, porcelain, and wood — we clean them all.' },
      { question: 'How long does pressure washing take?', answer: 'An average driveway takes 2-4 hours depending on size and condition. Patios typically take 1-3 hours. We\'ll give you a time estimate when you book.' },
      { question: 'Can pressure washing remove oil stains?', answer: 'Yes. We use specialist degreasers to treat and remove oil stains, tyre marks, and grease from driveways and other surfaces.' },
      { question: 'Do you offer sealing after pressure washing?', answer: 'Yes. We offer sealing as an optional extra to protect surfaces, enhance colour, and keep them cleaner for longer.' },
      { question: 'Is pressure washing safe for wooden decking?', answer: 'Yes. Our pressure washing team uses lower pressure settings and appropriate techniques for wood decking. We clean without damaging the timber.' },
      { question: 'Do you re-sand block paving after pressure washing?', answer: 'Yes. Re-sanding with kiln-dried sand is included for all block paving pressure washing jobs. It stabilises blocks and prevents weed growth.' },
      { question: 'Will pressure washing remove moss and algae?', answer: 'Absolutely. Pressure washing removes moss, algae, lichen, weeds, and years of built-up grime. Your surfaces will look like new.' },
      { question: 'Do I need to be home during pressure washing?', answer: 'No. As long as we have access to your property, water, and power, our pressure washing team can complete the work while you\'re out.' },
      { question: 'How often should I have pressure washing done?', answer: 'We recommend pressure washing driveways and patios every 1-2 years, depending on tree coverage, shade, and how quickly moss builds up.' },
      { question: 'What\'s the difference between pressure washing and jet washing?', answer: 'They\'re the same thing — jet washing is just another name for pressure washing. We use commercial-grade pressure washing equipment for the best results.' },
      { question: 'How do I get a pressure washing quote?', answer: 'Fill out the form on this page with a few details about your surfaces. We\'ll send you a free, no-obligation quote — often the same day.' },
    ],
    seo: {
      title: 'Pressure Washing Essex | Jet Washing Service | Aquapro',
      description: 'Professional pressure washing in Essex. Driveways, patios, decking, and paths restored to new. Jet washing with commercial equipment. Free quotes from local pressure washing specialists.',
      keywords: ['pressure washing Essex', 'jet washing Essex', 'pressure washing near me', 'driveway pressure washing', 'patio jet washing', 'decking cleaning', 'pressure washing service'],
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
      'Prevents Costly Tile Damage',
      'Moss expands when wet, cracking and loosening tiles. We remove it before it causes expensive repairs.',
      'Restores That New Roof Look',
      'We remove the black streaks, green moss, and weathered buildup that makes your home look aged and worn.',
      'Boosts Property Value',
      'Many customers have added £10,000–£20,000 to their property value with nothing more than a professional roof clean.',
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
      { step: 1, title: 'Free Personalized Quote', description: 'We visit your property, survey your roof with our drone, and give you a fixed price on the spot. No hidden fees, no surprises.' },
      { step: 2, title: 'We Clean Your Roof', description: 'Our team safely removes every bit of moss, algae, and black staining. Then we apply a protective treatment that keeps your roof moss-free for years.' },
      { step: 3, title: 'Like New Roof, Guaranteed', description: 'We remove all the waste and leave your property spotless. Your roof looks brand new — backed by our 5-year guarantee.' },
    ],
    faqs: [
      { question: 'Where do you offer roof cleaning?', answer: 'We provide professional roof cleaning across Essex and surrounding areas — including Chelmsford, Colchester, Southend, Basildon, and Brentwood. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'Is roof moss removal safe for my tiles?', answer: 'Yes. Our gentle soft wash method is safe for all roof types — clay tiles, concrete tiles, and slate. No damage, no lifted tiles — backed by our tile replacement guarantee.' },
      { question: 'How long does a roof clean take?', answer: 'Most roof cleaning jobs are completed in a single day, depending on roof size and weather. You\'ll know the full schedule before we start — no surprises.' },
      { question: 'Will roof cleaning leave a mess?', answer: 'Never. We remove all moss, algae, and debris, clean your gutters and windows, and leave your property spotless. The only sign we\'ve been is your freshly cleaned roof.' },
      { question: 'Is the moss treatment safe for pets and plants?', answer: 'Yes. The protective roof treatment we apply is completely safe for children, pets, and plants once dry.' },
      { question: 'Do I need to be home during the roof clean?', answer: 'No. As long as we have access to your property, water, and power, our roof cleaning team can complete everything while you\'re out.' },
      { question: 'How long does a professional roof clean last?', answer: 'Our moss removal results are guaranteed for 5 years — often longer. We return after 3 years for a free re-treatment to keep your roof moss-free and looking new.' },
      { question: 'What if a roof tile gets damaged?', answer: 'We replace it like-for-like, free of charge. That\'s our roof tile replacement guarantee — we\'re fully insured for £5 million.' },
      { question: 'What\'s included in a roof cleaning quote?', answer: 'Everything. Full roof clean, moss and algae removal, protective treatment, gutter clean, window clean, all waste removal, plus a free re-treatment at year 3. One fixed price, no hidden costs.' },
      { question: 'How do I get a roof cleaning quote?', answer: 'Fill out the form below with a few details. We use satellite imagery to survey your roof and send a free, no-obligation quote — often the same day.' },
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
    hero: {
      headline: 'Windows Looking Dull and Streaky?',
      subheadline: 'Crystal Clear, Guaranteed',
      description: 'Our window cleaners use pure water technology for a streak-free finish that lasts longer. Frames and sills included at no extra cost.',
      checkpoints: [
        'Streak-free finish — guaranteed',
        'Frames and sills cleaned free',
        'Reaches up to 4 storeys safely',
        'Regular or one-off service available',
      ],
      formTitle: 'Get My Free Window Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Window Cleaning Quote', description: 'We assess your windows and provide a fixed-price quote. Frames and sills included free.' },
      { step: 2, title: 'Pure Water Clean', description: 'Our window cleaners use pure water technology for a streak-free finish that lasts longer. Reaches up to 4 storeys safely.' },
      { step: 3, title: 'Crystal Clear Windows, Guaranteed', description: 'No streaks, no residue, no ladders on your property. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'Where do you offer window cleaning?', answer: 'Our window cleaners cover the whole of Essex — including Chelmsford, Basildon, Colchester, Southend, Brentwood, Harlow, Epping, Maldon, Thurrock, Rochford, and many more. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'What does your window cleaning service include?', answer: 'Every window clean includes the glass, frames, and sills — all thoroughly cleaned and left spotless. Our window cleaners ensure nothing is missed.' },
      { question: 'What is pure water window cleaning?', answer: 'Pure water has minerals removed, so it dries without leaving spots, streaks, or residue. Your windows stay cleaner for longer compared to traditional window cleaning methods.' },
      { question: 'Do your window cleaners clean inside windows?', answer: 'Yes, we offer interior window cleaning as an additional service. Just let us know when booking and we\'ll include it in your quote.' },
      { question: 'How often should I have my windows cleaned?', answer: 'We recommend professional window cleaning every 4-8 weeks for best results. Regular cleaning prevents buildup and keeps your home looking its best. We also offer one-off cleans.' },
      { question: 'Can you reach high or hard-to-reach windows?', answer: 'Yes. Our window cleaners use water-fed telescopic poles to safely reach windows up to 4 storeys high — all from the ground. No ladders against your property.' },
      { question: 'Will window cleaning damage my glass or seals?', answer: 'No. Our trained window cleaners use gentle, low-pressure techniques and pure water that\'s safe for all glass types, frames, and seals. No damage, guaranteed.' },
      { question: 'Do you use harmful chemicals?', answer: 'No. We use pure water with no chemicals — it\'s eco-friendly and completely safe for your windows, plants, pets, and family.' },
      { question: 'How long does window cleaning take?', answer: 'Most homes take under 30 minutes. A standard 4-bedroom house is usually done in 20-30 minutes. We\'ll give you an estimate when you book.' },
      { question: 'What if it rains on my window cleaning day?', answer: 'Light rain won\'t affect the clean — pure water actually helps windows dry streak-free. If weather is severe, we\'ll reschedule at no extra cost.' },
      { question: 'Do I need to be home for window cleaning?', answer: 'No. As long as our window cleaners have access to your property, we can complete the work while you\'re out. We\'ll let you know when we\'re done.' },
      { question: 'What should I do before you arrive?', answer: 'Just move any outdoor furniture or items away from the windows. We\'ll take care of everything else, including protecting nearby plants and surfaces.' },
      { question: 'Do you clean commercial windows?', answer: 'Yes. Our window cleaning service covers shops, offices, and commercial premises across Essex. Regular contracts available for businesses.' },
      { question: 'How do I get a window cleaning quote?', answer: 'Fill out the form on this page with a few details. We\'ll send you a free, no-obligation quote — often the same day.' },
    ],
    seo: {
      title: 'Window Cleaning Essex | Window Cleaners Near Me | Aquapro',
      description: 'Professional window cleaning in Essex. Streak-free results with pure water technology. Frames and sills included. Homes and businesses. Free quotes from local window cleaners.',
      keywords: ['window cleaning Essex', 'window cleaners Essex', 'window cleaner near me', 'pure water window cleaning', 'commercial window cleaning', 'residential window cleaning', 'window cleaning service'],
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
    hero: {
      headline: 'Gutters Blocked or Overflowing?',
      subheadline: 'Prevent Costly Water Damage',
      description: 'Our gutter cleaners clear leaves, moss, and debris using high-reach vacuum systems — no ladders on your property. Before and after photos included.',
      checkpoints: [
        'All gutters and downpipes cleared',
        'Before and after camera footage',
        'No ladders — cleaned from the ground',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Gutter Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Gutter Cleaning Quote', description: 'We inspect your gutters with our camera system and provide a fixed-price quote. No obligation.' },
      { step: 2, title: 'High-Reach Vacuum Clear', description: 'Our gutter cleaners remove leaves, moss, and debris from the ground — no ladders on your property. All downpipes checked and cleared.' },
      { step: 3, title: 'Free-Flowing Gutters, Guaranteed', description: 'Before and after photos included so you can see the results. 100% satisfaction guarantee.' },
    ],
    faqs: [
      { question: 'Where do you offer gutter cleaning?', answer: 'Our gutter cleaners cover the whole of Essex — including Chelmsford, Basildon, Colchester, Southend, Brentwood, and surrounding areas. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'Do you use ladders for gutter cleaning?', answer: 'No. Our gutter cleaners use high-reach vacuum systems that clean from ground level safely. No ladders against your property, no risk of damage.' },
      { question: 'How often should gutters be cleaned?', answer: 'We recommend professional gutter cleaning at least once a year. If you have overhanging trees, twice a year is better — autumn and spring.' },
      { question: 'What does your gutter cleaning service include?', answer: 'Every gutter clean includes clearing all gutters, checking and unblocking downpipes, removing all debris, and providing before/after camera footage.' },
      { question: 'Can you clean conservatory gutters?', answer: 'Yes. Our gutter cleaning equipment reaches all types of guttering including conservatories, extensions, and garages.' },
      { question: 'Do you provide photos of the gutter cleaning?', answer: 'Yes. Our gutter cleaner provides before and after camera footage so you can see exactly what was removed and confirm your gutters are clear.' },
      { question: 'What happens if my downpipes are blocked?', answer: 'We check and clear all downpipes as part of every gutter cleaning job. If there\'s a serious blockage, we\'ll let you know and clear it.' },
      { question: 'Why is gutter cleaning important?', answer: 'Blocked gutters cause water overflow, which leads to damp walls, foundation damage, and costly repairs. Regular gutter cleaning prevents these problems.' },
      { question: 'Can you reach high gutters?', answer: 'Yes. Our high-reach gutter cleaning system reaches gutters up to 4 storeys high — all from the ground, no ladders required.' },
      { question: 'Do I need to be home during gutter cleaning?', answer: 'No. As long as our gutter cleaners have access to your property, we can complete the work while you\'re out. We\'ll send photos when done.' },
      { question: 'How long does gutter cleaning take?', answer: 'Most homes take 30-60 minutes depending on gutter length and condition. We\'ll give you an estimate when you book.' },
      { question: 'Do you clean commercial gutters?', answer: 'Yes. Our gutter cleaning service covers commercial properties, offices, schools, and industrial buildings across Essex.' },
      { question: 'How do I get a gutter cleaning quote?', answer: 'Fill out the form on this page with a few details. We\'ll send you a free, no-obligation gutter cleaning quote — often the same day.' },
    ],
    seo: {
      title: 'Gutter Cleaning Essex | Gutter Cleaners Near Me | Aquapro',
      description: 'Professional gutter cleaning in Essex. High-reach vacuum system, no ladders needed. Before/after camera footage included. Local gutter cleaners. Free quotes.',
      keywords: ['gutter cleaning Essex', 'gutter cleaners Essex', 'gutter cleaner near me', 'gutter clearance', 'blocked gutters', 'gutter cleaning service', 'gutter cleaning near me'],
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
    hero: {
      headline: 'Got a Stubborn Stain?',
      subheadline: "We'll Get It Out",
      description: 'Red wine, coffee, pet accidents — our stain removal specialists tackle the toughest stains on carpets and upholstery. Priority bookings available for fresh spills.',
      checkpoints: [
        'Most stains removed — or you don\'t pay',
        'Safe for all carpet and fabric types',
        'Priority bookings for urgent spills',
        'No residue left behind',
      ],
      formTitle: 'Get My Free Stain Removal Quote',
      trustBadges: [
        'Fully insured for £5M',
        'Stain removal guarantee',
      ],
    },
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
      { step: 1, title: 'Free Stain Assessment', description: 'We identify your stain — red wine, coffee, pet urine, blood, or other — and advise on the best treatment. Priority bookings for fresh spills.' },
      { step: 2, title: 'Targeted Stain Treatment', description: 'Our stain removal specialists apply professional-grade treatments to break down and lift the stain. Safe for all carpets and upholstery.' },
      { step: 3, title: 'Stain Gone, Guaranteed', description: 'No residue left behind. If we can\'t remove a stain we said we could, you don\'t pay for that treatment.' },
    ],
    faqs: [
      { question: 'Where do you offer stain removal?', answer: 'Our stain removal specialists cover the whole of Essex — including Chelmsford, Basildon, Colchester, Southend, Brentwood, and surrounding areas. Pop your postcode in the form to confirm we cover your area.' },
      { question: 'What types of stains can you remove?', answer: 'We remove most stains including red wine, coffee, tea, food, pet urine, blood, ink, makeup, and mud. Our stain removal experts assess each stain and use the right treatment.' },
      { question: 'Can you remove all stains?', answer: 'We remove or significantly reduce most stains. Some permanent damage like bleach spots or very old set-in stains can\'t be fully reversed — we\'ll always be honest about what\'s possible.' },
      { question: 'Do you offer emergency stain removal?', answer: 'Yes. Fresh spills are much easier to remove, so we offer priority bookings for urgent stain removal. Call us as soon as possible for the best chance of complete removal.' },
      { question: 'Is stain removal safe for my carpet?', answer: 'Absolutely. Our stain removal specialists test all products in a hidden area first and use appropriate methods for each carpet and fabric type. No damage, guaranteed.' },
      { question: 'Can you remove pet stains and urine odours?', answer: 'Yes — it\'s one of our specialities. We use enzyme treatments that break down pet urine at the molecular level, removing both the stain and the odour at the source.' },
      { question: 'How much does stain removal cost?', answer: 'Stain removal pricing depends on the type, size, and number of stains. We provide free quotes and will always be upfront about costs before starting.' },
      { question: 'What if the stain doesn\'t come out?', answer: 'We\'ll be honest about what\'s achievable before we start. If we can\'t remove a stain we said we could, you don\'t pay for that treatment. That\'s our stain removal guarantee.' },
      { question: 'Do you remove stains from upholstery too?', answer: 'Yes. Our stain removal service covers carpets, rugs, sofas, armchairs, and all upholstered furniture. Same expert treatment, same great results.' },
      { question: 'How quickly should I treat a fresh stain?', answer: 'The sooner the better. Fresh stains are much easier to remove than old, set-in stains. Blot (don\'t rub) the stain and call us for emergency stain removal.' },
      { question: 'Do you use harsh chemicals?', answer: 'No. We use professional-grade but eco-friendly stain removal solutions that are safe for your carpets, furniture, family, and pets.' },
      { question: 'How do I get a stain removal quote?', answer: 'Fill out the form on this page with details about your stains — photos help if you have them. We\'ll send you a free, no-obligation quote.' },
    ],
    seo: {
      title: 'Stain Removal Essex | Carpet & Upholstery Stain Removal | Aquapro',
      description: 'Professional stain removal in Essex. Red wine, coffee, pet stains, and more. Priority bookings for urgent spills. Stain removal specialists. Free quotes.',
      keywords: ['stain removal Essex', 'carpet stain removal', 'upholstery stain removal', 'pet stain removal', 'red wine stain removal', 'stain removal near me', 'stain removal service'],
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
    hero: {
      headline: 'Driveway Covered in Moss and Stains?',
      subheadline: "We'll Make It Look New Again",
      description: 'Our driveway cleaners remove years of moss, oil stains, and grime — transforming your kerb appeal in just one visit. Re-sanding included for block paving.',
      checkpoints: [
        'Moss, weeds, and oil stains removed',
        'Re-sanding included for block paving',
        'Instantly boosts kerb appeal',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Driveway Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Driveway Cleaning Quote', description: 'We inspect your driveway, identify problem areas, and provide a fixed-price quote. No hidden fees.' },
      { step: 2, title: 'Professional Driveway Clean', description: 'Our driveway cleaners remove moss, weeds, oil stains, and years of built-up grime. Block paving, concrete, tarmac, and resin — we clean them all.' },
      { step: 3, title: 'Kerb Appeal Restored, Guaranteed', description: 'Re-sanding included for block paving. Your driveway looks like new — 100% satisfaction guarantee.' },
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
    hero: {
      headline: 'Patio Green and Slippery?',
      subheadline: 'Get It Ready for Summer',
      description: 'Our patio cleaners remove algae, black spot, and years of weathering — safe for sandstone, porcelain, and all stone types. Transform your outdoor space.',
      checkpoints: [
        'Algae and black spot removed',
        'Safe for all stone types',
        'Transforms your outdoor space',
        'Fixed price, no hidden fees',
      ],
      formTitle: 'Get My Free Patio Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Patio Cleaning Quote', description: 'We assess your patio — sandstone, porcelain, concrete, or natural stone — and provide a fixed-price quote.' },
      { step: 2, title: 'Professional Patio Clean', description: 'Our patio cleaners remove green algae, black spot, and years of weathering. Pressure adjusted for your stone type — no damage, guaranteed.' },
      { step: 3, title: 'Outdoor Space Transformed, Guaranteed', description: 'Your patio is left looking new and ready for entertaining. Optional sealing available. 100% satisfaction guarantee.' },
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
    hero: {
      headline: 'Solar Panels Not Performing?',
      subheadline: 'Restore Up to 30% Lost Efficiency',
      description: 'Dirty panels lose up to 30% efficiency. Our solar panel cleaners use pure water and soft brushes — no chemicals, no scratching, no voided warranty.',
      checkpoints: [
        'Restores up to 30% lost efficiency',
        'Pure water cleaning — no chemicals',
        'Won\'t void your panel warranty',
        'Safe for all panel types',
      ],
      formTitle: 'Get My Free Solar Panel Quote',
      trustBadges: [
        'Fully insured for £5M',
        'Manufacturer-approved method',
      ],
    },
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
      { step: 1, title: 'Free Solar Panel Quote', description: 'We assess your solar installation and provide a fixed-price quote. No obligation.' },
      { step: 2, title: 'Pure Water Panel Clean', description: 'Our solar panel cleaners gently remove dirt, bird droppings, and grime. No chemicals, no scratching — won\'t void your warranty.' },
      { step: 3, title: 'Efficiency Restored, Guaranteed', description: 'Your panels are left spotless. Restore up to 30% lost energy output. 100% satisfaction guarantee.' },
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
    hero: {
      headline: 'Conservatory Looking Green and Dull?',
      subheadline: 'Let the Light Back In',
      description: 'Our conservatory cleaners remove algae, moss, and grime from your roof, glass, and frames — restoring natural light and making it feel new again.',
      checkpoints: [
        'Roof, glass, and frames all cleaned',
        'Safe for polycarbonate and glass roofs',
        'Gutters cleared free',
        'Streak-free finish guaranteed',
      ],
      formTitle: 'Get My Free Conservatory Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Conservatory Quote', description: 'We inspect your conservatory and provide a fixed-price quote. Gutter clearing included free.' },
      { step: 2, title: 'Complete Conservatory Clean', description: 'Our conservatory cleaners remove algae, moss, and grime from your roof, glass panels, and UPVC frames. Safe for polycarbonate and glass roofs.' },
      { step: 3, title: 'Natural Light Restored, Guaranteed', description: 'Your conservatory is left crystal clear and bright again. 100% satisfaction guarantee.' },
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
    hero: {
      headline: 'Mattress Stained or Smelling?',
      subheadline: 'Sleep Fresher Tonight',
      description: 'Our mattress cleaners remove dust mites, allergens, stains, and odours — leaving your mattress fresh, sanitised, and ready for a healthier night\'s sleep.',
      checkpoints: [
        'Dust mites and allergens removed',
        'Stains and odours eliminated',
        'Dry same day — sleep on it tonight',
        'Safe for all mattress types',
      ],
      formTitle: 'Get My Free Mattress Cleaning Quote',
      trustBadges: [
        'Fully insured for £5M',
        '100% satisfaction guarantee',
      ],
    },
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
      { step: 1, title: 'Free Mattress Cleaning Quote', description: 'We inspect your mattress and provide a fixed-price quote. Single, double, king — all sizes cleaned.' },
      { step: 2, title: 'Deep Clean & Sanitise', description: 'Our mattress cleaners remove dust mites, allergens, stains, and odours. Safe for memory foam, spring, and hybrid mattresses.' },
      { step: 3, title: 'Fresher Sleep, Guaranteed', description: 'Your mattress is left fresh, sanitised, and dry same day — ready for a healthier night\'s sleep. 100% satisfaction guarantee.' },
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
